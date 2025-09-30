import { Award, Users, Clock, Star } from 'lucide-react';
import { useSiteTexts } from '@/hooks/useSiteTexts';

export default function About() {
  const { getText } = useSiteTexts();
  const stats = [
    { icon: Award, number: '50+', label: 'Projetos Concluídos' },
    { icon: Users, number: '30+', label: 'Clientes Satisfeitos' },
    { icon: Clock, number: '5+', label: 'Anos de Experiência' },
    { icon: Star, number: '4.9', label: 'Avaliação Média' }
  ];

  return (
    <section id="sobre" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo and Visual Element */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://mocha-cdn.com/019983ff-2d52-7352-99c0-581da8dd0d92/foto-1-Copia.jpg"
                alt="Videomaker em ação"
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl shadow-2xl z-20">
              <div className="text-white text-center">
                <div className="text-2xl font-bold">Criatividade</div>
                <div className="text-sm opacity-90">& Inovação</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              {getText('about', 'title', 'Sobre')} <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Mim</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              {getText('about', 'description_1', 'Sou um profissional apaixonado pela arte de contar histórias através do audiovisual. Como editor de vídeo, videomaker e mentor, dedico-me a criar conteúdo que não apenas informa, mas emociona e inspira ação.')}
            </p>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {getText('about', 'description_2', 'Minha experiência abrange desde projetos corporativos até conteúdos criativos para redes sociais, sempre com foco na qualidade técnica e na narrativa envolvente. Também mentoreio novos talentos na área audiovisual, compartilhando conhecimento e técnicas avançadas.')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
