import React, { useState } from 'react';
import { User, MessageSquare, Mic, MicOff, Volume2 } from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { useVoice } from '../../context/VoiceContext';
import { chatWithSuspect } from '../../services/aiService';

const SuspectDossier: React.FC = () => {
  const { currentCase, selectedSuspect, setSelectedSuspect } = useCase();
  const { isListening, isSpeaking, transcript, startListening, stopListening, speak, pauseChat } = useVoice();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!currentCase) return null;

  const handleSuspectSelect = (suspect: any) => {
    setSelectedSuspect(suspect);
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || message;
    if (!textToSend.trim() || !selectedSuspect || pauseChat) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user' as const,
      message: textToSend,
      timestamp: new Date()
    };

    selectedSuspect.chatHistory.push(userMessage);
    setMessage('');
    setIsTyping(true);

    try {
      const response = await chatWithSuspect(textToSend, selectedSuspect, currentCase);
      
      const suspectMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'suspect' as const,
        message: response,
        timestamp: new Date()
      };

      selectedSuspect.chatHistory.push(suspectMessage);
      
      if (!pauseChat) {
        speak(response);
      }
    } catch (error) {
      console.error('Suspect chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  React.useEffect(() => {
    if (transcript && selectedSuspect && !pauseChat) {
      setMessage(transcript);
      handleSendMessage(transcript);
    }
  }, [transcript, selectedSuspect, pauseChat]);

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'nervous': return 'text-yellow-400 bg-yellow-400/20';
      case 'angry': return 'text-red-400 bg-red-400/20';
      case 'calm': return 'text-green-400 bg-green-400/20';
      case 'defensive': return 'text-orange-400 bg-orange-400/20';
      case 'suspicious': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="flex h-full">
      {/* Suspects List */}
      <div className="w-1/3 bg-gray-800/30 border-r border-gray-700 p-6 overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-6">Suspects</h3>
        
        <div className="space-y-4">
          {currentCase.suspects.map((suspect) => (
            <div
              key={suspect.id}
              onClick={() => handleSuspectSelect(suspect)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                selectedSuspect?.id === suspect.id
                  ? 'border-cyan-400 bg-cyan-400/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={suspect.image}
                  alt={suspect.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-white">{suspect.name}</h4>
                  <p className="text-sm text-gray-400">{suspect.role}</p>
                </div>
              </div>
              
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getMoodColor(suspect.mood)}`}>
                {suspect.mood}
              </div>
              
              <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                {suspect.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Suspect Detail & Chat */}
      <div className="flex-1 flex flex-col">
        {selectedSuspect ? (
          <>
            {/* Suspect Header */}
            <div className="bg-gray-800/50 border-b border-gray-700 p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedSuspect.image}
                  alt={selectedSuspect.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{selectedSuspect.name}</h3>
                  <p className="text-gray-400">{selectedSuspect.role}</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mt-2 ${getMoodColor(selectedSuspect.mood)}`}>
                    Current Mood: {selectedSuspect.mood}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-1">Background</h4>
                  <p className="text-gray-300 text-sm">{selectedSuspect.bio}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-1">Alibi</h4>
                  <p className="text-gray-300 text-sm">{selectedSuspect.alibi}</p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedSuspect.chatHistory.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="text-red-400" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-red-400 mb-2">Question {selectedSuspect.name}</h4>
                  <p className="text-gray-400 mb-6">Start your interrogation. Be strategic with your questions.</p>
                  <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
                    <button
                      onClick={() => handleSendMessage("Where were you at the time of the incident?")}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-left hover:border-red-400 transition-colors"
                    >
                      <div className="text-red-400 font-semibold">Ask about their alibi</div>
                    </button>
                    <button
                      onClick={() => handleSendMessage("How well did you know the victim?")}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-left hover:border-red-400 transition-colors"
                    >
                      <div className="text-red-400 font-semibold">Ask about the victim</div>
                    </button>
                    <button
                      onClick={() => handleSendMessage("Tell me about your relationship with the other suspects.")}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-left hover:border-red-400 transition-colors"
                    >
                      <div className="text-red-400 font-semibold">Ask about other suspects</div>
                    </button>
                  </div>
                </div>
              )}

              {selectedSuspect.chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                        : 'bg-red-500/20 border border-red-500/30 text-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                    <div className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-cyan-100' : 'text-red-300'}`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-red-500/20 border border-red-500/30 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="bg-gray-800/50 border-t border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={pauseChat ? "Chat is paused..." : `Question ${selectedSuspect.name}...`}
                    disabled={pauseChat}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-red-400 focus:outline-none resize-none disabled:opacity-50"
                    rows={1}
                  />
                </div>
                
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={pauseChat}
                  className={`p-3 rounded-xl transition-all disabled:opacity-50 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!message.trim() || pauseChat}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl hover:from-red-400 hover:to-red-500 transition-all disabled:opacity-50"
                >
                  <MessageSquare size={20} />
                </button>
              </div>
              
              {isSpeaking && (
                <div className="flex items-center space-x-2 mt-2 text-red-400">
                  <Volume2 size={16} />
                  <span className="text-sm">{selectedSuspect.name} is speaking...</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">Select a Suspect</h3>
              <p className="text-gray-500">Choose a suspect from the list to begin questioning</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuspectDossier;