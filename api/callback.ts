import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const PYTHON_API_URL = process.env.PYTHON_API_URL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const authCode = req.query.authCode as string;
    const userId = req.query.userId as string;

    if (!authCode || !userId) {
        return res.status(400).send("Missing authCode or userId");
    }

    try {
        const response = await axios.post(`${PYTHON_API_URL}/aliceblue/session`, {
            authCode,
            userId,
        });

        return res.status(200).json({
            message: "AuthCode forwarded successfully",
            data: response.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error forwarding authCode",
            error: error.message,
        });
    }
}
