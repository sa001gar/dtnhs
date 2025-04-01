
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/80"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-school-primary/5 dark:bg-school-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-school-secondary/5 dark:bg-school-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="container px-4 py-12 md:py-16">
        <AnimatedSection animation="fade-in-up" className="relative mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-school-primary/10 to-school-secondary/10 dark:from-school-primary/20 dark:to-school-secondary/20 rounded-2xl p-8 shadow-lg border border-white/20 dark:border-white/5 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-school-primary mb-2">Stay Connected</h3>
                <p className="text-muted-foreground max-w-md">
                  Subscribe to our newsletter for the latest updates, events, and announcements.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-2.5 rounded-full border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-school-primary"
                    aria-label="Email for newsletter"
                  />
                  <button 
                    type="submit" 
                    className="bg-school-primary hover:bg-school-primary/90 text-white px-6 py-2.5 rounded-full font-medium transition-all"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Main Footer Content */}
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* School Logo and Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-school-primary flex items-center justify-center font-bold text-white text-xl">DN</div>
              <div className="ml-3">
                <h3 className="font-bold text-lg">Durgapur Tarak Nath</h3>
                <p className="text-sm text-muted-foreground">High School</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Providing quality education and shaping the future of our students since 1941. Our mission is to empower young minds and cultivate excellence.
            </p>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
                { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
                { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
                { icon: <Youtube size={18} />, label: "YouTube", href: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-md bg-white dark:bg-gray-800 text-muted-foreground hover:text-school-primary dark:hover:text-school-primary border border-border"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", to: "/about" },
                { label: "Academics", to: "/academics" },
                { label: "Notices", to: "/notices" },
                { label: "Gallery", to: "/gallery" },
                { label: "Contact Us", to: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-muted-foreground transition-all hover:text-school-primary hover:translate-x-1 flex items-center"
                  >
                    <span className="mr-2 text-xs">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Student Portal", to: "/students" },
                { label: "Class Routines", to: "/routine" },
                { label: "Examination Results", to: "/results" },
                { label: "Syllabus", to: "/academics" },
                { label: "Previous Year Papers", to: "/previous-year-papers" }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-muted-foreground transition-all hover:text-school-primary hover:translate-x-1 flex items-center"
                  >
                    <span className="mr-2 text-xs">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-school-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Station Road, Durgapur, West Bengal, India - 713201
                </p>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-school-primary" />
                <span className="text-sm text-muted-foreground">+91 0343-2555176</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-school-primary" />
                <a 
                  href="mailto:contact@dtnhs.edu.in" 
                  className="text-sm text-muted-foreground transition-colors hover:text-school-primary"
                >
                  contact@dtnhs.in
                </a>
              </li>
            </ul>
            
            {/* Map Preview */}
            <div className="mt-4 rounded-xl overflow-hidden border border-border h-32 bg-muted/30">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8435935861225!2d87.31387391541647!3d23.535345401869126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7703060585eb5%3A0x5e5acb36de67dfb2!2sDurgapur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1632151233021!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="School Location Map"
                aria-label="Map showing the location of Durgapur Tarak Nath High School"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-sm text-muted-foreground">
              © {currentYear} Durgapur Tarak Nath High School. All rights reserved.
            </p>
            
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-school-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-school-primary transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-school-primary transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 bg-school-primary hover:bg-school-primary/90 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 11 12 6 7 11"></polyline>
          <line x1="12" y1="18" x2="12" y2="6"></line>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
