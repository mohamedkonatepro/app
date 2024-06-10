import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.KEY_API_OPENAI });

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({ multiples: true, filename: (name, ext, part, form) => {
    return `${Date.now()}-${part.originalFilename}.mp3`;
  } });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { files } = await parseForm(req);

    if (!files.audio) {
      return res.status(400).json({ message: 'Audio file is missing' });
    }

    const file = Array.isArray(files.audio) ? files.audio[0] : files.audio;
    const filePath = (file as formidable.File).filepath;

    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });

    res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
