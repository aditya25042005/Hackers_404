import mongoose from "mongoose";


const history = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
  started_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  user_answers: {
    interests: String,
    strengths: String,
    education: String,
    preferences: String
  },
  chat_history: [
    {
      from: {
        type: String,
        enum: ['bot', 'user'],
        required: true
      },
      text: {
        type: String,
        required: true
      },
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
});



const History=mongoose.model('history',history);

export default History;



