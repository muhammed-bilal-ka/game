import React, { useState } from 'react';
import { Camera, FileText, Volume2, Search, ZoomIn, RotateCw } from 'lucide-react';

interface Evidence {
  id: string;
  title: string;
  type: 'photo' | 'document' | 'audio' | 'physical';
  description: string;
  image: string;
  date: string;
  location: string;
  significance: string;
  analysis: string[];
}

const evidence: Evidence[] = [
  {
    id: '1',
    title: 'Zodiac Cipher 408',
    type: 'document',
    description: 'The first cipher sent by the Zodiac Killer, containing 408 symbols',
    image: 'https://images.pexels.com/photos/8166310/pexels-photo-8166310.jpeg',
    date: 'July 31, 1969',
    location: 'Sent to newspapers',
    significance: 'Contains the killer\'s manifesto and motivation',
    analysis: [
      'Successfully decoded by Donald and Bettye Harden',
      'Reveals killer enjoys killing',
      'Claims victims will be slaves in afterlife',
      'Does not reveal killer\'s identity as promised'
    ]
  },
  {
    id: '2',
    title: 'Bloody Shirt Fragment',
    type: 'physical',
    description: 'Piece of Paul Stine\'s shirt taken by the killer',
    image: 'https://images.pexels.com/photos/8166312/pexels-photo-8166312.jpeg',
    date: 'October 11, 1969',
    location: 'Paul Stine crime scene',
    significance: 'Physical evidence linking Zodiac to the murder',
    analysis: [
      'Sent to newspapers as proof of authenticity',
      'Contains victim\'s blood',
      'Demonstrates killer\'s psychological need for attention',
      'Used for potential DNA analysis in modern investigations'
    ]
  },
  {
    id: '3',
    title: 'Lake Berryessa Car Door',
    type: 'photo',
    description: 'Writing left by Zodiac on Bryan Hartnell\'s car door',
    image: 'https://images.pexels.com/photos/8166314/pexels-photo-8166314.jpeg',
    date: 'September 27, 1969',
    location: 'Lake Berryessa, Napa County',
    significance: 'First confirmed use of the Zodiac symbol',
    analysis: [
      'Written in black felt-tip pen',
      'Includes dates of previous attacks',
      'Shows planning and organization',
      'Handwriting analysis potential'
    ]
  },
  {
    id: '4',
    title: 'Police Sketch',
    type: 'document',
    description: 'Composite sketch based on witness descriptions',
    image: 'https://images.pexels.com/photos/8166316/pexels-photo-8166316.jpeg',
    date: 'October 1969',
    location: 'San Francisco Police Department',
    significance: 'Primary visual identification of suspect',
    analysis: [
      'Based on teenage witnesses at Stine murder',
      'White male, 35-45 years old',
      'Heavy build, crew cut hair',
      'Glasses, possibly prescription'
    ]
  }
];

const EvidenceLocker: React.FC = () => {
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');
  const [filter, setFilter] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="text-blue-400" size={20} />;
      case 'document': return <FileText className="text-green-400" size={20} />;
      case 'audio': return <Volume2 className="text-purple-400" size={20} />;
      case 'physical': return <Search className="text-red-400" size={20} />;
      default: return <FileText className="text-gray-400" size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'photo': return 'bg-blue-400/20 text-blue-400';
      case 'document': return 'bg-green-400/20 text-green-400';
      case 'audio': return 'bg-purple-400/20 text-purple-400';
      case 'physical': return 'bg-red-400/20 text-red-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  const filteredEvidence = filter === 'all' ? evidence : evidence.filter(item => item.type === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-green-400">Evidence Locker</h3>
        
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-200 focus:border-green-400 focus:outline-none"
          >
            <option value="all">All Evidence</option>
            <option value="photo">Photos</option>
            <option value="document">Documents</option>
            <option value="audio">Audio</option>
            <option value="physical">Physical</option>
          </select>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvidence.map((item) => (
            <div 
              key={item.id}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-green-400 transition-all cursor-pointer"
              onClick={() => {
                setSelectedEvidence(item.id);
                setViewMode('detail');
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className={`absolute top-4 right-4 p-2 rounded-lg ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{item.date}</span>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Detail View
        selectedEvidence && (
          <div className="space-y-6">
            <button
              onClick={() => setViewMode('grid')}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              ← Back to Evidence Grid
            </button>
            
            {(() => {
              const item = evidence.find(e => e.id === selectedEvidence);
              if (!item) return null;
              
              return (
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="relative bg-gray-800 rounded-xl overflow-hidden mb-4">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white hover:text-green-400 transition-colors">
                          <ZoomIn size={20} />
                        </button>
                        <button className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white hover:text-green-400 transition-colors">
                          <RotateCw size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <button className="px-4 py-2 bg-green-400 text-gray-900 rounded-lg font-semibold hover:bg-green-300 transition-colors">
                        Enhance Image
                      </button>
                      <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                          {getTypeIcon(item.type)}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-4">{item.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-1">Date Collected</h4>
                        <p className="text-gray-300">{item.date}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-1">Location</h4>
                        <p className="text-gray-300">{item.location}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">Significance</h4>
                      <p className="text-gray-300 leading-relaxed">{item.significance}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">Forensic Analysis</h4>
                      <ul className="space-y-2">
                        {item.analysis.map((point, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-gray-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )
      )}
    </div>
  );
};

export default EvidenceLocker;