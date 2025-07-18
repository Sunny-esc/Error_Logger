import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'; 
import { geminiLimiter } from '../middleware/aiRate.js';
const analyzeRouter = express.Router();

// POST /api/analyze-snippet
analyzeRouter.post('/analyze-snippet',geminiLimiter ,async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Code snippet is required.' });
  }
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Analyze this code and give recommendations for improvement, security, and best practices.\n\nCode:\n${code}`;

    const result = await model.generateContent(prompt);

    // Depending on SDK version, use result.response.text() or result.text()
    const aiResponse = result.response?.text() || result.text();
    return res.status(200).json({ analysis: aiResponse });
  } catch (err) {
    console.error('Error analyzing code:', err.response?.data || err.message || err);
    return res.status(500).json({ error: 'Failed to analyze code.' });
  }
});




export default analyzeRouter; 