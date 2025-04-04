
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageLoader from "@/components/shared/PageLoader";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data to a server
    console.log("Form submitted");
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout
      title="Contact Us - Durgapur Tarak Nath High School"
      description="Contact Durgapur Tarak Nath High School for admissions, inquiries, or to schedule a visit. Our team is here to help you with any questions about our educational programs."
      keywords="contact DTNHS, school contact, admission inquiry, school address, school phone number, school email"
      canonicalUrl="https://dtnhs.edu.in/contact"
    >
      <PageHeader
        title="Contact Us"
        description="Get in touch with us for any queries or information."
        pattern="grid"
        className="bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-sm"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <AnimatedSection animation="fade-in-up">
            <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-lg">
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
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-lg">
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
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-lg">
                <CardHeader>
                  <CardTitle>Location Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted h-[250px] rounded flex items-center justify-center">
                  <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.9965264115012!2d87.3213519!3d23.495643100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7710cb6d23035%3A0x8e339769f234a1a3!2sDurgapur%20Tarak%20Nath%20High%20School!5e1!3m2!1sen!2sin!4v1743533146590!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                className="rounded-xl"
                title="School Location Map"
                aria-label="Map showing the location of Durgapur Tarak Nath High School"
              ></iframe>
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
