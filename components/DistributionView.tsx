import React from 'react';
import Image from 'next/image';
import { Globe, Calendar, ShoppingBag, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { StepProgress } from './StepProgress';

export const DistributionView: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const stores = [
    { name: 'Spotify', icon: 'https://cdn-icons-png.flaticon.com/512/174/174872.png', status: 'active' },
    { name: 'Apple Music', icon: 'https://cdn-icons-png.flaticon.com/512/831/831276.png', status: 'active' },
    { name: 'YouTube Music', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', status: 'active' },
    { name: 'TikTok', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', status: 'active' },
    { name: 'Amazon Music', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968204.png', status: 'active' },
    { name: 'Deezer', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968799.png', status: 'active' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tighter mb-2">Cấu hình phân phối</h1>
        <p className="text-on-surface-variant font-medium">Chọn nơi và thời điểm âm nhạc của bạn sẽ được ra mắt thế giới.</p>
        <StepProgress currentStep={4} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface-container-low p-6 rounded-xl">
            <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2">
              <ShoppingBag size={20} className="text-primary" />
              Cửa hàng & Nền tảng
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stores.map((store, i) => (
                <div key={i} className="p-4 bg-surface-container-highest/50 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <Image src={store.icon} alt={store.name} width={32} height={32} className="w-8 h-8 grayscale group-hover:grayscale-0 transition-all" unoptimized />
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-background" />
                    </div>
                  </div>
                  <p className="text-xs font-bold">{store.name}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-dashed border-outline-variant/30 rounded-lg text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all">
              + Xem thêm 150+ cửa hàng khác
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-6 rounded-xl">
            <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Ngày phát hành
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ngày ra mắt dự kiến</label>
                <input 
                  type="date" 
                  aria-label="Ngày ra mắt dự kiến"
                  className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-[11px] text-primary leading-relaxed">
                  <strong>Khuyến nghị:</strong> Hãy chọn ngày cách ít nhất 14 ngày so với hôm nay để đảm bảo các nền tảng có đủ thời gian kiểm duyệt và tối ưu hóa cho playlist.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl">
            <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2">
              <Globe size={20} className="text-primary" />
              Vùng lãnh thổ
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-surface-container-highest rounded-lg">
                <span className="text-sm font-medium">Toàn thế giới</span>
                <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-background rounded-full"></div>
                </div>
              </div>
              <p className="text-[10px] text-on-surface-variant italic text-center">
                Âm nhạc của bạn sẽ có mặt tại hơn 240 quốc gia và vùng lãnh thổ.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between pt-8 border-t border-outline-variant/10">
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-surface-container-highest hover:bg-surface-bright text-on-surface font-bold rounded-md transition-all active:scale-95 flex items-center gap-2"
        >
          <ChevronLeft size={18} />
          Quay lại
        </button>
        <button 
          onClick={onNext}
          className="px-12 py-3 bg-linear-to-r from-primary to-primary-dim text-background font-bold rounded-md transition-all active:scale-95 shadow-lg shadow-primary/10 flex items-center gap-2"
        >
          Tiếp theo: Kiểm duyệt
          <ChevronRight size={18} />
        </button>
      </footer>
    </motion.div>
  );
};
