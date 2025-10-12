
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, ChevronDown, Eye } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Visitor Counter Logic (placeholder - adjust API endpoint as needed)
  const apiUrl = "https://visitor-count.clustrix.tech/api/visitor-count/dtnhs";
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navItems = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About", href: "/about", hasDropdown: false },
    {
      name: "Academics",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Programs", href: "/academics" },
        { name: "Syllabus", href: "/syllabus" },
        { name: "Exam Schedule", href: "/exam-schedule" },
        { name: "Previous Year Papers", href: "/previous-year-papers" },
        { name: "Routine", href: "/routine" },
        { name: "Results", href: "/results" },
      ],
    },
    {
      name: "Student Life",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Student Portal", href: "/students" },
        { name: "Alumni", href: "/alumni" },
        { name: "Gallery", href: "/gallery" },
      ],
    },
    { name: "Faculty", href: "/teachers", hasDropdown: false },
    {
      name: "Resources",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Notices", href: "/notices" },
        { name: "Blog", href: "/blog" },
        { name: "Forum", href: "/forum" },
      ],
    },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Visitor count tracking
  useEffect(() => {
    const trackAndFetchVisitors = async () => {
      try {
        setLoading(true);
        // First: Send POST to increment count
        await fetch(apiUrl, { method: "POST" });
        // Then: Fetch updated count with GET
        const response = await fetch(apiUrl, { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch visitor count");
        }
        const result = await response.json();
        const count = result?.data?.count || 0;
        setVisitorCount(count);
      } catch (err: any) {
        setError(err.message || "Unknown error");
        setVisitorCount(1234); // fallback with 4 digits
      } finally {
        setLoading(false);
      }
    };
    trackAndFetchVisitors();
  }, [apiUrl]);

  const formatCount = (count: number) => {
    // Always return 4 digits with leading zeros if needed
    return count.toString().padStart(4, "0");
  };

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const handleNavItemClick = (item: any, e: React.MouseEvent) => {
    if (item.hasDropdown) {
      e.preventDefault();
      toggleDropdown(item.name);
    }
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Info Bar - Mobile Optimized */}
      <div className="bg-school-primary text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Mobile Layout */}
          <div className="block sm:hidden py-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs">
                  <Phone size={12}  />
                  <span>+91 9830123456</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Mail size={12} />
                  <span className="truncate">contact@dtnhs.edu.in</span>
                </div>
              </div>
              {/* Mobile Visitor Counter */}
              <div className="flex items-center gap-2 bg-school-primary/70 px-3 py-2 rounded-lg">
                <Eye size={14}  />
                <div className="flex items-center gap-1">
                  {loading ? (
                    <div className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-2 h-3 bg-school-primary/60 rounded animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-1 font-mono text-sm font-bold">
                      {formatCount(visitorCount)
                        .split("")
                        .map((digit, index) => (
                          <span
                            key={index}
                            className="bg-school-dark text-school-secondary px-1 py-0.5 rounded text-xs min-w-[16px] text-center"
                          >
                            {digit}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:block ">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-xs">
                  <Phone size={16} />
                  <span>+91 9830123456</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Mail size={16} />
                  <span>contact@dtnhs.edu.in</span>
                </div>
              </div>

              {/* Desktop Visitor Counter */}
              <div className="flex items-center gap-3 bg-school-primary/70 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span className="text-xs font-medium">Visitors:</span>
                </div>
                {loading ? (
                  <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-3 h-4 bg-school-primary/60 rounded animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-1 font-mono text-base font-bold">
                    {formatCount(visitorCount)
                      .split("")
                      .map((digit, index) => (
                        <span
                          key={index}
                          className="bg-school-dark text-white px-2 py-1 rounded min-w-[24px] text-center shadow-inner"
                        >
                          {digit}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-school-primary/20 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        }`}
        ref={dropdownRef}
      >
        <div className="max-w-7xl px-4 lg:px-8 mx-auto ">
          <div className="flex justify-between items-center">
            {/* Logo - Responsive */}
            <NavLink to="/" className="flex items-center gap-2 sm:gap-3 min-w-0" onClick={closeAllDropdowns}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-school-primary to-school-secondary rounded-full shadow-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src="/logo.jfif"
                  alt="DTNHS Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-bold bg-gradient-to-r from-school-primary to-school-secondary bg-clip-text text-transparent truncate">
                  <span className="hidden sm:inline">Durgapur Tarak Nath High School</span>
                  <span className="sm:hidden">DTNHS</span>
                </h1>
                <p className="text-xs text-gray-600 font-medium truncate">Excellence in Education</p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <button
                      onClick={(e) => handleNavItemClick(item, e)}
                      className="flex items-center px-3 py-2 text-sm font-medium text-school-primary hover:text-school-secondary hover:bg-school-primary/5 rounded-lg transition-colors duration-200"
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className="flex items-center px-3 py-2 text-sm font-medium text-school-primary hover:text-school-secondary hover:bg-school-primary/5 rounded-lg transition-colors duration-200"
                      onClick={closeAllDropdowns}
                    >
                      {item.name}
                    </NavLink>
                  )}
                  {/* Desktop Dropdown */}
                  {item.hasDropdown && item.dropdownItems && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 w-48 bg-white/95 backdrop-blur-md shadow-lg border border-school-primary/20 rounded-lg z-50 opacity-100 visible transition-all duration-200">
                      <div className="py-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <NavLink
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-school-primary hover:bg-school-primary/5 hover:text-school-secondary rounded-lg mx-2 transition-colors duration-200"
                            onClick={closeAllDropdowns}
                          >
                            {dropdownItem.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <NavLink to="/admissions" onClick={closeAllDropdowns}>
                <Button className="px-6 py-2 bg-gradient-to-r from-school-primary to-school-secondary hover:from-school-primary/90 hover:to-school-secondary/90 text-white border-none rounded-lg font-medium transition-all duration-200">
                  Admission
                </Button>
              </NavLink>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-school-primary hover:text-school-secondary hover:bg-school-primary/5 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-3 border-t border-school-primary/20 bg-white/95 backdrop-blur-md rounded-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between">
                      {item.hasDropdown ? (
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex-1 text-left px-3 py-3 text-base font-medium text-school-primary hover:text-school-secondary hover:bg-school-primary/5 rounded-lg transition-colors duration-200"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <NavLink
                          to={item.href}
                          className="flex-1 px-3 py-3 text-base font-medium text-school-primary hover:text-school-secondary hover:bg-school-primary/5 rounded-lg transition-colors duration-200"
                          onClick={closeAllDropdowns}
                        >
                          {item.name}
                        </NavLink>
                      )}
                      {item.hasDropdown && (
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="p-3 text-school-primary hover:text-school-secondary"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {/* Mobile Dropdown */}
                    {item.hasDropdown && item.dropdownItems && activeDropdown === item.name && (
                      <div className="ml-4 space-y-1 mt-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <NavLink
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-3 py-2 text-sm text-school-primary/80 hover:text-school-secondary hover:bg-school-primary/5 rounded-lg transition-colors duration-200"
                            onClick={closeAllDropdowns}
                          >
                            {dropdownItem.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-school-primary/20">
                  <NavLink to="/admissions" onClick={closeAllDropdowns}>
                    <Button className="w-full py-3 bg-gradient-to-r from-school-primary to-school-secondary hover:from-school-primary/90 hover:to-school-secondary/90 text-white border-none rounded-lg font-medium transition-all duration-200">
                      Admission
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
