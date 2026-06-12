import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    image: '/images/card-canteen.jpg',
    title: '农园 · 学一 · 燕南',
    desc: '完整覆盖燕园各大食堂数据，手动采集真实菜品与价格。',
  },
  {
    image: '/images/card-food.jpg',
    title: 'ε-greedy 推荐算法',
    desc: '在探索新口味与选择已知 favorites 之间取得完美平衡。',
  },
  {
    image: '/images/card-lake.jpg',
    title: 'Qwen 大模型交互',
    desc: '像朋友一样聊天，AI 自动感知你的情绪与天气，推荐暖心菜品。',
  },
  {
    image: '/images/card-ginkgo.jpg',
    title: '季节背景自动切换',
    desc: '春樱、夏绿、秋黄、冬雪，燕园四季流转，界面随之呼吸。',
  },
  {
    image: '/images/card-students.jpg',
    title: '美食故事系统',
    desc: '分享你与食堂的独家记忆，感受北大餐饮中心的人文温度。',
  },
  {
    image: '/images/card-phone.jpg',
    title: '个人足迹记录',
    desc: '记录用餐历史、心情与卡路里，珍藏你的燕园味道。',
  },
];

export default function FeatureGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title reveal
      gsap.fromTo(
        '.feature-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Stagger cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: '#F2F2F2', padding: '120px 0' }}
    >
      <div className="px-6 md:px-16 lg:px-24">
        {/* Section title */}
        <div className="feature-title mb-20 opacity-0">
          <div className="font-mono-code text-sm tracking-widest mb-4" style={{ color: '#FF5722' }}>
            FEATURES / 功能矩阵
          </div>
          <h2
            className="font-display font-light"
            style={{
              color: '#1A1A1A',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.1,
            }}
          >
            六大核心功能
            <br />
            赋能燕园每一餐
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1.5rem' }}>
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer opacity-0"
              style={{ background: '#FFFFFF' }}
            >
              {/* Image */}
              <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className="p-6">
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: '#1A1A1A' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#666666' }}
                >
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
