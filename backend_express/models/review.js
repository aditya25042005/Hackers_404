

import mongoose from "mongoose";



const review=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    review_text: {
        type: String,
        required: true
    },
   
    created_at: {
        type: Date,
        default: Date.now
    }
});
const Review = mongoose.model('Review', review);
export default Review;