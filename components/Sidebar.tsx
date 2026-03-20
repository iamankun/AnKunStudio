import React from 'react';
import { 
  LayoutGrid,
  Album,
  CloudUpload,
  ListMusic,
  Globe,
  Verified,
  PlusCircle, 
  Search, 
  Bell, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'catalog', label: 'Kho nhạc', icon: LayoutGrid },
    { id: 'release-info', label: 'Thông tin phát hành', icon: Album },
    { id: 'resources', label: 'Tài Nguyên', icon: CloudUpload },
    { id: 'tracklist', label: 'Danh sách nhạc', icon: ListMusic },
    { id: 'distribution', label: 'Phân phối', icon: Globe },
    { id: 'review', label: 'Kiểm duyệt', icon: Verified },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-background flex flex-col p-4 border-r border-outline-variant/20 z-50">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold tracking-tighter text-primary">An Kun Studio</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mt-1">Digital Music Distribution</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium tracking-tight ${
              activeTab === item.id 
                ? 'text-primary bg-surface-container-highest' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant/10">
        <button 
          onClick={() => setActiveTab('release-info')}
          className="w-full bg-linear-to-r from-primary to-primary-dim text-background py-3 rounded-md font-bold text-sm tracking-tight transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(176,162,255,0.2)]"
        >
          Tạo bản phát hành
        </button>

        <div className="flex items-center gap-3 mt-6 px-2">
          <img 
            src="https://picsum.photos/seed/artist/100/100" 
            alt="Artist Profile" 
            className="w-10 h-10 rounded-full bg-surface-container-highest object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Alex Rivera</p>
            <p className="text-[11px] text-on-surface-variant truncate">Artist Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
