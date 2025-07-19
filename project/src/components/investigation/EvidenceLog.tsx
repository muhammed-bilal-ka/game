import React, { useState } from 'react';
import { Search, ZoomIn, FileText, Camera, MapPin } from 'lucide-react';
import { useCase } from '../../context/CaseContext';

const EvidenceLog: React.FC = () => {
  const { currentCase } = useCase();
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');

  if (!currentCase) return null;

  const handleEvidenceSelect = (evidence: any) => {
    setSelectedEvidence(evidence);
    setViewMode('detail');
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="text-blue-400" size={20} />;
      case 'document': return <FileText className="text-green-400" size={20} />;
      case 'physical': return <Search className="text-red-400" size={20} />;
      default: return <FileText className="text-gray-400" size={20} />;
    }
  };

  const getEvidenceColor = (type: string) => {
    switch (type) {
      case 'photo': return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      case 'document': return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'physical': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">Evidence Log</h3>
            <p className="text-gray-400">Examine collected evidence and clues</p>
          </div>
          
          {viewMode === 'detail' && (
            <button
              onClick={() => setViewMode('grid')}
              className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to Grid
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCase.evidence.map((evidence) => (
              <div
                key={evidence.id}
                onClick={() => handleEvidenceSelect(evidence)}
                className="group cursor-pointer bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-yellow-400 transition-all transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={evidence.image}
                    alt={evidence.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  <div className={`absolute top-4 right-4 p-2 rounded-lg border ${getEvidenceColor('photo')}`}>
                    {getEvidenceIcon('photo')}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-lg font-bold text-white mb-1">{evidence.title}</h4>
                    <p className="text-gray-300 text-sm line-clamp-2">{evidence.description}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{evidence.location}</span>
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                      <ZoomIn size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          selectedEvidence && (
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Evidence Image */}
                <div>
                  <div className="relative bg-gray-800 rounded-xl overflow-hidden mb-4">
                    <img
                      src={selectedEvidence.image}
                      alt={selectedEvidence.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white hover:text-yellow-400 transition-colors">
                        <ZoomIn size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                      Enhance Image
                    </button>
                    <button className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                      Forensic Analysis
                    </button>
                  </div>
                </div>
                
                {/* Evidence Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg border ${getEvidenceColor('photo')}`}>
                        {getEvidenceIcon('photo')}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{selectedEvidence.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{selectedEvidence.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-400 mb-1">Location Found</h4>
                      <p className="text-gray-300">{selectedEvidence.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-400 mb-1">Evidence Type</h4>
                      <p className="text-gray-300">Physical Evidence</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">Significance</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedEvidence.significance}</p>
                  </div>
                  
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">AI Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">High-resolution imaging reveals microscopic details</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">Pattern analysis suggests deliberate placement</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">Cross-reference with suspect profiles recommended</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EvidenceLog;