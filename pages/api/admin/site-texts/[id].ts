import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { SiteTextFormSchema } from '@/shared/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid text ID' });
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const validation = SiteTextFormSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid data', 
        details: validation.error.errors 
      });
    }

    const data = validation.data;

    await sql`
      UPDATE site_texts 
      SET section = ${data.section}, key = ${data.key}, content = ${data.content}, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)}
    `;

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating site text:', error);
    res.status(500).json({ error: 'Failed to update site text' });
  }
}
