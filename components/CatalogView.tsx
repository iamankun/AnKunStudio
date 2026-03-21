'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, MoreVertical, BarChart2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';

interface AlbumWithRelations {
  id: number;
  ten_album: string;
  loai_phat_hanh: string;
  ngay_phat_hanh: string | null;
  trang_thai: string;
  anh_bia: string | null;
  artists?: { name: string };
  phat_hanh?: { trang_thai: string }[];
}

interface StatsData {
  trang_thai: string;
}

interface Release {
  id: number;
  ten_album: string;
  name: string;
  loai_phat_hanh: string;
  ngay_phat_hanh: string | null;
  trang_thai: string;
  anh_bia: string | null;
  phat_hanh_trang_thai: string | null;
}

interface Stats {
  tong_so: number;
  da_phat_hanh: number;
  dang_kiem_duyet: number;
  ban_nhap: number;
}

export const CatalogView: React.FC<{ onCreateNew: () => void }> = ({ onCreateNew }) => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [stats, setStats] = useState<Stats>({ tong_so: 0, da_phat_hanh: 0, dang_kiem_duyet: 0, ban_nhap: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Fetch albums with artist name and release status
        const { data: albums, error: albumsError } = await supabase
          .from('album')
          .select(`
            id,
            ten_album,
            loai_phat_hanh,
            ngay_phat_hanh,
            trang_thai,
            anh_bia,
            artists!inner(name),
            phat_hanh(trang_thai)
          `)
          .neq('trang_thai', 'da_xoa')
          .order('ngay_tao', { ascending: false });

        if (albumsError) throw albumsError;

        // Fetch statistics
        const { data: statsData, error: statsError } = await supabase
          .from('album')
          .select('trang_thai', { count: 'exact', head: false })
          .neq('trang_thai', 'da_xoa');

        if (statsError) throw statsError;

        // Calculate statistics
        const calculatedStats = {
          tong_so: statsData?.length || 0,
          da_phat_hanh: statsData?.filter(a => a.trang_thai === 'da_phat_hanh').length || 0,
          dang_kiem_duyet: statsData?.filter(a => a.trang_thai === 'dang_kiem_duyet').length || 0,
          ban_nhap: statsData?.filter(a => a.trang_thai === 'ban_nhap').length || 0,
        };
        setStats(calculatedStats);

        // Transform data for display
        const transformedReleases: Release[] = (albums as unknown as AlbumWithRelations[])?.map((album) => ({
          id: album.id,
          ten_album: album.ten_album,
          name: album.artists?.name || 'Unknown Artist',
          loai_phat_hanh: album.loai_phat_hanh === 'album' ? 'Album' : 
                          album.loai_phat_hanh === 'single' ? 'Single' : 'EP',
          ngay_phat_hanh: album.ngay_phat_hanh ? new Date(album.ngay_phat_hanh).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }) : 'Chưa xác định',
          trang_thai: album.trang_thai === 'da_phat_hanh' ? 'Đã phát hành' :
                      album.trang_thai === 'dang_kiem_duyet' ? 'Đang kiểm duyệt' :
                      album.trang_thai === 'ban_nhap' ? 'Bản nháp' : 'Từ chối',
          anh_bia: album.anh_bia,
          phat_hanh_trang_thai: album.phat_hanh?.[0]?.trang_thai || null
        })) || [];

        setReleases(transformedReleases);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã phát hành': return 'bg-primary';
      case 'Đang kiểm duyệt': return 'bg-tertiary';
      case 'Bản nháp': return 'bg-on-surface-variant';
      default: return 'bg-error';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-on-surface mb-2">Kho nhạc</h2>
          <p className="text-on-surface-variant font-medium">Quản lý và theo dõi các bản phát hành âm nhạc của bạn.</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-lg font-bold text-sm tracking-tight transition-all hover:shadow-[0_0_20px_rgba(176,162,255,0.3)] active:scale-95"
        >
          <PlusCircle size={18} />
          Tạo bản phát hành
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Tổng số bản nhạc', value: stats.tong_so.toString(), color: 'text-on-surface' },
          { label: 'Đã phát hành', value: stats.da_phat_hanh.toString(), color: 'text-on-surface', trend: stats.da_phat_hanh > 0 ? `+${stats.da_phat_hanh}` : undefined },
          { label: 'Đang kiểm duyệt', value: stats.dang_kiem_duyet.toString(), color: 'text-tertiary' },
          { label: 'Bản nháp', value: stats.ban_nhap.toString(), color: 'text-on-surface-variant' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/5">
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-4">{stat.label}</p>
            <div className="flex items-center gap-3">
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              {stat.trend && (
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">{stat.trend}</span>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-surface-container-low/30 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2 p-1 bg-surface-container-highest rounded-full">
            {['Tất cả', 'Đã duyệt', 'Đang chờ', 'Từ chối'].map((tab, i) => (
              <button 
                key={i}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                  i === 0 ? 'bg-primary text-background' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-error">
              <p>Lỗi khi tải dữ liệu: {error}</p>
            </div>
          ) : releases.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant">
              <p>Chưa có bản phát hành nào</p>
              <button 
                onClick={onCreateNew}
                className="mt-4 text-primary hover:underline"
              >
                Tạo bản phát hành đầu tiên
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-bold">
                  <th className="px-6 pb-2">Tiêu đề / Nghệ sĩ</th>
                  <th className="px-6 pb-2">Loại</th>
                  <th className="px-6 pb-2 text-center">Ngày phát hành</th>
                  <th className="px-6 pb-2">Trạng thái</th>
                  <th className="px-6 pb-2 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {releases.map((release) => (
                  <tr key={release.id} className="bg-surface-container-low hover:bg-surface-bright transition-colors group">
                    <td className="px-6 py-4 rounded-l-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 bg-surface-container-highest flex items-center justify-center">
                          {release.anh_bia ? (
                            <img 
                              src={release.anh_bia} 
                              alt={release.ten_album} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <ImageIcon className="text-on-surface-variant" size={20} />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">{release.ten_album}</p>
                          <p className="text-on-surface-variant text-xs mt-0.5">{release.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-surface-container-highest px-3 py-1 rounded-full text-on-surface-variant">
                        {release.loai_phat_hanh}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className={`text-xs font-medium ${release.ngay_phat_hanh === 'Chưa xác định' ? 'text-on-surface-variant italic' : 'text-on-surface'}`}>
                        {release.ngay_phat_hanh}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(release.trang_thai)} shadow-[0_0_8px_rgba(176,162,255,0.4)]`}></div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${getStatusColor(release.trang_thai).replace('bg-', 'text-')}`}>
                          {release.trang_thai}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 rounded-r-xl text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button title="Xem thống kê" className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-all">
                          <BarChart2 size={18} />
                        </button>
                        <button title="Thêm tùy chọn" className="p-2 text-on-surface-variant hover:text-on-surface rounded-full transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </motion.div>
  );
};
