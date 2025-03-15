
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Pencil, Trash2, Calendar, AlertTriangle, Megaphone } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  date: z.string().min(1, { message: "Date is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  attachment: z.string().optional(),
  isUrgent: z.boolean().default(false),
});

type Notice = {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  attachment?: string;
  isUrgent: boolean;
};

const AdminNotices = () => {
  const { toast } = useToast();
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: "Final Examination Schedule Announcement",
      content: "The final examination for all classes will be held from December 10th to December 20th, 2023. The detailed schedule has been posted on the school notice board and is available for download.",
      date: "2023-11-25",
      category: "Examination",
      attachment: "https://example.com/exam-schedule.pdf",
      isUrgent: true,
    },
    {
      id: 2,
      title: "Annual Day Celebration",
      content: "The Annual Day celebration will be held on December 5th, 2023 at the school auditorium. All parents are cordially invited to attend the function.",
      date: "2023-11-20",
      category: "Event",
      isUrgent: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      category: "",
      attachment: "",
      isUrgent: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (editingNotice) {
        // Update existing notice
        const updatedNotices = notices.map((notice) =>
          notice.id === editingNotice.id ? { ...notice, ...values } : notice
        );
        setNotices(updatedNotices);
        toast({
          title: "Notice updated",
          description: "The notice has been updated successfully.",
        });
      } else {
        // Add new notice
        const newNotice: Notice = {
          id: notices.length > 0 ? Math.max(...notices.map((n) => n.id)) + 1 : 1,
          title: values.title,
          content: values.content,
          date: values.date,
          category: values.category,
          attachment: values.attachment,
          isUrgent: values.isUrgent,
        };
        setNotices([...notices, newNotice]);
        toast({
          title: "Notice added",
          description: "The notice has been added successfully.",
        });
      }
      setOpenDialog(false);
      setEditingNotice(null);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the notice.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    form.reset({
      title: notice.title,
      content: notice.content,
      date: notice.date,
      category: notice.category,
      attachment: notice.attachment || "",
      isUrgent: notice.isUrgent,
    });
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setNotices(notices.filter((notice) => notice.id !== id));
    toast({
      title: "Notice deleted",
      description: "The notice has been deleted successfully.",
    });
  };

  const handleAddNew = () => {
    setEditingNotice(null);
    form.reset({
      title: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      category: "",
      attachment: "",
      isUrgent: false,
    });
    setOpenDialog(true);
  };

  const categories = [
    "Examination", "Event", "Holiday", "General", "Academic", 
    "Sports", "Cultural", "Administrative", "Important"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notices Management</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Notice
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No notices available
                    </TableCell>
                  </TableRow>
                ) : (
                  notices.map((notice) => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Megaphone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="flex items-center gap-2">
                              {notice.title}
                              {notice.isUrgent && (
                                <Badge variant="destructive" className="ml-1">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {notice.content}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(notice.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{notice.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(notice)}
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
                                <AlertDialogTitle>Delete Notice</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this notice? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(notice.id)}
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
              {editingNotice ? "Edit Notice" : "Add Notice"}
            </DialogTitle>
            <DialogDescription>
              Fill in the notice details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter notice title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter notice content" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="attachment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attachment URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter attachment URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isUrgent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Mark as Urgent</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        This notice will be highlighted and marked as urgent.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {editingNotice ? "Updating..." : "Saving..."}
                    </span>
                  ) : (
                    <span>{editingNotice ? "Update Notice" : "Save Notice"}</span>
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

export default AdminNotices;
