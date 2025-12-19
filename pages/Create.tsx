import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, MapPin, Sparkles, Loader2, Trash2, Plus } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { generateCreativeHunts } from '../services/geminiService';
import { Hunt, Clue } from '../types';
import { useHunts } from '../context/HuntContext';

export const Create: React.FC = () => {
  const navigate = useNavigate();
  const { addHunt } = useHunts();
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState<Partial<Hunt>[]>([]);

  // Hunt Details State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [duration, setDuration] = useState('');

  // Clues State
  const [clues, setClues] = useState<Clue[]>([]);
  const [newClue, setNewClue] = useState({ description: '', lat: '', lng: '' });

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setGeneratedIdeas([]);
    const ideas = await generateCreativeHunts(topic);
    setGeneratedIdeas(ideas);
    setLoading(false);
  };

  const fillForm = (idea: Partial<Hunt>) => {
    setTitle(idea.title || '');
    setDescription(idea.description || '');
    setDifficulty(idea.difficulty || 'Easy');
    setDuration(idea.duration?.toString() || '');
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewClue(prev => ({
            ...prev,
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6)
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get current location. Please ensure location permissions are enabled.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleAddClue = () => {
    if (!newClue.description || !newClue.lat || !newClue.lng) {
      alert("Please fill in all clue fields");
      return;
    }

    const clue: Clue = {
      description: newClue.description,
      latitude: parseFloat(newClue.lat),
      longitude: parseFloat(newClue.lng)
    };

    setClues([...clues, clue]);
    setNewClue({ description: '', lat: '', lng: '' });
  };

  const removeClue = (index: number) => {
    setClues(clues.filter((_, i) => i !== index));
  };

  const handleCreateHunt = () => {
    if (!title || !description || !duration) {
      alert("Please fill in all hunt details");
      return;
    }

    const newHunt: Hunt = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
      duration: parseInt(duration) || 45,
      participants: 0,
      rating: 0, // New hunts have 0 rating
      isTrending: false,
      clues
    };

    addHunt(newHunt);
    navigate('/explore');
  };

  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      {/* Header */}
      <div className="bg-brand-500 pt-8 pb-6 px-6 shadow-md flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-brand-600 rounded-lg text-white hover:bg-brand-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white">Create New Hunt</h1>
        <button className="p-2 bg-brand-600 rounded-lg text-white hover:bg-brand-700 transition-colors">
          <HelpCircle size={20} />
        </button>
      </div>

      <div className="px-6 -mt-0 pt-6">
        <div className="bg-blue-100/50 border border-blue-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-brand-900 mb-4">Hunt Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-800 mb-1">Hunt Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter hunt title..."
                className="w-full p-3 rounded-xl border border-brand-200 bg-brand-50 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-800 mb-1">Description</label>
              <textarea 
                placeholder="Describe your hunt..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border border-brand-200 bg-brand-50 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              ></textarea>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-brand-800 mb-1">Difficulty</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-200 bg-brand-50 text-black focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option>Easy</option
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-brand-800 mb-1">Duration</label>
                <input 
                  type="text" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 45 min"
                  className="w-full p-3 rounded-xl border border-brand-200 bg-brand-50 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add Clues Section */}
        <div className="bg-blue-100/50 border border-blue-200 rounded-2xl p-6 mt-6 shadow-sm">
          <h2 className="text-lg font-bold text-brand-900 mb-4">Add Clues</h2>
          
          <div className="space-y-4">
            {/* Added Clues List */}
            {clues.map((clue, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm flex justify-between items-start animate-in fade-in slide-in-from-bottom-2">
                <div className="flex-1 mr-4 overflow-hidden">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-sm font-semibold text-brand-900 line-clamp-1">{clue.description}</p>
                   </div>
                   <div className="flex flex-wrap gap-2 ml-8 text-[10px] text-slate-500 font-mono">
                      <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">Lat: {clue.latitude.toFixed(4)}</span>
                      <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">Lng: {clue.longitude.toFixed(4)}</span>
                   </div>
                </div>
                <button 
                  onClick={() => removeClue(index)} 
                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            {/* New Clue Form */}
            <div className="bg-brand-50 rounded-xl p-4 border border-brand-200">
                <h3 className="text-sm font-bold text-brand-800 mb-3 flex items-center gap-2">
                  <Plus size={16} className="text-brand-500"/> New Location
                </h3>
                
                <textarea
                    placeholder="Clue description or riddle..."
                    value={newClue.description}
                    onChange={(e) => setNewClue({...newClue, description: e.target.value})}
                    className="w-full p-3 mb-3 rounded-lg border border-brand-200 bg-white text-black placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    rows={2}
                />
                
                <div className="flex gap-3 mb-3">
                    <input
                      placeholder="Latitude"
                      value={newClue.lat}
                      onChange={(e) => setNewClue({...newClue, lat: e.target.value})}
                      className="flex-1 min-w-0 p-3 rounded-lg border border-brand-200 bg-white text-black placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <input
                      placeholder="Longitude"
                      value={newClue.lng}
                      onChange={(e) => setNewClue({...newClue, lng: e.target.value})}
                      className="flex-1 min-w-0 p-3 rounded-lg border border-brand-200 bg-white text-black placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                </div>
                
                <div className="flex gap-3">
                    <button 
                      onClick={handleGetLocation} 
                      className="flex-1 bg-white border border-brand-200 text-brand-700 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors"
                    >
                      <MapPin size={16} /> GPS
                    </button>
                    <button 
                      onClick={handleAddClue}
                      className="flex-[2] bg-brand-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors shadow-sm"
                    >
                      Add Clue
                    </button>
                </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleCreateHunt}
          className="w-full bg-brand-500 text-white font-bold py-4 rounded-xl mt-8 shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-all active:scale-95 mb-8"
        >
          Create Hunt
        </button>
      </div>

      <BottomNav />
    </div>
  );
};