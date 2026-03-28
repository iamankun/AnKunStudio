'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// Bắt và loại bỏ cảnh báo lỗi giả của React 19 đối với thẻ script của next-themes
// Đoạn mã này chỉ chạy trên trình duyệt và trong môi trường phát triển
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const banGhiLoiGoc = console.error;
  console.error = (...thamSo: unknown[]) => {
    // Nếu nội dung lỗi có chứa chuỗi cảnh báo thẻ script, chúng ta sẽ bỏ qua nó
    if (typeof thamSo[0] === 'string' && thamSo[0].includes('Encountered a script tag')) {
      return;
    }
    banGhiLoiGoc.apply(console, thamSo);
  };
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}