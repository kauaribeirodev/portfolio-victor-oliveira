import { useState, useEffect } from 'react';
import { SiteTextType } from '@/shared/types';

export function useSiteTexts() {
  const [texts, setTexts] = useState<SiteTextType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await fetch('/api/site-texts');
      if (response.ok) {
        const data = await response.json();
        setTexts(data);
      }
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getText = (section: string, key: string, fallback: string = '') => {
    const text = texts.find(t => t.section === section && t.key === key);
    return text?.content || fallback;
  };

  return { texts, loading, getText, refetch: fetchTexts };
}
