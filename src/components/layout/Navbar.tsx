
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Students", path: "/students" },
    { name: "Teachers", path: "/teachers" },
    { name: "Academics", path: "/academics" },
    { name: "Gallery", path: "/gallery" },
    { name: "Notices", path: "/notices" },
    { name: "Routine", path: "/routine" },
    { name: "Results", path: "/results" },
    { name: "Contact", path: "/contact" },
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

  // Close menu when navigating or resizing
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1 mr-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-school-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Button and Theme Toggle */}
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

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "fixed inset-x-0 top-16 z-50 h-[calc(100vh-4rem)] transform overflow-y-auto bg-background p-4 transition-transform duration-300 ease-in-out md:hidden border-t border-border",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav>
            <ul className="space-y-2 py-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200",
                        isActive
                          ? "bg-school-primary/10 text-school-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
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
