
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import { 
  Mail, Phone, MapPin, Clock, Train, Bus, Users, Award, 
  Star, Quote, CheckCircle, Building, GraduationCap, Shield,
  BookOpen, Heart, Globe, MapIcon, Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLoader from "@/components/shared/PageLoader";



const Contact = () => {

  const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 500);
    return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <PageLoader />;
    }
  const transportFeatures = [
    {
      icon: <Train className="h-6 w-6" />,
      title: "Railway Connectivity",
      description: "Just 500 meters from Railway Station",
      details: "Easy access via all major train routes"
    },
    {
      icon: <Bus className="h-6 w-6" />,
      title: "Bus Transportation",
      description: "600 meters from Bus Stand",
      details: "Regular bus services during school hours"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "All-Time Availability",
      description: "Convenient transport during school hours",
      details: "Safe and reliable transportation options"
    }
  ];

  const schoolHighlights = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Faculty",
      description: "Highly qualified and experienced teachers",
      stat: "95% Advanced Degrees"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Academic Excellence",
      description: "Outstanding results in board examinations",
      stat: "98% Pass Rate"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safe Environment",
      description: "Secure campus with modern facilities",
      stat: "24/7 Security"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Modern Infrastructure",
      description: "State-of-the-art classrooms and labs",
      stat: "Smart Classrooms"
    }
  ];

  const testimonials = [
    {
      name: "Mrs. Priya Sharma",
      role: "Parent of Class X Student",
      content: "DTNHS has provided exceptional education to my daughter. The teachers are caring and the academic standards are excellent. The convenient location near the railway station makes daily commute hassle-free.",
      rating: 5
    },
    {
      name: "Mr. Rajesh Kumar",
      role: "Alumni (Batch 2018)",
      content: "The foundation I received at DTNHS helped me secure admission in top engineering college. The quality of education and the dedicated teachers made all the difference in my academic journey.",
      rating: 5
    },
    {
      name: "Dr. Anita Das",
      role: "Parent & Local Resident",
      content: "Being just 600 meters from the bus stand, DTNHS is perfectly located. My son loves going to school and the teachers ensure holistic development of every child. Highly recommended!",
      rating: 5
    }
  ];

  const locationBenefits = [
    "Prime location in the heart of Durgapur",
    "500m from Railway Station - Easy commute",
    "600m from Bus Stand - Multiple transport options",
    "Safe neighborhood with excellent connectivity",
    "Close to market areas and medical facilities",
    "Well-connected to all parts of the city"
  ];

  return (
    <Layout>
      <PageHeader
        title="Contact Us"
        description="Connect with Durgapur Tarak Nath High School - Where Excellence Meets Opportunity"
      />
      {/* Contact Form & Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* <h2 className="text-3xl font-bold mb-6">
                <Mail className="inline-block w-8 h-8 mr-2 text-school-primary" />
                Get In Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions about admissions, academics, or want to schedule a campus visit? 
                We're here to help you with all your queries.
              </p> */}
              <ContactForm />
            </div>
            
            <div className="space-y-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-school-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">School Address</h3>
                      <address className="not-italic text-muted-foreground">
                        Durgapur Tarak Nath High School<br />
                        School Road, Durgapur<br />
                        West Bengal - 713201
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-school-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone Numbers</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p>
                          <a href="tel:+919830123456" className="hover:text-school-primary">
                            +91 9830 123 456
                          </a> (Office)
                        </p>
                        <p>
                          <a href="tel:+919830654321" className="hover:text-school-primary">
                            +91 9830 654 321
                          </a> (Principal)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-school-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Email Addresses</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p>
                          <a href="mailto:info@dtnhs.edu.in" className="hover:text-school-primary">
                            info@dtnhs.edu.in
                          </a>
                        </p>
                        <p>
                          <a href="mailto:admission@dtnhs.edu.in" className="hover:text-school-primary">
                            admission@dtnhs.edu.in
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-school-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Office Hours</h3>
                      <div className="text-muted-foreground">
                        <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                        <p>Saturday: 8:00 AM - 12:00 PM</p>
                        <p className="text-sm mt-1">Closed on Sundays & Public Holidays</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="default">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Schedule Campus Visit
                  </Button>
                  <Button className="w-full" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Download Admission Form
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Building className="w-4 h-4 mr-2" />
                    View Virtual Tour
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with Key Stats */}
      <section className="py-16 bg-gradient-to-br from-school-primary/10 to-school-secondary/10">
        <div className="max-w-7xl px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-school-primary">DTNHS</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Located in the heart of Durgapur with excellent connectivity, modern facilities, 
              and a legacy of academic excellence spanning decades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolHighlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-school-primary/10 text-school-primary mb-4">
                    {highlight.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{highlight.description}</p>
                  <div className="text-school-primary font-bold">{highlight.stat}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation & Connectivity */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <MapIcon className="inline-block w-8 h-8 mr-2 text-school-primary" />
              Prime Location & Connectivity
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Strategically located for easy access with excellent transportation facilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {transportFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-school-secondary/10 text-school-secondary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-school-primary font-semibold mb-2">{feature.description}</p>
                  <p className="text-muted-foreground">{feature.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Location Benefits */}
          {/* <Card className="bg-gradient-to-r from-school-primary/5 to-school-secondary/5">
            <CardHeader>
              <CardTitle className="text-2xl ">
                <Navigation className="inline-block w-6 h-6 mr-2" />
                Location Advantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locationBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-school-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-school-primary/10 to-school-secondary/10">
        <div className="max-w-7xl px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <Heart className="inline-block w-8 h-8 mr-2 text-school-primary" />
              What Our Community Says
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from parents, students, and alumni about their DTNHS experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-school-secondary/30 mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-school-primary">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-br from-school-primary/5 to-school-secondary/5">
        <div className="max-w-7xl px-4 md:px-6 mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Find Us on Map</h2>
            <p className="text-muted-foreground">
              Easily accessible location with excellent connectivity
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373631531902!3d-37.81720797975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sHer%20Majesty%E2%80%99s%20Theatre!5e0!3m2!1sen!2sus!4v1679083949353!5m2!1sen!2sus"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="DTNHS Location Map">
              </iframe>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
