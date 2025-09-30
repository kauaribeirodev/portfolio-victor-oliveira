import { Video, Edit, Users, Camera, Megaphone, Zap } from 'lucide-react';
import { useSiteTexts } from '@/hooks/useSiteTexts';

export default function Services() {
  const { getText } = useSiteTexts();
  const services = [
    {
      icon: Video,
      title: 'Edição de Vídeo',
      description: 'Pós-produção profissional com color grading, motion graphics e finalização completa para todos os tipos de projeto.',
      features: ['Color Grading Profissional', 'Motion Graphics', 'Correção de Áudio', 'Entrega em Múltiplos Formatos']
    },
    {
      icon: Camera,
      title: 'Produção Audiovisual',
      description: 'Criação completa de conteúdo audiovisual, da pré-produção à finalização, incluindo direção e coordenação.',
      features: ['Direção Criativa', 'Roteirização', 'Coordenação de Equipe', 'Planejamento de Produção']
    },
    {
      icon: Megaphone,
      title: 'Conteúdo para Redes Sociais',
      description: 'Desenvolvimento de estratégias visuais para plataformas digitais com foco em engajamento e conversão.',
      features: ['Stories e Reels', 'Vídeos Promocionais', 'Conteúdo de Marca', 'Otimização por Plataforma']
    },
    {
      icon: Users,
      title: 'Mentoria Audiovisual',
      description: 'Capacitação técnica e criativa para profissionais e iniciantes na área de produção audiovisual.',
      features: ['Técnicas de Edição', 'Direção de Arte', 'Workflow Profissional', 'Análise de Portfolio']
    },
    {
      icon: Edit,
      title: 'Consultoria Criativa',
      description: 'Orientação estratégica para projetos audiovisuais, desde o conceito inicial até a execução final.',
      features: ['Desenvolvimento de Conceito', 'Análise de Viabilidade', 'Otimização de Processo', 'Feedback Especializado']
    },
    {
      icon: Zap,
      title: 'Projetos Urgentes',
      description: 'Atendimento express para demandas com prazos apertados, mantendo a qualidade e profissionalismo.',
      features: ['Entrega em 24-48h', 'Atendimento Prioritário', 'Processo Otimizado', 'Comunicação Direta']
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {getText('services', 'title', 'Meus')} <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Serviços</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {getText('services', 'description', 'Soluções completas em produção audiovisual para empresas, criadores de conteúdo e profissionais que buscam resultados excepcionais')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-gray-950 p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:translateY-[-4px]"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-purple-400 font-medium hover:text-purple-300 transition-colors">
                    Saiba mais →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para dar vida ao seu projeto?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Entre em contato para discutirmos como posso ajudar a transformar 
              sua visão em realidade audiovisual
            </p>
            <a 
              href="https://wa.me/557187301823?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-block"
            >
              Solicitar Orçamento Gratuito
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
