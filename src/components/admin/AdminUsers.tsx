
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Trash2, Shield, CalendarClock } from "lucide-react";
import { supabase } from "@/lib/supabase";

type AdminUser = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin";
  created_at: string;
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["super_admin", "admin"], { required_error: "Role is required" }),
});

const AdminUsers = () => {
  const { toast } = useToast();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUserCreating, setIsUserCreating] = useState(false);
  const [isCurrentUserSuperAdmin, setIsCurrentUserSuperAdmin] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
    },
  });
  
  useEffect(() => {
    fetchAdminUsers();
    
    // Check if current user is super_admin
    const adminRole = localStorage.getItem("adminRole");
    setIsCurrentUserSuperAdmin(adminRole === "super_admin");
  }, []);
  
  const fetchAdminUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      setAdminUsers(data as AdminUser[]);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      toast({
        title: "Error fetching admin users",
        description: "There was a problem loading the admin user data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isCurrentUserSuperAdmin) {
      toast({
        title: "Permission denied",
        description: "Only super admins can create new admin users.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUserCreating(true);
    
    try {
      // Create user in Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      
      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error("Failed to create user");
      }
      
      // Add user to admin_users table
      const { error: adminError } = await supabase
        .from("admin_users")
        .insert([
          {
            user_id: authData.user.id,
            name: values.name,
            email: values.email,
            role: values.role,
            created_at: new Date().toISOString(),
          },
        ]);
      
      if (adminError) throw adminError;
      
      toast({
        title: "Admin user created",
        description: "New admin user has been created successfully.",
      });
      
      // Reset form and close dialog
      form.reset();
      setIsAddDialogOpen(false);
      fetchAdminUsers();
    } catch (error) {
      console.error("Error creating admin user:", error);
      toast({
        title: "Error creating admin user",
        description: "There was a problem creating the admin user.",
        variant: "destructive",
      });
    } finally {
      setIsUserCreating(false);
    }
  };
  
  const handleDeleteUser = async (userId: string, email: string) => {
    if (!isCurrentUserSuperAdmin) {
      toast({
        title: "Permission denied",
        description: "Only super admins can delete admin users.",
        variant: "destructive",
      });
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete the admin user ${email}?`)) {
      return;
    }
    
    try {
      // Delete from admin_users table
      const { error: adminError } = await supabase
        .from("admin_users")
        .delete()
        .eq("id", userId);
      
      if (adminError) throw adminError;
      
      toast({
        title: "Admin user deleted",
        description: "Admin user has been deleted successfully.",
      });
      
      fetchAdminUsers();
    } catch (error) {
      console.error("Error deleting admin user:", error);
      toast({
        title: "Error deleting admin user",
        description: "There was a problem deleting the admin user.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>
              Manage admin access to the dashboard
            </CardDescription>
          </div>
          
          {isCurrentUserSuperAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-school-primary hover:bg-school-primary/90">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin User</DialogTitle>
                  <DialogDescription>
                    Create a new admin user with appropriate permissions
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
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
                            <Input type="email" placeholder="Enter email address" {...field} />
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
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="submit" disabled={isUserCreating}>
                        {isUserCreating ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Creating...
                          </span>
                        ) : (
                          "Create Admin User"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-6">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </div>
          ) : adminUsers.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No admin users found
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    {isCurrentUserSuperAdmin && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-school-primary/20 text-school-primary">
                              {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className={`h-4 w-4 ${user.role === "super_admin" ? "text-amber-500" : "text-blue-500"}`} />
                          <span className="capitalize">
                            {user.role === "super_admin" ? "Super Admin" : "Admin"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      {isCurrentUserSuperAdmin && (
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-100"
                            onClick={() => handleDeleteUser(user.id, user.email)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
