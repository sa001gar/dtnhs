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
  CardHeader,
  CardTitle,
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
  DialogTrigger,
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
import { MessageSquare, Plus, Pencil, Trash2, Clock, Eye, ThumbsUp } from "lucide-react";

// Forum discussion form schema with validation
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  preview: z.string().min(10, { message: "Preview must be at least 10 characters" }),
  content: z.string().min(20, { message: "Content must be at least 20 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  author: z.object({
    name: z.string().min(2, { message: "Author name is required" }),
    avatar: z.string().min(1, { message: "Author avatar is required" }),
  }),
  isPopular: z.boolean().default(false),
});

type ForumThread = {
  id: number;
  title: string;
  preview: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  replies: number;
  views: number;
  likes: number;
  lastActive: string;
  isPopular: boolean;
};

const AdminForum = () => {
  const { toast } = useToast();
  const [threads, setThreads] = useState<ForumThread[]>([
    {
      id: 1,
      title: "Tips for Class 10 Science Board Preparation",
      preview: "What are the most effective ways to prepare for the upcoming science board exams?",
      content: "Hello everyone, I'm looking for tips on how to efficiently prepare for the upcoming science board exams. What study techniques have worked for you? Are there any specific resources you would recommend? Please share your experiences and suggestions.",
      category: "Academics",
      author: {
        name: "Rahul Kumar",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      replies: 15,
      views: 156,
      likes: 23,
      lastActive: "2 hours ago",
      isPopular: true
    },
    {
      id: 2,
      title: "Annual Sports Day Event Planning",
      preview: "Let's discuss ideas and arrangements for this year's annual sports day event.",
      content: "The annual sports day is approaching, and I'd like to gather ideas on how we can make it special this year. What new events should we include? How can we improve the organization compared to last year? Any suggestions for themes or activities would be appreciated.",
      category: "Events",
      author: {
        name: "Priya Singh",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      replies: 8,
      views: 92,
      likes: 12,
      lastActive: "5 hours ago",
      isPopular: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingThread, setEditingThread] = useState<ForumThread | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [categories, setCategories] = useState<string[]>([
    "Academics", "Events", "Career", "Administration", "Clubs", "General"
  ]);
  const [newCategory, setNewCategory] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      preview: "",
      content: "",
      category: "",
      author: {
        name: "",
        avatar: "",
      },
      isPopular: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (editingThread) {
        const updatedThreads = threads.map((thread) =>
          thread.id === editingThread.id 
            ? { 
                ...thread, 
                title: values.title,
                preview: values.preview,
                content: values.content,
                category: values.category,
                author: {
                  name: values.author.name,
                  avatar: values.author.avatar,
                },
                isPopular: values.isPopular
              } 
            : thread
        );
        setThreads(updatedThreads);
        toast({
          title: "Discussion thread updated",
          description: "The discussion thread has been updated successfully.",
        });
      } else {
        const newThread: ForumThread = {
          id: threads.length > 0 ? Math.max(...threads.map((t) => t.id)) + 1 : 1,
          title: values.title,
          preview: values.preview,
          content: values.content,
          category: values.category,
          author: {
            name: values.author.name,
            avatar: values.author.avatar,
          },
          replies: 0,
          views: 0,
          likes: 0,
          lastActive: "Just now",
          isPopular: values.isPopular,
        };
        setThreads([...threads, newThread]);
        toast({
          title: "Discussion thread added",
          description: "The discussion thread has been added successfully.",
        });
      }
      setOpenDialog(false);
      setEditingThread(null);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the discussion thread.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (thread: ForumThread) => {
    setEditingThread(thread);
    form.reset({
      title: thread.title,
      preview: thread.preview,
      content: thread.content,
      category: thread.category,
      author: {
        name: thread.author.name,
        avatar: thread.author.avatar,
      },
      isPopular: thread.isPopular,
    });
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setThreads(threads.filter((thread) => thread.id !== id));
    toast({
      title: "Discussion thread deleted",
      description: "The discussion thread has been deleted successfully.",
    });
  };

  const handleAddNew = () => {
    setEditingThread(null);
    form.reset({
      title: "",
      preview: "",
      content: "",
      category: "",
      author: {
        name: "",
        avatar: "",
      },
      isPopular: false,
    });
    setOpenDialog(true);
  };

  const addCategory = () => {
    if (newCategory.trim() === "") return;
    if (!categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
    }
    setNewCategory("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Forum Discussions</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Discussion Thread
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {threads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No discussion threads available
                        </TableCell>
                      </TableRow>
                    ) : (
                      threads.map((thread) => (
                        <TableRow key={thread.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {thread.isPopular && (
                                <Badge className="bg-yellow-500 hover:bg-yellow-600">Popular</Badge>
                              )}
                              <span>{thread.title}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {thread.preview}
                            </div>
                            <div className="text-xs mt-1">
                              by <span className="font-medium">{thread.author.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{thread.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1 text-xs">
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>{thread.replies} replies</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{thread.views} views</span>
                              </div>
                              <div className="flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                <span>{thread.likes} likes</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Active {thread.lastActive}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(thread)}
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
                                    <AlertDialogTitle>Delete Discussion Thread</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this discussion thread? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(thread.id)}
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
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCategory();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addCategory}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category} 
                    className="flex justify-between items-center p-2 border rounded-md"
                  >
                    <span>{category}</span>
                    <Badge variant="secondary">
                      {threads.filter(t => t.category === category).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingThread ? "Edit Discussion Thread" : "Add Discussion Thread"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the discussion thread. Click save when you're done.
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
                      <Input placeholder="Enter discussion title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preview</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a short preview" {...field} />
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
                        placeholder="Enter discussion content" 
                        className="min-h-[120px]"
                        {...field} 
                      />
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
                          <SelectValue placeholder="Select a category" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="author.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author.avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Avatar URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author avatar URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="isPopular"
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
                      <FormLabel>Mark as Popular</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        This thread will be highlighted and shown in the popular section.
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
                      {editingThread ? "Updating..." : "Saving..."}
                    </span>
                  ) : (
                    <span>{editingThread ? "Update Thread" : "Save Thread"}</span>
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

export default AdminForum;
