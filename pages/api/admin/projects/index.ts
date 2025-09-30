import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { ProjectFormSchema } from '@/shared/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { rows } = await sql`
        SELECT * FROM projects 
        ORDER BY created_at DESC
      `;

      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  } else if (req.method === 'POST') {
    try {
      const validation = ProjectFormSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: 'Invalid data', 
          details: validation.error.errors 
        });
      }

      const data = validation.data;

      await sql`
        INSERT INTO projects (title, description, image_url, category, duration, year, drive_link, is_featured, updated_at)
        VALUES (${data.title}, ${data.description}, ${data.image_url}, ${data.category}, ${data.duration}, ${data.year}, ${data.drive_link}, ${data.is_featured || false}, CURRENT_TIMESTAMP)
      `;

      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
