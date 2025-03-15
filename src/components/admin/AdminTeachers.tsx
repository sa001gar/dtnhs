
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, UserRound, GraduationCap } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  employeeId: z.string().min(1, { message: "Employee ID is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  qualification: z.string().min(1, { message: "Qualification is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().optional(),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
  photo: z.string().optional(),
  joinDate: z.string().min(1, { message: "Join date is required" }),
});

type Teacher = {
  id: number;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  qualification: string;
  email: string;
  phone: string;
  address?: string;
  bio: string;
  photo?: string;
  joinDate: string;
};

const AdminTeachers = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "Dr. Amit Kumar",
      employeeId: "TCH-2023-01",
      department: "Science",
      position: "Head of Department",
      qualification: "Ph.D. in Physics",
      email: "amit.kumar@example.com",
      phone: "9876543210",
      address: "123 Main Street, Delhi",
      bio: "Dr. Amit Kumar has over 15 years of teaching experience. He specializes in Physics and has published several research papers in international journals.",
      photo: "https://randomuser.me/api/portraits/men/42.jpg",
      joinDate: "2018-07-15",
    },
    {
      id: 2,
      name: "Mrs. Priya Singh",
      employeeId: "TCH-2023-02",
      department: "Mathematics",
      position: "Senior Teacher",
      qualification: "M.Sc. in Mathematics",
      email: "priya.singh@example.com",
      phone: "9876543212",
      address: "456 Park Avenue, Mumbai",
      bio: "Mrs. Priya Singh is an experienced mathematics teacher with a passion for making math enjoyable for students. She has been teaching for over 10 years.",
      photo: "https://randomuser.me/api/portraits/women/36.jpg",
      joinDate: "2020-01-10",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      employeeId: "",
      department: "",
      position: "",
      qualification: "",
      email: "",
      phone: "",
      address: "",
      bio: "",
      photo: "",
      joinDate: new Date().toISOString().slice(0, 10),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (editingTeacher) {
        // Update existing teacher
        const updatedTeachers = teachers.map((teacher) =>
          teacher.id === editingTeacher.id ? { ...teacher, ...values } : teacher
        );
        setTeachers(updatedTeachers);
        toast({
          title: "Teacher updated",
          description: "The teacher record has been updated successfully.",
        });
      } else {
        // Add new teacher
        const newTeacher: Teacher = {
          id: teachers.length > 0 ? Math.max(...teachers.map((t) => t.id)) + 1 : 1,
          name: values.name,
          employeeId: values.employeeId,
          department: values.department,
          position: values.position,
          qualification: values.qualification,
          email: values.email,
          phone: values.phone,
          address: values.address,
          bio: values.bio,
          photo: values.photo,
          joinDate: values.joinDate,
        };
        setTeachers([...teachers, newTeacher]);
        toast({
          title: "Teacher added",
          description: "The teacher record has been added successfully.",
        });
      }
      setOpenDialog(false);
      setEditingTeacher(null);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the teacher record.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    form.reset({
      name: teacher.name,
      employeeId: teacher.employeeId,
      department: teacher.department,
      position: teacher.position,
      qualification: teacher.qualification,
      email: teacher.email,
      phone: teacher.phone,
      address: teacher.address || "",
      bio: teacher.bio,
      photo: teacher.photo || "",
      joinDate: teacher.joinDate,
    });
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
    toast({
      title: "Teacher deleted",
      description: "The teacher record has been deleted successfully.",
    });
  };

  const handleAddNew = () => {
    setEditingTeacher(null);
    form.reset({
      name: "",
      employeeId: "",
      department: "",
      position: "",
      qualification: "",
      email: "",
      phone: "",
      address: "",
      bio: "",
      photo: "",
      joinDate: new Date().toISOString().slice(0, 10),
    });
    setOpenDialog(true);
  };

  const departments = [
    "Science", "Mathematics", "English", "Hindi", "Social Studies", 
    "Computer Science", "Physical Education", "Arts", "Music"
  ];

  const positions = [
    "Head of Department", "Senior Teacher", "Teacher", "Assistant Teacher", 
    "Lab Assistant", "Counselor", "Principal", "Vice Principal"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Teachers Management</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No teachers available
                    </TableCell>
                  </TableRow>
                ) : (
                  teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {teacher.photo ? (
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img 
                                src={teacher.photo} 
                                alt={teacher.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              <UserRound className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <div>{teacher.name}</div>
                            <div className="text-xs text-muted-foreground">{teacher.employeeId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          {teacher.position}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <span>{teacher.email}</span>
                          <span className="text-muted-foreground">{teacher.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(teacher)}
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
                                <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this teacher record? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(teacher.id)}
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
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTeacher ? "Edit Teacher" : "Add Teacher"}
            </DialogTitle>
            <DialogDescription>
              Fill in the teacher details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter teacher name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter employee ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {positions.map((pos) => (
                            <SelectItem key={pos} value={pos}>
                              {pos}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualification</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter qualification" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="joinDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Join Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter photo URL (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter teacher bio" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {editingTeacher ? "Updating..." : "Saving..."}
                    </span>
                  ) : (
                    <span>{editingTeacher ? "Update Teacher" : "Save Teacher"}</span>
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

export default AdminTeachers;
