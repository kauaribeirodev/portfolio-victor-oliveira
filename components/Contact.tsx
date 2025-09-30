import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { useSiteTexts } from '@/hooks/useSiteTexts';

export default function Contact() {
  const { getText } = useSiteTexts();
  
  const contactInfo = [
    { icon: Mail, title: 'Email', value: getText('contact', 'email', 'contato@victoroliveira.com'), href: `mailto:${getText('contact', 'email', 'contato@victoroliveira.com')}` },
    { icon: Phone, title: 'WhatsApp', value: getText('contact', 'phone', '+55 (71) 8730-1823'), href: `https://wa.me/${getText('contact', 'phone', '+55 (71) 8730-1823').replace(/\D/g, '')}` },
    { icon: MapPin, title: 'Localização', value: getText('contact', 'location', 'Salvador - Bahia'), href: '#' }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/victor-oliveira-aba528268/', label: 'LinkedIn' }
  ];

  return (
    <section id="contato" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {getText('contact', 'title', 'Vamos')} <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Conversar</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {getText('contact', 'description', 'Tem um projeto em mente? Quer saber mais sobre meus serviços? Entre em contato e vamos criar algo incrível juntos!')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info & Photo */}
          <div>
            {/* Professional Photo */}
            <div className="mb-8">
              <img
                src="https://mocha-cdn.com/019983ff-2d52-7352-99c0-581da8dd0d92/foto-2.jpg"
                alt="Videomaker profissional"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{info.title}</div>
                      <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Me siga nas redes sociais</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}