import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { isVoiceEnabled, toggleVoice, pauseChat, setPauseChat, stopSpeaking, stopListening } = useVoice();

  const handlePauseToggle = () => {
    setPauseChat(!pauseChat);
    if (!pauseChat) {
      stopSpeaking();
      stopListening();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-cyan-500/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-lg flex items-center justify-center">
              <Search className="text-gray-900" size={20} />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                AI Detective
              </span>
              <div className="text-xs text-gray-400 font-mono">The Unsolved Case</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors font-medium ${
                location.pathname === '/' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/briefing" 
              className={`transition-colors font-medium ${
                location.pathname === '/briefing' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Case Briefing
            </Link>
            <Link 
              to="/investigation" 
              className={`transition-colors font-medium ${
                location.pathname === '/investigation' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Investigation
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePauseToggle}
              className={`p-2 rounded-lg transition-all ${
                pauseChat 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              title={pauseChat ? 'Resume Chat' : 'Pause Chat'}
            >
              {pauseChat ? <Play size={18} /> : <Pause size={18} />}
            </button>
            
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-all ${
                isVoiceEnabled 
                  ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              title={isVoiceEnabled ? 'Disable Voice' : 'Enable Voice'}
            >
              {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;