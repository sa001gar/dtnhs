
import React from "react";
import { Building2, Briefcase, GraduationCap, Award, Beaker, LandPlot } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/CustomCard";

interface AchievementProps {
  icon: React.ReactNode;
  title: string;
  count: string;
  description: string;
}

const Achievement: React.FC<AchievementProps> = ({ icon, title, count, description }) => {
  return (
    <Card className="relative overflow-hidden h-full">
      {/* Background clip shape */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 bg-school-primary/5 -z-0"
        style={{
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-1 mb-3 rounded-full bg-school-primary/10 w-fit">
          <div className="bg-gradient-to-br from-school-primary to-school-secondary p-2 rounded-full text-white">
            {icon}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-1">{count}</h3>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      
      {/* Bottom decorative element */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-school-primary/40 to-school-secondary/40"
        style={{
          clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
        }}
      ></div>
    </Card>
  );
};

const StudentAchievements: React.FC = () => {
  const achievements = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Corporate Sector",
      count: "350+",
      description: "Graduates working in top companies like TCS, Infosys, and Wipro"
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Government Jobs",
      count: "120+",
      description: "Alumni serving in various government departments"
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Higher Education",
      count: "200+",
      description: "Students pursuing Masters and PhDs in prestigious institutions"
    },
    {
      icon: <Beaker className="h-5 w-5" />,
      title: "Scientists & Researchers",
      count: "45+",
      description: "Alumni contributing to scientific research and innovation"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Award Winners",
      count: "75+",
      description: "Students who have received national and international recognition"
    },
    {
      icon: <LandPlot className="h-5 w-5" />,
      title: "Entrepreneurs",
      count: "60+",
      description: "Former students who have started their own successful businesses"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with clip path */}
      <div 
        className="absolute inset-0 bg-muted/30 -z-10"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
        }}
      ></div>
      
      <div className="container px-4">
        <AnimatedSection animation="fade-in-up">
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 relative inline-block">
              Our Alumni Success Stories
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-school-primary to-school-secondary"></div>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our graduates are making an impact across various fields and industries
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-in-up" 
              delay={index * 100}
            >
              <Achievement {...achievement} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentAchievements;
