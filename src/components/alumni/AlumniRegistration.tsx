import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Upload, Calendar, MapPin, GraduationCap, Briefcase, Mail, Phone, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  batch: z.string().min(1, { message: "Graduation year is required" }),
  location: z.string().min(1, { message: "Current location is required" }),
  education: z.string().min(1, { message: "Education details are required" }),
  profession: z.string().min(1, { message: "Current profession is required" }),
  achievements: z.string().optional(),
  bio: z.string().min(10, { message: "Please write a short bio (min 10 characters)" }),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AlumniRegistration: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [cloudinaryError, setCloudinaryError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Supabase is properly initialized
    if (!supabase) {
      setSupabaseError("Supabase client is not initialized. Please check your environment settings.");
    }

    // Check if Cloudinary settings are available
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      setCloudinaryError("Cloudinary configuration is missing. Image uploads will not work.");
    }
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      batch: "",
      location: "",
      education: "",
      profession: "",
      achievements: "",
      bio: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be smaller than 2MB",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Only image files are allowed",
          variant: "destructive",
        });
        return;
      }
      
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      
      if (!cloudName || !uploadPreset) {
        console.error('Missing Cloudinary configuration');
        throw new Error('Missing Cloudinary configuration');
      }
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      let imageUrl = null;
      
      // Upload image to Cloudinary if exists
      if (imageFile) {
        try {
          imageUrl = await uploadImageToCloudinary(imageFile);
        } catch (error) {
          toast({
            title: "Image upload failed",
            description: "Your form was submitted without an image. You can update your profile later.",
            variant: "warning",
          });
        }
      }
      
      // Check if Supabase connection is available
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }
      
      // Prepare alumni data
      const alumniData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        batch: values.batch,
        location: values.location,
        education: values.education,
        profession: values.profession,
        achievements: values.achievements ? values.achievements.split(',').map(item => item.trim()) : [],
        bio: values.bio,
        image: imageUrl,
        status: 'pending', // All alumni start as pending until approved by admin
        created_at: new Date().toISOString(),
      };
      
      // Save to Supabase
      const { error } = await supabase
        .from('alumni')
        .insert([alumniData]);
      
      if (error) throw error;
      
      toast({
        title: "Registration successful",
        description: "Your alumni registration has been submitted for approval.",
      });
      
      // Reset form
      form.reset();
      setImageFile(null);
      setImagePreview(null);
    } catch (error: any) {
      console.error('Error submitting alumni registration:', error);
      toast({
        title: "Registration failed",
        description: error.message || "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Alumni Registration</CardTitle>
        <CardDescription>
          Join our alumni network and reconnect with fellow graduates
        </CardDescription>
      </CardHeader>
      <CardContent>
        {supabaseError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{supabaseError}</AlertDescription>
          </Alert>
        )}
        
        {cloudinaryError && (
          <Alert variant="warning" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{cloudinaryError}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3 space-y-4">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                            <Input placeholder="Your email address" {...field} />
                          </div>
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                            <Input placeholder="Your phone number" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="batch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                            <Input placeholder="Batch / Year of passing" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Location</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                            <Input placeholder="City, Country" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="md:w-1/3 flex flex-col items-center justify-start">
                <div className="w-full aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Upload photo</p>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Max size: 2MB. Formats: JPG, PNG
                </p>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
                      <Input placeholder="Your highest qualification and institution" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Profession</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
                      <Input placeholder="Your current role and company" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievements</FormLabel>
                  <FormControl>
                    <Input placeholder="Your notable achievements (comma separated)" {...field} />
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
                      placeholder="Write a short bio about yourself and your time at the school" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading || !!supabaseError}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </span>
              ) : (
                "Submit Registration"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {!supabaseError && (
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p className="w-full">Your information will be reviewed by administrators before being published.</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default AlumniRegistration;
