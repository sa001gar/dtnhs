
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Camera, Image, School, Trophy } from "lucide-react";
import PageLoader from "@/components/shared/PageLoader";

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
    date: string;
    event: string;
  } | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  // Gallery categories
  const categories = [
    {
      id: "events",
      name: "Event Gallery",
      icon: <CalendarIcon className="h-4 w-4" />,
      description: "School ceremonies, cultural programs, and special occasions",
      collections: [
        {
          id: "establishment-day-2024",
          name: "School Establishment Day 2024",
          date: "January 15, 2024",
          images: [
            { 
              id: 1, 
              src: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=800&q=80", 
              alt: "Principal's speech at Establishment Day 2024", 
              caption: "Principal's speech at Establishment Day 2024",
              date: "January 15, 2024",
              size: "medium" 
            },
            { 
              id: 2, 
              src: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80", 
              alt: "Students performing at Establishment Day 2024", 
              caption: "Students performing at Establishment Day 2024",
              date: "January 15, 2024",
              size: "standard" 
            }
          ]
        },
        {
          id: "establishment-day-2023",
          name: "School Establishment Day 2023",
          date: "January 15, 2023",
          images: [
            { 
              id: 3, 
              src: "https://images.unsplash.com/photo-1518288774672-b94e808873ff?auto=format&fit=crop&w=800&q=80", 
              alt: "Group photo at Establishment Day 2023", 
              caption: "Group photo at Establishment Day 2023",
              date: "January 15, 2023",
              size: "large" 
            },
            { 
              id: 4, 
              src: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?auto=format&fit=crop&w=800&q=80", 
              alt: "Award ceremony at Establishment Day 2023", 
              caption: "Award ceremony at Establishment Day 2023",
              date: "January 15, 2023",
              size: "medium" 
            }
          ]
        },
        {
          id: "annual-function-2024",
          name: "Annual Function 2024",
          date: "March 20-22, 2024",
          images: [
            { 
              id: 17, 
              src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80", 
              alt: "Cultural Performance at Annual Function", 
              caption: "Cultural Performance at Annual Function",
              date: "March 20, 2024",
              size: "medium" 
            },
            { 
              id: 18, 
              src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80", 
              alt: "Art Exhibition at Annual Function", 
              caption: "Art Exhibition at Annual Function",
              date: "March 21, 2024",
              size: "standard" 
            }
          ]
        }
      ]
    },
    {
      id: "sports",
      name: "Sports Gallery",
      icon: <Trophy className="h-4 w-4" />,
      description: "Athletics, team games, and sports competitions",
      collections: [
        {
          id: "annual-sports-2024",
          name: "Annual Sports Meet 2024",
          date: "February 10-12, 2024",
          images: [
            { 
              id: 5, 
              src: "https://images.unsplash.com/photo-1564144006388-615d45a27449?auto=format&fit=crop&w=800&q=80", 
              alt: "100m Race Finals", 
              caption: "100m Race Finals - Annual Sports Meet 2024",
              date: "February 10, 2024",
              size: "standard" 
            },
            { 
              id: 6, 
              src: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?auto=format&fit=crop&w=800&q=80", 
              alt: "High Jump Competition", 
              caption: "High Jump Competition - Annual Sports Meet 2024",
              date: "February 11, 2024",
              size: "standard" 
            },
            { 
              id: 7, 
              src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80", 
              alt: "Prize Distribution Ceremony", 
              caption: "Prize Distribution Ceremony - Annual Sports Meet 2024",
              date: "February 12, 2024",
              size: "large" 
            }
          ]
        },
        {
          id: "annual-sports-2023",
          name: "Annual Sports Meet 2023",
          date: "February 8-10, 2023",
          images: [
            { 
              id: 8, 
              src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80", 
              alt: "Opening Ceremony", 
              caption: "Opening Ceremony - Annual Sports Meet 2023",
              date: "February 8, 2023",
              size: "medium" 
            }
          ]
        },
        {
          id: "cricket-tournament-2024",
          name: "Inter-School Cricket Tournament",
          date: "April 5-10, 2024",
          images: [
            { 
              id: 14, 
              src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80", 
              alt: "Cricket Finals Match", 
              caption: "Cricket Finals Match - Inter-School Tournament",
              date: "April 10, 2024",
              size: "large" 
            },
            { 
              id: 15, 
              src: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=80", 
              alt: "Trophy Ceremony", 
              caption: "Trophy Ceremony - Inter-School Cricket Tournament",
              date: "April 10, 2024",
              size: "standard" 
            }
          ]
        }
      ]
    },
    {
      id: "school",
      name: "School Features",
      icon: <School className="h-4 w-4" />,
      description: "School buildings, facilities, and infrastructure",
      collections: [
        {
          id: "campus-facilities",
          name: "Campus & Facilities",
          date: "2024",
          images: [
            { 
              id: 9, 
              src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80", 
              alt: "Main Building", 
              caption: "Main School Building",
              date: "2024",
              size: "large" 
            },
            { 
              id: 10, 
              src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80", 
              alt: "School Garden", 
              caption: "School Garden",
              date: "2024",
              size: "medium" 
            },
            { 
              id: 11, 
              src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80", 
              alt: "Computer Lab", 
              caption: "Computer Laboratory",
              date: "2024",
              size: "standard" 
            }
          ]
        },
        {
          id: "library",
          name: "School Library",
          date: "2024",
          images: [
            { 
              id: 12, 
              src: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=80", 
              alt: "Main Reading Hall", 
              caption: "Main Reading Hall",
              date: "2024",
              size: "medium" 
            },
            { 
              id: 13, 
              src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80", 
              alt: "Reference Section", 
              caption: "Reference Section",
              date: "2024",
              size: "standard" 
            }
          ]
        }
      ]
    }
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
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
          <Tabs defaultValue={categories[0].id} className="mb-8">
            <TabsList className="mb-8 flex overflow-x-auto overflow-y-hidden md:flex-wrap">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id} 
                  className="flex-shrink-0 mb-2 md:mb-0"
                >
                  <span className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
                
                {/* Sub-tabs for collections within each category */}
                <Tabs defaultValue={category.collections[0].id} className="mb-8">
                  <TabsList className="mb-8 flex overflow-x-auto overflow-y-hidden pb-2 md:flex-wrap">
                    {category.collections.map((collection) => (
                      <TabsTrigger 
                        key={collection.id} 
                        value={collection.id}
                        className="flex-shrink-0 mb-2 md:mb-0"
                      >
                        {collection.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {category.collections.map((collection) => (
                    <TabsContent key={collection.id} value={collection.id}>
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                        <p className="text-muted-foreground flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {collection.date}
                        </p>
                      </div>
                      
                      <div className="masonry-grid">
                        {collection.images.map((image) => (
                          <div 
                            key={image.id} 
                            className={`masonry-item ${
                              image.size === "medium" 
                                ? "masonry-item-medium" 
                                : image.size === "large" 
                                ? "masonry-item-large" 
                                : ""
                            }`}
                            onClick={() => setSelectedImage({...image, event: collection.name})}
                          >
                            <div className="relative h-full w-full overflow-hidden bg-muted rounded-lg">
                              <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 flex flex-col justify-end">
                                <div className="p-4">
                                  <p className="text-white font-medium mb-1">{image.caption}</p>
                                  <p className="text-white/80 text-sm flex items-center">
                                    <CalendarIcon className="mr-1 h-3 w-3" />
                                    {image.date}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>
      </div>
      
      {selectedImage && (
        <GalleryModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          image={{
            src: selectedImage.src,
            alt: selectedImage.alt,
            caption: `${selectedImage.caption} (${selectedImage.date})`
          }}
        />
      )}
    </Layout>
  );
};

export default Gallery;
