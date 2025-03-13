
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ThumbsUp, Flag, MessageSquare, Clock, Eye, 
  Share2, Bookmark, Send
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import PageLoader from "@/components/shared/PageLoader";

const ForumDiscussion = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const { id } = useParams();
  const [discussion, setDiscussion] = useState<any>(null);

  // Mock forum discussion data
  const forumData = {
    id: "1",
    title: "Tips for Class 10 Science Board Preparation",
    content: `
      <p>Hello everyone,</p>
      
      <p>As we're approaching the Class 10 Science Board exams, I wanted to create a thread where we can share effective study strategies and resources. I'm particularly concerned about the Physics section as I find some concepts challenging.</p>
      
      <p>Here are some questions I have:</p>
      
      <ol>
        <li>How many hours should one ideally dedicate to Science revision daily?</li>
        <li>Are there any recommended YouTube channels or online resources for difficult Physics topics?</li>
        <li>What's the best way to approach numerical problems in Physics and Chemistry?</li>
        <li>How important are the diagrams in Biology, and what's the best way to practice them?</li>
        <li>Any tips for managing exam stress and maintaining focus during these crucial months?</li>
      </ol>
      
      <p>I would really appreciate insights from teachers, seniors who have already cleared the boards, and fellow students who might have useful strategies to share.</p>
      
      <p>Thank you in advance!</p>
    `,
    category: "Academics",
    author: {
      name: "Rahul Kumar",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Student, Class 10",
      joinedDate: "November 2022"
    },
    stats: {
      replies: 15,
      views: 156,
      likes: 23
    },
    created: "2 days ago",
    lastActive: "2 hours ago",
    isPopular: true,
    replies: [
      {
        id: 1,
        author: {
          name: "Priya Singh",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          role: "Science Teacher",
          joinedDate: "August 2020"
        },
        content: `
          <p>Hello Rahul,</p>
          
          <p>As a Science teacher, I'd like to address your questions:</p>
          
          <ol>
            <li><strong>Study hours:</strong> Quality matters more than quantity. I recommend 2-3 focused hours daily for Science, with breaks in between. Increase this gradually as exams approach.</li>
            
            <li><strong>Online resources:</strong> Khan Academy and Byju's have excellent explanations for Physics concepts. For specific board exam preparation, "Physics Wallah" and "Vedantu" YouTube channels are quite helpful.</li>
            
            <li><strong>Numerical problems:</strong> Practice is key. Start with NCERT examples, then move to exercises. For each type of problem, understand the concept and formula application rather than memorizing steps.</li>
            
            <li><strong>Biology diagrams:</strong> Very important! Practice drawing each diagram at least 10 times. Label them correctly as per NCERT. Understanding the structure helps remember the diagram better than rote memorization.</li>
            
            <li><strong>Stress management:</strong> Create a realistic study schedule, include short breaks, stay physically active, ensure proper sleep, and practice deep breathing exercises before study sessions.</li>
          </ol>
          
          <p>Feel free to approach your school teachers with specific doubts. We're here to help!</p>
        `,
        timestamp: "1 day ago",
        likes: 15,
        isTeacherResponse: true
      },
      {
        id: 2,
        author: {
          name: "Amit Sharma",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg",
          role: "Student, Class 12",
          joinedDate: "July 2021"
        },
        content: `
          <p>Hi Rahul,</p>
          
          <p>I cleared my 10th boards last year with 95% in Science. Here's what worked for me:</p>
          
          <p>For Physics, I found that solving previous years' questions really helped me understand the pattern and important topics. The numerical section becomes easier with practice.</p>
          
          <p>One strategy that worked well for me was creating summary notes for each chapter with formulas, key concepts, and common mistakes to avoid.</p>
          
          <p>Another tip: Don't just read textbooks passively. Actively engage by explaining concepts aloud as if you're teaching someone else. This really tests your understanding.</p>
          
          <p>Good luck with your preparation! Feel free to ask if you have specific questions about any topic.</p>
        `,
        timestamp: "23 hours ago",
        likes: 8,
        isTeacherResponse: false
      },
      {
        id: 3,
        author: {
          name: "Neha Gupta",
          avatar: "https://randomuser.me/api/portraits/women/65.jpg",
          role: "Parent",
          joinedDate: "October 2022"
        },
        content: `
          <p>As a parent who's been through this with my older child, I'd like to add a few points about maintaining wellbeing during exam preparation:</p>
          
          <ul>
            <li>Ensure you're eating well - brain needs nutrition</li>
            <li>Take short walks between study sessions - helps clear the mind</li>
            <li>Study in 45-minute blocks with 15-minute breaks</li>
            <li>Stay hydrated</li>
            <li>Limit screen time (except for educational videos)</li>
          </ul>
          
          <p>These small lifestyle adjustments can make a big difference in retention and focus.</p>
        `,
        timestamp: "18 hours ago",
        likes: 5,
        isTeacherResponse: false
      }
    ]
  };

  useEffect(() => {
    // Simulate loading forum discussion data
    const timer = setTimeout(() => {
      setDiscussion(forumData);
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!discussion) {
    return (
      <Layout>
        <div className="container py-16">
          <h1>Discussion not found</h1>
          <Button asChild className="mt-4">
            <Link to="/forum">Back to Forum</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title={discussion.title}
        description={`Discussion in ${discussion.category} category · Started by ${discussion.author.name}`}
        pattern="stripes"
        small
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <AnimatedSection animation="fade-in-up">
              {/* Main Discussion */}
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md overflow-hidden mb-8">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <Badge variant="outline" className="mb-2">
                        {discussion.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Posted {discussion.created}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 mb-6">
                      <div className="hidden sm:block">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                          <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div className="sm:hidden mr-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <h3 className="font-medium text-lg">{discussion.author.name}</h3>
                          <Badge variant="secondary" className="text-xs">{discussion.author.role}</Badge>
                        </div>
                        <div className="prose prose-sm sm:prose max-w-none" dangerouslySetInnerHTML={{ __html: discussion.content }}>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Like ({discussion.stats.likes})
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>{discussion.stats.views} views</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          <span>{discussion.stats.replies} replies</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90">
                          <Flag className="h-3 w-3 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Replies */}
              <h3 className="text-xl font-bold mb-4">Replies ({discussion.replies.length})</h3>
              
              <div className="space-y-6">
                {discussion.replies.map((reply: any) => (
                  <AnimatedSection key={reply.id} animation="fade-in-up">
                    <Card className={cn(
                      "glass backdrop-blur-sm bg-background/80 border-muted shadow-md",
                      reply.isTeacherResponse && "border-l-4 border-l-school-primary"
                    )}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="hidden sm:block">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                              <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <div className="sm:hidden mr-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                  <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-medium">{reply.author.name}</h4>
                                <Badge variant="secondary" className="text-xs">{reply.author.role}</Badge>
                                {reply.isTeacherResponse && (
                                  <Badge className="bg-school-primary text-white text-xs">Teacher</Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            
                            <div className="prose prose-sm sm:prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: reply.content }}>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="h-8 text-xs">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Like ({reply.likes})
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-xs">Reply</Button>
                              <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive hover:text-destructive/90">Report</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
              
              {/* Reply Form */}
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mt-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Post Your Reply</h3>
                  <form>
                    <Textarea 
                      placeholder="Share your thoughts or answer the question..." 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="mb-4 min-h-32"
                    />
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-school-primary hover:bg-school-primary/90">
                        <Send className="h-4 w-4 mr-2" />
                        Post Reply
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-1">
            <AnimatedSection animation="fade-in-up" delay={200}>
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mb-6 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                      <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{discussion.author.name}</p>
                      <p className="text-sm text-muted-foreground">{discussion.author.role}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since</span>
                      <span>{discussion.author.joinedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total posts</span>
                      <span>24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Helpful votes</span>
                      <span>67</span>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full mt-6" variant="outline">
                    <Link to="#">View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Similar Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Link to="#" className="font-medium hover:text-school-primary transition-colors">How to balance Science studies with other subjects?</Link>
                      <p className="text-xs text-muted-foreground mt-1">12 replies · 2 days ago</p>
                    </div>
                    <div>
                      <Link to="#" className="font-medium hover:text-school-primary transition-colors">Best reference books for Class 10 Physics</Link>
                      <p className="text-xs text-muted-foreground mt-1">8 replies · 5 days ago</p>
                    </div>
                    <div>
                      <Link to="#" className="font-medium hover:text-school-primary transition-colors">Study schedule for last month before boards</Link>
                      <p className="text-xs text-muted-foreground mt-1">16 replies · 1 week ago</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/forum">Back to Forum</Link>
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

export default ForumDiscussion;

const cn = (...classNames: (string | undefined | boolean)[]) => {
  return classNames.filter(Boolean).join(" ");
};
