
import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, UserRound } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  rollNumber: z.string().min(1, { message: "Roll number is required" }),
  class: z.string().min(1, { message: "Class is required" }),
  section: z.string().min(1, { message: "Section is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  guardianName: z.string().min(3, { message: "Guardian name is required" }),
  guardianPhone: z.string().min(10, { message: "Guardian phone must be at least 10 digits" }),
});

type Student = {
  id: number;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  email: string;
  phone: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
};

const AdminStudents = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Rahul Sharma",
      rollNumber: "2023-01",
      class: "10",
      section: "A",
      email: "rahul.sharma@example.com",
      phone: "9876543210",
      address: "123 Main Street, Delhi",
      guardianName: "Anil Sharma",
      guardianPhone: "9876543211",
    },
    {
      id: 2,
      name: "Priya Patel",
      rollNumber: "2023-02",
      class: "10",
      section: "B",
      email: "priya.patel@example.com",
      phone: "9876543212",
      address: "456 Park Avenue, Mumbai",
      guardianName: "Rajesh Patel",
      guardianPhone: "9876543213",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rollNumber: "",
      class: "",
      section: "",
      email: "",
      phone: "",
      address: "",
      guardianName: "",
      guardianPhone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (editingStudent) {
        // Update existing student
        const updatedStudents = students.map((student) =>
          student.id === editingStudent.id ? { ...student, ...values } : student
        );
        setStudents(updatedStudents);
        toast({
          title: "Student updated",
          description: "The student record has been updated successfully.",
        });
      } else {
        // Add new student
        const newStudent: Student = {
          id: students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
          name: values.name,
          rollNumber: values.rollNumber,
          class: values.class,
          section: values.section,
          email: values.email,
          phone: values.phone,
          address: values.address,
          guardianName: values.guardianName,
          guardianPhone: values.guardianPhone,
        };
        setStudents([...students, newStudent]);
        toast({
          title: "Student added",
          description: "The student record has been added successfully.",
        });
      }
      setOpenDialog(false);
      setEditingStudent(null);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the student record.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    form.reset({
      name: student.name,
      rollNumber: student.rollNumber,
      class: student.class,
      section: student.section,
      email: student.email,
      phone: student.phone,
      address: student.address,
      guardianName: student.guardianName,
      guardianPhone: student.guardianPhone,
    });
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setStudents(students.filter((student) => student.id !== id));
    toast({
      title: "Student deleted",
      description: "The student record has been deleted successfully.",
    });
  };

  const handleAddNew = () => {
    setEditingStudent(null);
    form.reset({
      name: "",
      rollNumber: "",
      class: "",
      section: "",
      email: "",
      phone: "",
      address: "",
      guardianName: "",
      guardianPhone: "",
    });
    setOpenDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Students Management</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No students available
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <UserRound className="h-5 w-5 text-muted-foreground" />
                          {student.name}
                        </div>
                      </TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>Class {student.class}-{student.section}</TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <span>{student.email}</span>
                          <span className="text-muted-foreground">{student.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(student)}
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
                                <AlertDialogTitle>Delete Student</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this student record? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(student.id)}
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
              {editingStudent ? "Edit Student" : "Add Student"}
            </DialogTitle>
            <DialogDescription>
              Fill in the student details. Click save when you're done.
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
                      <Input placeholder="Enter student name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter roll number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
                            <SelectItem key={cls} value={cls.toString()}>
                              Class {cls}
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
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["A", "B", "C", "D", "E"].map((section) => (
                            <SelectItem key={section} value={section}>
                              Section {section}
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
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="guardianName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guardian Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter guardian name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guardianPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guardian Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter guardian phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {editingStudent ? "Updating..." : "Saving..."}
                    </span>
                  ) : (
                    <span>{editingStudent ? "Update Student" : "Save Student"}</span>
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

export default AdminStudents;
