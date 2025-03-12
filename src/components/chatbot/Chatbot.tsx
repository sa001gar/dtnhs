
import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, X, SendHorizontal, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

// Mock API for demo purposes
const mockChatResponse = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Sample responses based on message content
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return "Hello! I'm the school's AI assistant. How can I help you today?";
  } else if (message.toLowerCase().includes('admission')) {
    return "For admission inquiries, please visit our Admissions page or contact the Admissions Office at admissions@school.edu.";
  } else if (message.toLowerCase().includes('teacher') || message.toLowerCase().includes('faculty')) {
    return "You can find information about our teachers on the Teachers page. They're organized by department to help you find who you're looking for.";
  } else if (message.toLowerCase().includes('class') || message.toLowerCase().includes('schedule')) {
    return "Class schedules are available on the Routine page. You can filter by grade and section to find specific schedules.";
  } else if (message.toLowerCase().includes('result') || message.toLowerCase().includes('grade')) {
    return "Examination results can be viewed on the Results page. You'll need your student ID and password to access them.";
  } else if (message.toLowerCase().includes('event') || message.toLowerCase().includes('activity')) {
    return "Check our Blog page for recent school events and activities. We regularly update it with new posts.";
  } else {
    return "Thank you for your message. I'm a simple demo bot for now. In a real implementation, I would be using Google's Gemini model to provide more helpful responses.";
  }
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the school's AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await mockChatResponse(message);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
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
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className={`
          mb-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out
          bg-background border border-border overflow-hidden
          ${isMinimized ? 'h-16 w-80' : 'h-[500px] w-80 sm:w-96'} 
        `}>
          <div 
            className="flex items-center justify-between p-3 bg-school-primary text-white cursor-pointer"
            onClick={toggleMinimize}
          >
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <span className="font-medium">School Assistant</span>
            </div>
            <div className="flex items-center">
              {isMinimized ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <>
                  <ChevronDown className="h-5 w-5 mr-1" onClick={toggleMinimize} />
                  <X className="h-5 w-5" onClick={closeChat} />
                </>
              )}
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="p-4 h-[380px] overflow-y-auto bg-muted/20">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-[80%] rounded-lg p-3
                      ${msg.sender === 'user' 
                        ? 'bg-school-primary text-white rounded-tr-none' 
                        : 'bg-muted rounded-tl-none'}
                    `}>
                      <div className="flex items-start mb-1">
                        {msg.sender === 'bot' && (
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src="/placeholder.svg" alt="Bot" />
                            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <p className={`text-sm ${msg.sender === 'user' ? 'text-white' : 'text-foreground'}`}>
                            {msg.text}
                          </p>
                          <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {msg.sender === 'user' && (
                          <Avatar className="h-6 w-6 ml-2">
                            <AvatarImage src="/placeholder.svg" alt="User" />
                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="mb-4 flex justify-start">
                    <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-[80%]">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src="/placeholder.svg" alt="Bot" />
                          <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="p-3 border-t flex items-end gap-2">
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="resize-none min-h-[60px]"
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
                  disabled={isLoading}
                  className="h-10 w-10 bg-school-primary hover:bg-school-primary/90"
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
        className="h-14 w-14 rounded-full shadow-lg bg-school-primary hover:bg-school-primary/90"
      >
        <Bot className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Chatbot;
