import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  UploadCloud,
  Save,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StepProgress } from './StepProgress';
import { createClient } from '@/utils/supabase/client';

interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar_url: string | null;
  cover_image_url: string | null;
  genre: string[] | null;
  social_links: Record<string, string> | null;
  monthly_listeners: string | null;
  followers: string | null;
  total_streams: string | null;
  top_chart: string | null;
  verified: boolean | null;
  is_active: boolean | null;
  country: string | null;
  city: string | null;
  label: string | null;
  created_at: string;
  updated_at: string | null;
}

interface TheLoai {
  id: number;
  ten_the_loai: string;
  mo_ta: string | null;
  trang_thai: string;
  ngay_tao: string;
}

interface ReleaseFormData {
  ten_album: string;
  artist_id: string;
  loai_phat_hanh: 'album' | 'single' | 'ep';
  ngay_phat_hanh: string;
  nha_phan_phoi: string;
  the_loai_ids: number[];
  upc: string;
  iswc: string;
  mo_ta: string;
  mo_ta_ngan: string;
  ngon_ngu: 'vi' | 'en';
  trang_chu: boolean;
}

export const ReleaseInfoView: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [formData, setFormData] = useState<ReleaseFormData>({
    ten_album: '',
    artist_id: '',
    loai_phat_hanh: 'album',
    ngay_phat_hanh: '',
    nha_phan_phoi: '',
    the_loai_ids: [],
    upc: '',
    iswc: '',
    mo_ta: '',
    mo_ta_ngan: '',
    ngon_ngu: 'vi',
    trang_chu: false
  });
  
  const [artists, setArtists] = useState<Artist[]>([]);
  const [theLoais, setTheLoais] = useState<TheLoai[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Fetch artists from public schema
        const { data: artistsData, error: artistsError } = await supabase
          .from('artists')
          .select('id, name, slug, avatar_url, is_active')
          .eq('is_active', true)
          .order('name');
          
        if (artistsError) {
          console.error('Artists error:', artistsError);
          setArtists([]);
        } else {
          setArtists((artistsData || []) as Artist[]);
        }
        
        // Fetch genres
        const { data: theLoaiData, error: theLoaiError } = await supabase
          .from('the_loai')
          .select('*')
          .eq('trang_thai', 'hoat_dong')
          .order('ten_the_loai');
          
        if (theLoaiError) throw theLoaiError;
        setTheLoais((theLoaiData || []) as TheLoai[]);
        
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      }
    };
    
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const supabase = createClient();
      
      // Generate unique album code
      const maAlbum = `ALB-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      
      const { error } = await supabase
        .from('album')
        .insert({
          ...formData,
          ma_album: maAlbum,
          ngay_phat_hanh: formData.ngay_phat_hanh || null,
          the_loai_ids: formData.the_loai_ids
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Navigate to next step with album data
      onNext();
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
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
          <div className="text-right">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Tiến trình</p>
            <p className="text-2xl font-bold">Bước 1 / 5</p>
          </div>
        </div>
        <StepProgress currentStep={1} />
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
              <select 
                aria-label="Chọn nghệ sĩ" 
                value={formData.artist_id}
                onChange={(e) => setFormData(prev => ({ ...prev, artist_id: e.target.value }))}
                className="w-full bg-surface-container-low border border-outline-variant/30 py-4 px-4 text-sm font-medium appearance-none outline-none focus:ring-1 focus:ring-primary transition-all"
              >
                <option value="">Chọn nghệ sĩ</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" size={16} />
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
                <Image src="https://picsum.photos/seed/cover-art/800/800" alt="Artwork Placeholder" width={800} height={800} className="w-full h-full object-cover" unoptimized />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Metadata Form */}
        <div className="xl:col-span-8">
          <form onSubmit={handleSubmit} className="bg-surface-container-low p-8 md:p-12 border border-outline-variant/10 rounded-2xl">
            {error && (
              <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg">
                <p className="text-error text-sm">{error}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold tracking-tight">Thông tin siêu dữ liệu bản nhạc</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs text-on-surface-variant font-medium">Prefill thông tin</span>
                <button title="Prefill thông tin" className="w-10 h-5 bg-surface-container-highest rounded-full relative p-1 transition-colors" type="button">
                  <div className="w-3 h-3 bg-outline-variant rounded-full"></div>
                </button>
              </div>
            </div>

            <div className="space-y-10">
              {/* Basic Identity Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Tiêu đề bản phát hành *</label>
                  <input 
                    value={formData.ten_album}
                    onChange={(e) => setFormData(prev => ({ ...prev, ten_album: e.target.value }))}
                    className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                    placeholder="Ví dụ: Tên Album hoặc Tên Single" 
                    type="text" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Ngôn ngữ siêu dữ liệu *</label>
                  <div className="relative">
                    <select 
                      value={formData.ngon_ngu}
                      onChange={(e) => setFormData(prev => ({ ...prev, ngon_ngu: e.target.value as 'vi' | 'en' }))}
                      className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium appearance-none rounded-lg focus:ring-1 focus:ring-primary outline-none"
                      aria-label="Chọn ngôn ngữ"
                    >
                      <option value="vi">Vietnamese</option>
                      <option value="en">English</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" size={18} />
                  </div>
                </div>
              </div>

              {/* Release Type */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Loại phát hành *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['album', 'single', 'ep'].map((type) => (
                    <label key={type} className="flex items-center gap-3 bg-surface-container-highest/50 p-4 border border-outline-variant/10 cursor-pointer rounded-lg hover:bg-surface-container-highest transition-colors">
                      <input 
                        type="radio" 
                        name="loai_phat_hanh"
                        value={type}
                        checked={formData.loai_phat_hanh === type}
                        onChange={(e) => setFormData(prev => ({ ...prev, loai_phat_hanh: e.target.value as 'album' | 'single' | 'ep' }))}
                        className="text-primary focus:ring-primary bg-transparent border-outline-variant" 
                      />
                      <span className="text-sm font-medium capitalize">{type === 'album' ? 'Album' : type === 'single' ? 'Single' : 'EP'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Release Date */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Ngày phát hành *</label>
                <input 
                  value={formData.ngay_phat_hanh}
                  onChange={(e) => setFormData(prev => ({ ...prev, ngay_phat_hanh: e.target.value }))}
                  className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                  type="date" 
                  aria-label="Chọn ngày phát hành"
                />
              </div>

              {/* Genre Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Thể loại</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {theLoais.map((theLoai) => (
                    <label key={theLoai.id} className="flex items-center gap-2 bg-surface-container-highest/50 p-3 border border-outline-variant/10 cursor-pointer rounded-lg hover:bg-surface-container-highest transition-colors">
                      <input 
                        type="checkbox"
                        checked={formData.the_loai_ids.includes(theLoai.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({ ...prev, the_loai_ids: [...prev.the_loai_ids, theLoai.id] }));
                          } else {
                            setFormData(prev => ({ ...prev, the_loai_ids: prev.the_loai_ids.filter(id => id !== theLoai.id) }));
                          }
                        }}
                        className="text-primary focus:ring-primary bg-transparent border-outline-variant" 
                      />
                      <span className="text-sm font-medium">{theLoai.ten_the_loai}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">Mô tả bản phát hành</label>
                <textarea 
                  value={formData.mo_ta}
                  onChange={(e) => setFormData(prev => ({ ...prev, mo_ta: e.target.value }))}
                  className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium resize-none rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                  placeholder="Cung cấp một bản tóm tắt ngắn gọn về bản phát hành của bạn..." 
                  rows={3}
                />
                <p className="text-[8px] text-on-surface-variant italic">Thông tin này sẽ được gửi đến các nền tảng hỗ trợ mô tả.</p>
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">UPC / EAN</label>
                  <input 
                    value={formData.upc}
                    onChange={(e) => setFormData(prev => ({ ...prev, upc: e.target.value }))}
                    className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                    placeholder="Để trống để tự động tạo" 
                    type="text" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block">ISWC</label>
                  <input 
                    value={formData.iswc}
                    onChange={(e) => setFormData(prev => ({ ...prev, iswc: e.target.value }))}
                    className="w-full bg-surface-container-highest border-none py-4 px-4 text-sm font-medium rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                    placeholder="Để trống để tự động tạo" 
                    type="text" 
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <button type="button" className="text-on-surface-variant hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Save size={16} />
                Lưu bản nháp
              </button>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button type="button" className="flex-1 md:flex-none border border-outline-variant/30 py-4 px-10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-surface-container-high transition-colors rounded-lg">
                  Quay lại
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 md:flex-none bg-primary py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] text-background hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded-lg shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {loading ? 'Đang xử lý...' : 'Tiếp theo: Tài nguyên'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
