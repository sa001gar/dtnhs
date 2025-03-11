
import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  // Placeholder images - in a real application, these would be actual school event photos
  const images = [
    { 
      id: 1, 
      src: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=800&q=80", 
      alt: "Annual Day Celebration", 
      caption: "Annual Day Celebration",
      size: "medium" 
    },
    { 
      id: 2, 
      src: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80", 
      alt: "Sports Day", 
      caption: "Sports Day",
      size: "standard" 
    },
    { 
      id: 3, 
      src: "https://images.unsplash.com/photo-1518288774672-b94e808873ff?auto=format&fit=crop&w=800&q=80", 
      alt: "Science Exhibition", 
      caption: "Science Exhibition",
      size: "large" 
    },
    { 
      id: 4, 
      src: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?auto=format&fit=crop&w=800&q=80", 
      alt: "Cultural Program", 
      caption: "Cultural Program",
      size: "medium" 
    },
    { 
      id: 5, 
      src: "https://images.unsplash.com/photo-1564144006388-615d45a27449?auto=format&fit=crop&w=800&q=80", 
      alt: "Field Trip", 
      caption: "Field Trip",
      size: "standard" 
    },
    { 
      id: 6, 
      src: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?auto=format&fit=crop&w=800&q=80", 
      alt: "Independence Day", 
      caption: "Independence Day Celebration",
      size: "standard" 
    },
    { 
      id: 7, 
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80", 
      alt: "Graduation Ceremony", 
      caption: "Graduation Ceremony",
      size: "large" 
    },
    { 
      id: 8, 
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80", 
      alt: "Teacher's Day", 
      caption: "Teacher's Day",
      size: "medium" 
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <PageHeader
          title="Photo Gallery"
          description="Explore moments and memories from various school events and activities."
          pattern="dots"
        />

        <div className="container py-8 md:py-12">
          <div className="mb-6">
            <Breadcrumb />
          </div>
          
          <AnimatedSection animation="fade-in-up">
            <div className="masonry-grid">
              {images.map((image) => (
                <div 
                  key={image.id} 
                  className={`masonry-item ${
                    image.size === "medium" 
                      ? "masonry-item-medium" 
                      : image.size === "large" 
                      ? "masonry-item-large" 
                      : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative h-full w-full overflow-hidden bg-muted">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-end">
                      <p className="p-3 text-white font-medium">{image.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
        
        {selectedImage && (
          <GalleryModal
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            image={selectedImage}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
