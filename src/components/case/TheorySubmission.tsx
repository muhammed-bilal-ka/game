import React, { useState } from 'react';
import { Send, Star, Trophy, Users, Lightbulb } from 'lucide-react';

interface Theory {
  id: string;
  author: string;
  title: string;
  theory: string;
  evidence: string[];
  rating: number;
  votes: number;
  date: string;
}

const popularTheories: Theory[] = [
  {
    id: '1',
    author: 'DetectiveM92',
    title: 'The Military Connection Theory',
    theory: 'The Zodiac killer was likely someone with military training, explaining the tactical approach to attacks and knowledge of weapons. The discipline and organization suggest formal training.',
    evidence: ['Precise shooting', 'Strategic locations', 'Military-style cipher knowledge', 'Tactical approach to crimes'],
    rating: 4.2,
    votes: 847,
    date: '2024-01-15'
  },
  {
    id: '2',
    author: 'CipherSolver',
    title: 'The Newspaper Employee Theory',
    theory: 'The killer worked at or had access to newspaper operations, explaining the intimate knowledge of media cycles and the sophisticated way letters were crafted for maximum impact.',
    evidence: ['Knowledge of newspaper deadlines', 'Understanding of media psychology', 'Access to distribution methods', 'Professional letter formatting'],
    rating: 3.9,
    votes: 623,
    date: '2024-01-12'
  }
];

const TheorySubmission: React.FC = () => {
  const [theoryTitle, setTheoryTitle] = useState('');
  const [theoryContent, setTheoryContent] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);
  const [showSubmission, setShowSubmission] = useState(false);

  const evidenceOptions = [
    'Zodiac Cipher 408',
    'Bloody Shirt Fragment',
    'Lake Berryessa Car Door',
    'Police Sketch',
    'Witness Testimony',
    'Ballistics Evidence',
    'Handwriting Analysis',
    'Timeline Correlation'
  ];

  const handleEvidenceToggle = (evidence: string) => {
    setSelectedEvidence(prev => 
      prev.includes(evidence) 
        ? prev.filter(e => e !== evidence)
        : [...prev, evidence]
    );
  };

  const handleSubmitTheory = () => {
    if (theoryTitle && theoryContent && selectedEvidence.length > 0) {
      setShowSubmission(true);
      // Here you would typically send the theory to your backend
      setTimeout(() => {
        setShowSubmission(false);
        setTheoryTitle('');
        setTheoryContent('');
        setSelectedEvidence([]);
      }, 3000);
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-green-400">Submit Your Theory</h3>
      
      {showSubmission ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-green-400" size={32} />
          </div>
          <h4 className="text-2xl font-bold text-green-400 mb-2">Theory Submitted!</h4>
          <p className="text-gray-300">Your theory is now under review by the detective community.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Theory Submission Form */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center space-x-2">
                <Lightbulb size={20} />
                <span>Your Theory</span>
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Theory Title
                  </label>
                  <input
                    type="text"
                    value={theoryTitle}
                    onChange={(e) => setTheoryTitle(e.target.value)}
                    placeholder="Give your theory a compelling title..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-green-400 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Detailed Theory
                  </label>
                  <textarea
                    value={theoryContent}
                    onChange={(e) => setTheoryContent(e.target.value)}
                    placeholder="Explain your theory in detail. What do you think happened? Who was the killer? Why did they act this way?"
                    rows={8}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-green-400 focus:outline-none resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Supporting Evidence (Select at least one)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {evidenceOptions.map((evidence) => (
                      <label 
                        key={evidence}
                        className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedEvidence.includes(evidence)}
                          onChange={() => handleEvidenceToggle(evidence)}
                          className="text-green-400 bg-gray-600 border-gray-500 rounded focus:ring-green-400"
                        />
                        <span className="text-sm text-gray-300">{evidence}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleSubmitTheory}
                  disabled={!theoryTitle || !theoryContent || selectedEvidence.length === 0}
                  className="w-full bg-green-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-green-300 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Submit Theory</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Popular Theories */}
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center space-x-2">
              <Star size={20} />
              <span>Popular Community Theories</span>
            </h4>
            
            <div className="space-y-4">
              {popularTheories.map((theory) => (
                <div key={theory.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="text-lg font-bold text-white mb-1">{theory.title}</h5>
                      <p className="text-sm text-gray-400">by {theory.author} • {theory.date}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400" size={14} />
                        <span>{theory.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{theory.votes}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {theory.theory}
                  </p>
                  
                  <div>
                    <h6 className="text-sm font-semibold text-green-400 mb-2">Key Evidence:</h6>
                    <div className="flex flex-wrap gap-2">
                      {theory.evidence.map((evidence, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                        >
                          {evidence}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheorySubmission;