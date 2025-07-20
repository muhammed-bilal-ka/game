import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Eye, FileText, Camera, Mic, Target, Clock, Star } from 'lucide-react';
import Timeline from './case/Timeline';
import EvidenceLocker from './case/EvidenceLocker';
import SuspectBoard from './case/SuspectBoard';
import TheorySubmission from './case/TheorySubmission';

const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'story' | 'timeline' | 'evidence' | 'suspects' | 'theories'>('story');

  // Mock case data - in real app this would come from an API
  const caseData = {
    id: 'zodiac-killer',
    title: 'The Zodiac Killer',
    subtitle: 'The Phantom of San Francisco',
    location: 'Northern California, USA',
    dateRange: '1968-1969',
    status: 'Cold Case',
    difficulty: 'Twisted',
    rating: 4.8,
    participants: 15420,
    description: 'Between December 1968 and October 1969, the Zodiac Killer murdered at least five people in Northern California. The case became infamous due to the killer\'s taunting letters to local newspapers, which included cryptographic ciphers that have puzzled investigators for decades.',
    keyFacts: [
      'At least 5 confirmed victims, possibly more',
      'Sent cryptographic ciphers to newspapers',
      'Only one cipher has been definitively solved',
      'Last confirmed communication in 1974',
      'Case remains officially open'
    ],
    image: 'https://images.pexels.com/photos/8166295/pexels-photo-8166295.jpeg'
  };

  const tabs = [
    { id: 'story', label: 'Case Story', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'evidence', label: 'Evidence Locker', icon: Camera },
    { id: 'suspects', label: 'Suspect Board', icon: Target },
    { id: 'theories', label: 'Submit Theory', icon: Eye }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline':
        return <Timeline />;
      case 'evidence':
        return <EvidenceLocker />;
      case 'suspects':
        return <SuspectBoard />;
      case 'theories':
        return <TheorySubmission />;
      default:
        return (
          <div className="prose prose-invert max-w-none">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-green-400 mb-6">The Investigation</h3>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    The Zodiac Killer case began on December 20, 1968, when high school students Betty Lou Jensen and David Faraday were shot and killed on Lake Herman Road in Benicia, California. This marked the beginning of one of America's most notorious unsolved serial killer cases.
                  </p>
                  <p>
                    What made the Zodiac Killer unique was not just the brutality of the crimes, but the psychological warfare waged through cryptographic messages sent to local newspapers. The killer demanded these letters be published on the front page, threatening to kill more people if his demands were not met.
                  </p>
                  <p>
                    The most famous of these communications was the 408-symbol cryptogram sent in July 1969, which was eventually decoded by a high school teacher and his wife. The message read: "I like killing people because it is so much fun..."
                  </p>
                  <p>
                    Despite decades of investigation, advanced forensic techniques, and numerous suspects, the identity of the Zodiac Killer remains unknown. The case has inspired countless books, documentaries, and films, making it one of the most studied cold cases in criminal history.
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-green-400 mb-4">Key Facts</h4>
                  <ul className="space-y-3">
                    {caseData.keyFacts.map((fact, index) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-20 px-6 py-12">
      <div className="container mx-auto max-w-7xl">
        {/* Case Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-3 gap-8 p-8">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-red-400/20 text-red-400 rounded-full text-sm font-bold">
                    {caseData.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {caseData.status}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  {caseData.title}
                </h1>
                <p className="text-xl text-gray-400 mb-6 font-mono">
                  {caseData.subtitle}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin className="text-green-400" size={18} />
                    <span>{caseData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="text-green-400" size={18} />
                    <span>{caseData.dateRange}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Star className="text-yellow-400" size={18} />
                    <span>{caseData.rating} rating</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users className="text-green-400" size={18} />
                    <span>{caseData.participants.toLocaleString()} investigators</span>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {caseData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="relative h-64 lg:h-full rounded-xl overflow-hidden">
                  <img 
                    src={caseData.image}
                    alt={caseData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-400 text-gray-900'
                    : 'text-gray-300 hover:text-green-400 hover:bg-gray-700'
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;