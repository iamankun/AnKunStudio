import React, { useState } from 'react';
import { 
  CloudUpload, 
  Music, 
  Trash2, 
  Info, 
  CheckCircle2, 
  RefreshCw,
  ChevronRight,
  PlusCircle,
  Album,
  ListMusic,
  Globe,
  Verified
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReleaseInfoView } from './ReleaseInfoView';
import { TracklistView } from './TracklistView';
import { DistributionView } from './DistributionView';
import { ReviewView } from './ReviewView';

export const NewReleaseView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [audioFiles] = useState([
    { name: '01_Neon_Echos.wav', type: 'WAV', size: '48.2 MB', status: 'uploaded' },
    { name: '02_Midnight_Orbit_Final.flac', type: 'FLAC', size: '32.1 MB', status: 'processing' },
    { name: '03_Atmospheric_Pressure.wav', type: 'WAV', size: '55.8 MB', status: 'uploaded' },
  ]);

  const steps = [
    { id: 1, label: 'Thông tin', icon: Album },
    { id: 2, label: 'Tài nguyên', icon: CloudUpload },
    { id: 3, label: 'Bài hát', icon: ListMusic },
    { id: 4, label: 'Phân phối', icon: Globe },
    { id: 5, label: 'Kiểm duyệt', icon: Verified },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ReleaseInfoView onNext={() => setStep(2)} />;
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tighter mb-2">Tài nguyên bản phát hành</h1>
                <p className="text-on-surface-variant font-medium">Quản lý tệp âm thanh và hình ảnh cho dự án của bạn.</p>
              </div>
              
              <div className="bg-surface-container-low p-4 rounded-xl min-w-[240px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Trạng thái hoàn thiện</span>
                  <span className="text-primary font-bold">65%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-primary-dim to-primary w-[65%]"></div>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <section className="lg:col-span-5 space-y-6">
                <div className="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold tracking-tight">Ảnh bìa</h3>
                    <span className="text-[10px] bg-tertiary-container/20 text-tertiary px-2 py-0.5 rounded uppercase font-bold tracking-tighter">Bắt buộc</span>
                  </div>
                  
                  <div className="relative aspect-square w-full bg-surface-container-highest rounded-lg overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-colors cursor-pointer">
                    <img 
                      src="https://picsum.photos/seed/cover/800/800" 
                      alt="Album Art Preview" 
                      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="relative z-10 flex flex-col items-center p-8 text-center bg-background/40 backdrop-blur-md rounded-xl m-8">
                      <CloudUpload className="text-primary mb-4" size={40} />
                      <button className="px-6 py-2 bg-linear-to-r from-primary to-primary-dim text-background font-bold rounded-md mb-3 active:scale-95 transition-all">
                        Tải lên ảnh bìa mới
                      </button>
                      <p className="text-[10px] text-on-surface-variant leading-relaxed uppercase tracking-wider font-bold">
                        JPG, PNG. Tối thiểu 1400x1400px.<br/>Tỷ lệ khung hình 1:1
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start space-x-3 text-on-surface-variant">
                    <Info size={14} className="mt-0.5 shrink-0" />
                    <p className="text-[11px] leading-snug italic">
                      Lưu ý: Không sử dụng văn bản không liên quan, logo thương hiệu hoặc hình ảnh có độ phân giải thấp.
                    </p>
                  </div>
                </div>
              </section>

              <section className="lg:col-span-7 space-y-6">
                <div className="bg-surface-container-low p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">Tệp âm thanh</h3>
                      <p className="text-xs text-on-surface-variant">Hỗ trợ định dạng lossless để đạt chất lượng tốt nhất.</p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-surface-container-highest hover:bg-surface-bright text-on-surface text-xs font-bold rounded-md transition-all active:scale-95">
                      <PlusCircle size={16} />
                      <span>Thêm tệp âm thanh</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {audioFiles.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-surface-container-highest hover:bg-surface-bright transition-colors group">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded">
                            <Music size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold tracking-tight">{file.name}</h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">{file.type}</span>
                              <span className="text-[10px] text-outline-variant font-medium">{file.size}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className={`hidden sm:flex items-center space-x-1.5 ${file.status === 'uploaded' ? 'text-primary' : 'text-tertiary'}`}>
                            {file.status === 'uploaded' ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              <RefreshCw size={16} className="animate-spin" />
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                              {file.status === 'uploaded' ? 'Đã tải lên' : 'Đang xử lý'}
                            </span>
                          </div>
                          <button title="Xóa tệp" className="text-on-surface-variant hover:text-red-400 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-background border border-outline-variant/10 rounded-lg">
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">Yêu cầu kỹ thuật âm thanh</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'ĐỊNH DẠNG', value: 'WAV / FLAC' },
                        { label: 'BIT DEPTH', value: '16-bit / 24-bit' },
                        { label: 'SAMPLE RATE', value: '44.1 kHz +' },
                        { label: 'CHANNELS', value: 'Stereo' },
                      ].map((spec, i) => (
                        <div key={i}>
                          <p className="text-[9px] text-on-surface-variant mb-0.5 font-bold">{spec.label}</p>
                          <p className="text-xs font-medium">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <footer className="flex items-center justify-between pt-8 border-t border-outline-variant/10">
              <button 
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-surface-container-highest hover:bg-surface-bright text-on-surface font-bold rounded-md transition-all active:scale-95"
              >
                Quay lại
              </button>
              <button 
                onClick={() => setStep(3)}
                className="px-12 py-3 bg-linear-to-r from-primary to-primary-dim text-background font-bold rounded-md transition-all active:scale-95 shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
              >
                Tiếp theo: Danh sách bài hát
                <ChevronRight size={18} />
              </button>
            </footer>
          </motion.div>
        );
      case 3:
        return <TracklistView onNext={() => setStep(4)} onBack={() => setStep(2)} />;
      case 4:
        return <DistributionView onNext={() => setStep(5)} onBack={() => setStep(3)} />;
      case 5:
        return <ReviewView onBack={() => setStep(4)} onSubmit={onBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* SideNavBar - Specific to New Release flow */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/20 bg-background hidden lg:flex flex-col py-20 px-4 space-y-2 z-50">
        <div className="mb-8 px-4">
          <p className="text-sm uppercase tracking-widest text-primary font-bold">Bản phát hành mới</p>
          <p className="text-[10px] text-on-surface-variant tracking-widest mt-1 uppercase">ID NHÁP: 88291</p>
        </div>
        <nav className="space-y-1">
          {steps.map((s) => (
            <div 
              key={s.id} 
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-3 py-3 px-4 rounded-md cursor-pointer transition-all ${
                step === s.id 
                  ? 'bg-surface-container-highest text-primary border-r-2 border-primary-dim' 
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <s.icon size={18} />
              <span className="text-[10px] uppercase tracking-widest font-bold">{s.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      <div className="lg:ml-64">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};
