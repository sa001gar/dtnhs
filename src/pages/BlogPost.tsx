
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag, ArrowLeft, Share2, ThumbsUp, Bookmark, MessageSquare } from "lucide-react";
import PageLoader from "@/components/shared/PageLoader";

const BlogPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  // Mock blog post data
  const blogPostData = {
    id: "1",
    title: "Annual Science Fair Showcases Student Innovation",
    fullContent: `
      <p class="mb-4">This year's science fair featured over 50 projects demonstrating the creativity and scientific acumen of our students. The event, held in the school auditorium, attracted parents, teachers, and local science enthusiasts who were impressed by the quality and innovation of the student projects.</p>
      
      <h2 class="text-2xl font-bold my-6">Project Highlights</h2>
      
      <p class="mb-4">Among the standout projects was a solar-powered water purification system designed by Class 10 students Arjun Mehta and Priya Das. Their project demonstrated how solar energy could be harnessed to purify contaminated water in rural areas with limited electricity access.</p>
      
      <p class="mb-4">"We were inspired to create this after learning about water scarcity issues in many parts of our country," explained Arjun. "Our design is cost-effective and can be implemented using locally available materials."</p>
      
      <p class="mb-4">Another notable project was a smart garbage segregation system by Class 9 student Riya Sharma. The automated system used sensors to identify and sort different types of waste, promoting better recycling practices.</p>
      
      <h2 class="text-2xl font-bold my-6">Expert Evaluation</h2>
      
      <p class="mb-4">The projects were evaluated by a panel of judges including Dr. Amit Patel, a professor from Durgapur Engineering College, and Ms. Sunita Roy, a senior scientist from the Regional Science Center.</p>
      
      <p class="mb-4">"I am thoroughly impressed by the scientific thinking and problem-solving skills demonstrated by these young students," remarked Dr. Patel. "Some of these projects address real-world problems with practical solutions, which is exactly what science education should aim for."</p>
      
      <h2 class="text-2xl font-bold my-6">Awards and Recognition</h2>
      
      <p class="mb-4">The solar water purification project received the first prize, while the smart garbage segregation system was awarded the second prize. The "Innovation Award" went to Class 8 students Nikhil Dutta and Akash Sen for their project on biodegradable plastics from agricultural waste.</p>
      
      <p class="mb-4">Principal Mrs. Neelima Ghosh congratulated all participants and emphasized the school's commitment to promoting scientific temper among students.</p>
      
      <p class="mb-4">"Our science fair is not just about competition; it's about nurturing curiosity, critical thinking, and problem-solving skills," she said. "These are essential skills for the future, regardless of what career path our students choose."</p>
      
      <h2 class="text-2xl font-bold my-6">Community Impact</h2>
      
      <p class="mb-4">The science fair also had a broader impact on the community. Several local schools have expressed interest in collaborating for future science events, and two projects have been selected for the upcoming District Science Exhibition.</p>
      
      <p class="mb-4">The event concluded with an interactive session where visitors could engage with the student innovators and learn more about their projects. Many parents expressed pride in seeing their children's scientific achievements.</p>
      
      <p class="mb-4">"It's wonderful to see how the school is fostering scientific thinking," said Mr. Rajesh Kumar, a parent. "My daughter has been excitedly working on her project for weeks, and the experience has really boosted her confidence in STEM subjects."</p>
      
      <p class="mb-4">The success of this year's science fair has set a high standard for future events, and plans are already underway for an even larger exhibition next year, possibly including participation from other schools in the region.</p>
    `,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1920",
    date: "October 15, 2023",
    readTime: "5 min read",
    author: {
      name: "Dr. Amit Patel",
      role: "Science Department Head",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    categories: ["Events", "Science"],
    relatedPosts: [
      {
        id: "2",
        title: "New Library Resources Enhance Student Learning",
        excerpt: "Our school library has been upgraded with over 5,000 new books and digital resources to support student research and reading.",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1920",
      },
      {
        id: "3",
        title: "Students Excel in National Mathematics Competition",
        excerpt: "Our school team secured the top position in the National Mathematics Olympiad, bringing home three gold medals.",
        image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&q=80&w=1920",
      }
    ]
  };

  useEffect(() => {
    // Simulate loading blog post data
    const timer = setTimeout(() => {
      setPost(blogPostData);
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!post) {
    return (
      <Layout>
        <div className="container py-16">
          <h1>Blog post not found</h1>
          <Button asChild className="mt-4">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title={post.title}
        description={`Published on ${post.date} · ${post.readTime}`}
        pattern="dots"
        small
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatedSection animation="fade-in-up">
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.categories.map((category: string) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {category}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">{post.author.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm sm:prose max-w-none" dangerouslySetInnerHTML={{ __html: post.fullContent }}>
                  </div>
                  
                  <div className="border-t border-border mt-8 pt-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Like
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
                      <Button asChild variant="ghost" className="text-muted-foreground">
                        <Link to="/blog" className="flex items-center">
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Back to All Posts
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Comments Section */}
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mt-8">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Comments (3)</h3>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Add Comment
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Comment 1 */}
                    <div className="border-b border-border pb-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Neha Singh" />
                          <AvatarFallback>NS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Neha Singh</p>
                            <p className="text-xs text-muted-foreground">2 days ago</p>
                          </div>
                          <p className="mt-2 text-sm">
                            My daughter participated in this fair and I'm so proud of her work! The event was well organized and it was wonderful to see so many innovative projects.
                          </p>
                          <div className="mt-2 flex items-center gap-4">
                            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Reply</button>
                            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Like</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Comment 2 */}
                    <div className="border-b border-border pb-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://randomuser.me/api/portraits/men/54.jpg" alt="Rajesh Kumar" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Rajesh Kumar</p>
                            <p className="text-xs text-muted-foreground">1 day ago</p>
                          </div>
                          <p className="mt-2 text-sm">
                            The solar water purification project was truly impressive. I hope it gets further support for real-world implementation.
                          </p>
                          <div className="mt-2 flex items-center gap-4">
                            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Reply</button>
                            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Like</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Comment 3 */}
                    <div>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://randomuser.me/api/portraits/women/68.jpg" alt="Sunita Roy" />
                          <AvatarFallback>SR</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Sunita Roy</p>
                            <Badge variant="outline" className="text-[10px] h-4">Teacher</Badge>
                            <p className="text-xs text-muted-foreground">12 hours ago</p>
                          </div>
                          <p className="mt-2 text-sm">
                            As one of the judges, I want to commend all participants for their hard work and innovative thinking. I'm already looking forward to next year's fair!
                          </p>
                          <div className="mt-2 flex items-center gap-4">
                            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Reply</button>
                            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Like</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-1">
            <AnimatedSection animation="fade-in-up" delay={200}>
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mb-8 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Related Articles</h3>
                  
                  <div className="space-y-6">
                    {post.relatedPosts.map((relatedPost: any) => (
                      <div key={relatedPost.id} className="flex flex-col gap-3">
                        <Link to={`/blog/${relatedPost.id}`} className="block overflow-hidden rounded-lg">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title} 
                            className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <div>
                          <h4 className="font-medium hover:text-school-primary transition-colors">
                            <Link to={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/blog">View All Posts</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
