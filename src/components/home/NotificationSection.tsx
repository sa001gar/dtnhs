
import React, { useState } from "react";
import { Bell, AlertTriangle, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnimatedSection from "../ui/AnimatedSection";
import { Link } from "react-router-dom";

interface Notification {
  id: number;
  title: string;
  content: string;
  date: string;
  isUrgent: boolean;
}

const NotificationSection = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Annual Day Celebration",
      content: "Join us for the Annual Day celebration on June 30, 2023.",
      date: "June 15, 2023",
      isUrgent: true,
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      content: "PTM scheduled for all classes on May 20, 2023.",
      date: "May 10, 2023",
      isUrgent: false,
    },
    {
      id: 3,
      title: "Summer Vacation Announcement",
      content: "School closed from May 25 to June 15, 2023.",
      date: "April 25, 2023",
      isUrgent: false,
    },
  ]);

  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>(notifications);

  const dismissNotification = (id: number) => {
    setVisibleNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <section className="py-12 bg-gradient-to-r from-school-primary/5 to-transparent dark:from-gray-900/50 dark:to-transparent">
      <div className="container px-4">
        <AnimatedSection animation="fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                <Bell className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-school-primary">
                Notifications
              </h2>
            </div>
            <Link 
              to="/notices" 
              className="text-school-primary hover:text-school-primary/80 text-sm font-medium transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {visibleNotifications.length > 0 ? (
              <ScrollArea className="h-[300px] rounded-md border border-border p-1">
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
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{notification.title}</h3>
                              {notification.isUrgent && (
                                <span className="bg-destructive/10 text-destructive text-xs px-2 py-1 rounded-full flex items-center">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Urgent
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground">{notification.content}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                          </div>
                          <button
                            onClick={() => dismissNotification(notification.id)}
                            className="text-muted-foreground hover:text-foreground p-1 rounded-full"
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
              <Alert>
                <AlertTitle>No new notifications</AlertTitle>
                <AlertDescription>
                  You're all caught up! Check back later for new announcements.
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
