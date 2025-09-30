import { Play, ArrowDown } from 'lucide-react';
import { useSiteTexts } from '@/hooks/useSiteTexts';

export default function Hero() {
  const { getText } = useSiteTexts();
  
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            {getText('hero', 'title_main', 'Videomaker')}
          </span>
          <span className="block text-gray-300 text-3xl md:text-4xl font-medium mt-4">
            {getText('hero', 'title_subtitle', '& Mentor Audiovisual')}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
          {getText('hero', 'description', 'Transformo ideias em histórias visuais impactantes que conectam, emocionam e geram resultados')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#projetos"
            className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3"
          >
            <Play size={20} className="group-hover:scale-110 transition-transform" />
            Ver Projetos
          </a>
          
          <a 
            href="https://wa.me/557187301823?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento!"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-400 hover:text-white transition-all duration-300 inline-block"
          >
            Solicitar Orçamento
          </a>
        </div>

        <div className="mt-16">
          <ArrowDown size={24} className="mx-auto text-gray-500 animate-bounce" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
    </section>
  );
}
