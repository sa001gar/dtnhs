
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  User, Settings, BookOpen, Calendar, FileText,
  Users, GraduationCap, Image, Bell, NewspaperIcon,
  LogOut, UserPlus, MessageSquare, Mail
} from "lucide-react";

import AdminNews from "@/components/admin/AdminNews";
import AdminNotices from "@/components/admin/AdminNotices";
import AdminExams from "@/components/admin/AdminExams";
import AdminTeachers from "@/components/admin/AdminTeachers";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminStudents from "@/components/admin/AdminStudents";
import AdminPapers from "@/components/admin/AdminPapers";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminAlumni from "@/components/admin/AdminAlumni";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminForum from "@/components/admin/AdminForum";
import AdminContact from "@/components/admin/AdminContact";
import PageLoader from "@/components/shared/PageLoader";
import { supabase, logoutAdmin } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Admin = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  
  useEffect(() => {
    // First check if Supabase is initialized
    if (!supabase) {
      setSupabaseError("Supabase client is not initialized. Please check your environment variables.");
      setIsLoading(false);
      return;
    }
    
    checkAdminSession();
  }, []);
  
  const checkAdminSession = async () => {
    setIsLoading(true);
    
    try {
      // Check if Supabase client is initialized
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }
      
      // Check if user is logged in with Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }
      
      if (!session) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      
      // Check if user is in admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      
      if (adminError || !adminData) {
        setIsAuthenticated(false);
        // Sign out if user is not an admin
        await supabase.auth.signOut();
        localStorage.removeItem("adminAuth");
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminRole");
      } else {
        setIsAuthenticated(true);
        setAdminName(adminData.name);
        setAdminRole(adminData.role);
        
        // Update local storage
        localStorage.setItem("adminAuth", "true");
        localStorage.setItem("adminName", adminData.name);
        localStorage.setItem("adminRole", adminData.role);
      }
    } catch (error: any) {
      console.error("Error checking admin session:", error);
      setIsAuthenticated(false);
      setSupabaseError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { success, error } = await logoutAdmin();
      
      if (!success) {
        throw error;
      }
      
      setIsAuthenticated(false);
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "There was a problem logging out.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (supabaseError) {
    return (
      <Layout>
        <div className="container py-8">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-destructive">Configuration Error</CardTitle>
              <CardDescription>
                There was a problem with your Supabase configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-destructive mb-4">{supabaseError}</p>
              <p>Please check your environment variables and make sure Supabase is properly configured.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => {
      setIsAuthenticated(true);
      setAdminName(localStorage.getItem("adminName") || "");
      setAdminRole(localStorage.getItem("adminRole") || "");
    }} />;
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="font-medium">{adminName}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {adminRole === "super_admin" ? "Super Admin" : "Admin"}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          <Separator />
          
          <Tabs defaultValue="news" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 lg:grid-cols-14 h-auto gap-2">
              <TabsTrigger value="news" className="flex gap-2 items-center">
                <NewspaperIcon className="h-4 w-4" />
                <span className="hidden md:inline">News</span>
              </TabsTrigger>
              <TabsTrigger value="notices" className="flex gap-2 items-center">
                <Bell className="h-4 w-4" />
                <span className="hidden md:inline">Notices</span>
              </TabsTrigger>
              <TabsTrigger value="exams" className="flex gap-2 items-center">
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Exams</span>
              </TabsTrigger>
              <TabsTrigger value="papers" className="flex gap-2 items-center">
                <FileText className="h-4 w-4" />
                <span className="hidden md:inline">Papers</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex gap-2 items-center">
                <BookOpen className="h-4 w-4" />
                <span className="hidden md:inline">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="forum" className="flex gap-2 items-center">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden md:inline">Forum</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex gap-2 items-center">
                <Mail className="h-4 w-4" />
                <span className="hidden md:inline">Contact</span>
              </TabsTrigger>
              <TabsTrigger value="teachers" className="flex gap-2 items-center">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Teachers</span>
              </TabsTrigger>
              <TabsTrigger value="students" className="flex gap-2 items-center">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden md:inline">Students</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex gap-2 items-center">
                <Image className="h-4 w-4" />
                <span className="hidden md:inline">Gallery</span>
              </TabsTrigger>
              <TabsTrigger value="alumni" className="flex gap-2 items-center">
                <UserPlus className="h-4 w-4" />
                <span className="hidden md:inline">Alumni</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex gap-2 items-center">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex gap-2 items-center">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="news" className="space-y-4">
              <AdminNews />
            </TabsContent>
            
            <TabsContent value="notices" className="space-y-4">
              <AdminNotices />
            </TabsContent>
            
            <TabsContent value="exams" className="space-y-4">
              <AdminExams />
            </TabsContent>
            
            <TabsContent value="papers" className="space-y-4">
              <AdminPapers />
            </TabsContent>
            
            <TabsContent value="blog" className="space-y-4">
              <AdminBlog />
            </TabsContent>
            
            <TabsContent value="forum" className="space-y-4">
              <AdminForum />
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <AdminContact />
            </TabsContent>
            
            <TabsContent value="teachers" className="space-y-4">
              <AdminTeachers />
            </TabsContent>
            
            <TabsContent value="students" className="space-y-4">
              <AdminStudents />
            </TabsContent>
            
            <TabsContent value="gallery" className="space-y-4">
              <AdminGallery />
            </TabsContent>
            
            <TabsContent value="alumni" className="space-y-4">
              <AdminAlumni />
            </TabsContent>
            
            <TabsContent value="account" className="space-y-4">
              <AdminUsers />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <h2 className="text-2xl font-bold">Site Settings</h2>
              <p>Configure global site settings here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
