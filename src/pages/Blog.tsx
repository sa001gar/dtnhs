
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/shared/PageLoader";
import { Link } from "react-router-dom";

const Blog = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Annual Science Fair Showcases Student Innovation",
      excerpt: "This year's science fair featured over 50 projects demonstrating the creativity and scientific acumen of our students.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1920",
      date: "October 15, 2023",
      readTime: "5 min read",
      author: {
        name: "Dr. Amit Patel",
        role: "Science Department Head",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg"
      },
      categories: ["Events", "Science"]
    },
    {
      id: 2,
      title: "New Library Resources Enhance Student Learning",
      excerpt: "Our school library has been upgraded with over 5,000 new books and digital resources to support student research and reading.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1920",
      date: "September 28, 2023",
      readTime: "4 min read",
      author: {
        name: "Maya Singh",
        role: "Head Librarian",
        avatar: "https://randomuser.me/api/portraits/women/36.jpg"
      },
      categories: ["Facilities", "Resources"]
    },
    {
      id: 3,
      title: "Students Excel in National Mathematics Competition",
      excerpt: "Our school team secured the top position in the National Mathematics Olympiad, bringing home three gold medals.",
      image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&q=80&w=1920",
      date: "September 15, 2023",
      readTime: "3 min read",
      author: {
        name: "Rajesh Kumar",
        role: "Mathematics Teacher",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg"
      },
      categories: ["Achievements", "Mathematics"]
    },
    {
      id: 4,
      title: "Cultural Diversity Week Celebrates Global Heritage",
      excerpt: "Students and staff celebrated Cultural Diversity Week with food, music, costumes, and presentations from around the world.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1920",
      date: "August 22, 2023",
      readTime: "6 min read",
      author: {
        name: "Priya Sharma",
        role: "Cultural Coordinator",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg"
      },
      categories: ["Events", "Culture"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.categories.some(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const recentPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  
  const categories = Array.from(new Set(blogPosts.flatMap(post => post.categories))).sort();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="School Blog"
        description="Stay updated with the latest news, events, and achievements from our school community."
        pattern="dots"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatedSection animation="fade-in-up">
              <div className="flex items-center mb-8">
                <Search className="w-5 h-5 mr-2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {filteredPosts.length === 0 ? (
                <Card className="glass backdrop-blur-sm bg-background/80 border-muted p-8 text-center">
                  <p>No blog posts found matching your search.</p>
                </Card>
              ) : (
                <div className="space-y-8">
                  {filteredPosts.map((post, index) => (
                    <AnimatedSection key={post.id} animation="fade-in-up" delay={index * 100}>
                      <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          <div className="md:col-span-1">
                            <Link to={`/blog/${post.id}`} className="block h-full w-full relative">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="h-full w-full object-cover min-h-[200px]"
                              />
                            </Link>
                          </div>
                          <div className="md:col-span-2 p-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.categories.map(category => (
                                <Badge key={category} variant="secondary" className="text-xs">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="text-xl font-bold mb-2 hover:text-school-primary transition-colors">
                              <Link to={`/blog/${post.id}`}>{post.title}</Link>
                            </h3>
                            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{post.date}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{post.author.name}</p>
                                  <p className="text-xs text-muted-foreground">{post.author.role}</p>
                                </div>
                              </div>
                              <Button variant="ghost" className="text-school-primary hover:text-school-primary/90 hover:bg-school-primary/10 p-0" asChild>
                                <Link to={`/blog/${post.id}`} className="flex items-center">
                                  <span className="mr-1">Read more</span>
                                  <ChevronRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </AnimatedSection>
          </div>

          <div>
            <AnimatedSection animation="fade-in-up" delay={200}>
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mb-8">
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map(post => (
                      <div key={post.id} className="flex items-start gap-3">
                        <Link to={`/blog/${post.id}`} className="w-16 h-16 shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div>
                          <h4 className="text-sm font-medium hover:text-school-primary transition-colors">
                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mb-8">
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        <Tag className="h-3 w-3 mr-1" />
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md">
                <CardHeader>
                  <CardTitle>Subscribe</CardTitle>
                  <CardDescription>Get the latest updates delivered to your inbox</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <Input type="email" placeholder="Your email address" />
                    <Button className="w-full bg-school-primary hover:bg-school-primary/90">Subscribe</Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
