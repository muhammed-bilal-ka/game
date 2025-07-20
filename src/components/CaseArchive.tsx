import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, MapPin, Star, Filter } from 'lucide-react';

interface Case {
  id: string;
  title: string;
  location: string;
  year: string;
  difficulty: 'Easy' | 'Moderate' | 'Twisted';
  category: string;
  description: string;
  image: string;
  rating: number;
  participants: number;
  tags: string[];
}

const cases: Case[] = [
  {
    id: 'zodiac-killer',
    title: 'The Zodiac Killer',
    location: 'California, USA',
    year: '1968-1969',
    difficulty: 'Twisted',
    category: 'Serial Killer',
    description: 'A serial killer who terrorized Northern California with cryptic letters and unsolved ciphers.',
    image: 'https://images.pexels.com/photos/8166295/pexels-photo-8166295.jpeg',
    rating: 4.8,
    participants: 15420,
    tags: ['Murder', 'Cipher', 'Unsolved', 'Serial']
  },
  {
    id: 'isdal-woman',
    title: 'The Isdal Woman',
    location: 'Bergen, Norway',
    year: '1970',
    difficulty: 'Moderate',
    category: 'Mysterious Death',
    description: 'An unidentified woman found dead in a remote valley with evidence of espionage.',
    image: 'https://images.pexels.com/photos/8166299/pexels-photo-8166299.jpeg',
    rating: 4.6,
    participants: 8930,
    tags: ['Mystery', 'Identity', 'Espionage', 'Death']
  },
  {
    id: 'somerton-man',
    title: 'The Somerton Man (Tamam Shud)',
    location: 'Adelaide, Australia',
    year: '1948',
    difficulty: 'Twisted',
    category: 'Mysterious Death',
    description: 'An unidentified man found dead on a beach with a mysterious code and no identification.',
    image: 'https://images.pexels.com/photos/8166301/pexels-photo-8166301.jpeg',
    rating: 4.7,
    participants: 12150,
    tags: ['Code', 'Identity', 'Death', 'Literature']
  },
  {
    id: 'dyatlov-pass',
    title: 'Dyatlov Pass Incident',
    location: 'Ural Mountains, Russia',
    year: '1959',
    difficulty: 'Twisted',
    category: 'Mysterious Death',
    description: 'Nine hikers died under mysterious circumstances in the Ural Mountains.',
    image: 'https://images.pexels.com/photos/8166304/pexels-photo-8166304.jpeg',
    rating: 4.9,
    participants: 18750,
    tags: ['Group Death', 'Mountains', 'Unexplained', 'Weather']
  },
  {
    id: 'jill-dando',
    title: 'Jill Dando Murder',
    location: 'London, England',
    year: '1999',
    difficulty: 'Moderate',
    category: 'Celebrity Murder',
    description: 'BBC presenter shot dead outside her home in a case that shocked the nation.',
    image: 'https://images.pexels.com/photos/8166306/pexels-photo-8166306.jpeg',
    rating: 4.4,
    participants: 7820,
    tags: ['Celebrity', 'Murder', 'Media', 'Assassination']
  },
  {
    id: 'sodder-children',
    title: 'The Sodder Children',
    location: 'West Virginia, USA',
    year: '1945',
    difficulty: 'Easy',
    category: 'Missing Persons',
    description: 'Five children disappeared after a house fire, with no bodies ever found.',
    image: 'https://images.pexels.com/photos/8166308/pexels-photo-8166308.jpeg',
    rating: 4.3,
    participants: 6420,
    tags: ['Missing', 'Children', 'Fire', 'Family']
  }
];

const CaseArchive: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredCases = cases.filter(case_ => {
    const matchesDifficulty = selectedDifficulty === 'All' || case_.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || case_.category === selectedCategory;
    return matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Moderate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Twisted': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen pt-20 px-6 py-12">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Case Archive
          </h1>
          <p className="text-xl text-gray-400 font-mono">
            Choose your investigation. Every case is real. Every clue matters.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
          <div className="flex items-center space-x-2">
            <Filter className="text-green-400" size={20} />
            <span className="text-green-400 font-semibold">Filters:</span>
          </div>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-200 focus:border-green-400 focus:outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Twisted">Twisted</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-200 focus:border-green-400 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Serial Killer">Serial Killer</option>
            <option value="Mysterious Death">Mysterious Death</option>
            <option value="Celebrity Murder">Celebrity Murder</option>
            <option value="Missing Persons">Missing Persons</option>
          </select>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((case_) => (
            <Link 
              key={case_.id}
              to={`/case/${case_.id}`}
              className="group block"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-green-400 transition-all transform hover:-translate-y-2 hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={case_.image} 
                    alt={case_.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(case_.difficulty)}`}>
                    {case_.difficulty}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-green-400 group-hover:text-green-300 transition-colors">
                    {case_.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{case_.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{case_.year}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {case_.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {case_.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400" size={14} />
                      <span>{case_.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{case_.participants.toLocaleString()} investigators</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseArchive;