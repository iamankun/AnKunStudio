'use client';

export function Team() {
  const team = [
    {
      role: 'Nghệ sĩ Thu âm',
      description: 'Khám phá danh sách các nghệ sĩ đẳng cấp thế giới và những bài hát tuyệt vời của họ',
    },
    {
      role: 'Nhạc sĩ & Nhà sản xuất',
      description: 'Kết nối với những tài năng sáng tạo đằng sau những bản hit lớn nhất thế giới',
    },
    {
      role: 'Người đổi mới Âm nhạc',
      description: 'Gặp gỡ những nhà công nghệ đang định hình tương lai của ngành công nghiệp âm nhạc',
    },
  ];

  return (
    <section id="about" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4 max-w-2xl">
          <p className="text-sm font-semibold text-primary">Đội ngũ của chúng tôi</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Một tập thể toàn cầu của những người yêu nhạc và người làm nhạc
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className={`group relative overflow-hidden rounded-xl bg-linear-to-br from-primary/15 to-primary/5 p-8 hover:from-primary/25 hover:to-primary/15 transition-all duration-300 animate-fade-in-up hover:scale-105 border border-primary/10 hover:border-primary/30 animate-delay-${idx + 1}`}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full group-hover:bg-primary/20 group-hover:scale-125 transition-all duration-300" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary/40 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {member.role}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {member.description}
                </p>
                <div className="pt-4 text-primary font-medium text-sm group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
