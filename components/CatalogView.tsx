import React from 'react';
import { PlusCircle, MoreVertical, BarChart2, Edit3, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export const CatalogView: React.FC<{ onCreateNew: () => void }> = ({ onCreateNew }) => {
  const stats = [
    { label: 'Tổng số bản nhạc', value: '128', color: 'text-on-surface' },
    { label: 'Đã phát hành', value: '84', color: 'text-on-surface', trend: '+12%' },
    { label: 'Đang kiểm duyệt', value: '14', color: 'text-tertiary' },
    { label: 'Bản nháp', value: '30', color: 'text-on-surface-variant' },
  ];

  const releases = [
    {
      id: 1,
      title: 'Electric Dreams',
      artist: 'Alex Rivera',
      type: 'Album',
      date: '12 Th04, 2024',
      status: 'Đã phát hành',
      statusColor: 'bg-primary',
      image: 'https://picsum.photos/seed/album1/200/200'
    },
    {
      id: 2,
      title: 'Neon Horizon',
      artist: 'Alex Rivera ft. Luna',
      type: 'Single',
      date: '28 Th05, 2024',
      status: 'Đang kiểm duyệt',
      statusColor: 'bg-tertiary',
      image: 'https://picsum.photos/seed/album2/200/200'
    },
    {
      id: 3,
      title: 'Midnight Sessions Vol. 2',
      artist: 'Alex Rivera',
      type: 'EP',
      date: 'Chưa xác định',
      status: 'Bản nháp',
      statusColor: 'bg-on-surface-variant',
      image: null
    },
    {
      id: 4,
      title: 'Submerged',
      artist: 'Alex Rivera',
      type: 'Album',
      date: '15 Th12, 2023',
      status: 'Đã phát hành',
      statusColor: 'bg-primary',
      image: 'https://picsum.photos/seed/album3/200/200'
    }
  ];

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
        {stats.map((stat, i) => (
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
                        {release.image ? (
                          <img 
                            src={release.image} 
                            alt={release.title} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <ImageIcon className="text-on-surface-variant" size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">{release.title}</p>
                        <p className="text-on-surface-variant text-xs mt-0.5">{release.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-surface-container-highest px-3 py-1 rounded-full text-on-surface-variant">
                      {release.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className={`text-xs font-medium ${release.date === 'Chưa xác định' ? 'text-on-surface-variant italic' : 'text-on-surface'}`}>
                      {release.date}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${release.statusColor} shadow-[0_0_8px_rgba(176,162,255,0.4)]`}></div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${release.statusColor.replace('bg-', 'text-')}`}>
                        {release.status}
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
        </div>
      </section>
    </motion.div>
  );
};
