import type { NextApiRequest, NextApiResponse } from 'next';
import { getIronSession } from 'iron-session';
import { IronSessionData, sessionOptions } from '../../lib/sessionConfig';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<IronSessionData>(req, res, sessionOptions);

  if (session.user) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.id}?populate=role`, {
      headers: {
        'Authorization': `Bearer ${process.env.TOKEN_STRAPI}`
      }
    });
    res.status(200).json({ user: response.data });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
}
