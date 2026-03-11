import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({

  // Link trip to a user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  destination: String,

  startDate: Date,

  endDate: Date,

  travelers: Number,

  image: String,

  days: [
    {
      day: Number,
      title: String,
      date: Date,
      activities: [
        {
          time: String,
          title: String,
          description: String,
          location: String,
          duration: String
        }
      ]
    }
  ],

  status: {
    type: String,
    default: "planning"
  }

},{timestamps:true})

export default mongoose.model("Trip",tripSchema)