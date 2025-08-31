import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

import { getMood, getIntent } from "../utils/placeMappings.js";
dotenv.config();

type Place = {
  lat: number;
  lon: number;
  name: string;
  address?: string;
  distance?: number;
  category?: { id: string; name: string }[];
  rating?: number;
  priceLevel?: 1 | 2 | 3 | 4;
  popularity?: number;
  photos?: string[];
  website?: string;
};

export const getPlacesByName = async (req: Request, res: Response) => {
  const { query, lat, lon } = req.query; 
  console.log(req.query);

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
          radius: 5000,
          limit: 10,
        },
      }
    );

    const fsPlaces = fsResponse.data?.results || [];

    const places: Place[] = await Promise.all(
      fsPlaces.map(async (place: any) => {
        try {
          const detailsRes = await axios.get(
            `https://places-api.foursquare.com/places/${place.fsq_place_id}`,
            {
              headers: {
                "X-Places-Api-Version": "2025-06-17",
                Accept: "application/json",
                Authorization: `Bearer ${process.env.FOURSQUARE_API_KEY}`,
              },
            }
          );

          const details = detailsRes.data;
          const mood = getMood(details.categories?.[0]?.name);
          const intent = getIntent(details.categories?.[0]?.name);
          const photos: string[] =
            details.photos?.slice(0, 3).map((p: any) => `${p.prefix}300x300${p.suffix}`) ||
            ["photos not available"];

          return {
            name: details.name || place.name,
            address: details.location?.formatted_address || place.location?.formatted_address,
            lat: details.geocodes?.main?.latitude || place.latitude,
            lon: details.geocodes?.main?.longitude || place.longitude,
            distance: place.distance / 1000,
            category: details.categories || place.categories,
            rating: details.rating,
            priceLevel: details.price,
            popularity: details.popularity,
            photos,
            website: details.website || place.website,
            openNow: details.hours?.open_now,
          } as Place;
          
        } catch (err) {
          console.warn(`Failed to fetch details for ${place.name}:`, err);
          
          return {
            name: place.name,
            address: place.location?.formatted_address,
            lat: place.latitude,
            lon: place.longitude,
            distance: place.distance / 1000,
            category: place.categories,
            photos: ["photos not available"],
            source: "Foursquare",
          } as Place;
        }
      })
    );

    return res.json({ count: fsPlaces.length, places });
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
