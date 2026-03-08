export function Careers() {
  return (
    <section id="careers" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
            Tài năng tuyệt vời cần một đội ngũ đam mê
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi cam kết phát triển con người trên toàn cầu. Hãy tham gia cùng chúng tôi và trở thành một phần của đội ngũ đang thay đổi ngành công nghiệp âm nhạc.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
          {[
            { value: '45+', label: 'Quốc gia' },
            { value: '2K+', label: 'Thành viên đội ngũ' },
            { value: '100%', label: 'Đam mê' }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="space-y-2 p-6 bg-card/50 rounded-lg backdrop-blur-sm hover:bg-card/70 transition-all duration-300 animate-fade-in-up hover:scale-105 border border-primary/20 animate-careers-${idx + 1}"
            >
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        <button className="mt-8 px-8 py-4 rounded-lg bg-card text-card-foreground font-medium hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up border border-border">
          Khám phá thêm
        </button>
      </div>
    </section>
  );
}
