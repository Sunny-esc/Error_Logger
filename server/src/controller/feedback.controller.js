import e from 'express';
import Feedback from '../models/feedback.model.js';
import express from 'express';

const Frouter = express.Router();

Frouter.post("/feedback", async (req, res) => {
    const { email, message } = req.body;
    if (!email || !message) {
        return res.status(400).json({ error: "Email and message are required" });
    }
    try {
        const newfeedback = new Feedback({
            email,
            message,
        });
        
        const savedFeedback = await newfeedback.save();
      
        
        return res.status(200).json({ message: "Feedback saved successfully", feedback: savedFeedback });
    } catch (err) {
        console.error("Error saving feedback:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

Frouter.get('/feed', async (_req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        return res.status(200).json(feedbacks);
    } catch (err) {
        console.error("Error fetching feedbacks:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
export default Frouter;