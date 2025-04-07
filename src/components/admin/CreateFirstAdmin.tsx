
import React, { useState } from "react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { UserPlus, AlertCircle, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const CreateFirstAdmin = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if admin_users table exists and has any users
      const { count, error: countError } = await supabase
        .from("admin_users")
        .select("*", { count: "exact", head: true });

      if (countError) throw countError;

      // If there are already admin users, don't allow creating more through this component
      if (count && count > 0) {
        throw new Error("Admin user already exists. Please use the admin panel to create more users.");
      }

      // Create user in Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Failed to create user");
      }

      // Add user to admin_users table as a super_admin
      const { error: adminError } = await supabase.from("admin_users").insert([
        {
          user_id: authData.user.id,
          name: values.name,
          role: "super_admin", // First user is always a super_admin
        },
      ]);

      if (adminError) throw adminError;

      toast({
        title: "Success",
        description: "First admin user created successfully. You can now log in.",
      });

      setIsCreated(true);
    } catch (error: any) {
      console.error("Error creating admin user:", error);
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCreated) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-green-600">Success!</CardTitle>
            <CardDescription>
              Your admin account has been created successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-700">Admin Account Created</h3>
              </div>
              <p className="text-green-700 text-sm">
                You can now log in to the admin panel using your email and password.
              </p>
            </div>
            <div className="flex justify-center">
              <Button asChild className="px-8">
                <a href="/admin">Go to Admin Login</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Create First Admin</CardTitle>
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
              Initial Setup
            </Badge>
          </div>
          <CardDescription>
            Create the first admin user for your school website
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

          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <p className="text-blue-700 text-sm">
              This form is only available for creating the first admin user. After creation,
              you can manage admin users from the admin dashboard.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      <Input
                        type="password"
                        placeholder="Create a password (min. 6 characters)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create Admin Account
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex justify-center w-full text-sm text-muted-foreground">
            <p>The first admin user will have super admin privileges</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateFirstAdmin;
