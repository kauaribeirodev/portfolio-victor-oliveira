
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  year TEXT NOT NULL,
  drive_link TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_year ON projects(year);
CREATE INDEX idx_projects_featured ON projects(is_featured);
