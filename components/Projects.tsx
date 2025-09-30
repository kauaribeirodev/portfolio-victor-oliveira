import { useState, useEffect } from 'react';
import { Play, ExternalLink, Calendar, Tag } from 'lucide-react';
import { ProjectType } from '@/shared/types';
import { useSiteTexts } from '@/hooks/useSiteTexts';

export default function Projects() {
  const { getText } = useSiteTexts();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = selectedCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const categories = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <section id="projetos" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {getText('projects', 'title', 'Meus')} <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Projetos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {getText('projects', 'description', 'Uma seleção dos meus trabalhos mais recentes, demonstrando versatilidade e qualidade técnica em diferentes formatos audiovisuais')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                category === selectedCategory
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <div className="text-gray-400">Carregando projetos...</div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400">Nenhum projeto encontrado.</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <a
                key={project.id}
                href={project.drive_link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer block"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </div>

                  {/* Featured Badge */}
                  {project.is_featured && (
                    <div className="absolute top-4 right-4 bg-yellow-500/90 text-white px-3 py-1 rounded-full text-sm">
                      Destaque
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {project.duration}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
            Ver Todos os Projetos
          </button>
        </div>
      </div>
    </section>
  );
}
