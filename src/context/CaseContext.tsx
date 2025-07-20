import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Suspect {
  id: string;
  name: string;
  role: string;
  bio: string;
  alibi: string;
  mood: string;
  image: string;
  chatHistory: ChatMessage[];
}

interface Evidence {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  significance: string;
}

interface Location {
  id: string;
  name: string;
  description: string;
  evidence: string[];
  witnesses: string[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'suspect';
  message: string;
  timestamp: Date;
  audio?: string;
}

interface Case {
  id: string;
  title: string;
  victim: string;
  time: string;
  location: string;
  description: string;
  crimeSceneImage: string;
  suspects: Suspect[];
  evidence: Evidence[];
  locations: Location[];
  solution: {
    suspect: string;
    motive: string;
    method: string;
  };
}

interface CaseContextType {
  currentCase: Case | null;
  setCurrentCase: (case_: Case | null) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  notes: string;
  setNotes: (notes: string) => void;
  selectedSuspect: Suspect | null;
  setSelectedSuspect: (suspect: Suspect | null) => void;
  isGeneratingCase: boolean;
  setIsGeneratingCase: (loading: boolean) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const CaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [notes, setNotes] = useState('');
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);
  const [isGeneratingCase, setIsGeneratingCase] = useState(false);

  const addChatMessage = (message: ChatMessage) => {
    setChatHistory(prev => [...prev, message]);
  };

  return (
    <CaseContext.Provider value={{
      currentCase,
      setCurrentCase,
      chatHistory,
      addChatMessage,
      notes,
      setNotes,
      selectedSuspect,
      setSelectedSuspect,
      isGeneratingCase,
      setIsGeneratingCase
    }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = () => {
  const context = useContext(CaseContext);
  if (context === undefined) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
};