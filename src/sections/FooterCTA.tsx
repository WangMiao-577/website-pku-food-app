import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Download, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D parallax zoom on image
      if (imageWrapRef.current && imageRef.current) {
        gsap.set(imageWrapRef.current, { perspective: 2000 });

        gsap.to(imageRef.current, {
          ease: 'none',
          scale: 1.5,
          rotationY: 15,
          rotationX: 5,
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Content fade in
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative w-full"
      style={{ minHeight: '80vh' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/footer-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(26, 26, 26, 0.75)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center h-full px-6 md:px-16 lg:px-24 py-24" style={{ minHeight: '80vh' }}>
        {/* Left text */}
        <div ref={contentRef} className="lg:w-4/12 mb-12 lg:mb-0 opacity-0">
          <div className="font-mono-code text-sm tracking-widest mb-6" style={{ color: '#FF5722' }}>
            DOWNLOAD / 下载
          </div>
          <h2
            className="font-display font-light text-white mb-6"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
            }}
          >
            北京大学
            <br />
            程序设计实践
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
            开源 · 共享 · 赋能燕园生活
            <br />
            由王瑞宸、石禾言、罗湛壹三位同学共同开发完成。
            基于 ε-greedy 算法与 Qwen 大模型，为北大师生提供智能美食推荐服务。
          </p>

          {/* Download buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/WangMiao-577/pku_food_recommender/releases/download/Norm/PKUFoodRecommender_Setup_2.0.0.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white px-8 py-3.5 text-sm font-medium transition-all duration-200 hover:scale-[0.98]"
              style={{ background: '#FF5722' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#E64A19';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#FF5722';
              }}
            >
              <Download size={16} />
              下载 Installer
            </a>
            <a
              href="https://github.com/WangMiao-577/pku_food_recommender"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 px-8 py-3.5 text-sm border border-white/20 hover:border-white/40 hover:text-white transition-all duration-200"
            >
              <Github size={16} />
              GitHub
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Right image with parallax */}
        <div className="lg:w-8/12 lg:pl-12 w-full">
          <div
            ref={imageWrapRef}
            className="overflow-hidden w-full"
            style={{
              height: 'clamp(300px, 40vw, 500px)',
              filter: 'brightness(0.8)',
            }}
          >
            <img
              ref={imageRef}
              src="/images/footer-bg.jpg"
              alt="PKU Campus"
              className="w-full h-full object-cover"
              style={{ transformOrigin: 'center center' }}
            />
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        className="relative z-10 w-full py-6 px-6 md:px-16 lg:px-24 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="text-white/40 text-sm">
          &copy; 2025 今天吃什么 — 燕园美食助手
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/WangMiao-577/pku_food_recommender"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 text-sm hover:text-white/70 transition-colors flex items-center gap-1"
          >
            <Github size={14} />
            开源地址
          </a>
          <span className="text-white/20 text-sm">PKU · CS</span>
        </div>
      </div>
    </section>
  );
}
