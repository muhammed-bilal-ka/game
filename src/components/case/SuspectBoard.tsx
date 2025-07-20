import React, { useState } from 'react';
import { User, MapPin, Calendar, AlertTriangle, Eye, Brain } from 'lucide-react';

interface Suspect {
  id: string;
  name: string;
  age: string;
  location: string;
  occupation: string;
  description: string;
  image: string;
  suspicionLevel: 'Low' | 'Medium' | 'High';
  alibi: string;
  connections: string[];
  evidence: string[];
  psychProfile: string[];
}

const suspects: Suspect[] = [
  {
    id: '1',
    name: 'Arthur Leigh Allen',
    age: '36 (in 1969)',
    location: 'Vallejo, California',
    occupation: 'Elementary School Teacher',
    description: 'Former prime suspect investigated extensively by police',
    image: 'https://images.pexels.com/photos/8166318/pexels-photo-8166318.jpeg',
    suspicionLevel: 'High',
    alibi: 'Claimed to be hunting during attacks',
    connections: [
      'Lived near crime scenes',
      'Owned similar weapons',
      'Interest in cryptography',
      'Violent tendencies reported'
    ],
    evidence: [
      'Circumstantial evidence only',
      'Handwriting did not match',
      'DNA tests inconclusive',
      'No direct physical evidence'
    ],
    psychProfile: [
      'History of violence against children',
      'Fascination with killing',
      'Narcissistic personality traits',
      'Desire for attention and control'
    ]
  },
  {
    id: '2',
    name: 'Richard Gaikowski',
    age: '27 (in 1969)',
    location: 'San Francisco, California',
    occupation: 'Newspaper Editor',
    description: 'Worked at newspaper that received Zodiac letters',
    image: 'https://images.pexels.com/photos/8166320/pexels-photo-8166320.jpeg',
    suspicionLevel: 'Medium',
    alibi: 'Work schedule partially verified',
    connections: [
      'Access to newspaper distribution',
      'Knowledge of media operations',
      'Lived in area during active period',
      'Interest in codes and puzzles'
    ],
    evidence: [
      'Voice comparison matches',
      'Similar handwriting style',
      'Access to crime scene information',
      'No solid physical evidence'
    ],
    psychProfile: [
      'Highly intelligent',
      'Media manipulation skills',
      'Attention-seeking behavior',
      'Possible antisocial tendencies'
    ]
  },
  {
    id: '3',
    name: 'Lawrence Kane',
    age: '34 (in 1969)',
    location: 'South Lake Tahoe, California',
    occupation: 'Various odd jobs',
    description: 'Suffered brain injury in 1962, personality changed',
    image: 'https://images.pexels.com/photos/8166322/pexels-photo-8166322.jpeg',
    suspicionLevel: 'Medium',
    alibi: 'Inconsistent accounts',
    connections: [
      'Brain injury causing personality change',
      'Violent episodes after injury',
      'Knowledge of Bay Area',
      'Military background'
    ],
    evidence: [
      'Witness identification uncertain',
      'No conclusive physical evidence',
      'Timeline partially matches',
      'Behavioral changes noted'
    ],
    psychProfile: [
      'Traumatic brain injury effects',
      'Impulse control issues',
      'Violent outbursts',
      'Possible dissociative episodes'
    ]
  }
];

const SuspectBoard: React.FC = () => {
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);

  const getSuspicionColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-400/20 text-green-400';
      case 'Medium': return 'bg-yellow-400/20 text-yellow-400';
      case 'High': return 'bg-red-400/20 text-red-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-green-400 mb-6">Suspect Board</h3>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {suspects.map((suspect) => (
          <div 
            key={suspect.id}
            className={`group bg-gray-800/50 backdrop-blur-sm border rounded-xl overflow-hidden transition-all cursor-pointer ${
              selectedSuspect === suspect.id 
                ? 'border-green-400 bg-gray-800/70' 
                : 'border-gray-700 hover:border-green-400'
            }`}
            onClick={() => setSelectedSuspect(selectedSuspect === suspect.id ? null : suspect.id)}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={suspect.image}
                alt={suspect.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${getSuspicionColor(suspect.suspicionLevel)}`}>
                {suspect.suspicionLevel} Risk
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-xl font-bold text-white mb-1">{suspect.name}</h4>
                <p className="text-gray-300 text-sm">{suspect.occupation}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar size={16} />
                  <span className="text-sm">{suspect.age}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin size={16} />
                  <span className="text-sm">{suspect.location}</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                {suspect.description}
              </p>
              
              {selectedSuspect === suspect.id && (
                <div className="mt-6 pt-6 border-t border-gray-700 space-y-6">
                  <div>
                    <h5 className="text-lg font-semibold text-green-400 mb-3 flex items-center space-x-2">
                      <AlertTriangle size={18} />
                      <span>Key Connections</span>
                    </h5>
                    <ul className="space-y-2">
                      {suspect.connections.map((connection, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-gray-300">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{connection}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-semibold text-green-400 mb-3 flex items-center space-x-2">
                      <Eye size={18} />
                      <span>Evidence Status</span>
                    </h5>
                    <ul className="space-y-2">
                      {suspect.evidence.map((evidence, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-gray-300">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{evidence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-semibold text-green-400 mb-3 flex items-center space-x-2">
                      <Brain size={18} />
                      <span>Psychological Profile</span>
                    </h5>
                    <ul className="space-y-2">
                      {suspect.psychProfile.map((trait, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-gray-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h5 className="text-sm font-semibold text-green-400 mb-2">Reported Alibi</h5>
                    <p className="text-gray-300 text-sm">{suspect.alibi}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuspectBoard;