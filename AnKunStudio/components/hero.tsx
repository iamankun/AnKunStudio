'use client';

import { useEffect, useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const elements = container.querySelectorAll('.parallax-element');
      elements.forEach((element: Element, index: number) => {
        const speed = (index + 1) * 2;
        const offsetX = (x - rect.width / 2) / speed;
        const offsetY = (y - rect.height / 2) / speed;
        (element as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/fd5vxULcZYw?autoplay=1&mute=1&loop=1&playlist=fd5vxULcZYw&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          title="Background video"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 sm:py-24">
          {/* Left content */}
          <div className="space-y-8">
            {/* Animated badge */}
            <div className="inline-block animate-fade-in-down">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Chào mừng đến với An Kun Studio</span>
              </div>
            </div>

            {/* Main heading */}
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
                <span className="text-foreground">{"Chúng tôi ở đây để biến"}</span>
                <br />
                <span className="rainbow-text">
                  ước mơ thành sao
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Hơi những người yêu nhạc, hãy biến nó thành những vì sao mang đến giấc mơ của bạn
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up pt-4">
              <button className="group relative px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Cho Nghệ Sĩ
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button className="group px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105">
                Cho Người Sáng Tạo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8 opacity-75 animate-fade-in-up animate-delay-200">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Nghệ Sĩ</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Quốc Gia</div>
              </div>
            </div>
          </div>

          {/* Right visual element - empty on hero, content below */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <svg className="w-6 h-6 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
