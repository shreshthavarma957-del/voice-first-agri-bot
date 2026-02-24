
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, ChatMessage } from '../types';
import { getAgriAdvice } from '../services/gemini';
import Markdown from 'react-markdown';

interface VoiceBotProps {
  profile: UserProfile;
}

export const VoiceBot: React.FC<VoiceBotProps> = ({ profile }) => {
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = profile.language === 'en' ? 'en-IN' : 
                                   profile.language === 'hi' ? 'hi-IN' : 
                                   profile.language === 'mr' ? 'mr-IN' : 
                                   profile.language === 'ta' ? 'ta-IN' : 
                                   profile.language === 'te' ? 'te-IN' : 'kn-IN';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (transcript) {
          handleSendMessage(transcript);
        }
      };
    }
  }, [profile.language, transcript]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);
    setTranscript('');

    const response = await getAgriAdvice(text, profile);
    
    const botMsg: ChatMessage = { role: 'model', text: response, timestamp: Date.now() };
    setMessages(prev => [...prev, botMsg]);
    setIsThinking(false);

    // Speak the response
    speak(response);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = recognitionRef.current?.lang || 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-50">
      {/* Chat Header */}
      <div className="bg-emerald-500 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Volume2 size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg">Agri Bot</h2>
            <p className="text-xs opacity-80">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-emerald-50/30">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <Mic size={40} />
            </div>
            <h3 className="text-xl font-bold text-emerald-900">Tap the mic to talk</h3>
            <p className="text-emerald-700">Ask me about crops, soil, or weather in your language.</p>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex flex-col max-w-[85%] p-4 rounded-2xl shadow-sm",
              msg.role === 'user' 
                ? "ml-auto bg-emerald-600 text-white rounded-tr-none" 
                : "mr-auto bg-white text-emerald-900 rounded-tl-none border border-emerald-100"
            )}
          >
            <div className="prose prose-sm max-w-none">
              <Markdown>{msg.text}</Markdown>
            </div>
            <span className="text-[10px] mt-1 opacity-60 self-end">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        ))}
        
        {isThinking && (
          <div className="flex items-center gap-2 text-emerald-600 p-2">
            <Loader2 className="animate-spin" size={20} />
            <span className="text-sm font-medium">Thinking...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-emerald-100">
        <div className="flex flex-col items-center gap-4">
          {transcript && (
            <div className="w-full p-3 bg-emerald-50 rounded-xl text-emerald-800 text-center italic">
              "{transcript}"
            </div>
          )}
          
          <div className="flex items-center justify-center gap-6 w-full">
            <button
              onClick={toggleListening}
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                isListening 
                  ? "bg-red-500 scale-110 animate-pulse" 
                  : "bg-emerald-500 hover:bg-emerald-600 active:scale-95"
              )}
            >
              {isListening ? (
                <MicOff size={36} className="text-white" />
              ) : (
                <Mic size={36} className="text-white" />
              )}
            </button>
          </div>
          
          <p className="text-sm font-medium text-emerald-600">
            {isListening ? "Listening... Tap to stop" : "Tap to speak"}
          </p>
        </div>
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
