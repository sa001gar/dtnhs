
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
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
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, UserCog, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.string().default("admin"),
});

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

const AdminUsers = () => {
  const { toast } = useToast();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  // Fetch admin users
  const fetchAdminUsers = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*');
        
      if (error) {
        throw error;
      }
      
      setAdminUsers(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch admin users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);
    
    try {
      if (editingUser) {
        // Update existing user
        const { error: updateError } = await supabase
          .from('admin_users')
          .update({ 
            name: values.name,
            role: values.role
          })
          .eq('id', editingUser.id);
          
        if (updateError) throw updateError;
        
        toast({
          title: "User updated",
          description: "Admin user has been updated successfully",
        });
      } else {
        // Create new user in auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
        
        if (authError) throw authError;
        
        // Add user to admin_users table
        const { error: adminError } = await supabase
          .from('admin_users')
          .insert([
            {
              user_id: authData.user?.id,
              name: values.name,
              email: values.email,
              role: values.role
            }
          ]);
          
        if (adminError) throw adminError;
        
        toast({
          title: "User created",
          description: "New admin user has been created successfully",
        });
      }
      
      // Reset and close dialog
      form.reset();
      setOpenDialog(false);
      setEditingUser(null);
      fetchAdminUsers();
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save admin user",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingUser(null);
    form.reset({
      name: "",
      email: "",
      password: "",
      role: "admin",
    });
    setOpenDialog(true);
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      password: "", // Don't set password when editing
      role: user.role,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "User deleted",
        description: "Admin user has been deleted successfully",
      });
      
      fetchAdminUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete admin user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Users Management</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Admin User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : adminUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No admin users found
                    </TableCell>
                  </TableRow>
                ) : (
                  adminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <UserCog className="h-4 w-4 text-muted-foreground" />
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          {user.role}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Admin User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this admin user? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(user.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit Admin User" : "Add Admin User"}
            </DialogTitle>
            <DialogDescription>
              {editingUser 
                ? "Update the admin user details below." 
                : "Fill in the details to create a new admin user."}
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
                      <Input placeholder="Enter name" {...field} />
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
                      <Input 
                        type="email" 
                        placeholder="Enter email" 
                        {...field} 
                        disabled={!!editingUser}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!editingUser && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <DialogFooter>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {editingUser ? "Updating..." : "Saving..."}
                    </span>
                  ) : (
                    <span>{editingUser ? "Update User" : "Save User"}</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
