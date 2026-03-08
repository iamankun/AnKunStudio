'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {theme === 'dark' ? (
                <Image 
                  src="/logo-white.png" 
                  alt="An Kun Studio" 
                  width={48} 
                  height={48} 
                  priority
                  className="object-contain"
                />
              ) : (
                <Image 
                  src="/logo-black.png" 
                  alt="An Kun Studio" 
                  width={48} 
                  height={48} 
                  priority
                  className="object-contain"
                />
              )}
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/artists" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300">
              Nghệ sĩ
            </Link>
            <Link href="/release" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300">
              Phát hành
            </Link>
            <Link href="/blog" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300">
              Bài viết
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-300"
              aria-label="Chuyển đổi chủ đề"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <button className="hidden sm:block px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 hover:scale-105">
              Tham gia
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-300"
              aria-label="Chuyển đổi menu di động"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 pb-4 pt-2 space-y-2 bg-background border-t border-border">
          <Link
            href="/artists"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-all duration-200"
          >
            Nghệ sĩ
          </Link>
          <Link
            href="/release"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-all duration-200"
          >
            Phát hành
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-all duration-200"
          >
            Bài viết
          </Link>
          <div className="pt-2">
            <button className="w-full px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300">
              Tham gia
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
