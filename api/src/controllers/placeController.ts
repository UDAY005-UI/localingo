import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getPlacesByName = async (req: Request, res: Response) => {
  const { query, lat, lon } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {

    const fsResponse = await axios.get(
      "https://places-api.foursquare.com/places/search",
      {
        headers: {
          Authorization: `Bearer ${process.env.FOURSQUARE_API_KEY}`,
          Accept: "application/json",
          "X-Places-Api-Version": "2025-06-17",
        },
        params: {
          query,
          ll: lat && lon ? `${lat},${lon}` : undefined,
          radius: 3000,
          limit: 10,
          fields: "name,location,categories,distance",
        },
      }
    );

    const fsPlaces = fsResponse.data?.results || [];
    console.log(fsPlaces);
    if (fsPlaces.length > 0) {
      const place = fsPlaces[0];
      return res.json({
        name: place.name,
        address: place.location?.formatted_address,
        lat: place.geocodes?.main?.latitude,
        lon: place.geocodes?.main?.longitude,
        categories: place.categories,
        source: "Foursquare",
      });
    }

    if (lat && lon) {
      const candResponse = await axios.get(
        "https://places-api.foursquare.com/geotagging/candidates",
        {
          headers: {
            Authorization: `Bearer ${process.env.FOURSQUARE_API_KEY}`,
            Accept: "application/json",
            "Accept-Version": "2023-12-01",
          },
          params: {
            ll: `${lat},${lon}`,
            radius: 1000,
            limit: 10,
          },
        }
      );

      const candidates = candResponse.data?.results || [];
      if (candidates.length > 0) {
        const c = candidates[0];
        return res.json({
          name: c.name,
          address: c.location?.formatted_address,
          lat: c.geocodes?.main?.latitude,
          lon: c.geocodes?.main?.longitude,
          source: "Foursquare (candidates)",
        });
      }
    }

    const mapboxResponse = await axios.get(
      "https://api.mapbox.com/search/geocode/v6/forward",
      {
        params: {
          q: query,
          proximity: lat && lon ? `${lon},${lat}` : undefined,
          limit: 1,
          types: "place",
          access_token: process.env.MAPBOX_ACCESS_TOKEN,
        },
      }
    );

    const features = mapboxResponse.data?.features || [];
    if (features.length === 0) {
      return res.status(404).json({ error: "No results found." });
    }

    const feature = features[0];
    return res.json({
      name: feature.properties?.name || feature.properties?.name_preferred,
      address:
        feature.properties?.full_address || feature.properties?.place_formatted,
      lat: feature.geometry?.coordinates?.[1],
      lon: feature.geometry?.coordinates?.[0],
      source: "Mapbox",
    });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error status: ", error.response?.status);
      console.error("Axios error data: ", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    return res.status(500).json({ error: "Search failed." });
  }
};
