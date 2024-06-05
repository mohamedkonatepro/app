import { getIronSession } from 'iron-session';
import { IronSessionData, sessionOptions } from "../../lib/sessionConfig";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { identifier, password } = req.body;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local?populate=role`, {
        identifier,
        password,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN_STRAPI}`
        }
      });
      
      const user = response.data.user;
      
      const session = await getIronSession<IronSessionData>(req, res, sessionOptions);
      session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      await session.save();

      res.status(200).json({ user: session.user });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
