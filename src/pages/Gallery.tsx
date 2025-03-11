
import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Gallery = () => {
  // Placeholder images - in a real application, these would be actual school event photos
  const images = [
    { id: 1, src: "/placeholder.svg", alt: "Annual Day Celebration", caption: "Annual Day Celebration" },
    { id: 2, src: "/placeholder.svg", alt: "Sports Day", caption: "Sports Day" },
    { id: 3, src: "/placeholder.svg", alt: "Science Exhibition", caption: "Science Exhibition" },
    { id: 4, src: "/placeholder.svg", alt: "Cultural Program", caption: "Cultural Program" },
    { id: 5, src: "/placeholder.svg", alt: "Field Trip", caption: "Field Trip" },
    { id: 6, src: "/placeholder.svg", alt: "Independence Day", caption: "Independence Day Celebration" },
    { id: 7, src: "/placeholder.svg", alt: "Graduation Ceremony", caption: "Graduation Ceremony" },
    { id: 8, src: "/placeholder.svg", alt: "Teacher's Day", caption: "Teacher's Day" }
  ];

  return (
    <div className="container py-8 md:py-12">
      <PageHeader
        title="Photo Gallery"
        description="Explore moments and memories from various school events and activities."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {images.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow">
            <AspectRatio ratio={4/3}>
              <img 
                src={image.src} 
                alt={image.alt} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <div className="p-3">
              <p className="text-center font-medium">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
