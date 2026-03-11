import Trip from "../models/Trip.js"

// Create trip
export const createTrip = async (req, res) => {

  try {

    const trip = await Trip.create({
      ...req.body,
      userId: req.user
    })

    res.json(trip)

  } catch (err) {

    res.status(500).json({ message: err.message })

  }

}

// Get user trips
export const getTrips = async (req, res) => {

  try {

    const trips = await Trip.find({ userId: req.user })

    res.json(trips)

  } catch (err) {

    res.status(500).json({ message: err.message })

  }

}