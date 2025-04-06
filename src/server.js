const PORT = 5173;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/google-generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


app.post('/gemini', async (req, res) => {
    console.log(req.body.message);
    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});

    const msg = req.body.message
    const response = await model.generateText({
        prompt: msg,
        temperature: 0.5,
        maxOutputTokens: 100,
        topP: 0.8,
        topK: 40,
    });
    console.log(response);
    res.json(response.text);
    res.send();

    // set chat history?
});

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
    
});
