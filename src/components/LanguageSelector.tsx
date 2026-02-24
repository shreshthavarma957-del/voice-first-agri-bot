
import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  current: Language;
  onChange: (lang: Language) => void;
}

const languages: { code: Language; name: string; native: string }[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ current, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-emerald-800 uppercase tracking-wider">
        Select Language / भाषा चुनें
      </label>
      <select
        value={current}
        onChange={(e) => onChange(e.target.value as Language)}
        className="w-full p-4 bg-white border-2 border-emerald-100 rounded-2xl text-lg font-medium text-emerald-900 focus:outline-none focus:border-emerald-400 transition-colors shadow-sm"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.native} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
};
