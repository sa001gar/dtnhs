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
        isMinimized ? "h-18" : "h-[600px] sm:h-[600px]",
        "w-full bg-background dark:bg-gray-900"
      )}
    >
      {/* Header - Fixed at top */}
      <div
        className="flex items-center justify-between p-3 bg-school-primary text-white cursor-pointer sticky top-0 z-50"
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
        <div className="flex flex-col flex-1 overflow-hidden">
          <Tabs defaultValue="chat" className="w-full h-full flex flex-col">
            <TabsList className="h-10 w-full bg-muted p-0.5 rounded-none z-40 dark:bg-gray-800">
              <TabsTrigger 
                value="chat" 
                className="flex-1 data-[state=active]:bg-background dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-none rounded-sm"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="help" 
                className="flex-1 data-[state=active]:bg-background dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-none rounded-sm"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </TabsTrigger>
              <TabsTrigger 
                value="shortcuts" 
                className="flex-1 data-[state=active]:bg-background dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-none rounded-sm"
              >
                <Info className="h-4 w-4 mr-2" />
                Shortcuts
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 relative overflow-hidden">
              <TabsContent 
                value="chat" 
                className="absolute inset-0 flex flex-col"
              >
                {/* Chat Messages - Scrollable area */}
                <ScrollArea className="flex-1 h-[calc(100%-110px)]">
                  <div className="p-3 pb-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={cn(
                          "max-w-[85%] rounded-2xl p-2.5 group relative",
                          msg.sender === 'user' 
                            ? 'bg-school-primary text-white rounded-tr-none shadow-sm' 
                            : 'bg-muted/50 text-foreground dark:bg-gray-800 dark:text-white rounded-tl-none shadow-sm'
                        )}>
                          <div className="flex items-start gap-2">
                            {msg.sender === 'bot' && (
                              <Avatar className="h-6 w-6 shrink-0">
                                <AvatarFallback className="bg-muted/20 text-foreground dark:bg-gray-700 dark:text-gray-200">
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
                                msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground dark:text-gray-400'
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
                                        className="h-6 w-6 bg-background/80 hover:bg-background dark:bg-gray-900/80 dark:hover:bg-gray-900"
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
                                        className="h-6 w-6 bg-background/80 hover:bg-background dark:bg-gray-900/80 dark:hover:bg-gray-900"
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
                                        className="h-6 w-6 bg-background/80 hover:bg-background dark:bg-gray-900/80 dark:hover:bg-gray-900"
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
                        <div className="bg-muted/50 dark:bg-gray-800 rounded-2xl rounded-tl-none p-2.5 max-w-[85%]">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-muted/20 text-foreground dark:bg-gray-700 dark:text-gray-200">
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
                
                {/* Quick Responses */}
                <div className="px-3 py-2 bg-muted dark:bg-gray-800 flex items-center overflow-x-auto gap-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted">
                  {QUICK_RESPONSES.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap text-xs hover:bg-muted/50 dark:border-gray-700 dark:hover:bg-gray-700"
                      onClick={() => selectQuickResponse(item.value)}
                    >
                      {item.text}
                    </Button>
                  ))}
                </div>
                
                {/* Message Input */}
                <form 
                  onSubmit={handleSendMessage} 
                  className="p-3 border-t border-border dark:border-gray-700 flex items-end gap-2 bg-background dark:bg-gray-900"
                >
                  <div className="relative flex-1">
                    <textarea 
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isListening ? "Listening..." : "Type your message..."}
                      className={cn(
                        "resize-none min-h-[60px] max-h-[150px] py-2 px-3 rounded-lg bg-background dark:bg-gray-800 border border-muted dark:border-gray-700 focus-visible:ring-school-primary/50 w-full",
                        isListening ? "pr-10 border-school-primary" : "pr-10"
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
                            "h-10 w-10 rounded-full transition-colors shrink-0 dark:border-gray-700",
                            isListening ? "bg-school-primary text-white hover:bg-school-primary/90" : "hover:bg-muted/20 dark:hover:bg-gray-700"
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
                          className="h-10 w-10 rounded-full bg-school-primary hover:bg-school-primary/90 transition-colors shrink-0 text-white"
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
              
              {/* HELP TAB - Completely restructured with absolute positioning */}
              <TabsContent 
                value="help" 
                className="absolute inset-0 overflow-hidden bg-background dark:bg-gray-900"
              >
                <ScrollArea className="h-full w-full">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-school-primary/10 dark:bg-school-primary/20 flex items-center justify-center">
                        <HelpCircle className="h-5 w-5 text-school-primary" />
                      </div>
                      <h3 className="font-medium text-lg">How can I help you?</h3>
                    </div>
                    
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                      I'm your School Assistant, designed to help with information about Durgapur Tarak Nath High School. Feel free to ask me anything about the school!
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-base mb-2">I can help you with:</h4>
                      
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="bg-muted/30 dark:bg-gray-800/50 p-3 rounded-lg border border-muted dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="rounded-full p-1.5 bg-school-primary/10 dark:bg-school-primary/20">
                              <Info className="h-4 w-4 text-school-primary" />
                            </div>
                            <h5 className="font-medium">Admission</h5>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            Procedures, requirements, and important dates
                          </p>
                        </div>
                        
                        <div className="bg-muted/30 dark:bg-gray-800/50 p-3 rounded-lg border border-muted dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="rounded-full p-1.5 bg-school-primary/10 dark:bg-school-primary/20">
                              <Info className="h-4 w-4 text-school-primary" />
                            </div>
                            <h5 className="font-medium">Events & Activities</h5>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            School events, co-curricular activities, and news
                          </p>
                        </div>
                        
                        <div className="bg-muted/30 dark:bg-gray-800/50 p-3 rounded-lg border border-muted dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="rounded-full p-1.5 bg-school-primary/10 dark:bg-school-primary/20">
                              <Info className="h-4 w-4 text-school-primary" />
                            </div>
                            <h5 className="font-medium">Academics</h5>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            Programs, curriculum, and examination details
                          </p>
                        </div>
                        
                        <div className="bg-muted/30 dark:bg-gray-800/50 p-3 rounded-lg border border-muted dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="rounded-full p-1.5 bg-school-primary/10 dark:bg-school-primary/20">
                              <Info className="h-4 w-4 text-school-primary" />
                            </div>
                            <h5 className="font-medium">Contact & Directions</h5>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            How to reach us and contact information
                          </p>
                        </div>
                        
                        <div className="bg-muted/30 dark:bg-gray-800/50 p-3 rounded-lg border border-muted dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="rounded-full p-1.5 bg-school-primary/10 dark:bg-school-primary/20">
                              <Info className="h-4 w-4 text-school-primary" />
                            </div>
                            <h5 className="font-medium">Policies</h5>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            School policies, rules, and procedures
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              {/* SHORTCUTS TAB - Completely restructured with absolute positioning */}
              <TabsContent 
                value="shortcuts" 
                className="absolute inset-0 overflow-hidden bg-background dark:bg-gray-900"
              >
                <ScrollArea className="h-full w-full">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-school-primary/10 dark:bg-school-primary/20 flex items-center justify-center">
                        <Info className="h-5 w-5 text-school-primary" />
                      </div>
                      <h3 className="font-medium text-lg">Keyboard Shortcuts</h3>
                    </div>
                    
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                      Use these keyboard shortcuts to interact with the chatbot more efficiently.
                    </p>
                    
                    <div className="divide-y divide-border dark:divide-gray-700">
                      {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full p-1.5 bg-muted/30 dark:bg-gray-800">
                              <kbd className="font-mono text-xs font-medium">{shortcut.key}</kbd>
                            </div>
                            <span className="text-sm">{shortcut.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
};