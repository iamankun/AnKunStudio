import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-background/70 backdrop-blur-xl flex justify-between items-center px-8">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
        <input 
          type="text" 
          placeholder="Tìm kiếm bản phát hành..."
          className="w-full bg-surface-container-highest border-none rounded-md py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Settings size={20} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-on-surface-variant uppercase tracking-widest">Sonic Archive</span>
        </div>
      </div>
    </header>
  );
};
