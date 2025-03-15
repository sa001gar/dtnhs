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
import { Calendar, Plus, Pencil, Trash2, Image as ImageIcon, Tag } from "lucide-react";

// Blog form schema with validation
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  date: z.string().min(1, { message: "Date is required" }),
  image: z.string().min(1, { message: "Image URL is required" }),
  author: z.object({
    name: z.string().min(2, { message: "Author name is required" }),
    role: z.string().min(2, { message: "Author role is required" }),
    avatar: z.string().min(1, { message: "Author avatar URL is required" }),
  }),
  categories: z.array(z.string()).min(1, { message: "At least one category is required" }),
  readTime: z.string().min(1, { message: "Read time is required" }),
});

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  categories: string[];
  readTime: string;
};

const AdminBlog = () => {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Annual Science Fair Showcases Student Innovation",
      excerpt: "This year's science fair featured over 50 projects demonstrating the creativity and scientific acumen of our students.",
      content: "This year's science fair featured over 50 projects demonstrating the creativity and scientific acumen of our students. Projects ranged from environmental studies to robotics and artificial intelligence applications. The event was attended by parents, teachers, and industry professionals who were impressed by the high quality of work presented.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1920",
      date: "2023-10-15",
      readTime: "5 min read",
      author: {
        name: "Dr. Amit Patel",
        role: "Science Department Head",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg"
      },
      categories: ["Events", "Science"]
    },
    {
      id: 2,
      title: "New Library Resources Enhance Student Learning",
      excerpt: "Our school library has been upgraded with over 5,000 new books and digital resources to support student research and reading.",
      content: "Our school library has been upgraded with over 5,000 new books and digital resources to support student research and reading. The new collection includes reference materials, fiction, non-fiction, and digital subscriptions to academic journals. Students now have access to a wider range of learning materials that will help them excel in their studies.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1920",
      date: "2023-09-28",
      readTime: "4 min read",
      author: {
        name: "Maya Singh",
        role: "Head Librarian",
        avatar: "https://randomuser.me/api/portraits/women/36.jpg"
      },
      categories: ["Facilities", "Resources"]
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryList, setCategoryList] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      image: "",
      author: {
        name: "",
        role: "",
        avatar: "",
      },
      categories: [],
      readTime: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (editingPost) {
        const updatedPosts = blogPosts.map((post) =>
          post.id === editingPost.id ? { 
            ...post, 
            title: values.title,
            excerpt: values.excerpt,
            content: values.content,
            date: values.date,
            image: values.image,
            author: {
              name: values.author.name,
              role: values.author.role,
              avatar: values.author.avatar,
            },
            categories: values.categories,
            readTime: values.readTime,
          } : post
        );
        setBlogPosts(updatedPosts);
        toast({
          title: "Blog post updated",
          description: "The blog post has been updated successfully.",
        });
      } else {
        const newPost: BlogPost = {
          id: blogPosts.length > 0 ? Math.max(...blogPosts.map((p) => p.id)) + 1 : 1,
          title: values.title,
          excerpt: values.excerpt,
          content: values.content,
          date: values.date,
          image: values.image,
          author: {
            name: values.author.name,
            role: values.author.role,
            avatar: values.author.avatar,
          },
          categories: values.categories,
          readTime: values.readTime,
        };
        setBlogPosts([...blogPosts, newPost]);
        toast({
          title: "Blog post added",
          description: "The blog post has been added successfully.",
        });
      }
      setOpenDialog(false);
      setEditingPost(null);
      form.reset();
      setCategoryList([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the blog post.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    form.reset({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      image: post.image,
      author: {
        name: post.author.name,
        role: post.author.role,
        avatar: post.author.avatar,
      },
      categories: post.categories,
      readTime: post.readTime,
    });
    setCategoryList(post.categories);
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== id));
    toast({
      title: "Blog post deleted",
      description: "The blog post has been deleted successfully.",
    });
  };

  const handleAddNew = () => {
    setEditingPost(null);
    form.reset({
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      image: "",
      author: {
        name: "",
        role: "",
        avatar: "",
      },
      categories: [],
      readTime: "",
    });
    setCategoryList([]);
    setOpenDialog(true);
  };

  const addCategory = () => {
    if (categoryInput.trim() === "") return;
    const newCategory = categoryInput.trim();
    if (!categoryList.includes(newCategory)) {
      const newCategoryList = [...categoryList, newCategory];
      setCategoryList(newCategoryList);
      form.setValue("categories", newCategoryList);
    }
    setCategoryInput("");
  };

  const removeCategory = (category: string) => {
    const filteredCategories = categoryList.filter((c) => c !== category);
    setCategoryList(filteredCategories);
    form.setValue("categories", filteredCategories);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Blog Post
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
                  <TableHead>Categories</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No blog posts available
                    </TableCell>
                  </TableRow>
                ) : (
                  blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        {post.title}
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {post.excerpt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.categories.map((category) => (
                            <span key={category} className="px-2 py-1 bg-muted rounded-md text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {post.image ? (
                          <div className="w-10 h-10 rounded-md overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title} 
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
                            onClick={() => handleEdit(post)}
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
                                <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this blog post? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(post.id)}
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
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "Edit Blog Post" : "Add Blog Post"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the blog post. Click save when you're done.
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
                      <Input placeholder="Enter blog post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a short excerpt" 
                        className="min-h-[80px]"
                        {...field} 
                      />
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
                        placeholder="Enter blog post content" 
                        className="min-h-[200px]"
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
                  name="author.role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author role" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <FormField
                  control={form.control}
                  name="readTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Read Time</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 5 min read" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Add category"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addCategory();
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addCategory}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {categoryList.map((category) => (
                        <div 
                          key={category} 
                          className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md"
                        >
                          <Tag className="h-3 w-3" />
                          <span className="text-sm">{category}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0 ml-1" 
                            onClick={() => removeCategory(category)}
                          >
                            <Trash2 className="h-3 w-3 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {editingPost ? "Updating..." : "Saving..."}
                    </span>
                  ) : (
                    <span>{editingPost ? "Update Blog Post" : "Save Blog Post"}</span>
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

export default AdminBlog;
