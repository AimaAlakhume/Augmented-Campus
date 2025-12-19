import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark } from 'lucide-react';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center mb-8 shadow-lg">
          <Landmark size={40} className="text-white" />
        </div>

        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Augmented<br />Campus
        </h1>
        
        <p className="text-brand-100 mb-12 text-lg leading-relaxed">
          Discover your campus through immersive AR scavenger hunts and interactive learning experiences
        </p>

        <div className="w-full space-y-4 mb-12">
          <button 
            onClick={() => navigate('/home')}
            className="w-full bg-white text-brand-600 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-brand-50 transition-transform active:scale-95"
          >
            Get Started
          </button>
          
          <button className="w-full bg-brand-700/50 backdrop-blur-sm border border-brand-400 text-white py-4 rounded-xl font-semibold text-lg hover:bg-brand-700 transition-colors">
            Watch Tutorial
          </button>
        </div>

        <div className="w-full">
          <p className="text-brand-200 text-sm mb-4">Sign in with</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/home')} className="flex-1 border border-brand-400 bg-brand-700/30 py-3 rounded-full text-sm font-medium hover:bg-brand-700 transition-colors">
              University ID
            </button>
            <button onClick={() => navigate('/home')} className="flex-1 border border-brand-400 bg-brand-700/30 py-3 rounded-full text-sm font-medium hover:bg-brand-700 transition-colors">
              Guest Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};