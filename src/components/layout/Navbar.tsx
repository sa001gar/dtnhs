
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
      icon: <Home className="h-4 w-4 mr-1" />
    },
    {
      name: "About",
      path: "/about",
      icon: <Book className="h-4 w-4 mr-1" />,
    },
    {
      name: "Academics",
      hasDropdown: true,
      icon: <GraduationCap className="h-4 w-4 mr-1" />,
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
      icon: <Users className="h-4 w-4 mr-1" />
    },
    {
      name: "Student Life",
      hasDropdown: true,
      icon: <Users className="h-4 w-4 mr-1" />,
      dropdownItems: [
        { name: "Student Portal", path: "/students" },
        { name: "Alumni", path: "/alumni" },
        { name: "Gallery", path: "/gallery" },
      ]
    },
    {
      name: "Resources",
      hasDropdown: true,
      icon: <FileText className="h-4 w-4 mr-1" />,
      dropdownItems: [
        { name: "Notices", path: "/notices" },
        { name: "Blog", path: "/blog" },
        { name: "Forum", path: "/forum" },
      ]
    },
    { 
      name: "Admission", 
      path: "/admissions",
      icon: <Phone className="h-4 w-4 mr-1" />
    },
    { 
      name: "Contact", 
      path: "/contact",
      icon: <Phone className="h-4 w-4 mr-1" />
    },
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

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-school-primary transition-opacity hover:opacity-90"
          >
            <span className="hidden md:inline">Durgapur Tarak Nath High School</span>
            <span className="md:hidden">DTNHS</span>
          </NavLink>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1 mr-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={cn(
                        "px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center",
                        "text-muted-foreground hover:text-foreground"
                      )}>
                        {link.name}
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-background/90 backdrop-blur-md">
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
                        "px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center",
                        isActive
                          ? "text-school-primary"
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

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        <div
          className={cn(
            "fixed inset-x-0 top-16 z-50 h-[calc(100vh-4rem)] transform overflow-y-auto bg-background p-4 transition-transform duration-300 ease-in-out md:hidden border-t border-border",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav>
            <ul className="space-y-2 py-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.hasDropdown ? (
                    <div className="space-y-2">
                      <div className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground">
                        <div className="flex items-center">
                          {link.icon}
                          {link.name}
                        </div>
                      </div>
                      <ul className="ml-6 space-y-2 border-l border-border pl-4">
                        {link.dropdownItems?.map((item) => (
                          <li key={item.path}>
                            <NavLink
                              to={item.path}
                              className={({ isActive }) =>
                                cn(
                                  "block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                                  isActive
                                    ? "bg-school-primary/10 text-school-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )
                              }
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        cn(
                          "rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 flex items-center",
                          isActive
                            ? "bg-school-primary/10 text-school-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
