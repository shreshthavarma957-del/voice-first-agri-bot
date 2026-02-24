
import React, { useState } from 'react';
import { User, MapPin, Sprout, Layers, ArrowRight } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    location: '',
    cropType: '',
    soilType: '',
    language: 'en',
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(profile);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-emerald-50 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-emerald-900">Welcome!</h1>
        <p className="text-emerald-600 font-medium">Let's set up your farm profile</p>
      </div>

      <div className="flex justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              s === step ? "w-8 bg-emerald-500" : "w-2 bg-emerald-100"
            )}
          />
        ))}
      </div>

      <div className="min-h-[300px] flex flex-col justify-center">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <LanguageSelector 
              current={profile.language} 
              onChange={(l) => setProfile({ ...profile, language: l })} 
            />
            <div className="space-y-2">
              <label className="text-sm font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                <User size={16} /> Your Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full p-4 bg-emerald-50 border-2 border-transparent rounded-2xl focus:border-emerald-400 outline-none transition-all text-lg"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={16} /> Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="Village, District, State"
                className="w-full p-4 bg-emerald-50 border-2 border-transparent rounded-2xl focus:border-emerald-400 outline-none transition-all text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                <Sprout size={16} /> Primary Crop
              </label>
              <input
                type="text"
                value={profile.cropType}
                onChange={(e) => setProfile({ ...profile, cropType: e.target.value })}
                placeholder="e.g. Wheat, Cotton, Rice"
                className="w-full p-4 bg-emerald-50 border-2 border-transparent rounded-2xl focus:border-emerald-400 outline-none transition-all text-lg"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} /> Soil Type
              </label>
              <select
                value={profile.soilType}
                onChange={(e) => setProfile({ ...profile, soilType: e.target.value })}
                className="w-full p-4 bg-emerald-50 border-2 border-transparent rounded-2xl focus:border-emerald-400 outline-none transition-all text-lg"
              >
                <option value="">Select Soil Type</option>
                <option value="Alluvial">Alluvial Soil</option>
                <option value="Black">Black Soil</option>
                <option value="Red">Red Soil</option>
                <option value="Laterite">Laterite Soil</option>
                <option value="Desert">Desert Soil</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={step === 1 ? !profile.name : step === 2 ? (!profile.location || !profile.cropType) : !profile.soilType}
        className="w-full bg-emerald-500 text-white p-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
      >
        {step === 3 ? "Complete Setup" : "Next Step"}
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

import { cn } from '../lib/utils';
