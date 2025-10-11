
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, CheckCircle2, AlertCircle, User, Mail, Phone, MessageSquare, BookOpen, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  inquiry_type: z.string().min(1, { message: "Please select an inquiry type" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  student_class: z.string().optional(),
  preferred_contact: z.string().min(1, { message: "Please select preferred contact method" }),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiry_type: "",
      subject: "",
      message: "",
      student_class: "",
      preferred_contact: "",
    },
  });

  const inquiryTypes = [
    { value: "admission", label: "Admission Inquiry" },
    { value: "academic", label: "Academic Information" },
    { value: "transport", label: "Transportation" },
    { value: "fees", label: "Fee Structure" },
    { value: "facilities", label: "School Facilities" },
    { value: "general", label: "General Inquiry" },
    { value: "complaint", label: "Complaint/Feedback" },
  ];

  const studentClasses = [
    { value: "nursery", label: "Nursery" },
    { value: "lkg", label: "LKG" },
    { value: "ukg", label: "UKG" },
    { value: "class-1", label: "Class I" },
    { value: "class-2", label: "Class II" },
    { value: "class-3", label: "Class III" },
    { value: "class-4", label: "Class IV" },
    { value: "class-5", label: "Class V" },
    { value: "class-6", label: "Class VI" },
    { value: "class-7", label: "Class VII" },
    { value: "class-8", label: "Class VIII" },
    { value: "class-9", label: "Class IX" },
    { value: "class-10", label: "Class X" },
    { value: "class-11", label: "Class XI" },
    { value: "class-12", label: "Class XII" },
  ];

  const contactMethods = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone Call" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "any", label: "Any Method" },
  ];

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: values.name,
            email: values.email,
            phone: values.phone,
            inquiry_type: values.inquiry_type,
            subject: values.subject,
            message: values.message,
            student_class: values.student_class || null,
            preferred_contact: values.preferred_contact,
            status: 'unread',
            created_at: new Date().toISOString(),
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "✅ Message sent successfully!",
        description: "Thank you for contacting DTNHS. We'll get back to you within 24 hours.",
      });
      
      setSuccess(true);
      form.reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      const errorMessage = error.message || "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast({
        title: "❌ Error sending message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-gradient-to-br from-white to-school-light/30">
      <CardHeader className="space-y-1 bg-gradient-to-r from-school-primary/5 to-school-secondary/5 rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center gap-2 text-school-primary">
          <MessageSquare className="w-6 h-6" />
          Get In Touch With Us
        </CardTitle>
        <CardDescription className="text-base">
          Have questions about admissions, academics, or school facilities? 
          Fill out the form below and we'll respond within 24 hours.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        {error && (
          <Alert variant="destructive" className="animate-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert variant="default" className="bg-green-50 border-green-200 animate-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Message Sent Successfully! 🎉</AlertTitle>
            <AlertDescription className="text-green-600">
              Thank you for contacting DTNHS. Our team will review your message and respond within 24 hours.
            </AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-school-primary flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          className="h-11"
                          {...field} 
                        />
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
                      <FormLabel className="text-sm font-medium">Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+91 98765 43210" 
                          className="h-11"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email Address *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com" 
                        className="h-11"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Inquiry Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-school-primary flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Inquiry Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="inquiry_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Type of Inquiry *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
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
                  name="student_class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Student Class (if applicable)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {studentClasses.map((cls) => (
                            <SelectItem key={cls.value} value={cls.value}>
                              {cls.label}
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
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Subject *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Brief subject of your inquiry" 
                        className="h-11"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Message *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide detailed information about your inquiry..." 
                        className="min-h-[120px] resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-school-primary flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Preferences
              </h3>
              
              <FormField
                control={form.control}
                name="preferred_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Preferred Contact Method *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="How would you like us to contact you?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contactMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-school-primary to-school-secondary hover:from-school-primary/90 hover:to-school-secondary/90 transition-all duration-300 shadow-lg" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending Message...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Message
                </span>
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              * Required fields. We respect your privacy and will never share your information.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
