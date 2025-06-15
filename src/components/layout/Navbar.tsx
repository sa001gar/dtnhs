
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const isMobile = useIsMobile();

  const navLinks = [
    { 
      name: "Home", 
      path: "/",
      icon: <Home className="h-4 w-4 mr-3" />
    },
    {
      name: "About",
      path: "/about",
      icon: <Book className="h-4 w-4 mr-3" />,
    },
    {
      name: "Academics",
      hasDropdown: true,
      icon: <GraduationCap className="h-4 w-4 mr-3" />,
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
      icon: <Users className="h-4 w-4 mr-3" />
    },
    {
      name: "Student Life",
      hasDropdown: true,
      icon: <Users className="h-4 w-4 mr-3" />,
      dropdownItems: [
        { name: "Student Portal", path: "/students" },
        { name: "Alumni", path: "/alumni" },
        { name: "Gallery", path: "/gallery" },
      ]
    },
    {
      name: "Resources",
      hasDropdown: true,
      icon: <FileText className="h-4 w-4 mr-3" />,
      dropdownItems: [
        { name: "Notices", path: "/notices" },
        { name: "Blog", path: "/blog" },
        { name: "Forum", path: "/forum" },
      ]
    },
    { 
      name: "Admission", 
      path: "/admissions",
      icon: <Phone className="h-4 w-4 mr-3" />
    },
    { 
      name: "Contact", 
      path: "/contact",
      icon: <Phone className="h-4 w-4 mr-3" />
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

  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

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

  // Mobile navbar
  const MobileNavbar = () => (
    <>
      {/* Top bar for mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-school-primary"
          >
            <span>DTNHS</span>
          </NavLink>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile sidebar menu */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 bg-background border-r border-border shadow-xl transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-border">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-school-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>DTNHS</span>
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <Collapsible
                    open={openDropdowns.includes(link.name)}
                    onOpenChange={() => toggleDropdown(link.name)}
                  >
                    <CollapsibleTrigger asChild>
                      <button className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-accent transition-colors">
                        <div className="flex items-center">
                          {link.icon}
                          <span className="font-medium">{link.name}</span>
                        </div>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          openDropdowns.includes(link.name) && "rotate-180"
                        )} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 mt-1">
                      {link.dropdownItems?.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            cn(
                              "block pl-10 pr-3 py-2 text-sm rounded-lg transition-colors",
                              isActive
                                ? "bg-school-primary/10 text-school-primary font-medium"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )
                          }
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center p-3 rounded-lg transition-colors",
                        isActive
                          ? "bg-school-primary/10 text-school-primary font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
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
