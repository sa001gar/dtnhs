
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  Menu, X, ChevronDown, Book, GraduationCap, 
  Users, Award, Calendar, FileText, Home,
  MessageSquare, Phone, Image, BookOpenCheck, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { 
      name: "Home", 
      path: "/",
      icon: <Home className="h-5 w-5" />
    },
    {
      name: "About",
      path: "/about",
      icon: <Book className="h-5 w-5" />,
    },
    {
      name: "Academics",
      hasDropdown: true,
      icon: <GraduationCap className="h-5 w-5" />,
      dropdownItems: [
        { name: "Programs", path: "/academics" },
        { name: "Syllabus", path: "/syllabus" },
        { name: "Exam Schedule", path: "/exam-schedule" },
        { name: "Previous Year Papers", path: "/previous-year-papers" },
        { name: "Routine", path: "/routine" },
        { name: "Results", path: "/results" }
      ]
    },
    {
      name: "Faculty",
      path: "/teachers",
      icon: <Users className="h-5 w-5" />
    },
    {
      name: "Student Life",
      hasDropdown: true,
      icon: <Users className="h-5 w-5" />,
      dropdownItems: [
        { name: "Student Portal", path: "/students" },
        { name: "Alumni", path: "/alumni" },
        { name: "Gallery", path: "/gallery" },
      ]
    },
    {
      name: "Resources",
      hasDropdown: true,
      icon: <FileText className="h-5 w-5" />,
      dropdownItems: [
        { name: "Notices", path: "/notices" },
        { name: "Blog", path: "/blog" },
        { name: "Forum", path: "/forum" },
      ]
    },
    { 
      name: "Admission", 
      path: "/admissions",
      icon: <Phone className="h-5 w-5" />
    },
    { 
      name: "Contact", 
      path: "/contact",
      icon: <Phone className="h-5 w-5" />
    },
  ];

  // Main mobile navigation links for bottom bar
  const mobileNavLinks = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "About", path: "/about", icon: <Book className="h-5 w-5" /> },
    { name: "Teachers", path: "/teachers", icon: <Users className="h-5 w-5" /> },
    { name: "Contact", path: "/contact", icon: <Phone className="h-5 w-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, isMenuOpen]);

  // Desktop header
  const DesktopNavbar = () => (
    <header
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 rounded-2xl shadow-lg backdrop-blur-xl border hidden md:block",
        scrolled
          ? "bg-background/90 border-border/50 shadow-xl"
          : "bg-background/70 border-border/30"
      )}
      style={{ width: 'calc(100% - 2rem)', maxWidth: '1200px' }}
    >
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-school-primary transition-opacity hover:opacity-90"
          >
            <span>DTNHS</span>
          </NavLink>
        </div>

        <nav className="flex items-center gap-1">
          <ul className="flex items-center gap-1 mr-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={cn(
                        "px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center rounded-lg hover:bg-accent",
                        "text-muted-foreground hover:text-foreground"
                      )}>
                        {link.name}
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-background/95 backdrop-blur-md border-border/50">
                      {link.dropdownItems?.map((item) => (
                        <DropdownMenuItem key={item.path} asChild>
                          <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                              cn(
                                "w-full px-2 py-1 text-sm transition-all duration-200",
                                isActive
                                  ? "text-school-primary"
                                  : "text-muted-foreground hover:text-foreground"
                              )
                            }
                          >
                            {item.name}
                          </NavLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center rounded-lg hover:bg-accent",
                        isActive
                          ? "text-school-primary bg-school-primary/10"
                          : "text-muted-foreground hover:text-foreground"
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );

  // Mobile navbar - simple bottom bar
  const MobileNavbar = () => (
    <>
      {/* Top header for mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-school-primary"
          >
            <span>DTNHS</span>
          </NavLink>
          <ThemeToggle />
        </div>
      </header>

      {/* Simple bottom navigation bar */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl md:hidden">
        <div className="flex items-center justify-around px-2 py-3">
          {mobileNavLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 flex-1",
                  isActive
                    ? "text-school-primary bg-school-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
            >
              <div className="h-5 w-5 flex items-center justify-center">
                {link.icon}
              </div>
              <span className="text-xs font-medium text-center">
                {link.name}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );

  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

export default Navbar;
