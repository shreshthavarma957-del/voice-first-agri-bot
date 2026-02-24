/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { ProfileSetup } from './components/ProfileSetup';
import { VoiceBot } from './components/VoiceBot';
import { FarmScheduler } from './components/FarmScheduler';
import { GovSchemes } from './components/GovSchemes';
import { WeatherAlerts } from './components/WeatherAlerts';
import { 
  MessageSquare, 
  Calendar, 
  Landmark, 
  CloudRain, 
  LogOut, 
  WifiOff,
  Menu,
  X,
  LucideProps
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

type Tab = 'chat' | 'tasks' | 'schemes' | 'weather';

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load profile from local storage if exists
    const savedProfile = localStorage.getItem('agri_bot_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('agri_bot_profile', JSON.stringify(newProfile));
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('agri_bot_profile');
      setProfile(null);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
        <ProfileSetup onComplete={handleProfileComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
              <MessageSquare size={18} />
            </div>
            <h1 className="text-xl font-black text-emerald-900 tracking-tight">Agri Bot</h1>
          </div>

          <div className="flex items-center gap-4">
            {!isOnline && (
              <div className="flex items-center gap-1 text-red-500 text-xs font-bold uppercase">
                <WifiOff size={14} /> Offline
              </div>
            )}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-emerald-50 rounded-xl transition-colors text-emerald-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6"
          >
            <div className="space-y-6">
              <div className="p-6 bg-emerald-50 rounded-3xl space-y-2">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Farmer Profile</p>
                <h3 className="text-2xl font-bold text-emerald-900">{profile.name}</h3>
                <p className="text-emerald-700 font-medium">{profile.location} • {profile.cropType}</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-colors"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar & Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-emerald-100 p-6 sticky top-16 h-[calc(100vh-64px)]">
          <div className="flex-1 space-y-2">
            <SidebarButton 
              active={activeTab === 'chat'} 
              onClick={() => setActiveTab('chat')}
              icon={<MessageSquare />}
              label="Ask Agri Bot"
            />
            <SidebarButton 
              active={activeTab === 'tasks'} 
              onClick={() => setActiveTab('tasks')}
              icon={<Calendar />}
              label="Farm Tasks"
            />
            <SidebarButton 
              active={activeTab === 'schemes'} 
              onClick={() => setActiveTab('schemes')}
              icon={<Landmark />}
              label="Govt Schemes"
            />
            <SidebarButton 
              active={activeTab === 'weather'} 
              onClick={() => setActiveTab('weather')}
              icon={<CloudRain />}
              label="Weather Alerts"
            />
          </div>

          <div className="pt-6 border-t border-emerald-50 space-y-4">
            <div className="p-4 bg-emerald-50 rounded-2xl">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Active Profile</p>
              <p className="font-bold text-emerald-900 truncate">{profile.name}</p>
              <p className="text-xs text-emerald-700 truncate">{profile.location}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors text-sm"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
          {!isOnline && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center gap-3 text-red-800 font-medium">
              <WifiOff className="text-red-500" />
              Internet is weak. Voice features may not work properly.
            </div>
          )}

          <div className="h-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'chat' && <VoiceBot profile={profile} />}
                {activeTab === 'tasks' && <FarmScheduler />}
                {activeTab === 'schemes' && <GovSchemes />}
                {activeTab === 'weather' && <WeatherAlerts />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 px-4 pb-6 pt-2 z-30">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <NavButton 
            active={activeTab === 'chat'} 
            onClick={() => { setActiveTab('chat'); setIsMenuOpen(false); }}
            icon={<MessageSquare />}
            label="Ask Bot"
          />
          <NavButton 
            active={activeTab === 'tasks'} 
            onClick={() => { setActiveTab('tasks'); setIsMenuOpen(false); }}
            icon={<Calendar />}
            label="Tasks"
          />
          <NavButton 
            active={activeTab === 'schemes'} 
            onClick={() => { setActiveTab('schemes'); setIsMenuOpen(false); }}
            icon={<Landmark />}
            label="Schemes"
          />
          <NavButton 
            active={activeTab === 'weather'} 
            onClick={() => { setActiveTab('weather'); setIsMenuOpen(false); }}
            icon={<CloudRain />}
            label="Weather"
          />
        </div>
      </nav>
    </div>
  );
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-2xl transition-all min-w-[70px]",
        active ? "text-emerald-600 scale-110" : "text-emerald-300"
      )}
    >
      <div className={cn(
        "p-2 rounded-xl transition-colors",
        active ? "bg-emerald-50" : "bg-transparent"
      )}>
        {React.cloneElement(icon as React.ReactElement<LucideProps>, { size: 24 })}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}

function SidebarButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-lg",
        active 
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 translate-x-2" 
          : "text-emerald-700 hover:bg-emerald-50"
      )}
    >
      {React.cloneElement(icon as React.ReactElement<LucideProps>, { size: 24 })}
      <span>{label}</span>
    </button>
  );
}
