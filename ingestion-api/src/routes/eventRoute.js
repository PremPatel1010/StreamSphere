// src/routes/eventRoutes.js

import express from "express";
import { trackEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post("/track", trackEvent);

export default router;
