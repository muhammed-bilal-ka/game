import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Zap, Brain, Mic, ArrowRight } from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { generateNewCase } from '../services/caseService';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentCase, setIsGeneratingCase } = useCase();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartNewCase = async () => {
    setIsLoading(true);
    setIsGeneratingCase(true);
    
    try {
      const newCase = await generateNewCase();
      setCurrentCase(newCase);
      navigate('/briefing');
    } catch (error) {
      console.error('Failed to generate case:', error);
    } finally {
      setIsLoading(false);
      setIsGeneratingCase(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8166307/pexels-photo-8166307.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/80"></div>
        
        {/* Fog Animation */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Detective Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/25">
              <Search className="text-gray-900" size={32} />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-500 bg-clip-text text-transparent">
              AI DETECTIVE
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-cyan-300 mb-4 font-mono font-bold">
            The Unsolved Case
          </p>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Step into the shadows of mystery. Use AI-powered investigation tools, voice commands, 
            and procedurally generated cases to solve crimes that have baffled detectives for decades.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleStartNewCase}
              disabled={isLoading}
              className="group relative bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-violet-400 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-cyan-500/25"
            >
              <div className="flex items-center space-x-3">
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Case...</span>
                  </>
                ) : (
                  <>
                    <span>Start New Case</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </>
                )}
              </div>
              
              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
            </button>

            <Link
              to="/briefing"
              className="border-2 border-cyan-400 text-cyan-400 px-10 py-5 rounded-xl font-bold text-lg hover:bg-cyan-400 hover:text-gray-900 transition-all"
            >
              View Demo Case
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Advanced Investigation Tools
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:border-cyan-400 transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-cyan-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/30 transition-colors">
                <Brain className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">AI-Generated Cases</h3>
              <p className="text-gray-400 leading-relaxed">
                Procedurally generated mysteries with unique suspects, evidence, and storylines powered by GPT-4o.
              </p>
            </div>

            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:border-violet-400 transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-violet-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-400/30 transition-colors">
                <Mic className="text-violet-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-violet-400">Voice Interaction</h3>
              <p className="text-gray-400 leading-relaxed">
                Question suspects using voice commands and receive emotionally realistic audio responses.
              </p>
            </div>

            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:border-cyan-400 transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-cyan-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/30 transition-colors">
                <Search className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Evidence Analysis</h3>
              <p className="text-gray-400 leading-relaxed">
                Examine AI-generated crime scenes, analyze clues, and piece together the truth.
              </p>
            </div>

            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:border-violet-400 transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-violet-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-400/30 transition-colors">
                <Zap className="text-violet-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-violet-400">Dynamic Difficulty</h3>
              <p className="text-gray-400 leading-relaxed">
                Cases become more complex as you solve them, challenging your detective skills.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;