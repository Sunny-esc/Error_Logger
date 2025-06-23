import mongoose from 'mongoose';
const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
});
const Feedback= mongoose.model("Feedback", feedbackSchema);
export default Feedback;