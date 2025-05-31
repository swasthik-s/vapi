import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const PYTHON_API_URL = process.env.PYTHON_API_URL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const authCode = req.query.authCode as string;
    const userId = req.query.userId as string;

    if (!authCode || !userId) {
        return res.status(400).send("❌ Missing authCode or userId");
    }

    if (!PYTHON_API_URL) {
        return res.status(500).send("❌ PYTHON_API_URL not set in environment");
    }

    try {
        const response = await axios.post(`${PYTHON_API_URL}/aliceblue/session`, {
            authCode,
            userId,
        });

        return res.status(200).send(`
      ✅ AuthCode forwarded successfully!<br/>
      <b>User ID:</b> ${userId}<br/>
      <b>Session ID:</b> ${response.data.session_id || 'N/A'}<br/>
    `);
    } catch (error: any) {
        console.error("Error forwarding authCode:", error.message);
        return res.status(500).send(`❌ Error forwarding authCode: ${error.message}`);
    }
}
