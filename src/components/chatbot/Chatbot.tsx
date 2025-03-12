import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Bot, User, X, SendHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

// Interface for message structure
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  html?: boolean;
}

// Optimization: Split API logic to be lazily loaded
const useChatApi = () => {
  const getResponse = async (message: string): Promise<string> => {
    try {
      // Replace with your actual API key and endpoint
      const VITE_GEMINI_API_KEY="AIzaSyC3pNfBx5m7x5W5l-9-vYWAlKb4Yjz0i1k";
      const API_KEY = VITE_GEMINI_API_KEY;
      const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      
      // School-specific context for the AI
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
      // Fall back to mock response
      return getMockResponse(message);
    }
  };

  // Mock responses for fallback or development
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

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
      
      // Check if response contains HTML (for links)
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-start">
      {isOpen && (
        <div className={`
          mr-4 rounded-lg shadow-xl transition-all duration-300 ease-in-out
          bg-background border border-border overflow-hidden
          ${isMinimized ? 'h-16 w-72 sm:w-80' : 'h-[450px] sm:h-[500px] w-72 sm:w-96'} 
          flex flex-col
          bottom-16 right-0 absolute sm:bottom-0 sm:right-16
        `}>
          <div 
            className="flex items-center justify-between p-3 bg-school-primary text-white cursor-pointer"
            onClick={toggleMinimize}
          >
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <span className="font-medium">School Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              {isMinimized ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <>
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white/10 text-white" onClick={toggleMinimize}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white/10 text-white" onClick={closeChat}>
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="p-3 flex-1 overflow-y-auto bg-muted/5 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-[85%] rounded-2xl p-2.5
                      ${msg.sender === 'user' 
                        ? 'bg-school-primary text-white rounded-tr-none shadow-sm' 
                        : 'bg-muted/20 text-foreground rounded-tl-none shadow-sm'}
                    `}>
                      <div className="flex items-start gap-2">
                        {msg.sender === 'bot' && (
                          <Avatar className="h-6 w-6 shrink-0">
                            <AvatarFallback className="bg-muted/20 text-foreground"><Bot className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex-1 min-w-0">
                          {msg.html ? (
                            <p 
                              className="text-sm whitespace-pre-wrap break-words"
                              dangerouslySetInnerHTML={{ __html: msg.text }}
                            />
                          ) : (
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {msg.text}
                            </p>
                          )}
                          <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {msg.sender === 'user' && (
                          <Avatar className="h-6 w-6 shrink-0">
                            <AvatarFallback className="bg-school-primary/80 text-white"><User className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="mb-3 flex justify-start">
                    <div className="bg-muted/20 rounded-2xl rounded-tl-none p-2.5 max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-muted/20 text-foreground"><Bot className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-school-primary/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-school-primary/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-school-primary/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="p-3 border-t border-border flex items-end gap-2 bg-background">
                <Textarea 
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="resize-none min-h-[60px] max-h-[150px] py-2 px-3 rounded-lg bg-background border border-muted focus-visible:ring-school-primary/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isLoading || !message.trim()}
                  className="h-10 w-10 rounded-full bg-school-primary hover:bg-school-primary/90 transition-colors shrink-0"
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
      
      <Button 
        onClick={toggleChat}
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-xl bg-school-primary hover:bg-school-primary/90 transition-colors flex items-center justify-center shrink-0"
        aria-label="Open chat assistant"
      >
        <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
};

export default Chatbot;