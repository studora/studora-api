import express from "express";
import fetch from "node-fetch";
import cors from "cors"; // <-- install this package
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Allow requests from your GitHub Pages
app.use(cors({ origin: "https://studora.github.io" }));

app.use(express.json());

app.post("/api/ask-gpt", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
