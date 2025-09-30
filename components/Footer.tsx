import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Brand & Copyright */}
          <div className="mb-6 lg:mb-0 text-center lg:text-left">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Victor Oliveira
            </div>
            <p className="text-gray-400">
              Videomaker & Mentor Audiovisual
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © 2025 Victor Oliveira. Todos os direitos reservados.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 lg:mb-0">
            <a href="#inicio" className="text-gray-400 hover:text-white transition-colors">
              Início
            </a>
            <a href="#sobre" className="text-gray-400 hover:text-white transition-colors">
              Sobre
            </a>
            <a href="#projetos" className="text-gray-400 hover:text-white transition-colors">
              Projetos
            </a>
            <a href="#servicos" className="text-gray-400 hover:text-white transition-colors">
              Serviços
            </a>
            <a href="#contato" className="text-gray-400 hover:text-white transition-colors">
              Contato
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              Feito por 
              <a 
                href="https://www.instagram.com/pixelarsites" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
              >
                PixelarSites
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}