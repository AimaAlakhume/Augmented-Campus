import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHunts } from '../context/HuntContext';
import { ArrowLeft, Clock, Trophy, Map, Users, Loader2 } from 'lucide-react';

export const HuntDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hunts } = useHunts();
  const hunt = hunts.find(h => h.id === id);
  const [isLoading, setIsLoading] = useState(false);

  if (!hunt) return <div>Hunt not found</div>;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleStartHunt = async () => {
    setIsLoading(true);
    try {
      // 1. Request Camera Permission
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Stop the stream immediately, we just needed to trigger the permission prompt
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Camera permission denied:", err);
        throw new Error("Camera permission is required");
      }

      // 2. Request Geolocation Permission
      await new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          () => resolve(),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 5000 }
        );
      });

      // 3. Navigate if successful
      navigate(`/hunt/${hunt.id}/active`);
    } catch (error) {
      console.error("Permission error:", error);
      alert("Please allow Camera and Location access to start the Augmented Reality hunt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col relative">
        {/* Header Background */}
        <div className="bg-brand-600 h-64 w-full absolute top-0 left-0 z-0">
             {/* Gradient overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-600/50"></div>
        </div>

        {/* Navbar */}
        <div className="relative z-10 px-6 pt-8 pb-4 flex items-center">
            <button onClick={() => navigate('/explore')} className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-colors">
                <ArrowLeft size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 px-6 flex flex-col">
            <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-3 ${getDifficultyColor(hunt.difficulty)}`}>
                    {hunt.difficulty}
                </span>
                <h1 className="text-3xl font-bold text-white mb-2">{hunt.title}</h1>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                        <Trophy size={16} className="text-yellow-400" />
                        <span className="font-semibold">{hunt.rating}</span>
                        <span className="text-white/70">({hunt.participants > 100 ? '89' : '12'} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{hunt.participants} joined</span>
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-brand-100/90 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                    <Clock size={24} className="text-brand-600 mb-2" />
                    <span className="font-bold text-brand-900">{hunt.duration}</span>
                    <span className="text-xs text-brand-700">minutes</span>
                </div>
                <div className="bg-brand-100/90 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                    <Trophy size={24} className="text-brand-600 mb-2" />
                    <span className="font-bold text-brand-900">150 pts</span>
                    <span className="text-xs text-brand-700">Reward</span>
                </div>
                <div className="bg-brand-100/90 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                    <Map size={24} className="text-brand-600 mb-2" />
                    <span className="font-bold text-brand-900">{hunt.clues?.length || 5}</span>
                    <span className="text-xs text-brand-700">Clues</span>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-brand-200/50 backdrop-blur-sm p-6 rounded-3xl border border-brand-200 mb-20">
                <h3 className="text-lg font-bold text-brand-900 font-serif mb-3">About This Hunt</h3>
                <p className="text-brand-800 leading-relaxed text-sm">
                    {hunt.description}
                </p>
            </div>
        </div>

        {/* Footer Action */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-brand-100 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
            <button 
                onClick={handleStartHunt}
                disabled={isLoading}
                className="w-full bg-brand-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-all active:scale-95 mb-3 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" size={24} />
                        <span>Checking Access...</span>
                    </>
                ) : (
                    'Start Hunt'
                )}
            </button>
            <p className="text-center text-xs text-slate-400">
                Make sure you have good GPS signal and camera permissions enabled
            </p>
        </div>
    </div>
  );
};