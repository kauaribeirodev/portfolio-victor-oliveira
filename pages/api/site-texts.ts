import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { rows } = await sql`
      SELECT * FROM site_texts 
      ORDER BY section, key
    `;

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching site texts:', error);
    res.status(500).json({ error: 'Failed to fetch site texts' });
  }
}
