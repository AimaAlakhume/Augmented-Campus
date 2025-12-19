import React from 'react';
import { Bell, Trophy, Zap, Award } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { HuntCard } from '../components/HuntCard';
import { MOCK_USER } from '../constants';
import { useHunts } from '../context/HuntContext';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const { hunts } = useHunts();
  const trendingHunts = hunts.filter(h => h.isTrending);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      {/* Header Section */}
      <div className="bg-brand-500 text-white pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">Hello, {MOCK_USER.name.split(' ')[0]}!</h1>
            <p className="text-brand-100">Ready for your next adventure?</p>
          </div>
          <button className="p-2 bg-brand-400/50 rounded-full hover:bg-brand-400 transition-colors">
            <Bell size={20} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center relative z-10">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{MOCK_USER.stats.completed}</span>
            <span className="text-xs text-brand-100 uppercase tracking-wide mt-1">Completed</span>
          </div>
          <div className="flex flex-col items-center border-x border-brand-400/30">
            <span className="text-2xl font-bold">{MOCK_USER.stats.points.toLocaleString()}</span>
            <span className="text-xs text-brand-100 uppercase tracking-wide mt-1">Points</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">#{MOCK_USER.stats.rank}</span>
            <span className="text-xs text-brand-100 uppercase tracking-wide mt-1">Rank</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-slate-800 font-serif">Trending Hunts</h2>
          <button onClick={() => navigate('/explore')}
          className="text-brand-600 text-sm font-semibold hover:text-brand-700">View All</button>
        </div>

        <div className="space-y-4">
          {trendingHunts.map(hunt => (
            <HuntCard key={hunt.id} hunt={hunt} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 mb-4">
            <h2 className="text-xl font-bold text-slate-800 font-serif mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                <div onClick={() => navigate('/create')}
                className="bg-blue-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm cursor-pointer hover:bg-blue-200 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 text-brand-500 shadow-sm">
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <h3 className="font-bold text-brand-900 mb-1">Create Hunt</h3>
                    <p className="text-xs text-brand-700">Design your own adventure</p>
                </div>
                <div onClick={() => navigate('/profile')}
                className="bg-blue-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm cursor-pointer hover:bg-blue-200 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 text-brand-500 shadow-sm">
                        <Trophy size={24} fill="currentColor" />
                    </div>
                    <h3 className="font-bold text-brand-900 mb-1">Achievements</h3>
                    <p className="text-xs text-brand-700">View your progress</p>
                </div>
            </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};