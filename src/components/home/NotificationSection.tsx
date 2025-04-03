
import React, { useState, useEffect } from "react";
import { Bell, AlertTriangle, X, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "../ui/AnimatedSection";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  title: string;
  content: string;
  date: string;
  isUrgent: boolean;
  read: boolean;
}

const NotificationSection = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showRead, setShowRead] = useState(false);

  // Initialize notifications from localStorage or use default
  useEffect(() => {
    const storedNotifications = localStorage.getItem("schoolNotifications");
    
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      const defaultNotifications: Notification[] = [
        {
          id: 1,
          title: "Annual Day Celebration",
          content: "Join us for the Annual Day celebration on June 30, 2023.",
          date: "June 15, 2023",
          isUrgent: true,
          read: false,
        },
        {
          id: 2,
          title: "Parent-Teacher Meeting",
          content: "PTM scheduled for all classes on May 20, 2023.",
          date: "May 10, 2023",
          isUrgent: false,
          read: false,
        },
        {
          id: 3,
          title: "Summer Vacation Announcement",
          content: "School closed from May 25 to June 15, 2023.",
          date: "April 25, 2023",
          isUrgent: false,
          read: false,
        },
      ];
      setNotifications(defaultNotifications);
      localStorage.setItem("schoolNotifications", JSON.stringify(defaultNotifications));
    }
  }, []);

  // Filter notifications based on read status
  const filteredNotifications = showRead 
    ? notifications 
    : notifications.filter(notification => !notification.read);

  // Mark notification as read
  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("schoolNotifications", JSON.stringify(updatedNotifications));
    
    toast({
      title: "Notification marked as read",
      description: "You can find all read notifications by clicking on 'Show All'",
      duration: 3000,
    });
  };

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-r from-school-primary/5 to-transparent dark:from-gray-900/50 dark:to-transparent">
      <div className="container px-4">
        <AnimatedSection animation="fade-in-up">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center">
              <div className="relative mr-3 sm:mr-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -right-2 -top-1">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-school-primary">
                Notifications
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowRead(!showRead)}
                className="text-xs sm:text-sm"
              >
                {showRead ? "Show Unread" : "Show All"}
              </Button>
              <Link 
                to="/notices" 
                className="text-school-primary hover:text-school-primary/80 text-xs sm:text-sm font-medium transition-colors"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredNotifications.length > 0 ? (
              <div className="h-[300px] rounded-md border border-border">
                <ScrollArea className="h-full">
                  <div className="space-y-2 sm:space-y-4 p-2 sm:p-3">
                    {filteredNotifications.map((notification) => (
                      <Card
                        key={notification.id}
                        className={`relative transition-all hover:shadow-md ${
                          notification.isUrgent
                            ? "border-l-4 border-l-destructive"
                            : "border-l-4 border-l-school-primary"
                        } ${notification.read ? "bg-muted/30" : ""}`}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                <h3 className="font-semibold text-sm sm:text-base md:text-lg">{notification.title}</h3>
                                {notification.isUrgent && (
                                  <span className="bg-destructive/10 text-destructive text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center">
                                    <AlertTriangle className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                                    <span className="hidden sm:inline">Urgent</span>
                                  </span>
                                )}
                                {notification.read && (
                                  <span className="bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center">
                                    <CheckCircle className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                                    <span className="hidden sm:inline">Read</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground">{notification.content}</p>
                              <p className="text-xs text-muted-foreground mt-1 sm:mt-2">{notification.date}</p>
                            </div>
                            {!notification.read && (
                              <Button
                                onClick={() => markAsRead(notification.id)}
                                size="sm"
                                variant="ghost"
                                className="text-muted-foreground hover:text-foreground p-0.5 sm:p-1 h-auto"
                              >
                                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <Alert>
                <AlertTitle className="text-sm sm:text-base">No {showRead ? "" : "unread"} notifications</AlertTitle>
                <AlertDescription className="text-xs sm:text-sm">
                  {showRead 
                    ? "You don't have any notifications yet."
                    : "You're all caught up! Check back later for new announcements."}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NotificationSection;
