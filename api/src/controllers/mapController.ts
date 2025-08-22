import axios from 'axios';
import { getCount, incrementCount, REQUEST_LIMIT } from '../utils/mapUsage.js';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const getMapData = async (req: Request, res: Response) => {
    if(getCount() >= REQUEST_LIMIT){
        return res.status(429).json({error: "Monthly map usage limit reached."})
    }

    try{
        const { lat, lon } = req.body;
        console.log("Request-body", req.body);
        if(!lat || !lon){
            return res.status(400).json({error: "latitude and longitude is required."})
        }
        incrementCount();

        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json`,{
            params: {
                access_token: process.env.MAPBOX_ACCESS_TOKEN
            }
        });
        res.json(response.data);
    } catch(error){
        return res.status(500).json({error: error || "mapbox request failed"});
    }
}