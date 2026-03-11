import express from "express"
import { createTrip,getTrips } from "../controllers/tripController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// Create trip (logged-in user)
router.post("/",protect,createTrip)

// Get only the logged-in user's trips
router.get("/",protect,getTrips)

export default router