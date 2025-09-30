
CREATE TABLE site_texts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(section, key)
);

-- Insert default texts
INSERT INTO site_texts (section, key, content) VALUES
('hero', 'title_main', 'Videomaker'),
('hero', 'title_subtitle', '& Mentor Audiovisual'),
('hero', 'description', 'Transformo ideias em histórias visuais impactantes que conectam, emocionam e geram resultados'),
('about', 'title', 'Sobre Mim'),
('about', 'description_1', 'Sou um profissional apaixonado pela arte de contar histórias através do audiovisual. Como editor de vídeo, videomaker e mentor, dedico-me a criar conteúdo que não apenas informa, mas emociona e inspira ação.'),
('about', 'description_2', 'Minha experiência abrange desde projetos corporativos até conteúdos criativos para redes sociais, sempre com foco na qualidade técnica e na narrativa envolvente. Também mentoreio novos talentos na área audiovisual, compartilhando conhecimento e técnicas avançadas.'),
('projects', 'title', 'Meus Projetos'),
('projects', 'description', 'Uma seleção dos meus trabalhos mais recentes, demonstrando versatilidade e qualidade técnica em diferentes formatos audiovisuais'),
('services', 'title', 'Meus Serviços'),
('services', 'description', 'Soluções completas em produção audiovisual para empresas, criadores de conteúdo e profissionais que buscam resultados excepcionais'),
('contact', 'title', 'Vamos Conversar'),
('contact', 'description', 'Tem um projeto em mente? Quer saber mais sobre meus serviços? Entre em contato e vamos criar algo incrível juntos!'),
('contact', 'phone', '+55 (71) 8730-1823'),
('contact', 'email', 'contato@victoroliveira.com'),
('contact', 'location', 'Salvador - Bahia');
