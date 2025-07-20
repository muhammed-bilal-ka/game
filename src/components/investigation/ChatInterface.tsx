import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, Bot } from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { useVoice } from '../../context/VoiceContext';
import { chatWithAI } from '../../services/aiService';

const ChatInterface: React.FC = () => {
  const { currentCase, chatHistory, addChatMessage } = useCase();
  const { isListening, isSpeaking, transcript, startListening, stopListening, speak, pauseChat } = useVoice();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    if (transcript && !pauseChat) {
      setMessage(transcript);
      handleSendMessage(transcript);
    }
  }, [transcript, pauseChat]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || message;
    if (!textToSend.trim() || !currentCase || pauseChat) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user' as const,
      message: textToSend,
      timestamp: new Date()
    };

    addChatMessage(userMessage);
    setMessage('');
    setIsTyping(true);

    try {
      const response = await chatWithAI(textToSend, currentCase);
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai' as const,
        message: response,
        timestamp: new Date()
      };

      addChatMessage(aiMessage);
      
      if (!pauseChat) {
        speak(response);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai' as const,
        message: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      addChatMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-full flex items-center justify-center">
            <Bot className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Detective AI Assistant</h3>
            <p className="text-sm text-gray-400">Ask questions about the case, evidence, or suspects</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="text-cyan-400" size={32} />
            </div>
            <h4 className="text-xl font-bold text-cyan-400 mb-2">Welcome, Detective</h4>
            <p className="text-gray-400 mb-6">I'm here to help you solve this case. Ask me anything about the evidence, suspects, or timeline.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
              <button
                onClick={() => handleSendMessage("Tell me about the suspects")}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-left hover:border-cyan-400 transition-colors"
              >
                <div className="text-cyan-400 font-semibold">Tell me about the suspects</div>
                <div className="text-gray-400 text-sm">Get an overview of all suspects</div>
              </button>
              <button
                onClick={() => handleSendMessage("What evidence do we have?")}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-left hover:border-cyan-400 transition-colors"
              >
                <div className="text-cyan-400 font-semibold">What evidence do we have?</div>
                <div className="text-gray-400 text-sm">Review collected evidence</div>
              </button>
              <button
                onClick={() => handleSendMessage("Analyze the crime scene")}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-left hover:border-cyan-400 transition-colors"
              >
                <div className="text-cyan-400 font-semibold">Analyze the crime scene</div>
                <div className="text-gray-400 text-sm">Get forensic insights</div>
              </button>
              <button
                onClick={() => handleSendMessage("What's the timeline?")}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-left hover:border-cyan-400 transition-colors"
              >
                <div className="text-cyan-400 font-semibold">What's the timeline?</div>
                <div className="text-gray-400 text-sm">Review sequence of events</div>
              </button>
            </div>
          </div>
        )}

        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                  : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-100'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.message}</p>
              <div className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-cyan-100' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={pauseChat ? "Chat is paused..." : "Ask about evidence, suspects, or timeline..."}
              disabled={pauseChat}
              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none disabled:opacity-50"
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
            className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white p-3 rounded-xl hover:from-cyan-400 hover:to-violet-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        
        {isSpeaking && (
          <div className="flex items-center space-x-2 mt-2 text-cyan-400">
            <Volume2 size={16} />
            <span className="text-sm">AI is speaking...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;