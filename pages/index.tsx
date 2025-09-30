import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { initializeDatabase } from '@/lib/db';

export default function Home() {
  useEffect(() => {
    // Initialize database on first load
    const initDB = async () => {
      try {
        await fetch('/api/init-db', { method: 'POST' });
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    
    initDB();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
