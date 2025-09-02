
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          max_tokens: 200
        }),
      });

      const data = await response.json();
      res.status(200).json(data);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch AI response" });
    }

  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
