import React, { useState } from 'react';
import { MapPin, Camera, Users, Search } from 'lucide-react';
import { useCase } from '../../context/CaseContext';

const LocationsMap: React.FC = () => {
  const { currentCase } = useCase();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  if (!currentCase) return null;

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-6">
        <h3 className="text-2xl font-bold text-white">Crime Scene Locations</h3>
        <p className="text-gray-400">Explore key locations and their connections</p>
      </div>

      <div className="flex-1 flex">
        {/* Locations List */}
        <div className="w-1/3 bg-gray-800/30 border-r border-gray-700 p-6 overflow-y-auto">
          <h4 className="text-lg font-bold text-white mb-4">Key Locations</h4>
          
          <div className="space-y-4">
            {currentCase.locations.map((location) => (
              <div
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  selectedLocation?.id === location.id
                    ? 'border-green-400 bg-green-400/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                    <MapPin className="text-green-400" size={20} />
                  </div>
                  <h5 className="font-bold text-white">{location.name}</h5>
                </div>
                
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                  {location.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Camera size={12} />
                    <span>{location.evidence.length} evidence</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={12} />
                    <span>{location.witnesses.length} witnesses</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Detail */}
        <div className="flex-1 p-6">
          {selectedLocation ? (
            <div className="max-w-4xl mx-auto">
              {/* Location Header */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center">
                    <MapPin className="text-green-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedLocation.name}</h3>
                    <p className="text-gray-400">Crime Scene Location</p>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {selectedLocation.description}
                </p>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-bold text-green-400 mb-4">Interactive Map</h4>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-400">Interactive map visualization</p>
                    <p className="text-gray-500 text-sm">Click zones to explore evidence</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Evidence at Location */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-yellow-400 mb-4 flex items-center space-x-2">
                    <Camera size={20} />
                    <span>Evidence Found Here</span>
                  </h4>
                  
                  {selectedLocation.evidence.length > 0 ? (
                    <div className="space-y-3">
                      {selectedLocation.evidence.map((evidenceId: string, index: number) => {
                        const evidence = currentCase.evidence.find((e) => e.id === evidenceId);
                        return evidence ? (
                          <div key={evidenceId} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                            <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                              <Search className="text-yellow-400" size={16} />
                            </div>
                            <div>
                              <h5 className="font-semibold text-white text-sm">{evidence.title}</h5>
                              <p className="text-gray-400 text-xs">{evidence.description}</p>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No evidence found at this location</p>
                  )}
                </div>

                {/* Witnesses */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center space-x-2">
                    <Users size={20} />
                    <span>Witnesses</span>
                  </h4>
                  
                  {selectedLocation.witnesses.length > 0 ? (
                    <div className="space-y-3">
                      {selectedLocation.witnesses.map((witnessId: string, index: number) => (
                        <div key={witnessId} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                            <Users className="text-blue-400" size={16} />
                          </div>
                          <div>
                            <h5 className="font-semibold text-white text-sm">Witness #{index + 1}</h5>
                            <p className="text-gray-400 text-xs">Available for questioning</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No witnesses at this location</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">Select a Location</h3>
                <p className="text-gray-500">Choose a location from the list to explore</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationsMap;