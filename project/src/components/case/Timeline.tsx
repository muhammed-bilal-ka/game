import React, { useState } from 'react';
import { Calendar, MapPin, Users, AlertTriangle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  type: 'attack' | 'communication' | 'investigation' | 'evidence';
  details?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: 'December 20, 1968',
    title: 'Lake Herman Road Murders',
    description: 'Betty Lou Jensen (16) and David Faraday (17) shot and killed',
    location: 'Benicia, California',
    type: 'attack',
    details: [
      'Couple found shot near their car',
      'Jensen shot 5 times in the back while running',
      'Faraday shot once in the head at point-blank range',
      'No robbery motive apparent'
    ]
  },
  {
    id: '2',
    date: 'July 4, 1969',
    title: 'Blue Rock Springs Attack',
    description: 'Darlene Ferrin killed, Michael Mageau wounded',
    location: 'Vallejo, California',
    type: 'attack',
    details: [
      'Couple attacked in their car at a lovers lane',
      'Attacker approached with flashlight',
      'Ferrin died en route to hospital',
      'Mageau survived and provided description'
    ]
  },
  {
    id: '3',
    date: 'July 31, 1969',
    title: 'First Zodiac Letters',
    description: 'Three identical letters sent to newspapers with cipher',
    location: 'San Francisco Bay Area',
    type: 'communication',
    details: [
      'Letters sent to San Francisco Chronicle, Examiner, and Vallejo Times-Herald',
      'Each contained 1/3 of a 408-character cipher',
      'Demanded publication on front page',
      'Threatened to kill more if not published'
    ]
  },
  {
    id: '4',
    date: 'August 1, 1969',
    title: 'Cipher Solved',
    description: 'Donald and Bettye Harden crack the 408-symbol cipher',
    location: 'Salinas, California',
    type: 'investigation',
    details: [
      'High school teacher and wife solved cipher',
      'Message: "I like killing people because it is so much fun..."',
      'Revealed killer\'s motivation',
      'Did not reveal identity as promised'
    ]
  },
  {
    id: '5',
    date: 'September 27, 1969',
    title: 'Lake Berryessa Attack',
    description: 'Bryan Hartnell and Cecelia Shepard attacked',
    location: 'Napa County, California',
    type: 'attack',
    details: [
      'Couple approached by hooded attacker',
      'Attacker claimed to be escaped convict',
      'Both stabbed repeatedly',
      'Hartnell survived, Shepard died 2 days later'
    ]
  },
  {
    id: '6',
    date: 'October 11, 1969',
    title: 'Paul Stine Murder',
    description: 'Taxi driver shot in San Francisco',
    location: 'San Francisco, California',
    type: 'attack',
    details: [
      'Stine shot once in the head',
      'Killer took pieces of Stine\'s shirt',
      'Witnessed by teenagers across the street',
      'Police initially misidentified as robbery'
    ]
  }
];

const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attack': return <AlertTriangle className="text-red-400" size={20} />;
      case 'communication': return <MapPin className="text-blue-400" size={20} />;
      case 'investigation': return <Users className="text-green-400" size={20} />;
      case 'evidence': return <Calendar className="text-yellow-400" size={20} />;
      default: return <Calendar className="text-gray-400" size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'attack': return 'border-red-400 bg-red-400/10';
      case 'communication': return 'border-blue-400 bg-blue-400/10';
      case 'investigation': return 'border-green-400 bg-green-400/10';
      case 'evidence': return 'border-yellow-400 bg-yellow-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-green-400 mb-6">Case Timeline</h3>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-green-400 via-cyan-400 to-green-400"></div>
        
        {/* Timeline Events */}
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline Dot */}
              <div className={`absolute left-3 w-6 h-6 rounded-full border-2 ${getTypeColor(event.type)} flex items-center justify-center`}>
                {getTypeIcon(event.type)}
              </div>
              
              {/* Event Card */}
              <div className="ml-16">
                <div 
                  className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 cursor-pointer transition-all hover:border-green-400 ${
                    selectedEvent === event.id ? 'border-green-400 bg-gray-800/70' : ''
                  }`}
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm text-green-400 font-mono mb-1">{event.date}</div>
                      <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  {selectedEvent === event.id && event.details && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <h5 className="text-lg font-semibold text-green-400 mb-3">Key Details:</h5>
                      <ul className="space-y-2">
                        {event.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-gray-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;