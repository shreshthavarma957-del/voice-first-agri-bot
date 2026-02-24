
import React from 'react';
import { CloudRain, Wind, Thermometer, AlertTriangle } from 'lucide-react';

export const WeatherAlerts: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-50 space-y-6">
      <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
        <CloudRain className="text-emerald-500" />
        Weather Alerts
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex flex-col items-center text-center space-y-2">
          <Thermometer className="text-orange-500" size={32} />
          <div>
            <span className="block text-2xl font-bold text-orange-900">32°C</span>
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Temp</span>
          </div>
        </div>
        <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex flex-col items-center text-center space-y-2">
          <Wind className="text-sky-500" size={32} />
          <div>
            <span className="block text-2xl font-bold text-sky-900">12 km/h</span>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Wind</span>
          </div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center space-y-2">
          <CloudRain className="text-emerald-500" size={32} />
          <div>
            <span className="block text-2xl font-bold text-emerald-900">65%</span>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Humidity</span>
          </div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 flex flex-col items-center text-center space-y-2">
          <Thermometer className="text-yellow-500" size={32} />
          <div>
            <span className="block text-2xl font-bold text-yellow-900">High</span>
            <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">UV Index</span>
          </div>
        </div>
      </div>

      <div className="p-5 bg-red-50 rounded-2xl border-2 border-red-100 flex items-start gap-4">
        <div className="p-2 bg-red-500 rounded-full text-white">
          <AlertTriangle size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-red-900">Heavy Rain Alert</h4>
          <p className="text-sm text-red-700">Expect heavy rainfall in the next 24 hours. Secure your harvested crops.</p>
        </div>
      </div>
    </div>
  );
};
