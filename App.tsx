import React, { useState } from "react";
import { CityGuideData, ViewCategory } from "./types";
import { fetchCityGuide } from "./services/geminiService";
import Sidebar from "./components/Sidebar";
import PlaceCard from "./components/PlaceCard";
import ItineraryView from "./components/ItineraryView";
import ServicesView from "./components/ServicesView";
import NavigationView from "./components/NavigationView";
import { Search, Loader2, Plane } from "lucide-react";

const App: React.FC = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState<CityGuideData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<ViewCategory>(
    ViewCategory.ATTRACTIONS
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchCityGuide(city);
      setData(result);
      setCurrentCategory(ViewCategory.ATTRACTIONS); // Reset view
    } catch (err) {
      setError("Şehir rehberi oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setData(null);
    setCity("");
    setError(null);
  };

  // Render different main content based on category
  const renderContent = () => {
    if (!data) return null;

    switch (currentCategory) {
      case ViewCategory.ATTRACTIONS:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.attractions.map((place, idx) => (
              <PlaceCard key={idx} place={place} type="generic" index={idx} />
            ))}
          </div>
        );
      case ViewCategory.MUST_DO:
        return (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.mustDos.map((place, idx) => (
              <PlaceCard key={idx} place={place} type="generic" index={idx + 100} />
            ))}
          </div>
        );
      case ViewCategory.FOOD:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.restaurants.map((place, idx) => (
              <PlaceCard key={idx} place={place} type="restaurant" index={idx + 200} />
            ))}
          </div>
        );
      case ViewCategory.HOTELS:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.hotels.map((place, idx) => (
              <PlaceCard key={idx} place={place} type="hotel" index={idx + 300} />
            ))}
          </div>
        );
      case ViewCategory.MUSEUMS:
         return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.museums.map((place, idx) => (
              <PlaceCard key={idx} place={place} type="museum" index={idx + 400} />
            ))}
          </div>
        );
      case ViewCategory.ITINERARY:
        return <ItineraryView itineraries={data.itineraries} />;
      case ViewCategory.SERVICES:
        return <ServicesView services={data.services} />;
      case ViewCategory.NAVIGATION:
        return <NavigationView navigation={data.navigation} />;
      default:
        return <div>İçerik bulunamadı.</div>;
    }
  };

  // Landing View
  if (!data && !loading) {
    return (
      <div className="min-h-screen bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center p-4">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop" 
            alt="City Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
          <div className="flex justify-center mb-4">
             <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/30">
                <Plane className="text-white w-10 h-10" />
             </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            AI City <span className="text-indigo-400">Explorer</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-light max-w-lg mx-auto">
            Gezilecek yerler, lezzet durakları ve tam size göre rota planları. Keşfetmek istediğiniz şehri yazın.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Şehir veya Bölge adı girin (örn: İstanbul, Paris)"
              className="w-full pl-6 pr-14 py-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 transition-all text-lg shadow-2xl"
            />
            <button 
              type="submit"
              disabled={!city.trim()}
              className="absolute right-2 top-2 bottom-2 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
          
          {error && (
            <div className="bg-red-500/20 text-red-200 px-4 py-2 rounded-lg border border-red-500/30 text-sm inline-block">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Loading View
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-6">
        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{city} için rehber hazırlanıyor...</h2>
        <p className="text-slate-500 max-w-md">
          Yapay zeka en iyi restoranları, otelleri ve turistik noktaları sizin için derliyor. Bu işlem birkaç saniye sürebilir.
        </p>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {data && (
        <Sidebar 
            currentCategory={currentCategory} 
            onSelectCategory={setCurrentCategory}
            cityName={data.cityName}
            onBack={handleBack}
        />
      )}
      
      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{currentCategory}</h1>
            <p className="text-slate-500">
              {currentCategory === ViewCategory.ATTRACTIONS && "Şehrin en ikonik noktalarını keşfedin."}
              {currentCategory === ViewCategory.FOOD && "Yerel lezzetler ve popüler mekanlar."}
              {currentCategory === ViewCategory.ITINERARY && "Zamanınızı en verimli şekilde kullanın."}
              {currentCategory === ViewCategory.NAVIGATION && "Şehirde kaybolmadan gezmenin yolları."}
              {data && currentCategory === ViewCategory.ATTRACTIONS && data.overview && (
                  <span className="block mt-2 p-4 bg-indigo-50 text-indigo-800 rounded-xl text-sm leading-relaxed">
                      {data.overview}
                  </span>
              )}
            </p>
          </div>

          <div className="animate-fadeIn">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
