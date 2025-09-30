import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { ProjectFormSchema } from '@/shared/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  if (req.method === 'PUT') {
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
        UPDATE projects 
        SET title = ${data.title}, description = ${data.description}, image_url = ${data.image_url}, 
            category = ${data.category}, duration = ${data.duration}, year = ${data.year}, 
            drive_link = ${data.drive_link}, is_featured = ${data.is_featured || false}, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${parseInt(id)}
      `;

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await sql`
        DELETE FROM projects WHERE id = ${parseInt(id)}
      `;

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
