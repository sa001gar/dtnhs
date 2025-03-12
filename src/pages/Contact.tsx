
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data to a server
    console.log("Form submitted");
  };

  return (
    <Layout>
      <PageHeader
        title="Contact Us"
        description="Get in touch with us for any queries or information."
        pattern="grid"
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <AnimatedSection animation="fade-in-up">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input id="email" type="email" placeholder="Your email" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Message subject" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" placeholder="Your message" rows={5} required />
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto bg-school-primary hover:bg-school-primary/90">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection animation="fade-in-up" delay={100}>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-school-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">123 School Avenue, Education City, State 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-school-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (123) 456-7890</p>
                      <p className="text-muted-foreground">+1 (123) 456-7891</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-school-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@school.edu</p>
                      <p className="text-muted-foreground">admissions@school.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-school-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-muted-foreground">Monday to Friday: 8:00 AM - 4:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 9:00 AM - 12:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-in-up" delay={200}>
              <Card>
                <CardHeader>
                  <CardTitle>Location Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted h-[250px] rounded flex items-center justify-center">
                    <p className="text-muted-foreground">Map placeholder - Google Maps iframe would go here</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
