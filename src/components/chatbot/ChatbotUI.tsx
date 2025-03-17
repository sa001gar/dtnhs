
import React, { useState } from 'react';
import { MessageSquare, Bot, User, Copy, ThumbsUp, ThumbsDown, X, Maximize2, Minimize2, SendHorizontal, Mic, MicOff, HelpCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  html?: boolean;
}

interface ChatbotUIProps {
  messages: Message[];
  isLoading: boolean;
  isMinimized: boolean;
  toggleMinimize: (e: React.MouseEvent) => void;
  closeChat: (e: React.MouseEvent) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleSendMessage: (e: React.FormEvent) => void;
  message: string;
  setMessage: (message: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  isListening: boolean;
  toggleListening: () => void;
}

// Quick response suggestions
const QUICK_RESPONSES = [
  { text: "Admission Process", value: "How does the admission process work?" },
  { text: "School Timings", value: "What are the school timings?" },
  { text: "Fee Structure", value: "Can you provide details about the fee structure?" },
  { text: "Contact Info", value: "How can I contact the school administration?" },
];

// Keyboard shortcuts
const KEYBOARD_SHORTCUTS = [
  { key: "Esc", description: "Close chatbot" },
  { key: "↑", description: "Navigate to previous message" },
  { key: "↓", description: "Navigate to next message" },
  { key: "Ctrl + Enter", description: "Send message" },
  { key: "Ctrl + M", description: "Minimize/Maximize chat" },
  { key: "Ctrl + Space", description: "Toggle voice input" },
];

export const ChatbotUI: React.FC<ChatbotUIProps> = ({
  messages,
  isLoading,
  isMinimized,
  toggleMinimize,
  closeChat,
  messagesEndRef,
  handleSendMessage,
  message,
  setMessage,
  textareaRef,
  isListening,
  toggleListening,
}) => {
  // Function to handle copying message text
  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Text copied",
      description: "Message copied to clipboard",
      duration: 3000,
    });
  };

  // Function to handle quick response selection
  const selectQuickResponse = (text: string) => {
    setMessage(text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg shadow-xl transition-all duration-300 overflow-hidden border border-border",
        isMinimized ? "h-16" : "h-[550px] sm:h-[600px]", // Increased height
        "w-full bg-background"
      )}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 95%, 97% 100%, 0 100%)",
      }}
    >
      {/* Header - Fixed at top */}
      <div
        className="flex items-center justify-between p-3 bg-gradient-to-r from-school-primary to-school-secondary text-white cursor-pointer sticky top-0 z-50"
        onClick={toggleMinimize}
      >
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <span className="font-medium">School Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-white/10 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize(e);
                  }}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{isMinimized ? "Maximize" : "Minimize"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {!isMinimized && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-white/10 text-white"
                    onClick={closeChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Close</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {!isMinimized && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="chat" className="flex flex-col flex-1">
            <TabsList className="h-10 w-full bg-muted p-0.5 rounded-none sticky top-0 z-40">
              <TabsTrigger 
                value="chat" 
                className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-none rounded-sm"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="help" 
                className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-none rounded-sm"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </TabsTrigger>
              <TabsTrigger 
                value="shortcuts" 
                className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-none rounded-sm"
              >
                <Info className="h-4 w-4 mr-2" />
                Shortcuts
              </TabsTrigger>
            </TabsList>

            <TabsContent 
              value="chat" 
              className="flex-1 flex flex-col p-0 m-0 overflow-hidden"
            >
              {/* Chat Messages - Scrollable area */}
              <div className="flex-1 overflow-hidden relative">
                <ScrollArea className="h-[calc(100vh-300px)] max-h-[400px] sm:max-h-[450px]">
                  <div className="p-3 pb-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={cn(
                          "max-w-[85%] rounded-2xl p-2.5 group relative",
                          msg.sender === 'user' 
                            ? 'bg-gradient-to-r from-school-primary to-school-secondary text-white rounded-tr-none shadow-md' 
                            : 'bg-muted/70 text-foreground rounded-tl-none shadow-md'
                        )}>
                          <div className="flex items-start gap-2">
                            {msg.sender === 'bot' && (
                              <Avatar className="h-6 w-6 shrink-0">
                                <AvatarFallback className="bg-muted/20 text-foreground">
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
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
                              <p className={cn(
                                "text-xs mt-1", 
                                msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                              )}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            {msg.sender === 'user' && (
                              <Avatar className="h-6 w-6 shrink-0">
                                <AvatarFallback className="bg-school-primary/80 text-white">
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                          
                          {/* Message actions */}
                          {msg.sender === 'bot' && (
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex gap-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 bg-background/80 hover:bg-background"
                                        onClick={() => copyMessage(msg.text)}
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                      <p>Copy</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 bg-background/80 hover:bg-background"
                                      >
                                        <ThumbsUp className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                      <p>Helpful</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 bg-background/80 hover:bg-background"
                                      >
                                        <ThumbsDown className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                      <p>Not helpful</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="mb-3 flex justify-start">
                        <div className="bg-muted/50 rounded-2xl rounded-tl-none p-2.5 max-w-[85%]">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-muted/20 text-foreground">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
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
                </ScrollArea>
              </div>
              
              {/* Quick Responses - Fixed at bottom above input */}
              <div className="px-3 py-2 bg-muted/50 flex items-center overflow-x-auto gap-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted sticky bottom-[76px] z-10">
                {QUICK_RESPONSES.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap text-xs hover:bg-muted/50"
                    onClick={() => selectQuickResponse(item.value)}
                  >
                    {item.text}
                  </Button>
                ))}
              </div>
              
              {/* Message Input - Fixed at bottom */}
              <form 
                onSubmit={handleSendMessage} 
                className="p-3 border-t border-border flex items-end gap-2 bg-background sticky bottom-0 z-10"
              >
                <div className="relative flex-1">
                  <textarea 
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Type your message..."}
                    className={cn(
                      "resize-none min-h-[40px] max-h-[120px] py-2 px-3 rounded-lg bg-background border border-muted focus-visible:ring-school-primary/50 w-full",
                      isListening ? "pr-10 border-school-primary" : "pr-10",
                      "overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
                    )}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' && !e.shiftKey) || (e.key === 'Enter' && e.ctrlKey)) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                      if (e.ctrlKey && e.key === ' ') {
                        e.preventDefault();
                        toggleListening();
                      }
                    }}
                    style={{ display: 'block' }} /* Ensure visibility */
                  />
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline"
                        size="icon"
                        onClick={toggleListening}
                        className={cn(
                          "h-10 w-10 rounded-full transition-colors shrink-0",
                          isListening ? "bg-school-primary text-white hover:bg-school-primary/90" : "hover:bg-muted/20"
                        )}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{isListening ? "Stop listening" : "Start voice input"} (Ctrl + Space)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="submit" 
                        size="icon"
                        disabled={isLoading || !message.trim()}
                        className="h-10 w-10 rounded-full bg-gradient-to-r from-school-primary to-school-secondary hover:opacity-90 transition-opacity shrink-0"
                      >
                        <SendHorizontal className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Send message (Ctrl + Enter)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </form>
            </TabsContent>
            
            <TabsContent value="help" className="p-4 overflow-y-auto flex-1 bg-background">
              <h3 className="font-medium text-lg mb-3">How can I help you?</h3>
              <p className="mb-4 text-sm">
                I'm your School Assistant, designed to help with information about Durgapur Tarak Nath High School. You can ask me about:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="rounded-full p-1 bg-school-primary/10 mt-0.5">
                    <Info className="h-3 w-3 text-school-primary" />
                  </div>
                  <span>Admission procedures and requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full p-1 bg-school-primary/10 mt-0.5">
                    <Info className="h-3 w-3 text-school-primary" />
                  </div>
                  <span>School events, activities, and news</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full p-1 bg-school-primary/10 mt-0.5">
                    <Info className="h-3 w-3 text-school-primary" />
                  </div>
                  <span>Academic programs and curriculum</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full p-1 bg-school-primary/10 mt-0.5">
                    <Info className="h-3 w-3 text-school-primary" />
                  </div>
                  <span>Contact information and directions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full p-1 bg-school-primary/10 mt-0.5">
                    <Info className="h-3 w-3 text-school-primary" />
                  </div>
                  <span>School policies and procedures</span>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="shortcuts" className="p-4 overflow-y-auto flex-1 bg-background">
              <h3 className="font-medium text-lg mb-3">Keyboard Shortcuts</h3>
              <div className="grid gap-2">
                {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{shortcut.description}</span>
                    <kbd className="px-2 py-1 bg-muted rounded-md font-mono text-xs">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};
