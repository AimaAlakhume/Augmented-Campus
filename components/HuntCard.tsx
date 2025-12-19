import React from 'react';
import { Hunt } from '../types';
import { MapPin, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HuntCardProps {
  hunt: Hunt;
  onClick?: () => void;
  variant?: 'compact' | 'full';
}

export const HuntCard: React.FC<HuntCardProps> = ({ hunt, onClick, variant = 'full' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/hunt/${hunt.id}`);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-blue-100/50 border border-blue-200 rounded-2xl p-4 mb-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${variant === 'compact' ? 'min-w-[280px]' : 'w-full'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{hunt.title}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(hunt.difficulty)}`}>
          {hunt.difficulty}
        </span>
      </div>
      
      <p className="text-slate-600 text-sm mb-4 line-clamp-2 h-10">
        {hunt.description}
      </p>

      <div className="flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
             <Clock size={14} />
             <span>{hunt.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
             <MapPin size={14} />
             <span>{hunt.participants}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-amber-500 font-semibold">
          <Star size={14} fill="currentColor" />
          <span>{hunt.rating ? hunt.rating.toFixed(1) : 'New'}</span>
        </div>
      </div>
    </div>
  );
};