
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Plus, MoreVertical, Edit, Trash2, Image, Eye } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  category: z.string().min(1, { message: "Category is required" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
});

type GalleryImage = {
  id: number;
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  date: string;
};

const AdminGallery = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      title: "Annual Function",
      description: "Students performing at the annual cultural function",
      category: "Events",
      imageUrl: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389",
      date: "2023-12-15",
    },
    {
      id: 2,
      title: "Science Exhibition",
      description: "Students showcasing their science projects",
      category: "Academic",
      imageUrl: "https://images.unsplash.com/photo-1544717301-9cdcb1f5940f",
      date: "2023-11-10",
    },
    {
      id: 3,
      title: "Sports Day",
      description: "Annual sports competition",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
      date: "2023-10-20",
    },
  ]);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      imageUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEditing && currentImage) {
      // Update existing image
      const updatedImages = images.map((img) =>
        img.id === currentImage.id
          ? {
              ...img,
              ...values,
            }
          : img
      );
      setImages(updatedImages);
      toast({
        title: "Image updated",
        description: "The image has been updated successfully.",
      });
    } else {
      // Add new image
      const newImage: GalleryImage = {
        id: images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1,
        ...values,
        date: new Date().toISOString().split("T")[0],
      };
      setImages([...images, newImage]);
      toast({
        title: "Image added",
        description: "The image has been added to the gallery.",
      });
    }
    form.reset();
    setIsAddingImage(false);
    setIsEditing(false);
    setCurrentImage(null);
  };

  const handleEdit = (image: GalleryImage) => {
    setCurrentImage(image);
    setIsEditing(true);
    form.reset({
      title: image.title,
      description: image.description || "",
      category: image.category,
      imageUrl: image.imageUrl,
    });
    setIsAddingImage(true);
  };

  const handleDelete = (id: number) => {
    setImages(images.filter((img) => img.id !== id));
    toast({
      title: "Image deleted",
      description: "The image has been removed from the gallery.",
    });
  };

  const categories = Array.from(
    new Set(images.map((img) => img.category))
  ).sort();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <Button
          onClick={() => {
            form.reset();
            setIsEditing(false);
            setCurrentImage(null);
            setIsAddingImage(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{image.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEdit(image)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(image.imageUrl, "_blank")}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Image</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this image? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(image.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {image.description && (
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {image.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs bg-muted px-2 py-1 rounded-md">
                  {image.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {image.date}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAddingImage && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Image" : "Add New Image"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image description" {...field} />
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
                      <FormControl>
                        <Input placeholder="E.g., Events, Academic, Sports" list="categories" {...field} />
                      </FormControl>
                      <datalist id="categories">
                        {categories.map((category) => (
                          <option key={category} value={category} />
                        ))}
                      </datalist>
                      <FormDescription>
                        Enter an existing category or create a new one
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
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

                {form.watch("imageUrl") && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="border rounded-md p-2 w-full max-w-xs h-48 flex items-center justify-center overflow-hidden">
                      <img
                        src={form.watch("imageUrl")}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setIsAddingImage(false);
                      setIsEditing(false);
                      setCurrentImage(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditing ? "Update Image" : "Add Image"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminGallery;
