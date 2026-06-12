import { useEffect, useRef, useState } from 'react';
import { Github, Download } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(26, 26, 26, 0.95)'
          : 'linear-gradient(to bottom, rgba(26,26,26,0.6) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 h-[60px]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-white font-display text-lg tracking-wide font-light">
            今天吃什么
          </span>
          <span className="text-white/40 text-xs hidden sm:inline">燕园美食助手</span>
        </div>

        {/* Pill button group */}
        <div
          className="flex items-center gap-1 px-1.5 py-1.5"
          style={{
            background: '#2A2A2A',
            borderRadius: '50px',
          }}
        >
          <button
            onClick={() => scrollToSection('features')}
            className="text-white/80 text-sm px-4 py-2 hover:text-white transition-colors duration-200"
            style={{ borderRadius: '50px' }}
          >
            关于项目
          </button>

          <a
            href="https://github.com/WangMiao-577/pku_food_recommender"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 text-sm px-4 py-2 hover:text-white transition-colors duration-200"
            style={{ borderRadius: '50px' }}
          >
            <Github size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <button
            onClick={() => scrollToSection('download')}
            className="flex items-center gap-2 text-white text-sm px-5 py-2 transition-all duration-200 hover:scale-[0.98]"
            style={{
              background: '#FF5722',
              borderRadius: '50px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = '#E64A19';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = '#FF5722';
            }}
          >
            <Download size={14} />
            下载 Installer
          </button>
        </div>
      </div>
    </header>
  );
}
