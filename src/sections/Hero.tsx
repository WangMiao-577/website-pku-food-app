import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          titleLine1Ref.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          titleLine2Ref.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.5'
        );

      // Scroll-driven color shift on overlay (day to night effect)
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          background: 'linear-gradient(to bottom, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0.9) 100%)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay - changes with scroll */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, rgba(26,26,26,0.5) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 lg:px-24">
        {/* Subtitle tag */}
        <div
          ref={subtitleRef}
          className="font-mono-code text-white/70 text-sm md:text-base tracking-widest mb-6 opacity-0"
        >
          解决你的 / 选择困难症
        </div>

        {/* Giant title */}
        <div className="font-display text-white font-extralight leading-[0.95] tracking-wide">
          <div
            ref={titleLine1Ref}
            className="opacity-0"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
          >
            今天
          </div>
          <div
            ref={titleLine2Ref}
            className="opacity-0"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
          >
            吃什么
          </div>
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 mt-12 opacity-0">
          <button
            onClick={scrollToFeatures}
            className="flex items-center gap-2 text-white px-8 py-3.5 text-sm font-medium transition-all duration-200 hover:scale-[0.98]"
            style={{ background: '#FF5722' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#E64A19';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#FF5722';
            }}
          >
            探索功能
            <ChevronDown size={16} />
          </button>
          <a
            href="https://github.com/WangMiao-577/pku_food_recommender"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 px-8 py-3.5 text-sm border border-white/20 hover:border-white/40 hover:text-white transition-all duration-200"
          >
            查看源码
          </a>
        </div>
      </div>

      {/* Code hologram effect - bottom right */}
      <div
        className="absolute bottom-8 right-8 md:bottom-16 md:right-16 z-10 hidden lg:block"
        style={{
          width: '35%',
          height: '45%',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          transform: 'perspective(800px) rotateY(-8deg) rotateX(3deg)',
          overflow: 'hidden',
        }}
      >
        <div
          className="font-mono-code text-xs p-6 overflow-hidden"
          style={{
            color: '#3B82F6',
            lineHeight: 1.8,
            opacity: 0.7,
          }}
        >
          <div>{`// ε-greedy recommendation algorithm`}</div>
          <div>{`function recommend(userPrefs, exploreRate = 0.15) {`}</div>
          <div className="pl-4">{`const rand = Math.random();`}</div>
          <div className="pl-4">{`if (rand < exploreRate) {`}</div>
          <div className="pl-8">{`// Explore: random discovery`}</div>
          <div className="pl-8">{`return randomPick(menuDB);`}</div>
          <div className="pl-4">{`} else {`}</div>
          <div className="pl-8">{`// Exploit: best match`}</div>
          <div className="pl-8">{`return qwenAnalyze(userPrefs);`}</div>
          <div className="pl-4">{`}`}</div>
          <div>{`}`}</div>
          <div className="mt-2 text-white/40">{`// Powered by Qwen LLM`}</div>
          <div className="text-white/40">{`// PKU Canteen Database v2.1`}</div>
        </div>
      </div>
    </section>
  );
}
