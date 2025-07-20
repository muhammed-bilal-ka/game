import React, { useState } from 'react';
import { MessageSquare, Users, Search, MapPin, FileText, Target } from 'lucide-react';
import { useCase } from '../context/CaseContext';
import ChatInterface from './investigation/ChatInterface';
import SuspectDossier from './investigation/SuspectDossier';
import EvidenceLog from './investigation/EvidenceLog';
import LocationsMap from './investigation/LocationsMap';
import DetectiveNotes from './investigation/DetectiveNotes';
import DeductionPanel from './investigation/DeductionPanel';

type ActivePanel = 'chat' | 'suspects' | 'evidence' | 'locations' | 'notes' | 'deduction';

const InvestigationDashboard: React.FC = () => {
  const { currentCase } = useCase();
  const [activePanel, setActivePanel] = useState<ActivePanel>('chat');

  if (!currentCase) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">No Active Case</h2>
          <p className="text-gray-400">Please start a new case from the home page</p>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { id: 'chat', label: 'AI Chat', icon: MessageSquare, color: 'cyan' },
    { id: 'suspects', label: 'Suspects', icon: Users, color: 'red' },
    { id: 'evidence', label: 'Evidence', icon: Search, color: 'yellow' },
    { id: 'locations', label: 'Locations', icon: MapPin, color: 'green' },
    { id: 'notes', label: 'Notes', icon: FileText, color: 'blue' },
    { id: 'deduction', label: 'Solve', icon: Target, color: 'violet' }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      cyan: isActive ? 'bg-cyan-500 text-white' : 'text-cyan-400 hover:bg-cyan-500/20',
      red: isActive ? 'bg-red-500 text-white' : 'text-red-400 hover:bg-red-500/20',
      yellow: isActive ? 'bg-yellow-500 text-black' : 'text-yellow-400 hover:bg-yellow-500/20',
      green: isActive ? 'bg-green-500 text-white' : 'text-green-400 hover:bg-green-500/20',
      blue: isActive ? 'bg-blue-500 text-white' : 'text-blue-400 hover:bg-blue-500/20',
      violet: isActive ? 'bg-violet-500 text-white' : 'text-violet-400 hover:bg-violet-500/20'
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'chat':
        return <ChatInterface />;
      case 'suspects':
        return <SuspectDossier />;
      case 'evidence':
        return <EvidenceLog />;
      case 'locations':
        return <LocationsMap />;
      case 'notes':
        return <DetectiveNotes />;
      case 'deduction':
        return <DeductionPanel />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="flex h-[calc(100vh-5rem)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Case Header */}
          <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">{currentCase.title}</h1>
                <p className="text-gray-400 font-mono">Case ID: {currentCase.id}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Investigation Progress</div>
                <div className="w-32 h-2 bg-gray-700 rounded-full mt-1">
                  <div className="w-1/3 h-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Panel Content */}
          <div className="flex-1 overflow-hidden">
            {renderActivePanel()}
          </div>
        </div>

        {/* Right Sidebar - Navigation */}
        <div className="w-20 bg-gray-800/50 backdrop-blur-sm border-l border-gray-700 flex flex-col items-center py-6 space-y-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id as ActivePanel)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${getColorClasses(item.color, isActive)}`}
                title={item.label}
              >
                <Icon size={20} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvestigationDashboard;