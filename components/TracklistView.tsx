import React from 'react';
import { List, Music, GripVertical, Plus, ChevronRight, ChevronLeft, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { StepProgress } from './StepProgress';

export const TracklistView: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const tracks = [
    { id: 1, title: 'Neon Echos', duration: '3:45', isrc: 'VN-A01-24-00123' },
    { id: 2, title: 'Midnight Orbit', duration: '4:12', isrc: 'VN-A01-24-00124' },
    { id: 3, title: 'Atmospheric Pressure', duration: '2:58', isrc: 'VN-A01-24-00125' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tighter mb-2">Danh sách bài hát</h1>
        <p className="text-on-surface-variant font-medium">Sắp xếp thứ tự và chỉnh sửa thông tin chi tiết cho từng bài hát.</p>
        <StepProgress currentStep={3} />
      </header>

      <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
            <List size={20} className="text-primary" />
            Thứ tự bài hát
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest hover:bg-surface-bright text-on-surface text-xs font-bold rounded-md transition-all">
            <Plus size={16} />
            Thêm bài hát mới
          </button>
        </div>

        <div className="space-y-2">
          {tracks.map((track, i) => (
            <div key={track.id} className="flex items-center gap-4 p-4 bg-surface-container-highest/50 rounded-lg hover:bg-surface-container-highest transition-all group">
              <GripVertical className="text-outline-variant cursor-grab active:cursor-grabbing" size={18} />
              <span className="text-xs font-bold text-on-surface-variant w-4">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-bold">{track.title}</p>
                <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">ISRC: {track.isrc}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs font-mono text-on-surface-variant">{track.duration}</span>
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-low/30 p-6 rounded-xl border border-outline-variant/10">
        <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface mb-4">Cấu hình nâng cao</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="text-sm font-bold">Gapless Playback</p>
              <p className="text-[10px] text-on-surface-variant">Phát nhạc không khoảng lặng giữa các bài.</p>
            </div>
            <div className="w-10 h-5 bg-surface-container-highest rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-3 h-3 bg-on-surface-variant rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="text-sm font-bold">Explicit Content</p>
              <p className="text-[10px] text-on-surface-variant">Đánh dấu nội dung nhạy cảm cho toàn bộ album.</p>
            </div>
            <div className="w-10 h-5 bg-primary/20 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full"></div>
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
          Tiếp theo: Phân phối
          <ChevronRight size={18} />
        </button>
      </footer>
    </motion.div>
  );
};
