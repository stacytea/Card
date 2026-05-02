export default async function handler(req, res) {
  const key = process.env.GEMINI_API_KEY;

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${key}`,
    {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        contents:[{parts:[{text:req.body.prompt || "寫故事"}]}]
      })
    }
  );

  const data = await r.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  res.status(200).json({text});
}
