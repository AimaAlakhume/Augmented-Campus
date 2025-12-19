import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, HelpCircle, Volume2, Map as MapIcon, ScanLine, Trophy, RefreshCw, BookOpen } from 'lucide-react';
import { useHunts } from '../context/HuntContext';

export const ActiveHunt: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { hunts } = useHunts();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Hunt State
  const hunt = hunts.find(h => h.id === id);
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [isHuntComplete, setIsHuntComplete] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  
  // Location State
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const clues = hunt?.clues || [];
  const currentClue = clues[currentClueIndex];
  const progress = clues.length > 0 ? Math.min(((currentClueIndex) / clues.length) * 100, 100) : 0;

  // Helper: Calculate Haversine Distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // Camera Setup
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Geolocation Setup
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(newPos);
      },
      (error) => console.error("GPS Error:", error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Distance Update
  useEffect(() => {
    if (userLocation && currentClue) {
      const dist = calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        currentClue.latitude, 
        currentClue.longitude
      );
      setDistance(dist);
    }
  }, [userLocation, currentClue]);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
        setIsScanning(false);
        if (currentClueIndex < clues.length - 1) {
            setCurrentClueIndex(prev => prev + 1);
            // Optional: Show a "Clue Found" ephemeral toast here
        } else {
            setIsHuntComplete(true);
        }
    }, 2000);
  };

  if (!hunt) return <div className="bg-black text-white h-screen flex items-center justify-center">Hunt not found</div>;

  if (isHuntComplete) {
    return (
        <div className="fixed inset-0 bg-brand-600 text-white flex flex-col items-center p-6 text-center animate-in fade-in duration-500 overflow-y-auto">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce shrink-0 mt-12">
                <Trophy size={48} className="text-yellow-500" />
             </div>
             <h1 className="text-3xl font-bold mb-2">Hunt Completed!</h1>
             <p className="text-brand-100 mb-6 text-lg">
                You've successfully found all {clues.length} locations in "{hunt.title}".
             </p>

             {hunt.educationalContent && (
               <div className="bg-white/10 border border-white/20 p-6 rounded-2xl w-full max-w-sm mb-6 text-left backdrop-blur-md">
                 <div className="flex items-center gap-2 mb-3 text-brand-200">
                    <BookOpen size={20} />
                    <h3 className="font-bold text-white">History Unlocked</h3>
                 </div>
                 <p className="text-white/90 text-sm leading-relaxed">
                   {hunt.educationalContent}
                 </p>
               </div>
             )}

             <div className="bg-white/10 p-6 rounded-2xl w-full max-w-sm mb-8">
                <div className="flex justify-between mb-2">
                    <span className="text-brand-200">Total Time</span>
                    <span className="font-bold">42:15</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-brand-200">Points Earned</span>
                    <span className="font-bold text-yellow-300">150 pts</span>
                </div>
             </div>
             
             <div className="w-full max-w-sm space-y-3 pb-10">
                {hunt.educationalContent && (
                    <button 
                        onClick={() => window.open(hunt.educationalLink || `https://www.google.com/search?q=${encodeURIComponent(hunt.title)}`, '_blank')}
                        className="w-full bg-brand-500 border border-brand-400 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-400 transition-colors"
                    >
                        Learn More
                    </button>
                )}
                <button 
                    onClick={() => navigate('/home')}
                    className="w-full bg-white text-brand-600 font-bold py-4 rounded-xl shadow-lg hover:bg-brand-50 transition-colors"
                >
                    Back to Home
                </button>
             </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* Camera Feed */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-6 flex justify-between items-start z-20">
        <button onClick={() => navigate(-1)} className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors">
            <X size={24} className="text-white" />
        </button>
        <div className="flex gap-4">
            <button className="p-2" onClick={() => setShowIntroModal(true)}>
                <HelpCircle size={24} className="text-white" />
            </button>
            <button className="p-2">
                <Volume2 size={24} className="text-white" />
            </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-16 left-4 right-4 z-20">
        <div className="flex justify-between text-sm font-semibold mb-2">
            <span>Clue {currentClueIndex + 1} of {clues.length}</span>
            <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
                className="h-full bg-brand-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
      </div>

      {/* Map Icon Floating */}
      <div className="absolute top-32 right-4 z-20">
          <div className="w-10 h-10 bg-brand-600/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-brand-500 transition-colors">
             <MapIcon size={20} className="text-brand-100" />
          </div>
      </div>

      {/* Distance Indicator */}
      <div className="absolute top-48 left-4 z-20 transition-all duration-300">
          <div className={`backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-lg w-24 text-center ${distance && distance < 20 ? 'bg-green-500/80' : 'bg-black/40'}`}>
             <span className="block text-xl font-bold text-white leading-none mb-1">
                {distance !== null ? `${Math.round(distance)}m` : '...'}
             </span>
             <span className="text-[10px] text-white/90 uppercase tracking-wide block">to target</span>
          </div>
      </div>

      {/* Center Reticle / Scanning Area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
          <div className={`relative w-64 h-64 border border-white/30 rounded-3xl flex items-center justify-center transition-all duration-500 ${isScanning ? 'scale-90 border-brand-400 bg-brand-500/10' : ''}`}>
              {!isScanning && <div className="absolute inset-0 border-2 border-brand-400 rounded-3xl opacity-50 animate-pulse"></div>}
              {isScanning && (
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="w-full h-1 bg-brand-400/80 shadow-[0_0_15px_rgba(96,165,250,0.8)] absolute top-0 animate-[scan_1.5s_ease-in-out_infinite]"></div>
                </div>
              )}
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                 {isScanning ? <RefreshCw size={24} className="text-white animate-spin" /> : <ScanLine size={24} className="text-white/80" />}
              </div>
          </div>
      </div>

      {/* Hint Modal (Initially visible) */}
      {showIntroModal && (
          <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="bg-brand-900/90 border border-brand-500/30 p-6 rounded-2xl max-w-xs w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <HelpCircle size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Clue #{currentClueIndex + 1}</h3>
                  <p className="text-brand-100 text-sm mb-6 leading-relaxed">
                    {currentClue?.description}
                  </p>
                  <button 
                    onClick={() => setShowIntroModal(false)}
                    className="w-full bg-white text-brand-900 font-bold py-3 rounded-xl hover:bg-brand-50 transition-colors"
                  >
                    Start Searching
                  </button>
              </div>
          </div>
      )}

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 safe-area-pb">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
              <div className="flex justify-between items-center mb-3">
                  <span className="bg-brand-900/50 border border-brand-700/50 px-3 py-1 rounded-full text-xs font-semibold text-brand-300">
                      Current Objective
                  </span>
                  {distance !== null && distance < 30 && (
                     <span className="bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold text-green-400 animate-pulse">
                        Within Range
                    </span>
                  )}
              </div>
              <p className="text-white font-medium text-sm leading-relaxed mb-4 line-clamp-3">
                  {currentClue?.description || "Loading clue..."}
              </p>
              
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    isScanning 
                    ? 'bg-brand-700 text-brand-300 cursor-wait' 
                    : 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/30'
                }`}
              >
                 {isScanning ? (
                    <>Scanning Target...</>
                 ) : (
                    <>
                        <ScanLine size={20} />
                        {distance !== null && distance < 30 ? 'Scan Object' : 'Simulate Scan (Demo)'}
                    </>
                 )}
              </button>
          </div>
      </div>
      
      <style>{`
        @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};