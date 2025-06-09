import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const PYTHON_API_URL = process.env.PYTHON_API_URL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authCode = req.query.authCode as string;
  const userId = req.query.userId as string;

  if (!authCode || !userId) {
    return res.status(400).send("❌ Missing authCode or userId");
  }

  try {
    // 🔁 Send to Flask server
    await axios.post(`${PYTHON_API_URL}/aliceblue/session`, {
      authCode,
      userId,
    });

    // ✅ Redirect to Flask UI after saving session
    res.writeHead(302, {
      Location: 'https://aliceblue-bot.onrender.com/',
    });
    res.end();

  } catch (error: any) {
    return res.status(500).send(`❌ Error forwarding authCode: ${error.message}`);
  }
}
