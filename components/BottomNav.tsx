import React from 'react';
import { Home, Search, Plus, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'explore', icon: Search, label: 'Hunts', path: '/explore' },
    { id: 'create', icon: Plus, label: 'Create', path: '/create' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 rounded-t-3xl px-4 py-2 safe-area-pb z-50"
      style={{ backgroundColor: 'var(--color-darkest)' }}
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors relative"
              style={{
                color: isItemActive ? 'var(--text-background)' : 'var(--color-accent-light)'
              }}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
              {/* Active indicator dot */}
              {isItemActive && (
                <div 
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--text-background)' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};