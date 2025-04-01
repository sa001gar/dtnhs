
import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChatbotUI, Message } from './ChatbotUI';
import { toast } from '@/hooks/use-toast';

const useChatApi = () => {
  const getResponse = async (message: string): Promise<string> => {
    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      
      const schoolContext = "You are the AI assistant for Durgapur Tarak Nath High School Website. " +
        "Provide helpful and concise responses about the school's information, activities, and resources. " +
        "If a user asks about admissions, include a link to the admissions page in your response: " +
        "<a href='/admissions' class='text-school-primary underline'>Admissions Page</a>. " +
        "Keep responses friendly, informative, and representative of the school.";
      
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: schoolContext + "\n\nUser message: " + message }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (error) {
      console.error('Error calling API:', error);
      return getMockResponse(message);
    }
  };

  const getMockResponse = (message: string): string => {
    const msg = message.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi')) {
      return "Hello! I'm the AI assistant for Durgapur Tarak Nath High School. How can I help you today?";
    } else if (msg.includes('admission')) {
      return "For admission inquiries, please visit our <a href='/admissions' class='text-school-primary underline'>Admissions Page</a> or contact the Admissions Office at admissions@tnhighschool.edu.";
    } else if (msg.includes('teacher') || msg.includes('faculty')) {
      return "You can find information about our teachers on the <a href='/faculty' class='text-school-primary underline'>Teachers Page</a>. They're organized by department to help you find who you're looking for.";
    } else if (msg.includes('class') || msg.includes('schedule')) {
      return "Class schedules are available on the <a href='/schedules' class='text-school-primary underline'>Routine Page</a>. You can filter by grade and section to find specific schedules.";
    } else if (msg.includes('result') || msg.includes('grade')) {
      return "Examination results can be viewed on the <a href='/results' class='text-school-primary underline'>Results Page</a>. You'll need your student ID and password to access them.";
    } else if (msg.includes('event') || msg.includes('activity')) {
      return "Check our <a href='/blog' class='text-school-primary underline'>Blog Page</a> for recent school events and activities. We regularly update it with new posts.";
    } else {
      return "I'm here to help with information about Durgapur Tarak Nath High School. You can ask me about admissions, schedules, faculty, events, and more.";
    }
  };

  return { getResponse };
};

// Speech recognition hook
const useSpeechRecognition = (onResult: (text: string) => void, onError: (error: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      onError('Speech recognition is not supported in this browser.');
      return false;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event);
        onError('Error recognizing speech. Please try again.');
        stopListening();
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.start();
      setIsListening(true);
      return true;
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      onError('Failed to start speech recognition. Please try again.');
      return false;
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return { isListening, toggleListening };
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the AI assistant for Durgapur Tarak Nath High School. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatApi = useChatApi();
  const isMobile = useIsMobile();

  const handleSpeechResult = (transcript: string) => {
    setMessage(transcript);
  };

  const handleSpeechError = (error: string) => {
    toast({
      title: "Speech Recognition Error",
      description: error,
      variant: "destructive",
    });
  };

  const { isListening, toggleListening } = useSpeechRecognition(handleSpeechResult, handleSpeechError);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      
      if (e.ctrlKey && e.key === 'm' && isOpen) {
        e.preventDefault();
        setIsMinimized(prev => !prev);
      }

      if (e.ctrlKey && e.key === ' ' && isOpen && !isMinimized) {
        e.preventDefault();
        toggleListening();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMinimized, toggleListening]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    if (isListening) {
      toggleListening();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');
    setIsLoading(true);

    try {
      const response = await chatApi.getResponse(currentMessage);
      
      const containsHtml = /<\/?[a-z][\s\S]*>/i.test(response);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        html: containsHtml
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting chat response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(prev => !prev);
  };

  const closeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-start ${isOpen ? 'flex-col-reverse' : ''}`}>
      {isOpen && (
        <div className={`
          ${isMobile ? 'w-[calc(100vw-32px)]' : 'w-72 sm:w-96'}
          transition-all duration-300 ease-in-out
          bottom-16 right-0 absolute sm:bottom-0 sm:right-16
        `}>
          <ChatbotUI
            messages={messages}
            isLoading={isLoading}
            isMinimized={isMinimized}
            toggleMinimize={toggleMinimize}
            closeChat={closeChat}
            messagesEndRef={messagesEndRef}
            handleSendMessage={handleSendMessage}
            message={message}
            setMessage={setMessage}
            textareaRef={textareaRef}
            isListening={isListening}
            toggleListening={toggleListening}
          />
        </div>
      )}
      
      <Button 
        onClick={toggleChat}
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-xl bg-school-primary hover:bg-school-primary/90 transition-colors flex items-center justify-center shrink-0 dark:text-white"
        aria-label="Open chat assistant"
      >
        <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
};

export default Chatbot;
