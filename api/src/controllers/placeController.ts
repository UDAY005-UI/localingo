import { Request, Response } from "express";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getPlacesByName = async (req: Request, res: Response) => {
    const { query, lat, lon } = req.query;

    if(!query || typeof query !== "string"){
        return res.status(400).json({error: "Query parameter is required."})
    }

    try{
        const mapboxResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`, {
            params: {
                access_token:process.env.MAPBOX_ACCESS_TOKEN,
                limit: 1,
                proximity: lat && lon ? `${lon},${lat}` : undefined,
            },
        });

        const feature = mapboxResponse.data.features?.[0];
        if (!feature) {
          return res.status(404).json({ error: "No results found." });
        }
        console.log(feature);
        return res.json({
            name: feature.text,
            address: feature.place_name,
            lat: feature.center[1], // latitude
            lon: feature.center[0], // longitude
            source: "Mapbox",
          });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({error: "Search failed."})
    }
}