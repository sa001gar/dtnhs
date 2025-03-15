
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { Calendar, Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  date: z.string().min(1, { message: "Date is required" }),
  image: z.string().optional(),
});

type NewsItem = {
  id: number;
  title: string;
  content: string;
  date: string;
  image?: string;
};

const AdminNews = () => {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "Annual Sports Day Announced",
      content: "The annual sports day will be held on December 15th. All students are encouraged to participate.",
      date: "2023-11-20",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    },
    {
      id: 2,
      title: "New Library Collection",
      content: "Our school library has been upgraded with over 500 new books across various subjects.",
      date: "2023-11-15",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (editingNews) {
        // Update existing news
        const updatedNews = news.map((item) =>
          item.id === editingNews.id ? { ...item, ...values } : item
        );
        setNews(updatedNews);
        toast({
          title: "News updated",
          description: "The news item has been updated successfully.",
        });
      } else {
        // Add new news
        const newNewsItem: NewsItem = {
          id: news.length > 0 ? Math.max(...news.map((n) => n.id)) + 1 : 1,
          ...values,
        };
        setNews([...news, newNewsItem]);
        toast({
          title: "News added",
          description: "The news item has been added successfully.",
        });
      }
      setOpenDialog(false);
      setEditingNews(null);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the news.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    form.reset({
      title: newsItem.title,
      content: newsItem.content,
      date: newsItem.date,
      image: newsItem.image || "",
    });
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setNews(news.filter((item) => item.id !== id));
    toast({
      title: "News deleted",
      description: "The news item has been deleted successfully.",
    });
  };

  const handleAddNew = () => {
    setEditingNews(null);
    form.reset({
      title: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      image: "",
    });
    setOpenDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage News</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add News
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
                  <TableHead>Preview</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No news available
                    </TableCell>
                  </TableRow>
                ) : (
                  news.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.title}
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {item.content}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.image ? (
                          <div className="w-10 h-10 rounded-md overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
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
                                <AlertDialogTitle>Delete News</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this news item? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(item.id)}
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingNews ? "Edit News" : "Add News"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the news item. Click save when you're done.
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
                      <Input placeholder="Enter news title" {...field} />
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
                        placeholder="Enter news content" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
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
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
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
                      {editingNews ? "Updating..." : "Saving..."}
                    </span>
                  ) : (
                    <span>{editingNews ? "Update News" : "Save News"}</span>
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

export default AdminNews;
