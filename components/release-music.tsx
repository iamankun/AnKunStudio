'use client';

import { useState } from 'react';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Phân phối Toàn cầu',
    description: 'Đưa âm nhạc của bạn lên 200+ nền tảng streaming trên toàn thế giới bao gồm Spotify, Apple Music, YouTube Music và nhiều hơn nữa.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Bảng điều khiển Phân tích',
    description: 'Theo dõi lượt stream, doanh thu và nhân khẩu học khán giả theo thời gian thực với công cụ phân tích toàn diện của chúng tôi.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Thu nhập Doanh thu',
    description: 'Chúng tôi thu tiền bản quyền từ tất cả các nền tảng và trả trực tiếp cho bạn. Giữ 100% quyền lợi của bạn.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: 'Hỗ trợ Marketing',
    description: 'Tiếp cận việc đề xuất playlist, quảng bá mạng xã hội, và hỗ trợ PR để phát triển khán giả của bạn.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Bảo vệ Quyền',
    description: 'Chúng tôi bảo vệ âm nhạc của bạn khỏi việc sử dụng trái phép với dịch vụ ID nội dung và bảo vệ bản quyền.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Cộng đồng Nghệ sĩ',
    description: 'Tham gia cộng đồng hàng nghìn nghệ sĩ. Hợp tác, học hỏi, và cùng phát triển.',
  },
];

const plans = [
  {
    name: 'Bắt đầu',
    price: 'Miễn phí',
    description: 'Hoàn hảo cho các nghệ sĩ mới bắt đầu',
    features: [
      'Phát hành không giới hạn',
      'Tất cả các nền tảng lớn',
      'Phân tích cơ bản',
      'Hỗ trợ tiêu chuẩn',
      'Chia sẻ doanh thu 85%',
    ],
    cta: 'Bắt đầu miễn phí',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/tháng',
    description: 'Dành cho các nghệ sĩ nghiêm túc sẵn sàng phát triển',
    features: [
      'Tất cả trong Bắt đầu',
      'Phân tích nâng cao',
      'Đề xuất playlist',
      'Hỗ trợ ưu tiên',
      'Chia sẻ doanh thu 100%',
      'Ngày phát hành tùy chỉnh',
      'Chiến dịch trước phát hành',
    ],
    cta: 'Thử dụng Pro miễn phí',
    featured: true,
  },
  {
    name: 'Nhãn hàng',
    price: 'Tùy chỉnh',
    description: 'Dành cho các nhãn và công ty quản lý',
    features: [
      'Tất cả trong Pro',
      'Bảng điều khiển đa nghệ sĩ',
      'Tùy chọn white-label',
      'Quản lý tài khoản chuyên biệt',
      'Truy cập API',
      'Hợp đồng tùy chỉnh',
      'Hỗ trợ cấp phép đồng bộ',
    ],
    cta: 'Liên hệ Bán hàng',
    featured: false,
  },
];

const steps = [
  {
    step: '01',
    title: 'Tạo tài khoản',
    description: 'Đăng ký trong vài phút và hoàn thành hồ sơ nghệ sĩ của bạn với tiểu sử, ảnh, và liên kết mạng xã hội.',
  },
  {
    step: '02',
    title: 'Tải lên Âm nhạc',
    description: 'Tải lên các bài hát của bạn ở định dạng chất lượng cao. Thêm artwork, metadata, và chọn ngày phát hành.',
  },
  {
    step: '03',
    title: 'Rà soát & Gửi',
    description: 'Đội ngũ của chúng tôi xem xét bài gửi của bạn về chất lượng. Chúng tôi sẽ thông báo cho bạn khi được phê duyệt.',
  },
  {
    step: '04',
    title: 'Phát hành',
    description: 'Âm nhạc của bạn được phát trực tiếp trên tất cả các nền tảng. Theo dõi thành công của bạn qua bảng phân tích của chúng tôi.',
  },
];

export function ReleaseMusic() {
  const [formData, setFormData] = useState({
    artistName: '',
    email: '',
    genre: '',
    socialLinks: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Cảm ơn bạn đã gửi! Chúng tôi sẽ xem xét đơn đăng ký của bạn và liên hệ lại sớm.');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-br from-background via-secondary/30 to-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-block animate-fade-in-down">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Dành cho Nghệ sĩ</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in-up text-balance">
              <span className="text-foreground">Phát hành Âm nhạc của bạn</span>
              <br />
              <span className="bg-linear-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent animate-gradient-shift">
                Đến Thế giới
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
              Tham gia hàng nghìn nghệ sĩ phân phối âm nhạc qua An Kun Studio. Có mặt trên mọi nền tảng streaming lớn và tiếp cận hàng triệu người nghe trên toàn thế giới.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-200">
              <a href="#submit" className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105">
                Gửi Âm nhạc của bạn
              </a>
              <a href="#how-it-works" className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                Cách hoạt động
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Tại sao chọn chúng tôi</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Tất cả những gì bạn cần để thành công</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Quy trình</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Cách hoạt động</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-linear-to-r from-primary/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Bảng giá</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Chọn Gói của bạn</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bắt đầu miễn phí và nâng cấp khi bạn phát triển. Không có phí ẩn.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border transition-all duration-300 animate-fade-in-up ${
                  plan.featured
                    ? 'bg-primary text-primary-foreground border-primary scale-105 shadow-xl'
                    : 'bg-card border-border hover:border-primary/30'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {plan.featured && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-sm font-medium mb-4">
                    Phổ biến nhất
                  </span>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`text-4xl font-bold ${plan.featured ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`mb-6 ${plan.featured ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2">
                      <svg className={`w-5 h-5 ${plan.featured ? 'text-primary-foreground' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.featured ? 'text-primary-foreground/90' : 'text-foreground'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.featured
                      ? 'bg-primary-foreground text-primary hover:opacity-90'
                      : 'bg-primary text-primary-foreground hover:opacity-90'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Form */}
      <section id="submit" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Bắt đầu</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Gửi Âm nhạc của bạn</h2>
            <p className="text-lg text-muted-foreground">
              Điền vào mẫu dưới đây và đội ngũ A&R của chúng tôi sẽ xem xét bài gửi của bạn trong vòng 48 giờ.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="artistName" className="block text-sm font-medium text-foreground">
                  Tên Nghệ sĩ/Ban nhạc *
                </label>
                <input
                  type="text"
                  id="artistName"
                  required
                  value={formData.artistName}
                  onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Tên nghệ sĩ của bạn"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Địa chỉ Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="ban@vidu.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="genre" className="block text-sm font-medium text-foreground">
                Thể loại Chính *
              </label>
              <select
                id="genre"
                required
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="">Chọn thể loại</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="hip-hop">Hip-Hop</option>
                <option value="rnb">R&B</option>
                <option value="electronic">Electronic</option>
                <option value="indie">Indie</option>
                <option value="country">Country</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="other">Khác</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="socialLinks" className="block text-sm font-medium text-foreground">
                Liên kết Mạng xã hội / Streaming
              </label>
              <input
                type="text"
                id="socialLinks"
                value={formData.socialLinks}
                onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Instagram, Spotify, SoundCloud, v.v."
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Kể cho chúng tôi về Âm nhạc của bạn *
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                placeholder="Mô tả phong cách âm nhạc, ảnh hưởng và điều làm bạn độc đáo..."
              />
            </div>
            
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                Tôi đồng ý với <a href="#" className="text-primary hover:underline">Điều khoản Dịch vụ</a> và <a href="#" className="text-primary hover:underline">Chính sách Bảo mật</a>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-[1.02]"
            >
              Gửi Đơn đăng ký
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Sẵn sàng Chia sẻ Âm nhạc của bạn với Thế giới?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Tham gia cộng đồng 10,000+ nghệ sĩ của chúng tôi và bắt đầu hành trình của bạn ngay hôm nay.
          </p>
          <a
            href="#submit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105"
          >
            Bắt đầu Ngay
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
