import { Router } from "express";
import { getMapData } from "../controllers/mapController.js";
import { getPlacesByName } from "../controllers/placeController.js";

const router = Router();

router.post("/map", getMapData);
router.get("/places", getPlacesByName);

export default router;