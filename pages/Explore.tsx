import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { HuntCard } from '../components/HuntCard';
import { useNavigate } from 'react-router-dom';
import { useHunts } from '../context/HuntContext';

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const { hunts } = useHunts();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredHunts = hunts.filter(hunt => 
    hunt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hunt.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      <div className="bg-brand-500 pt-8 pb-6 px-6 shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 bg-brand-600 rounded-lg text-white hover:bg-brand-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white flex-1 text-center pr-10">All Hunts</h1>
        </div>

        <div className="relative">
          <input 
            type="text" 
            placeholder="Search hunts, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-black placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
      </div>

      <div className="px-6 mt-6">
        <div className="space-y-4">
          {filteredHunts.length > 0 ? (
            filteredHunts.map(hunt => (
              <HuntCard key={hunt.id} hunt={hunt} />
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">
              <p>No hunts found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};