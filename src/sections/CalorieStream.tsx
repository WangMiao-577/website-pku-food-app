import { useEffect, useRef } from 'react';

interface Stream {
  yBase: number;
  phase: number;
  speed: number;
  colorIndex: number;
  particles: NumberParticle[];
}

class NumberParticle {
  stream: Stream;
  index: number;
  yBase: number;
  phase: number;
  speed: number;
  color: string;
  number: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  active: boolean;
  delay: number;

  constructor(stream: Stream, index: number, colors: string[]) {
    this.stream = stream;
    this.index = index;
    this.yBase = stream.yBase;
    this.phase = stream.phase + this.index * 0.15;
    this.speed = stream.speed * (0.9 + Math.random() * 0.2);
    this.color = colors[stream.colorIndex % colors.length];
    this.number = Math.floor(Math.random() * 10);
    this.x = -50;
    this.y = this.yBase;
    this.opacity = 0;
    this.size = 14 + Math.random() * 6;
    this.active = false;
    this.delay = this.index * 4;
  }

  reset(_canvas: HTMLCanvasElement) {
    this.x = -50;
    this.y = this.yBase;
    this.opacity = 0;
    this.number = Math.floor(Math.random() * 10);
    this.active = false;
  }

  update(
    mousePos: { x: number; y: number },
    mouseActive: boolean,
    time: number,
    canvas: HTMLCanvasElement,
    config: typeof CALORIE_CONFIG
  ) {
    if (!this.active) {
      this.delay--;
      if (this.delay <= 0) {
        this.active = true;
        this.delay = 0;
      }
      return;
    }

    this.x += this.speed;
    this.y = this.yBase + Math.sin(time * config.waveSpeed + this.phase) * config.waveHeight;

    if (this.x < 100) {
      this.opacity = this.x / 100;
    } else if (this.x > canvas.width - 100) {
      this.opacity = (canvas.width - this.x) / 100;
    } else {
      this.opacity = 1;
    }

    if (this.x > canvas.width + 50) {
      this.reset(canvas);
    }

    if (mouseActive) {
      const dx = this.x - mousePos.x;
      const dy = this.y - mousePos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150 && dist > 0) {
        const force = (1 - dist / 150) * 15;
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active || this.opacity <= 0) return;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity * 0.6;
    ctx.font = `${this.size}px "Space Mono", monospace`;
    ctx.fillText(String(this.number), this.x, this.y);
    ctx.globalAlpha = 1;
  }
}

const CALORIE_CONFIG = {
  totalStreams: 15,
  numbersPerStream: 40,
  baseSpeed: 0.8,
  waveSpeed: 0.05,
  waveHeight: 80,
  colors: ['#FF5722', '#4ADE80', '#3B82F6', '#E879F9', '#F472B6', '#FACC15', '#34D399'],
};

export default function CalorieStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseActiveRef = useRef(false);
  const streamsRef = useRef<Stream[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = container.offsetWidth * dpr;
      canvas.height = container.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = container.offsetWidth + 'px';
      canvas.style.height = container.offsetHeight + 'px';
      initStreams(container.offsetWidth, container.offsetHeight);
    };

    const initStreams = (_w: number, h: number) => {
      const streams: Stream[] = [];
      const streamSpacing = h / CALORIE_CONFIG.totalStreams;

      for (let s = 0; s < CALORIE_CONFIG.totalStreams; s++) {
        const stream: Stream = {
          yBase: streamSpacing * s + streamSpacing / 2,
          phase: Math.random() * Math.PI * 2,
          speed: CALORIE_CONFIG.baseSpeed * (0.7 + Math.random() * 0.6),
          colorIndex: s,
          particles: [],
        };

        for (let p = 0; p < CALORIE_CONFIG.numbersPerStream; p++) {
          stream.particles.push(new NumberParticle(stream, p, CALORIE_CONFIG.colors));
        }

        streams.push(stream);
      }

      streamsRef.current = streams;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseActiveRef.current = true;
    };

    const handleMouseLeave = () => {
      mouseActiveRef.current = false;
    };

    resize();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      time++;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const stream of streamsRef.current) {
        for (const particle of stream.particles) {
          particle.update(
            mouseRef.current,
            mouseActiveRef.current,
            time,
            canvas,
            CALORIE_CONFIG
          );
          particle.draw(ctx);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '60vh', background: '#1A1A1A', minHeight: '400px' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Center title */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center">
          <h2
            className="font-display font-light text-white"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              lineHeight: 1.1,
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            }}
          >
            你今天的
            <br />
            卡路里摄入
          </h2>
          <p
            className="font-mono-code mt-6 tracking-widest"
            style={{ color: '#FF5722', fontSize: '0.875rem' }}
          >
            TRACK YOUR CALORIES
          </p>
        </div>
      </div>
    </section>
  );
}
