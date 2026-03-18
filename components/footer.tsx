'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;
  return (
    <footer className="w-full border-t border-border bg-linear-to-b from-secondary/30 to-background py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-20 h-20 flex items-center justify-center">
                {theme === 'dark' ? (
                  <Image 
                    src="/logo-white.png" 
                    alt="An Kun Studio" 
                    width={80} 
                    height={80} 
                    priority
                    className="object-contain"
                  />
                ) : (
                  <Image 
                    src="/logo-black.png" 
                    alt="An Kun Studio" 
                    width={80} 
                    height={80} 
                    priority
                    className="object-contain"
                  />
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Send Gift Your Song To The World
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Công ty</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Về chúng tôi</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Báo chí</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Dịch vụ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/artists" className="hover:text-primary transition-colors">Nghệ sĩ</Link></li>
              <li><Link href="/release" className="hover:text-primary transition-colors">Phát hành Âm nhạc</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Bài viết</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Kết nối</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 An Kun Studio. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
