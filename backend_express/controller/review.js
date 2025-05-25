import  Review from '../models/review.js';
import User from '../models/perm_user.js';
import joi from 'joi';

export const review = (req, res) => {
    try {
       

        // Here you would typically save the review to a database
        // For demonstration, we will just return the review
        const schema = joi.object({
            email: joi.string().email().required(),
            reviewText: joi.string().min(10).required()
        });
        const { error } = schema.validate({ email, reviewText });
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const { email, reviewText } = req.body;
        const userfind=User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const  name = userfind.name; // Assuming the user's name is stored in the User model

  Review.create({
            email,
            name, // Assuming req.user contains the user's name
            review_text: reviewText
        });
        return res.status(200).json({ message: "Review submitted successfully", review: { email, reviewText } });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while submitting the review" });
    }
}