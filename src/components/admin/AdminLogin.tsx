
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Lock, LogIn, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type AdminLoginProps = {
  onLoginSuccess: () => void;
};

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSupabaseInitialized, setIsSupabaseInitialized] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Supabase client is properly initialized
    if (!supabase) {
      setIsSupabaseInitialized(false);
      console.error("Supabase client is not initialized. Check your .env file and Supabase configuration.");
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Check if Supabase client is initialized
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }
      
      // Sign in with Supabase auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (authError) throw authError;
      
      if (!data || !data.user) {
        throw new Error("Authentication failed");
      }
      
      // Check if user is an admin in the admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', data.user.id)
        .single();
      
      if (adminError || !adminData) {
        // If user is not in admin_users table, sign them out
        await supabase.auth.signOut();
        throw new Error("User is not authorized as admin");
      }
      
      // Store admin info in localStorage
      localStorage.setItem("adminAuth", "true");
      localStorage.setItem("adminName", adminData.name);
      localStorage.setItem("adminRole", adminData.role);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${adminData.name}`,
      });
      
      onLoginSuccess();
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Invalid email or password, or you do not have admin access");
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password, or you do not have admin access",
        variant: "destructive",
      });
      // Sign out in case of any errors to be safe
      if (supabase) {
        await supabase.auth.signOut();
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupabaseInitialized) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Configuration Error</CardTitle>
            <CardDescription>
              Supabase client is not initialized. Please check your environment variables and Supabase configuration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              Make sure your .env file includes VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY with correct values.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex items-center justify-center w-full gap-2 text-sm text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Secure admin access only</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
