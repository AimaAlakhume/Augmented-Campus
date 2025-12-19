import React from 'react';
import { User as UserIcon, CheckCircle, Trophy, Star, Settings } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { MOCK_USER } from '../constants';

export const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      <div className="bg-brand-500 text-white pt-12 pb-16 px-6 rounded-b-[3rem] relative shadow-lg">
        <button className="absolute top-6 right-6 p-2 bg-brand-600 rounded-full hover:bg-brand-700">
           <Settings size={20} />
        </button>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-brand-300 rounded-full flex items-center justify-center mb-4 border-4 border-brand-400 overflow-hidden">
             {/* If real avatar exists use img, else icon */}
             <UserIcon size={48} className="text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold font-serif">{MOCK_USER.name}</h1>
          <p className="text-brand-200">{MOCK_USER.role}</p>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-10">
        {/* Stats Card */}
        <div className="bg-brand-200/50 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="font-bold text-brand-900 mb-4 font-serif">Your Stats</h3>
          <div className="flex justify-between items-center text-center">
            <div>
              <div className="text-3xl font-bold text-brand-600">{MOCK_USER.stats.completed}</div>
              <div className="text-xs text-brand-800 font-medium">Hunts Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600">{MOCK_USER.stats.points.toLocaleString()}</div>
              <div className="text-xs text-brand-800 font-medium">Total Points</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600">#{MOCK_USER.stats.rank}</div>
              <div className="text-xs text-brand-800 font-medium">Rank</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 font-serif">Recent Achievements</h2>
          <div className="space-y-3">
            {MOCK_USER.achievements.map((ach) => (
              <div key={ach.id} className="bg-blue-200/40 p-4 rounded-xl flex items-center gap-4 border border-blue-200 shadow-sm">
                <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
                  {ach.icon === 'trophy' && <Trophy size={20} />}
                  {ach.icon === 'check-circle' && <CheckCircle size={20} />}
                  {ach.icon === 'star' && <Star size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 text-sm">{ach.title}</h4>
                  <p className="text-xs text-slate-600">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section (Placeholder) */}
        <div className="bg-blue-200/40 p-6 rounded-2xl border border-blue-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 font-serif">Recent Activity</h2>
          <div className="flex justify-between items-center text-sm">
             <span className="text-slate-700">Completed <span className="font-semibold">Historic Campus</span></span>
             <span className="text-slate-500 text-xs">2 hours ago</span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};