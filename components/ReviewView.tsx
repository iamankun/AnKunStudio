import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, ChevronLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReviewView: React.FC<{ onBack: () => void; onSubmit: () => void }> = ({ onBack, onSubmit }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <header className="mb-8 text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tighter mb-2">Kiểm tra cuối cùng</h1>
        <p className="text-on-surface-variant font-medium">Hãy rà soát lại toàn bộ thông tin trước khi gửi bản phát hành đi kiểm duyệt.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Tóm tắt bản phát hành</h3>
          <div className="flex gap-4">
            <img src="https://picsum.photos/seed/cover/200/200" alt="Cover" className="w-24 h-24 rounded-lg object-cover" referrerPolicy="no-referrer" />
            <div>
              <p className="text-lg font-black tracking-tight">Neon Horizon</p>
              <p className="text-sm text-primary font-bold">Alex Rivera</p>
              <p className="text-xs text-on-surface-variant mt-2">Album • 3 Bài hát • Electronic</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Trạng thái kỹ thuật</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Ảnh bìa (1400x1400)</span>
              <CheckCircle2 size={16} className="text-primary" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Âm thanh (WAV 24-bit)</span>
              <CheckCircle2 size={16} className="text-primary" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Metadata bài hát</span>
              <CheckCircle2 size={16} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 space-y-6">
        <h3 className="text-lg font-bold tracking-tight">Điều khoản & Cam kết</h3>
        <div className="space-y-4">
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="mt-1 w-5 h-5 rounded border border-outline-variant/30 bg-surface-container-highest flex items-center justify-center group-hover:border-primary transition-all">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Tôi cam đoan rằng tôi sở hữu toàn bộ bản quyền đối với âm thanh và hình ảnh được cung cấp, hoặc có giấy phép hợp lệ để phân phối nội dung này.
            </p>
          </label>
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="mt-1 w-5 h-5 rounded border border-outline-variant/30 bg-surface-container-highest flex items-center justify-center group-hover:border-primary transition-all">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Tôi hiểu rằng sau khi gửi đi, một số thông tin quan trọng sẽ không thể thay đổi cho đến khi quá trình kiểm duyệt hoàn tất.
            </p>
          </label>
        </div>
      </div>

      <div className="p-4 bg-tertiary/5 rounded-lg border border-tertiary/10 flex items-start gap-3">
        <AlertCircle className="text-tertiary shrink-0" size={18} />
        <p className="text-[11px] text-tertiary leading-relaxed">
          Quá trình kiểm duyệt thường mất từ 2-5 ngày làm việc. Bạn sẽ nhận được thông báo qua email ngay khi có kết quả.
        </p>
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
          onClick={onSubmit}
          className="px-12 py-4 bg-linear-to-r from-primary to-primary-dim text-background font-bold rounded-xl transition-all active:scale-95 shadow-xl shadow-primary/20 flex items-center gap-3 text-lg"
        >
          Gửi bản phát hành
          <Send size={20} />
        </button>
      </footer>
    </motion.div>
  );
};
