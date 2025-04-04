
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Durgapur Tarak Nath High School - Excellence in Education",
  description = "Durgapur Tarak Nath High School provides quality education since 1941. Join our school for academic excellence, extracurricular activities, and holistic development.",
  keywords = "Durgapur Tarak Nath High School, DTNHS, education, school, Durgapur, West Bengal, best school, admission",
  canonicalUrl = "https://dtnhs.edu.in",
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
