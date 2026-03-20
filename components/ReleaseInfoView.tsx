import React from 'react';
import { 
  Info, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Trash2, 
  UploadCloud,
  User,
  Save,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ReleaseInfoView: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      {/* Editorial Header Section */}
      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Gửi bản nhạc mới</span>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none">Tạo một bản phát hành mới</h2>
            <p className="mt-4 text-on-surface-variant max-w-2xl text-lg">Chúng tôi sẽ hướng dẫn bạn qua mọi công đoạn — từ chọn bản nhạc đến hoàn thiện siêu dữ liệu.</p>
          </div>
          <div className="flex items-center gap-8 mb-2">
            <div className="text-right">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Tiến trình</p>
              <p className="text-2xl font-bold">Bước 1 / 5</p>
            </div>
            <div className="h-16 w-[1px] bg-outline-variant/30"></div>
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-primary"></div>
              <div className="w-12 h-1 bg-surface-container-highest"></div>
              <div className="w-12 h-1 bg-surface-container-highest"></div>
              <div className="w-12 h-1 bg-surface-container-highest"></div>
              <div className="w-12 h-1 bg-surface-container-highest"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left Column: Artwork & Tracks */}
        <div className="xl:col-span-4 space-y-12">
          {/* Track Selection Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Chọn bản nhạc</h3>
              <span className="text-[10px] text-on-surface-variant tracking-widest">Bắt buộc *</span>
            </div>
            <div className="relative">
              <select defaultValue="" className="w-full bg-surface-container-low border border-outline-variant/30 py-4 px-4 text-sm font-medium appearance-none outline-none focus:ring-1 focus:ring-primary transition-all">
                <option disabled value="">Chọn các bản nhạc hiện có hoặc tải lên các bản nhạc mới</option>
                <option>Bản nhạc 01</option>
                <option>Bản nhạc 02</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" size={20} />
            </div>
          </section>

          {/* Artwork Upload Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Ảnh bìa (Cover Artwork)</h3>
              <span className="text-[10px] text-on-surface-variant tracking-widest">3000x3000px · RGB</span>
            </div>
            <div className="aspect-square w-full bg-surface-container-low border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden rounded-xl">
              <div className="z-10 text-center px-8">
                <UploadCloud className="text-primary mb-4 mx-auto" size={40} />
                <p className="text-sm font-medium mb-1">Duyệt hoặc kéo và thả tệp hình ảnh</p>
                <p className="text-xs text-on-surface-variant">Hỗ trợ JPG, JPEG, PNG, JFIF (Tối thiểu 1400px)</p>
              </div>
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://picsum.photos/seed/cover-art/800/800" 
                  alt="Artwork Placeholder"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Metadata Form */}
        <div className="xl:col-span-8">
          <section className="bg-surface-container-low p-8 md:p-12 border border-outline-variant/10 rounded-2xl">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold tracking-tight">Thông tin siêu dữ liệu bản nhạc</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs text-on-surface-variant font-medium">Prefill thông tin</span>
                <button title="Prefill thông tin" className="w-10 h-5 bg-surface-container-highest rounded-full relative p-1 transition-colors" type="button">
                  <div className="w-3 h-3 bg-outline-variant rounded-full"></div>
                </button>
              </div>
            </div>

            <form className="space-y-10">
              {/* Album / Compilation Section */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Album/Compilation *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 bg-surface-container-highest/50 p-4 border border-outline-variant/10 cursor-pointer rounded-lg hover:bg-surface-container-highest transition-colors">
                    <input defaultChecked className="text-primary focus:ring-primary bg-transparent border-outline-variant" name="compilation" type="radio" />
                    <span className="text-sm font-medium">Không</span>
                  </label>
                  <label className="flex items-center gap-3 bg-surface-container-highest/50 p-4 border border-outline-variant/10 cursor-pointer rounded-lg hover:bg-surface-container-highest transition-colors">
                    <input className="text-primary focus:ring-primary bg-transparent border-outline-variant" name="compilation" type="radio" />
                    <span className="text-sm font-medium">Có (Tuyển tập nhiều nghệ sĩ)</span>
                  </label>
                </div>
                <p className="text-[10px] text-on-surface-variant tracking-wide px-1">Bật nếu bản phát hành này có từ 4 nghệ sĩ chính trở lên</p>
              </div>

              {/* Basic Identity Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-outline-variant/10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Tiêu đề bản phát hành *</label>
                  <input className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium rounded-lg focus:ring-1 focus:ring-primary outline-none" placeholder="Ví dụ: Tên Album hoặc Tên Single" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Ngôn ngữ siêu dữ liệu *</label>
                  <div className="relative">
                    <select defaultValue="Vietnamese" className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium appearance-none rounded-lg focus:ring-1 focus:ring-primary outline-none">
                      <option>Vietnamese</option>
                      <option>English</option>
                      <option>Japanese</option>
                      <option>Spanish</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" size={18} />
                  </div>
                </div>
              </div>

              {/* Artists Section */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Nghệ sĩ chính & Người đóng góp</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-surface-container-highest py-3 px-4 rounded-lg">
                    <div className="flex-1 flex items-center gap-3">
                      <User className="text-primary" size={16} />
                      <span className="text-sm font-medium">Nghệ sĩ chính</span>
                    </div>
                    <input className="bg-transparent border-none text-sm w-1/2 text-right focus:ring-0 text-on-surface" placeholder="Tên nghệ sĩ" type="text" />
                    <button title="Xóa nghệ sĩ" className="text-on-surface-variant hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest group" type="button">
                      <span className="w-6 h-6 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors rounded">
                        <Plus size={14} />
                      </span>
                      Thêm nghệ sĩ chính
                    </button>
                    <button className="flex items-center gap-2 text-on-surface-variant text-[10px] font-bold uppercase tracking-widest group" type="button">
                      <span className="w-6 h-6 flex items-center justify-center bg-outline-variant/10 group-hover:bg-outline-variant/20 transition-colors rounded">
                        <Plus size={14} />
                      </span>
                      Thêm người biểu diễn
                    </button>
                  </div>
                </div>
              </div>

              {/* Genre & Label Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-outline-variant/10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Thể loại chính *</label>
                  <div className="relative">
                    <select defaultValue="" className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium appearance-none rounded-lg focus:ring-1 focus:ring-primary outline-none">
                      <option disabled value="">Chọn thể loại</option>
                      <option>Electronic</option>
                      <option>Lo-Fi</option>
                      <option>Classical</option>
                      <option>Jazz</option>
                      <option>V-Pop</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Tên hãng thu âm</label>
                  <input className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium rounded-lg focus:ring-1 focus:ring-primary outline-none" placeholder="Ví dụ: Archive Records" type="text" />
                </div>
              </div>

              {/* Secondary Metadata */}
              <div className="space-y-8 pt-6 border-t border-outline-variant/10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Mô tả bản phát hành</label>
                  <textarea className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium resize-none rounded-lg focus:ring-1 focus:ring-primary outline-none" placeholder="Cung cấp một bản tóm tắt ngắn gọn về bản phát hành của bạn..." rows={3}></textarea>
                  <p className="text-[8px] text-on-surface-variant italic">Thông tin này sẽ được gửi đến các nền tảng hỗ trợ mô tả.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Lịch sử phát hành *</label>
                    <input className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium text-on-surface-variant rounded-lg focus:ring-1 focus:ring-primary outline-none" type="date" />
                    <p className="text-[8px] text-on-surface-variant mt-1">Nó đã được phát hành trước đó chưa?</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">UPC / EAN</label>
                    <input className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium rounded-lg focus:ring-1 focus:ring-primary outline-none" placeholder="Để trống để tự động tạo" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">ID danh mục</label>
                    <input className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium rounded-lg focus:ring-1 focus:ring-primary outline-none" placeholder="Thêm ID tham chiếu nội bộ" type="text" />
                  </div>
                </div>
              </div>

              {/* Copyright Info */}
              <div className="space-y-4 pt-6 border-t border-outline-variant/10">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Bản quyền (C) & (P) *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex bg-surface-container-highest items-center rounded-lg overflow-hidden">
                      <span className="px-4 text-sm text-on-surface-variant font-bold">©</span>
                      <select aria-label="Năm bản quyền" className="bg-transparent border-none text-xs py-4 px-0 w-20 outline-none">
                        <option>2024</option>
                        <option>2023</option>
                      </select>
                      <input className="bg-transparent border-none flex-1 py-4 text-sm outline-none" placeholder="Tên chủ sở hữu bản quyền" type="text" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex bg-surface-container-highest items-center rounded-lg overflow-hidden">
                      <span className="px-4 text-sm text-on-surface-variant font-bold">℗</span>
                      <select aria-label="Năm bản ghi âm" className="bg-transparent border-none text-xs py-4 px-0 w-20 outline-none">
                        <option>2024</option>
                        <option>2023</option>
                      </select>
                      <input className="bg-transparent border-none flex-1 py-4 text-sm outline-none" placeholder="Tên chủ sở hữu bản ghi âm" type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>

          {/* Form Footer Actions */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <button className="text-on-surface-variant hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Save size={16} />
              Lưu bản nháp
            </button>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none border border-outline-variant/30 py-4 px-10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-surface-container-high transition-colors rounded-lg">
                Quay lại
              </button>
              <button 
                onClick={onNext}
                className="flex-1 md:flex-none bg-gradient-to-r from-primary to-primary-dim py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] text-background font-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded-lg shadow-lg shadow-primary/20"
              >
                Tiếp theo: Tài nguyên
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
