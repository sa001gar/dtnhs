
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import BackToTopButton from "@/components/BackToTopButton";
import { createSiteUrl } from "@/lib/site";
import { getSeoMetadata } from "@/lib/seo";
import { useLocation } from "react-router-dom";


interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title,
  description,
  keywords,
  canonicalUrl,
}) => {
  const location = useLocation();
  const seo = getSeoMetadata(location.pathname);
  const resolvedTitle = title || seo.title;
  const resolvedDescription = description || seo.description;
  const resolvedKeywords = keywords || seo.keywords;
  const resolvedCanonicalUrl = canonicalUrl || seo.canonicalUrl;
  const robots = seo.robots || "index,follow";

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{resolvedTitle}</title>
        <meta name="description" content={resolvedDescription} />
        <meta name="keywords" content={resolvedKeywords} />
        <meta name="robots" content={robots} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Durgapur Tarak Nath High School" />
        <meta property="og:url" content={resolvedCanonicalUrl} />
        <meta property="og:title" content={resolvedTitle} />
        <meta property="og:description" content={resolvedDescription} />
        <meta property="og:image" content="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={resolvedCanonicalUrl} />
        <meta property="twitter:title" content={resolvedTitle} />
        <meta property="twitter:description" content={resolvedDescription} />
        <meta property="twitter:image" content="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={resolvedCanonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Durgapur Tarak Nath High School",
            url: createSiteUrl("/"),
            logo: createSiteUrl("/logo.jfif"),
            image: createSiteUrl("/images/pages/home/dtnhs_front.avif"),
          })}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
