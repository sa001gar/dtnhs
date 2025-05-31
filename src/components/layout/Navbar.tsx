
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  Menu, X, ChevronDown, Book, GraduationCap, 
  Users, Award, Calendar, FileText, Home,
  MessageSquare, Phone, Image, BookOpenCheck, Clock,
  MoreHorizontal, ChevronUp
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
      icon: <Home className="h-6 w-6" />,
      showInBottomNav: true
    },
    {
      name: "About",
      path: "/about",
      icon: <Book className="h-6 w-6" />,
      showInBottomNav: false
    },
    {
      name: "Academics",
      hasDropdown: true,
      icon: <GraduationCap className="h-6 w-6" />,
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
      icon: <Users className="h-6 w-6" />,
      showInBottomNav: false
    },
    {
      name: "Student Life",
      hasDropdown: true,
      icon: <Users className="h-6 w-6" />,
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
      icon: <FileText className="h-6 w-6" />,
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
      icon: <Award className="h-6 w-6" />,
      showInBottomNav: false
    },
    { 
      name: "Contact", 
      path: "/contact",
      icon: <Phone className="h-6 w-6" />,
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
    return () => window.removeEventListener("scroll", handleResize);
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
          ? "bg-background/95 border-border/80 shadow-xl"
          : "bg-background/90 border-border/50"
      )}
      style={{ width: 'calc(100% - 2rem)', maxWidth: '1200px' }}
    >
      <div className="flex h-20 items-center justify-between px-8">
        <div className="flex items-center">
          <NavLink
            to="/"
            className="flex items-center gap-3 text-xl font-bold text-school-primary transition-opacity hover:opacity-90"
          >
            <img 
              src="/logo.jfif" 
              alt="DTNHS Logo" 
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="text-2xl">DTNHS</span>
          </NavLink>
        </div>

        <nav className="flex items-center justify-center flex-1">
          <ul className="flex items-center justify-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={cn(
                        "px-5 py-4 text-lg font-medium transition-all duration-200 flex items-center rounded-xl hover:bg-accent",
                        "text-muted-foreground hover:text-foreground"
                      )}>
                        {link.name}
                        <ChevronDown className="h-5 w-5 ml-2" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="center" 
                      className="bg-background/95 backdrop-blur-lg border-border shadow-xl min-w-[220px]"
                    >
                      {link.dropdownItems?.map((item) => (
                        <DropdownMenuItem key={item.path} asChild>
                          <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                              cn(
                                "w-full px-4 py-3 text-lg transition-all duration-200",
                                isActive
                                  ? "text-school-primary bg-school-primary/10"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
                        "px-5 py-4 text-lg font-medium transition-all duration-200 flex items-center rounded-xl hover:bg-accent",
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
        </nav>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );

  // Mobile bottom navigation
  const MobileNavbar = () => (
    <TooltipProvider>
      {/* Top bar for mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border md:hidden">
        <div className="flex h-20 items-center justify-between px-6">
          <NavLink
            to="/"
            className="flex items-center gap-3 text-xl font-bold text-school-primary"
          >
            <img 
              src="/logo.jfif" 
              alt="DTNHS Logo" 
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="text-2xl">DTNHS</span>
          </NavLink>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Bottom navigation */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 bg-background/98 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl md:hidden">
        <div className="flex items-center justify-center px-3 py-5">
          <div className="flex items-center justify-between w-full max-w-md mx-auto">
            {bottomNavLinks.map((link, index) => (
              <div key={link.name} className="flex justify-center">
                {link.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-accent/50 active:scale-95">
                            <div className="h-7 w-7 flex items-center justify-center relative">
                              {link.icon}
                              <ChevronUp className="h-3 w-3 absolute -top-1 -right-1 opacity-60" />
                            </div>
                            <span className="text-xs font-medium truncate max-w-16 text-center leading-tight">
                              {link.name === "Student Life" ? "Students" : link.name}
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="mb-2">
                          <p className="text-sm font-medium">{link.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      side="top" 
                      align="center" 
                      className="bg-background/98 backdrop-blur-xl border-border shadow-2xl mb-4 min-w-[200px] rounded-2xl"
                    >
                      {link.dropdownItems?.map((item) => (
                        <DropdownMenuItem key={item.path} asChild>
                          <NavLink
                            to={item.path}
                            className="w-full px-4 py-3 text-base font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl mx-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </NavLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={link.path || "#"}
                        className={({ isActive }) =>
                          cn(
                            "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 active:scale-95",
                            isActive
                              ? "text-school-primary bg-school-primary/15"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )
                        }
                      >
                        <div className="h-7 w-7 flex items-center justify-center">
                          {link.icon}
                        </div>
                        <span className="text-xs font-medium truncate max-w-16 text-center leading-tight">
                          {link.name}
                        </span>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="mb-2">
                      <p className="text-sm font-medium">{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ))}
            
            {/* Menu button */}
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 active:scale-95",
                      isMenuOpen
                        ? "text-school-primary bg-school-primary/15"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}>
                      <div className="h-7 w-7 flex items-center justify-center relative">
                        <MoreHorizontal className="h-7 w-7" />
                        <ChevronUp className="h-3 w-3 absolute -top-1 -right-1 opacity-60" />
                      </div>
                      <span className="text-xs font-medium leading-tight">Menu</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="mb-2">
                    <p className="text-sm font-medium">More Options</p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                side="top" 
                align="center" 
                className="bg-background/98 backdrop-blur-xl border-border shadow-2xl mb-4 w-72 rounded-2xl"
              >
                <div className="p-3">
                  {menuLinks.map((link) => (
                    <div key={link.name} className="mb-2">
                      {link.hasDropdown ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all duration-200">
                              <div className="flex items-center gap-3">
                                {link.icon}
                                {link.name}
                              </div>
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="left" className="bg-background/98 backdrop-blur-xl border-border shadow-2xl rounded-2xl">
                            {link.dropdownItems?.map((item) => (
                              <DropdownMenuItem key={item.path} asChild>
                                <NavLink
                                  to={item.path}
                                  className="w-full px-4 py-3 text-base font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl"
                                  onClick={() => setIsMenuOpen(false)}
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
                              "w-full rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 flex items-center gap-3",
                              isActive
                                ? "bg-school-primary/15 text-school-primary"
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
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
