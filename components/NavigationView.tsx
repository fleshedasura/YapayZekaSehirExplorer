import React from 'react';
import { NavigationInfo } from '../types';
import { Compass, Bus, MapPin } from 'lucide-react';

interface NavigationViewProps {
  navigation: NavigationInfo;
}

const NavigationView: React.FC<NavigationViewProps> = ({ navigation }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Compass className="text-emerald-400" size={32} />
          <h2 className="text-2xl font-bold">Şehir İçi Ulaşım Rehberi</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-emerald-400 font-semibold uppercase tracking-wider text-sm mb-2">Ulaşım Seçenekleri</h3>
            <p className="text-slate-300 leading-relaxed">{navigation.transportOptions}</p>
          </div>
          
          <div className="h-px bg-slate-700 w-full" />

          <div>
            <h3 className="text-emerald-400 font-semibold uppercase tracking-wider text-sm mb-2">Rota Önerileri</h3>
            <p className="text-slate-300 leading-relaxed">{navigation.routeDescription}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-indigo-600">
                <MapPin />
                <h3 className="font-bold">Yakın Çevre</h3>
            </div>
            <p className="text-slate-600 text-sm">{navigation.nearbySuggestions}</p>
        </div>
        
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
            <Bus size={40} className="text-slate-400 mb-2" />
            <p className="text-slate-500 text-sm">Toplu taşıma kartı veya günlük bilet almayı unutmayın. Genellikle en ekonomik seçenektir.</p>
        </div>
      </div>
    </div>
  );
};

export default NavigationView;
