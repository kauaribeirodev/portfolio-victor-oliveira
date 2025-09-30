import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Plus, Edit, Trash2, ExternalLink, LogOut, Type } from 'lucide-react';
import { ProjectType, ProjectFormType, SiteTextType, SiteTextFormType } from '@/shared/types';

export default function Admin() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [siteTexts, setSiteTexts] = useState<SiteTextType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'texts'>('projects');
  const [editingText, setEditingText] = useState<SiteTextType | null>(null);

  useEffect(() => {
    fetchProjects();
    fetchSiteTexts();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      
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

  const fetchSiteTexts = async () => {
    try {
      const response = await fetch('/api/admin/site-texts');
      
      if (response.ok) {
        const data = await response.json();
        setSiteTexts(data);
      }
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
    }
  };

  const handleSubmit = async (formData: ProjectFormType) => {
    try {
      const url = editingProject 
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects';
      
      const method = editingProject ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchProjects();
        setShowForm(false);
        setEditingProject(null);
      }
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProjects();
      }
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
    }
  };

  const handleEdit = (project: ProjectType) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleUpdateText = async (formData: SiteTextFormType) => {
    try {
      const response = await fetch(`/api/admin/site-texts/${editingText?.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchSiteTexts();
        setEditingText(null);
      }
    } catch (error) {
      console.error('Erro ao atualizar texto:', error);
    }
  };

  const handleBackToSite = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Administração de Projetos</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Olá, Victor</span>
            <button
              onClick={handleBackToSite}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              Voltar ao Site
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Plus size={20} />
            Projetos
          </button>
          <button
            onClick={() => setActiveTab('texts')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'texts'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Type size={20} />
            Textos do Site
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            {/* Actions */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-white">Projetos</h2>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowForm(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <Plus size={20} />
                Novo Projeto
              </button>
            </div>

        {/* Projects List */}
            <div className="grid gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-900 rounded-lg p-6 border border-gray-800"
                >
                  <div className="flex gap-6">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                          <a
                            href={project.drive_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            <ExternalLink size={20} />
                          </a>
                        </div>
                      </div>
                      <p className="text-gray-400 mb-2">{project.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>{project.category}</span>
                        <span>{project.duration}</span>
                        <span>{project.year}</span>
                        {project.is_featured && (
                          <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded">
                            Destaque
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Texts Tab */}
        {activeTab === 'texts' && (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-2">Textos do Site</h2>
              <p className="text-gray-400">Edite os textos principais que aparecem no site</p>
            </div>

            <div className="grid gap-6">
              {Object.entries(
                siteTexts.reduce((acc, text) => {
                  if (!acc[text.section]) acc[text.section] = [];
                  acc[text.section].push(text);
                  return acc;
                }, {} as Record<string, SiteTextType[]>)
              ).map(([section, texts]) => (
                <div key={section} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4 capitalize">
                    {section === 'hero' ? 'Seção Principal' : 
                     section === 'about' ? 'Sobre Mim' :
                     section === 'projects' ? 'Projetos' :
                     section === 'services' ? 'Serviços' :
                     section === 'contact' ? 'Contato' : section}
                  </h3>
                  <div className="grid gap-4">
                    {texts.map((text) => (
                      <div key={text.id} className="flex justify-between items-start gap-4 p-4 bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <div className="text-sm text-gray-400 mb-1">
                            {text.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          <div className="text-white">
                            {text.content.length > 100 ? `${text.content.substring(0, 100)}...` : text.content}
                          </div>
                        </div>
                        <button
                          onClick={() => setEditingText(text)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Form Modals */}
        {showForm && (
          <ProjectForm
            project={editingProject}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          />
        )}

        {editingText && (
          <TextEditForm
            text={editingText}
            onSubmit={handleUpdateText}
            onCancel={() => setEditingText(null)}
          />
        )}
      </div>
    </div>
  );
}

function TextEditForm({
  text,
  onSubmit,
  onCancel,
}: {
  text: SiteTextType;
  onSubmit: (data: SiteTextFormType) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<SiteTextFormType>({
    section: text.section,
    key: text.key,
    content: text.content,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getFieldLabel = (key: string) => {
    const labels: Record<string, string> = {
      'title_main': 'Título Principal',
      'title_subtitle': 'Subtítulo',
      'description': 'Descrição',
      'description_1': 'Primeira Descrição',
      'description_2': 'Segunda Descrição',
      'title': 'Título da Seção',
      'phone': 'Telefone',
      'email': 'Email',
      'location': 'Localização',
    };
    return labels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-xl font-semibold text-white mb-6">
          Editar Texto: {getFieldLabel(text.key)}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Conteúdo</label>
            {formData.content.length > 100 ? (
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-purple-500 focus:outline-none h-32 resize-vertical"
                required
              />
            ) : (
              <input
                type="text"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-purple-500 focus:outline-none"
                required
              />
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project: ProjectType | null;
  onSubmit: (data: ProjectFormType) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<ProjectFormType>({
    title: project?.title || '',
    description: project?.description || '',
    image_url: project?.image_url || '',
    category: project?.category || '',
    duration: project?.duration || '',
    year: project?.year || new Date().getFullYear().toString(),
    drive_link: project?.drive_link || '',
    is_featured: project?.is_featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categories = [
    'Publicidade',
    'Corporativo',
    'Musical',
    'Social Media',
    'Cinema',
    'Eventos',
    'Educacional',
    'Documentário'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-white mb-6">
          {project ? 'Editar Projeto' : 'Novo Projeto'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none h-24"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">URL da Imagem</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
                required
              >
                <option value="">Selecione...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Duração</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="ex: 2:30"
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Ano</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Link do Google Drive</label>
            <input
              type="url"
              value={formData.drive_link}
              onChange={(e) => setFormData({ ...formData, drive_link: e.target.value })}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="is_featured" className="text-gray-300">
              Projeto em destaque
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              {project ? 'Atualizar' : 'Criar'} Projeto
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
