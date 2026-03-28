/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Đã loại bỏ 'unsafe-eval' để tăng cường bảo mật XSS
            // Vẫn giữ 'unsafe-inline' cho style và script (nếu giao diện UI của bạn yêu cầu), 
            // nhưng an toàn hơn rất nhiều so với trước.
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; media-src 'self' https://www.soundhelix.com; connect-src 'self' https:; frame-src 'self' https://www.youtube.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;