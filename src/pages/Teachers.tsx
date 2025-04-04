
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageLoader from "@/components/shared/PageLoader";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Filter, Mail, GraduationCap, Clock, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Teachers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const teachers = [
    { id: 1, name: "Sandip Pan", subject: "Physics", qualification: "M.Sc in Physics, B.Ed", experience: "15 years", email: "sandip.pan@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?professor,man" },
    { id: 2, name: "Partha Mondal", subject: "Physics", qualification: "M.Sc in Physics, B.Ed", experience: "12 years", email: "partha.mondal@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?teacher,man" },
    { id: 3, name: "Samim Akhter Khan", subject: "Physics", qualification: "M.Sc in Physics, B.Ed", experience: "10 years", email: "samim.khan@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?lecturer,man" },
    { id: 4, name: "Parimal Pramanik", subject: "Chemistry", qualification: "M.Sc in Chemistry, B.Ed", experience: "14 years", email: "parimal.pramanik@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?scientist,man" },
    { id: 5, name: "Jayanta Banerjee", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "18 years", email: "jayanta.banerjee@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?mathematician,man" },
    { id: 6, name: "Chinmoy Chatterjee", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "16 years", email: "chinmoy.chatterjee@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?professor,indian,man" },
    { id: 7, name: "Debabrata Mondal", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "13 years", email: "debabrata.mondal@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?teacher,indian,man" },
    { id: 8, name: "Kajal Bhattacharjee", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "11 years", email: "kajal.bhattacharjee@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?lecturer,woman" },
    { id: 9, name: "Chandan Gon", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "9 years", email: "chandan.gon@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?teacher,indian,man" },
    { id: 10, name: "Manik Chandra Mondal", subject: "Biology", qualification: "M.Sc in Biology, B.Ed", experience: "17 years", email: "manik.mondal@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?biologist,man" },
    { id: 11, name: "Dipak Chatterjee", subject: "Biology", qualification: "M.Sc in Biology, B.Ed", experience: "14 years", email: "dipak.chatterjee@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?scientist,indian,man" },
    { id: 12, name: "Manisha Mukherjee", subject: "Biology", qualification: "M.Sc in Biology, B.Ed", experience: "12 years", email: "manisha.mukherjee@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?professor,woman" },
    { id: 13, name: "Moumita Kundu", subject: "Biology", qualification: "M.Sc in Biology, B.Ed", experience: "10 years", email: "moumita.kundu@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?biologist,woman" },
    { id: 14, name: "Sujata Goswami", subject: "Geography", qualification: "M.A in Geography, B.Ed", experience: "15 years", email: "sujata.goswami@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?geographer,woman" },
    { id: 15, name: "Sima Bag", subject: "Geography", qualification: "M.A in Geography, B.Ed", experience: "12 years", email: "sima.bag@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?teacher,woman" },
    { id: 16, name: "Sonali Chakraborty", subject: "Geography", qualification: "M.A in Geography, B.Ed", experience: "10 years", email: "sonali.chakraborty@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?lecturer,indian,woman" },
    { id: 17, name: "Pijush Kanti Biswas", subject: "History", qualification: "M.A in History, B.Ed", experience: "14 years", email: "pijush.biswas@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?historian,man" },
    { id: 18, name: "Soma Sikdar", subject: "History", qualification: "M.A in History, B.Ed", experience: "12 years", email: "soma.sikdar@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?teacher,indian,woman" },
    { id: 19, name: "Saswati Ray", subject: "English", qualification: "M.A in English, B.Ed", experience: "16 years", email: "saswati.ray@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?professor,woman" },
    { id: 20, name: "Jibica Saha", subject: "English", qualification: "M.A in English, B.Ed", experience: "13 years", email: "jibica.saha@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?teacher,indian,woman" },
    { id: 21, name: "Piyali Roy", subject: "English", qualification: "M.A in English, B.Ed", experience: "11 years", email: "piyali.roy@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?lecturer,woman" },
    { id: 22, name: "Moumi Dutta", subject: "English", qualification: "M.A in English, B.Ed", experience: "9 years", email: "moumi.dutta@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?teacher,woman" },
    { id: 23, name: "Debabrata Ray", subject: "Bengali", qualification: "M.A in Bengali, B.Ed", experience: "18 years", email: "debabrata.ray@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?professor,indian,man" },
    { id: 24, name: "Forhad Alam", subject: "Bengali", qualification: "M.A in Bengali, B.Ed", experience: "16 years", email: "forhad.alam@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?teacher,man" },
    { id: 25, name: "Prosun Mitra", subject: "Bengali", qualification: "M.A in Bengali, B.Ed", experience: "14 years", email: "prosun.mitra@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?lecturer,indian,man" },
    { id: 26, name: "Debabrata Das", subject: "Commerce", qualification: "M.Com, B.Ed", experience: "12 years", email: "debabrata.das@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?businessman,teacher,man" },
    { id: 27, name: "Sutapa Mazumder", subject: "Commerce", qualification: "M.Com, B.Ed", experience: "10 years", email: "sutapa.mazumder@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?businesswoman,teacher" },
    { id: 28, name: "Biplab Rajbanshi", subject: "Philosophy", qualification: "M.A in Philosophy, B.Ed", experience: "15 years", email: "biplab.rajbanshi@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?philosopher,man" },
    { id: 29, name: "Sukumar Das", subject: "Political Science", qualification: "M.A in Political Science, B.Ed", experience: "12 years", email: "sukumar.das@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?teacher,indian,man" },
    { id: 30, name: "Ishita Pal", subject: "Computer Application", qualification: "M.Sc in Computer Science", experience: "10 years", email: "ishita.pal@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?programmer,woman" },
    { id: 31, name: "Maya Roy", subject: "Work Education", qualification: "B.Ed in Work Education", experience: "10 years", email: "maya.roy@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?craftteacher,woman" },
    { id: 32, name: "Sanat Kumar Mondal", subject: "Physical Education", qualification: "B.P.Ed", experience: "12 years", email: "sanat.mondal@dtnhs.in", image: "https://source.unsplash.com/random/300x300/?coach,man" }
  ];

  // Get unique subjects for the filter
  const subjects = ["all", ...new Set(teachers.map(teacher => teacher.subject))];

  // Filter teachers based on selected subject
  const filteredTeachers = subjectFilter === "all" 
    ? teachers 
    : teachers.filter(teacher => teacher.subject === subjectFilter);

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout
      title="Our Teachers - Durgapur Tarak Nath High School"
      description="Meet our dedicated faculty members at Durgapur Tarak Nath High School. Learn about our teachers' qualifications, experience, and subject expertise."
      keywords="DTNHS teachers, school faculty, teaching staff, educators, subject teachers, school professors, Durgapur Tarak Nath High School"
      canonicalUrl="https://dtnhs.edu.in/teachers"
    >
      <PageHeader
        title="Our Teachers"
        description="Meet our dedicated and experienced teaching staff who are committed to providing quality education."
        pattern="stripes"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-end">
            <div className="w-full sm:w-64">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-4 w-4" />
                <label htmlFor="subject-filter" className="text-sm font-medium">
                  Filter by Subject
                </label>
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>
                      {subject === "all" ? "All Subjects" : subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className={isMobile ? "flex overflow-x-auto pb-6 hide-scrollbar" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"}>
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, index) => (
              <AnimatedSection 
                key={teacher.id} 
                animation="fade-in-up" 
                delay={index * 100}
                className={isMobile ? "min-w-[280px] w-[85%] flex-shrink-0 mr-4" : ""}
              >
                <Card className="faculty-card group overflow-hidden hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-school-primary/30 to-school-secondary/30">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name} 
                      className="faculty-card-img"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  </div>
                  
                  <CardHeader className="-mt-20 pb-0 relative z-10">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 ring-4 ring-background shadow-lg">
                        <AvatarImage src={teacher.image} alt={teacher.name} />
                        <AvatarFallback className="bg-school-primary text-white">
                          {getInitials(teacher.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{teacher.name}</h3>
                        <Badge variant="outline" className="bg-school-primary/10 text-school-primary dark:bg-school-primary/20 mt-1">
                          {teacher.subject}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="space-y-3 mt-2">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="h-4 w-4 text-school-primary mt-1 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-school-primary mt-1 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{teacher.experience}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-school-primary mt-1 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground break-all">{teacher.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-muted-foreground">
              No teachers found for the selected subject filter.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Teachers;
