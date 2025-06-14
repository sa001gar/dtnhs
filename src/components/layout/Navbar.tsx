import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  Menu, X, ChevronDown, Book, GraduationCap, 
  Users, Award, Calendar, FileText, Home,
  MessageSquare, Phone, Image, BookOpenCheck, Clock,
  MoreHorizontal
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { 
      name: "Home", 
      path: "/",
      icon: <Home className="h-4 w-4" />,
      showInBottomNav: true
    },
    {
      name: "About",
      path: "/about",
      icon: <Book className="h-4 w-4" />,
      showInBottomNav: false
    },
    {
      name: "Academics",
      hasDropdown: true,
      icon: <GraduationCap className="h-4 w-4" />,
      showInBottomNav: true,
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
      icon: <Users className="h-4 w-4" />,
      showInBottomNav: false
    },
    {
      name: "Student Life",
      hasDropdown: true,
      icon: <Users className="h-4 w-4" />,
      showInBottomNav: true,
      dropdownItems: [
        { name: "Student Portal", path: "/students" },
        { name: "Alumni", path: "/alumni" },
        { name: "Gallery", path: "/gallery" },
      ]
    },
    {
      name: "Resources",
      hasDropdown: true,
      icon: <FileText className="h-4 w-4" />,
      showInBottomNav: false,
      dropdownItems: [
        { name: "Notices", path: "/notices" },
        { name: "Blog", path: "/blog" },
        { name: "Forum", path: "/forum" },
      ]
    },
    { 
      name: "Admission", 
      path: "/admissions",
      icon: <Award className="h-4 w-4" />,
      showInBottomNav: false
    },
    { 
      name: "Contact", 
      path: "/contact",
      icon: <Phone className="h-4 w-4" />,
      showInBottomNav: true
    },
  ];

  const bottomNavLinks = navLinks.filter(link => link.showInBottomNav);
  const menuLinks = navLinks.filter(link => !link.showInBottomNav);

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
            className="flex items-center gap-3 text-lg font-bold text-school-primary transition-opacity hover:opacity-90"
          >
            <img 
              src="/logo.jfif" 
              alt="DTNHS Logo" 
              className="h-8 w-8 rounded-full object-cover"
            />
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

  // Mobile bottom navigation
  const MobileNavbar = () => (
    <TooltipProvider>
      {/* Top bar for mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-school-primary"
          >
            <img 
              src="/logo.jfif" 
              alt="DTNHS Logo" 
              className="h-8 w-8 rounded-full object-cover"
            />
            <span>DTNHS</span>
          </NavLink>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Bottom navigation */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl md:hidden">
        <div className="flex items-center justify-around px-2 py-3">
          {bottomNavLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <NavLink
                  to={link.path || "#"}
                  className={({ isActive }) =>
                    cn(
                      "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-0",
                      isActive
                        ? "text-school-primary bg-school-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )
                  }
                  onClick={() => {
                    if (link.hasDropdown) {
                      setIsMenuOpen(true);
                    }
                  }}
                >
                  <div className="h-5 w-5 flex items-center justify-center">
                    {link.icon}
                  </div>
                  <span className="text-xs font-medium truncate max-w-12">
                    {link.name === "Student Life" ? "Students" : link.name}
                  </span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          
          {/* Menu button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 h-auto",
                  isMenuOpen
                    ? "text-school-primary bg-school-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <div className="h-5 w-5 flex items-center justify-center">
                  <MoreHorizontal className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">Menu</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More Options</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={cn(
            "fixed bottom-24 left-4 right-4 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl transition-transform duration-300 max-h-96 overflow-y-auto",
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <div className="space-y-2">
              {/* Menu items from bottom nav with dropdowns */}
              {bottomNavLinks.filter(link => link.hasDropdown).map((link) => (
                <div key={link.name} className="space-y-2">
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {link.icon}
                      {link.name}
                    </div>
                  </div>
                  <div className="ml-4 space-y-1">
                    {link.dropdownItems?.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-school-primary/10 text-school-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          )
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Additional menu items */}
              {menuLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {link.icon}
                          {link.name}
                        </div>
                      </div>
                      <div className="ml-4 space-y-1">
                        {link.dropdownItems?.map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                              cn(
                                "block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                isActive
                                  ? "bg-school-primary/10 text-school-primary"
                                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
                              )
                            }
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        cn(
                          "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2",
                          isActive
                            ? "bg-school-primary/10 text-school-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );

  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

export default Navbar;
