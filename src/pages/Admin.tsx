
import React, { useState, useEffect } from "react";
import { Navigate, Link, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  User, Settings, BookOpen, Calendar, FileText,
  Users, GraduationCap, Image, Bell, NewspaperIcon,
  Menu, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import AdminNews from "@/components/admin/AdminNews";
import AdminNotices from "@/components/admin/AdminNotices";
import AdminExams from "@/components/admin/AdminExams";
import AdminTeachers from "@/components/admin/AdminTeachers";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminStudents from "@/components/admin/AdminStudents";
import AdminPapers from "@/components/admin/AdminPapers";
import AdminLogin from "@/components/admin/AdminLogin";
import PageLoader from "@/components/shared/PageLoader";
import PageHeader from "@/components/shared/PageHeader";

const Admin = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("news");
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Here you would check if the user is authenticated as admin
    // For now, we'll use localStorage as a simple placeholder
    const adminAuth = localStorage.getItem("adminAuth");
    setIsAuthenticated(adminAuth === "true");
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const tabs = [
    { id: "news", label: "News", icon: <NewspaperIcon className="h-4 w-4" /> },
    { id: "notices", label: "Notices", icon: <Bell className="h-4 w-4" /> },
    { id: "exams", label: "Exams", icon: <Calendar className="h-4 w-4" /> },
    { id: "papers", label: "Papers", icon: <FileText className="h-4 w-4" /> },
    { id: "teachers", label: "Teachers", icon: <Users className="h-4 w-4" /> },
    { id: "students", label: "Students", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "gallery", label: "Gallery", icon: <Image className="h-4 w-4" /> },
    { id: "account", label: "Account", icon: <User className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case "news": return <AdminNews />;
      case "notices": return <AdminNotices />;
      case "exams": return <AdminExams />;
      case "papers": return <AdminPapers />;
      case "teachers": return <AdminTeachers />;
      case "students": return <AdminStudents />;
      case "gallery": return <AdminGallery />;
      case "account": return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Account Settings</h2>
          <p>Manage your admin account settings here.</p>
        </div>
      );
      case "settings": return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Site Settings</h2>
          <p>Configure global site settings here.</p>
        </div>
      );
      default: return null;
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Admin Dashboard"
        description="Manage and update school information"
        pattern="dots"
      />

      <div className="container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            {isMobile ? (
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[250px] p-0">
                    <SheetHeader className="p-4 border-b">
                      <SheetTitle>Admin Menu</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            document.querySelector('[data-radix-collection-item]')?.click();
                          }}
                          className={`flex items-center gap-3 px-4 py-2 w-full text-left ${
                            activeTab === tab.id 
                              ? 'bg-muted font-medium text-foreground'
                              : 'text-muted-foreground hover:bg-muted/50'
                          }`}
                        >
                          {tab.icon}
                          <span>{tab.label}</span>
                        </button>
                      ))}
                      <Separator className="my-2" />
                      <button
                        onClick={() => {
                          handleLogout();
                          document.querySelector('[data-radix-collection-item]')?.click();
                        }}
                        className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </SheetContent>
                </Sheet>
                <h1 className="text-xl font-bold tracking-tight">{tabs.find(t => t.id === activeTab)?.label}</h1>
              </div>
            ) : (
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            )}
            
            {!isMobile && (
              <button 
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            )}
          </div>
          
          {!isMobile && <Separator />}
          
          {isMobile ? (
            <div>{renderTabContent()}</div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 h-auto gap-2">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex gap-2 items-center">
                    {tab.icon}
                    <span className="hidden md:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="animate-in fade-in-50">
                  {renderTabContent()}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
