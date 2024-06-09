import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.KEY_API_OPENAI });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: text,
    });

    const speechFile = path.resolve('./public/speech.mp3');
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    const audioUrl = '/speech.mp3';
    res.status(200).json({ audioUrl });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
