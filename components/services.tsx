'use client';

export function Services() {
  const services = [
    {
      number: '01',
      title: 'Phát triển Nghệ sĩ',
      description: 'Hỗ trợ toàn diện cho các nghệ sĩ mới và đã có tên tuổi, từ thu âm đến phân phối.',
      icon: '🎤'
    },
    {
      number: '02',
      title: 'Phân phối & Quyền',
      description: 'Mạng lưới phân phối toàn cầu đảm bảo âm nhạc của bạn đến với khán giả ở mọi nơi.',
      icon: '🌍'
    },
    {
      number: '03',
      title: 'Xuất bản & Đồng bộ',
      description: 'Quản lý chuyên nghiệp quyền xuất bản và các cơ hội đồng bộ hóa.',
      icon: '📝'
    }
  ];

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4 max-w-2xl animate-fade-in-up">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Dịch vụ của chúng tôi</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight rainbow-text leading-tight">
            Dịch vụ chuyên nghiệp
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Chúng tôi cung cấp các dịch vụ toàn diện để hỗ trợ sự nghiệp âm nhạc của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, idx) => (
            <div 
              key={service.number} 
              className={`group space-y-6 animate-fade-in-up animate-delay-${idx + 1}`}
            >
              <div className="relative overflow-hidden">
                <span className="text-6xl sm:text-7xl font-bold bg-linear-to-br from-primary/30 to-primary/10 bg-clip-text text-transparent group-hover:from-primary/50 group-hover:to-primary/30 transition-all duration-300">
                  {service.number}
                </span>
              </div>
              <div className="space-y-3 relative">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
              <div className="pt-4 border-t border-border group-hover:border-primary/50 transition-colors duration-300 group-hover:translate-x-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
