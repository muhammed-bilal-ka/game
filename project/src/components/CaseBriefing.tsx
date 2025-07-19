import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, User, ArrowRight, Clock, AlertTriangle } from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { generateNewCase } from '../services/caseService';

const CaseBriefing: React.FC = () => {
  const navigate = useNavigate();
  const { currentCase, setCurrentCase, isGeneratingCase, setIsGeneratingCase } = useCase();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentCase && !isGeneratingCase) {
      generateDemoCase();
    }
  }, [currentCase, isGeneratingCase]);

  const generateDemoCase = async () => {
    setIsLoading(true);
    setIsGeneratingCase(true);
    
    try {
      const newCase = await generateNewCase();
      setCurrentCase(newCase);
    } catch (error) {
      console.error('Failed to generate case:', error);
    } finally {
      setIsLoading(false);
      setIsGeneratingCase(false);
    }
  };

  const handleBeginInvestigation = () => {
    navigate('/investigation');
  };

  if (isLoading || !currentCase) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Generating Case...</h2>
          <p className="text-gray-400">AI is creating a unique mystery for you to solve</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6 py-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full mb-4">
            <AlertTriangle size={16} />
            <span className="text-sm font-bold">CASE BRIEFING</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            {currentCase.title}
          </h1>
          <p className="text-xl text-gray-400 font-mono">
            Case ID: {currentCase.id}
          </p>
        </div>

        {/* Case Details Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Crime Scene Image */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-800 border border-gray-700">
              <img 
                src={currentCase.crimeSceneImage}
                alt="Crime Scene"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-red-400 mb-2">Crime Scene</h3>
                  <p className="text-gray-300 text-sm">
                    Initial investigation site - evidence collection in progress
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Information */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">Case Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <User className="text-red-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Victim</h4>
                    <p className="text-gray-400">{currentCase.victim}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="text-yellow-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Time of Incident</h4>
                    <p className="text-gray-400">{currentCase.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Location</h4>
                    <p className="text-gray-400">{currentCase.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Description */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Initial Report</h3>
              <p className="text-gray-300 leading-relaxed">
                {currentCase.description}
              </p>
            </div>

            {/* Investigation Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{currentCase.suspects.length}</div>
                <div className="text-sm text-gray-400">Suspects</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-violet-400">{currentCase.evidence.length}</div>
                <div className="text-sm text-gray-400">Evidence</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{currentCase.locations.length}</div>
                <div className="text-sm text-gray-400">Locations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Begin Investigation CTA */}
        <div className="text-center">
          <button
            onClick={handleBeginInvestigation}
            className="group bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-cyan-400 hover:to-violet-400 transition-all transform hover:scale-105 shadow-2xl shadow-cyan-500/25"
          >
            <div className="flex items-center space-x-3">
              <span>Begin Investigation</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </div>
          </button>
          
          <p className="text-gray-400 mt-4 text-sm">
            Use voice commands, examine evidence, and question suspects to solve the case
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseBriefing;