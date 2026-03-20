'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { CatalogView } from '@/components/CatalogView';
import { ReleaseInfoView } from '@/components/ReleaseInfoView';
import { ResourcesView } from '@/components/ResourcesView';
import { TracklistView } from '@/components/TracklistView';
import { DistributionView } from '@/components/DistributionView';
import { ReviewView } from '@/components/ReviewView';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="ml-64 flex flex-col min-h-screen">
        <TopBar />
        
        <main className="flex-1 pt-24 px-10 pb-12">
          <AnimatePresence mode="wait">
            {activeTab === 'release-info' && (
              <ReleaseInfoView key="release-info" onNext={() => setActiveTab('resources')} />
            )}
            
            {activeTab === 'resources' && (
              <ResourcesView 
                key="resources" 
                onNext={() => setActiveTab('tracklist')} 
                onBack={() => setActiveTab('release-info')} 
              />
            )}

            {activeTab === 'tracklist' && (
              <TracklistView 
                key="tracklist" 
                onNext={() => setActiveTab('distribution')} 
                onBack={() => setActiveTab('resources')} 
              />
            )}

            {activeTab === 'distribution' && (
              <DistributionView 
                key="distribution" 
                onNext={() => setActiveTab('review')} 
                onBack={() => setActiveTab('tracklist')} 
              />
            )}

            {activeTab === 'review' && (
              <ReviewView 
                key="review" 
                onBack={() => setActiveTab('distribution')} 
                onSubmit={() => setActiveTab('catalog')} 
              />
            )}

            {activeTab === 'catalog' && (
              <CatalogView key="catalog" onCreateNew={() => setActiveTab('release-info')} />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
