
import React, { useState } from "react";
import { Bell, AlertTriangle, X, ArrowRight, Users, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnimatedSection from "../ui/AnimatedSection";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface Notification {
  id: number;
  title: string;
  content: string;
  date: string;
  isUrgent: boolean;
  category?: string;
  icon?: React.ReactNode;
}

const NotificationSection = () => {
  const isMobile = useIsMobile();
  
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Annual Day Celebration",
      content: "Join us for the Annual Day celebration on June 30, 2023. All students and parents are cordially invited.",
      date: "June 15, 2023",
      isUrgent: true,
      category: "Event",
      icon: <Calendar className="h-4 w-4 text-blue-500" />
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      content: "PTM scheduled for all classes on May 20, 2023. Attendance is mandatory for all parents.",
      date: "May 10, 2023",
      isUrgent: false,
      category: "Meeting",
      icon: <Users className="h-4 w-4 text-violet-500" />
    },
    {
      id: 3,
      title: "Summer Vacation Announcement",
      content: "School closed from May 25 to June 15, 2023 for summer vacation. Enjoy your holidays!",
      date: "April 25, 2023",
      isUrgent: false,
      category: "Announcement",
      icon: <Star className="h-4 w-4 text-yellow-500" />
    },
  ]);

  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>(notifications);

  const dismissNotification = (id: number) => {
    setVisibleNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <section className="py-12 bg-gradient-to-r from-school-primary/5 to-transparent dark:from-gray-900/50 dark:to-transparent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-school-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-school-primary/5 rounded-full blur-3xl" />
      
      <div className="container px-4">
        <AnimatedSection animation="fade-in-up">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter text-school-primary">
                  Notifications
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Stay updated with the latest announcements and events
                </p>
              </div>
            </div>
            <Link 
              to="/notices" 
              className="group text-school-primary hover:text-school-primary/80 text-sm font-medium transition-colors flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {visibleNotifications.length > 0 ? (
              <ScrollArea className={`${isMobile ? 'h-[400px]' : 'h-[300px]'} rounded-md border border-border p-1`}>
                <div className="space-y-4 px-1">
                  {visibleNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`relative transition-all hover:shadow-md ${
                        notification.isUrgent
                          ? "border-l-4 border-l-destructive"
                          : "border-l-4 border-l-school-primary"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {notification.category && (
                                <Badge variant="outline" className="text-xs py-0">
                                  {notification.icon}
                                  <span className="ml-1">{notification.category}</span>
                                </Badge>
                              )}
                              {notification.isUrgent && (
                                <span className="bg-destructive/10 text-destructive text-xs px-2 py-1 rounded-full flex items-center">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Urgent
                                </span>
                              )}
                            </div>
                            <h3 className="font-semibold text-lg">{notification.title}</h3>
                            <p className="text-muted-foreground mt-1">{notification.content}</p>
                            <div className="flex justify-between items-center mt-3">
                              <p className="text-xs text-muted-foreground">{notification.date}</p>
                              {!isMobile && (
                                <Button variant="ghost" size="sm" className="text-xs h-7">
                                  Read More
                                </Button>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => dismissNotification(notification.id)}
                            className="text-muted-foreground hover:text-foreground p-1 rounded-full flex-shrink-0"
                            aria-label="Dismiss notification"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <Alert className="bg-card border shadow-sm">
                <AlertTitle className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" /> No new notifications
                </AlertTitle>
                <AlertDescription>
                  You're all caught up! Check back later for new announcements.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          {isMobile && visibleNotifications.length > 0 && (
            <div className="flex justify-center mt-4">
              <Link to="/notices">
                <Button variant="outline">
                  View All Notifications <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NotificationSection;
