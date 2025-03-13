
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Bookmark, Clock, Eye, ThumbsUp, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageLoader from "@/components/shared/PageLoader";

const Forum = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const discussionThreads = [
    {
      id: 1,
      title: "Tips for Class 10 Science Board Preparation",
      preview: "What are the most effective ways to prepare for the upcoming science board exams?",
      category: "Academics",
      author: {
        name: "Rahul Kumar",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      replies: 15,
      views: 156,
      likes: 23,
      lastActive: "2 hours ago",
      isPopular: true
    },
    {
      id: 2,
      title: "Annual Sports Day Event Planning",
      preview: "Let's discuss ideas and arrangements for this year's annual sports day event.",
      category: "Events",
      author: {
        name: "Priya Singh",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      replies: 8,
      views: 92,
      likes: 12,
      lastActive: "5 hours ago",
      isPopular: false
    },
    {
      id: 3,
      title: "Career Guidance for Commerce Students",
      preview: "What are the best career paths and colleges for commerce stream students?",
      category: "Career",
      author: {
        name: "Amit Sharma",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      replies: 21,
      views: 210,
      likes: 35,
      lastActive: "1 day ago",
      isPopular: true
    },
    {
      id: 4,
      title: "School Bus Transportation Issues",
      preview: "Discussion about the current bus routes and potential improvements.",
      category: "Administration",
      author: {
        name: "Neha Gupta",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      replies: 12,
      views: 98,
      likes: 8,
      lastActive: "3 days ago",
      isPopular: false
    },
    {
      id: 5,
      title: "Programming Club Project Ideas",
      preview: "Brainstorming for this semester's programming club projects.",
      category: "Clubs",
      author: {
        name: "Vikram Kapoor",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg"
      },
      replies: 18,
      views: 145,
      likes: 27,
      lastActive: "6 hours ago",
      isPopular: true
    }
  ];

  const filteredThreads = discussionThreads.filter(thread => 
    thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularThreads = discussionThreads.filter(thread => thread.isPopular);
  
  const categories = Array.from(new Set(discussionThreads.map(thread => thread.category))).sort();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Community Forum"
        description="Join discussions with students, parents, and teachers on various school-related topics."
        pattern="grid"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <AnimatedSection animation="fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Most Recent</DropdownMenuItem>
                      <DropdownMenuItem>Most Popular</DropdownMenuItem>
                      <DropdownMenuItem>Most Viewed</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Categories</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {categories.map(category => (
                        <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <Button className="bg-school-primary hover:bg-school-primary/90">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start New Discussion
                </Button>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Discussions</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  {filteredThreads.length === 0 ? (
                    <Card className="glass backdrop-blur-sm bg-background/80 border-muted p-8 text-center">
                      <p>No discussions found matching your search.</p>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredThreads.map((thread, index) => (
                        <AnimatedSection key={thread.id} animation="fade-in-up" delay={index * 100}>
                          <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-0">
                              <div className="p-4 sm:p-6">
                                <div className="flex justify-between items-start mb-2">
                                  <Badge variant="outline" className="mb-2">
                                    {thread.category}
                                  </Badge>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{thread.lastActive}</span>
                                  </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 hover:text-school-primary transition-colors">
                                  <a href="#">{thread.title}</a>
                                </h3>
                                <p className="text-muted-foreground mb-4">{thread.preview}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Avatar className="h-7 w-7 mr-2">
                                      <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                                      <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{thread.author.name}</span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <MessageSquare className="h-3 w-3 mr-1" />
                                      <span>{thread.replies}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Eye className="h-3 w-3 mr-1" />
                                      <span>{thread.views}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <ThumbsUp className="h-3 w-3 mr-1" />
                                      <span>{thread.likes}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedSection>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="popular">
                  <div className="space-y-4">
                    {popularThreads.map((thread, index) => (
                      <AnimatedSection key={thread.id} animation="fade-in-up" delay={index * 100}>
                        <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-0">
                            <div className="p-4 sm:p-6">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="mb-2">
                                  {thread.category}
                                </Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{thread.lastActive}</span>
                                </div>
                              </div>
                              <h3 className="text-xl font-bold mb-2 hover:text-school-primary transition-colors">
                                <a href="#">{thread.title}</a>
                              </h3>
                              <p className="text-muted-foreground mb-4">{thread.preview}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Avatar className="h-7 w-7 mr-2">
                                    <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                                    <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{thread.author.name}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MessageSquare className="h-3 w-3 mr-1" />
                                    <span>{thread.replies}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Eye className="h-3 w-3 mr-1" />
                                    <span>{thread.views}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    <span>{thread.likes}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedSection>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedSection>
          </div>

          <div className="lg:w-1/4">
            <AnimatedSection animation="fade-in-up" delay={200}>
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Forum Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-school-primary" />
                        <span>Total Discussions</span>
                      </div>
                      <span className="font-medium">126</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-school-primary" />
                        <span>Active Members</span>
                      </div>
                      <span className="font-medium">342</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-school-primary" />
                        <span>Replies Today</span>
                      </div>
                      <span className="font-medium">24</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center justify-between">
                        <a href="#" className="hover:text-school-primary transition-colors">
                          {category}
                        </a>
                        <Badge variant="secondary" className="text-xs">
                          {discussionThreads.filter(t => t.category === category).length}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Forum Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                    <li>Be respectful to all members</li>
                    <li>No spamming or self-promotion</li>
                    <li>Stay on topic in discussions</li>
                    <li>No offensive language or bullying</li>
                    <li>Respect privacy and confidentiality</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Complete Guidelines
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forum;
