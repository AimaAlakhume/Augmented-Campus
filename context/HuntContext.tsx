import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Hunt } from '../types';
import { INITIAL_HUNTS } from '../constants';

interface HuntContextType {
  hunts: Hunt[];
  addHunt: (hunt: Hunt) => void;
}

const HuntContext = createContext<HuntContextType | undefined>(undefined);

export const HuntProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hunts, setHunts] = useState<Hunt[]>(INITIAL_HUNTS);

  const addHunt = (hunt: Hunt) => {
    setHunts(prev => [hunt, ...prev]);
  };

  return (
    <HuntContext.Provider value={{ hunts, addHunt }}>
      {children}
    </HuntContext.Provider>
  );
};

export const useHunts = () => {
  const context = useContext(HuntContext);
  if (context === undefined) {
    throw new Error('useHunts must be used within a HuntProvider');
  }
  return context;
};