import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceAssistantProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ enabled, setEnabled }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const responses = {
    'zodiac': 'The Zodiac Killer was active in Northern California between 1968 and 1969. Would you like me to show you the evidence locker?',
    'evidence': 'I can show you the evidence locker containing ciphers, photographs, and physical evidence. Which piece would you like to examine?',
    'suspects': 'The main suspects include Arthur Leigh Allen, Richard Gaikowski, and Lawrence Kane. Each has varying levels of suspicion.',
    'timeline': 'The Zodiac attacks began on December 20, 1968, at Lake Herman Road. Should I display the full timeline?',
    'help': 'I can help you navigate cases, examine evidence, analyze suspects, and submit theories. What would you like to investigate?'
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let responseText = '';

    for (const [key, value] of Object.entries(responses)) {
      if (lowerCommand.includes(key)) {
        responseText = value;
        break;
      }
    }

    if (!responseText) {
      responseText = "I didn't understand that command. Try asking about evidence, suspects, timeline, or say 'help' for assistance.";
    }

    setResponse(responseText);
    
    // Text-to-speech
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(responseText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setResponse('');
      };

      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        handleVoiceCommand(result);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!enabled) {
    return (
      <button
        onClick={() => setEnabled(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-400 text-gray-900 rounded-full shadow-lg hover:bg-green-300 transition-all transform hover:scale-110 flex items-center justify-center"
      >
        <Mic size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 w-80 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-green-400">Detective AI</h4>
        <button
          onClick={() => setEnabled(false)}
          className="text-gray-400 hover:text-gray-300"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        {transcript && (
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-sm text-gray-300">
              <strong>You said:</strong> "{transcript}"
            </p>
          </div>
        )}

        {response && (
          <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-3">
            <p className="text-sm text-green-300">{response}</p>
          </div>
        )}

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-red-400 text-white animate-pulse'
                : 'bg-green-400 text-gray-900 hover:bg-green-300'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="w-12 h-12 bg-red-400 text-white rounded-full flex items-center justify-center hover:bg-red-300 transition-all"
            >
              <VolumeX size={20} />
            </button>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          {isListening ? 'Listening...' : 'Click microphone and speak your command'}
        </p>

        <div className="text-xs text-gray-500">
          <p className="mb-1">Try saying:</p>
          <ul className="space-y-1">
            <li>• "Show me evidence"</li>
            <li>• "Who are the suspects?"</li>
            <li>• "Display timeline"</li>
            <li>• "Help me investigate"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;