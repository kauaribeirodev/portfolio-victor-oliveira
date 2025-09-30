import { sql } from '@vercel/postgres';

export async function initializeDatabase() {
  try {
    // Create projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL,
        duration TEXT NOT NULL,
        year TEXT NOT NULL,
        drive_link TEXT NOT NULL,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create site_texts table
    await sql`
      CREATE TABLE IF NOT EXISTS site_texts (
        id SERIAL PRIMARY KEY,
        section TEXT NOT NULL,
        key TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(section, key)
      )
    `;

    // Insert default site texts if they don't exist
    const defaultTexts = [
      { section: 'hero', key: 'title_main', content: 'Videomaker' },
      { section: 'hero', key: 'title_subtitle', content: '& Mentor Audiovisual' },
      { section: 'hero', key: 'description', content: 'Transformo ideias em histórias visuais impactantes que conectam, emocionam e geram resultados' },
      { section: 'about', key: 'title', content: 'Sobre' },
      { section: 'about', key: 'description_1', content: 'Sou um profissional apaixonado pela arte de contar histórias através do audiovisual. Como editor de vídeo, videomaker e mentor, dedico-me a criar conteúdo que não apenas informa, mas emociona e inspira ação.' },
      { section: 'about', key: 'description_2', content: 'Minha experiência abrange desde projetos corporativos até conteúdos criativos para redes sociais, sempre com foco na qualidade técnica e na narrativa envolvente. Também mentoreio novos talentos na área audiovisual, compartilhando conhecimento e técnicas avançadas.' },
      { section: 'projects', key: 'title', content: 'Meus' },
      { section: 'projects', key: 'description', content: 'Uma seleção dos meus trabalhos mais recentes, demonstrando versatilidade e qualidade técnica em diferentes formatos audiovisuais' },
      { section: 'services', key: 'title', content: 'Meus' },
      { section: 'services', key: 'description', content: 'Soluções completas em produção audiovisual para empresas, criadores de conteúdo e profissionais que buscam resultados excepcionais' },
      { section: 'contact', key: 'title', content: 'Vamos' },
      { section: 'contact', key: 'description', content: 'Tem um projeto em mente? Quer saber mais sobre meus serviços? Entre em contato e vamos criar algo incrível juntos!' },
      { section: 'contact', key: 'email', content: 'contato@victoroliveira.com' },
      { section: 'contact', key: 'phone', content: '+55 (71) 8730-1823' },
      { section: 'contact', key: 'location', content: 'Salvador - Bahia' }
    ];

    for (const text of defaultTexts) {
      await sql`
        INSERT INTO site_texts (section, key, content)
        VALUES (${text.section}, ${text.key}, ${text.content})
        ON CONFLICT (section, key) DO NOTHING
      `;
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export { sql };
