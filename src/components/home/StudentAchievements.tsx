
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Briefcase, Building, GraduationCap, Microscope } from "lucide-react";

interface AchievementCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: string;
  color: string;
  delay: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  icon, 
  title, 
  description, 
  count, 
  color,
  delay
}) => {
  return (
    <AnimatedSection 
      animation="fade-in-up" 
      delay={delay}
      className={`rounded-xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${color} dark:border-border dark:bg-card/80 dark:hover:shadow-black/20`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-full bg-school-primary/10 p-2 text-school-primary dark:bg-school-primary/20">
          {icon}
        </div>
        <span className="text-3xl font-bold text-school-primary">{count}</span>
      </div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </AnimatedSection>
  );
};

const StudentAchievements: React.FC = () => {
  const achievements = [
    {
      icon: <Building className="h-6 w-6" />,
      title: "Corporate Leaders",
      description: "Our alumni work at leading corporations like TCS, Infosys, and Wipro in various technical and managerial roles.",
      count: "200+",
      color: "bg-gradient-to-br from-white to-blue-50 dark:from-transparent dark:to-blue-950/20",
      delay: 0
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Government Services",
      description: "Many of our students have secured prestigious positions in government services including IAS, IPS, and other civil services.",
      count: "150+",
      color: "bg-gradient-to-br from-white to-orange-50 dark:from-transparent dark:to-orange-950/20",
      delay: 100
    },
    {
      icon: <Microscope className="h-6 w-6" />,
      title: "Scientists & Researchers",
      description: "Our former students contribute to scientific advancements at institutions like ISRO, DRDO, and various research facilities.",
      count: "75+",
      color: "bg-gradient-to-br from-white to-green-50 dark:from-transparent dark:to-green-950/20",
      delay: 200
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Higher Education",
      description: "Our alumni have pursued higher education at prestigious institutions including IITs, NITs, and renowned universities abroad.",
      count: "300+",
      color: "bg-gradient-to-br from-white to-purple-50 dark:from-transparent dark:to-purple-950/20",
      delay: 300
    }
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 dark:bg-background">
      <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-school-primary/5 blur-3xl dark:bg-school-primary/10"></div>
      <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-school-secondary/5 blur-3xl dark:bg-school-secondary/10"></div>
      
      <div className="container relative px-4">
        <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl md:text-5xl">
            Our Students Are Working At
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our alumni have established successful careers across various prestigious organizations and institutions.
          </p>
        </AnimatedSection>
        
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={index}
              icon={achievement.icon}
              title={achievement.title}
              description={achievement.description}
              count={achievement.count}
              color={achievement.color}
              delay={achievement.delay}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="rounded-full border-school-primary text-school-primary hover:bg-school-primary/10 hover:text-school-primary dark:border-school-primary dark:hover:bg-school-primary/20">
            <Link to="/alumni">View Alumni Success Stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StudentAchievements;
