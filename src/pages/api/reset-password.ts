import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code, password, passwordConfirmation } = req.body;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        code,
        password,
        passwordConfirmation,
      })

      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
