
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Filter } from "lucide-react";

const Teachers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState("all");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const teachers = [
    { id: 1, name: "Sandip Pan", subject: "Physics", qualification: "M.Sc in Physics, B.Ed", experience: "15 years", email: "sandip.pan@dtnhs.in" },
    { id: 2, name: "Partha Mondal", subject: "Physics", qualification: "M.Sc in Physics, B.Ed", experience: "12 years", email: "partha.mondal@dtnhs.in" },
    { id: 3, name: "Samim Akhter Khan", subject: "Physics", qualification: "M.Sc in Physics, B.Ed", experience: "10 years", email: "samim.khan@dtnhs.in" },
    { id: 4, name: "Parimal Pramanik", subject: "Chemistry", qualification: "M.Sc in Chemistry, B.Ed", experience: "14 years", email: "parimal.pramanik@dtnhs.in" },
    { id: 5, name: "Jayanta Banerjee", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "18 years", email: "jayanta.banerjee@dtnhs.in" },
    { id: 6, name: "Chinmoy Chatterjee", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "16 years", email: "chinmoy.chatterjee@dtnhs.in" },
    { id: 7, name: "Debabrata Mondal", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "13 years", email: "debabrata.mondal@dtnhs.in" },
    { id: 8, name: "Kajal Bhattacharjee", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "11 years", email: "kajal.bhattacharjee@dtnhs.in" },
    { id: 9, name: "Chandan Gon", subject: "Mathematics", qualification: "M.Sc in Mathematics, B.Ed", experience: "9 years", email: "chandan.gon@dtnhs.in" },
    { id: 10, name: "Manik Chandra Mondal", subject: "Biology", qualification: "M.Sc in Biology, B.Ed", experience: "17 years", email: "manik.mondal@dtnhs.in" },
    { id: 11, name: "Dipak Chatterjee", subject: "Biology", qualification: "M.Sc in Biology, B.Ed", experience: "14 years", email: "dipak.chatterjee@dtnhs.in" },
    { id: 12, name: "Manisha Mukherjee", subject: "Biology", qualification: "M.Sc in Biology, B.Ed", experience: "12 years", email: "manisha.mukherjee@dtnhs.in" },
    { id: 13, name: "Moumita Kundu", subject: "Biology", qualification: "M.Sc in Biology, B.Ed", experience: "10 years", email: "moumita.kundu@dtnhs.in" },
    { id: 14, name: "Sujata Goswami", subject: "Geography", qualification: "M.A in Geography, B.Ed", experience: "15 years", email: "sujata.goswami@dtnhs.in" },
    { id: 15, name: "Sima Bag", subject: "Geography", qualification: "M.A in Geography, B.Ed", experience: "12 years", email: "sima.bag@dtnhs.in" },
    { id: 16, name: "Sonali Chakraborty", subject: "Geography", qualification: "M.A in Geography, B.Ed", experience: "10 years", email: "sonali.chakraborty@dtnhs.in" },
    { id: 17, name: "Pijush Kanti Biswas", subject: "History", qualification: "M.A in History, B.Ed", experience: "14 years", email: "pijush.biswas@dtnhs.in" },
    { id: 18, name: "Soma Sikdar", subject: "History", qualification: "M.A in History, B.Ed", experience: "12 years", email: "soma.sikdar@dtnhs.in" },
    { id: 19, name: "Saswati Ray", subject: "English", qualification: "M.A in English, B.Ed", experience: "16 years", email: "saswati.ray@dtnhs.in" },
    { id: 20, name: "Jibica Saha", subject: "English", qualification: "M.A in English, B.Ed", experience: "13 years", email: "jibica.saha@dtnhs.in" },
    { id: 21, name: "Piyali Roy", subject: "English", qualification: "M.A in English, B.Ed", experience: "11 years", email: "piyali.roy@dtnhs.in" },
    { id: 22, name: "Moumi Dutta", subject: "English", qualification: "M.A in English, B.Ed", experience: "9 years", email: "moumi.dutta@dtnhs.in" },
    { id: 23, name: "Debabrata Ray", subject: "Bengali", qualification: "M.A in Bengali, B.Ed", experience: "18 years", email: "debabrata.ray@dtnhs.in" },
    { id: 24, name: "Forhad Alam", subject: "Bengali", qualification: "M.A in Bengali, B.Ed", experience: "16 years", email: "forhad.alam@dtnhs.in" },
    { id: 25, name: "Prosun Mitra", subject: "Bengali", qualification: "M.A in Bengali, B.Ed", experience: "14 years", email: "prosun.mitra@dtnhs.in" },
    { id: 26, name: "Debabrata Das", subject: "Commerce", qualification: "M.Com, B.Ed", experience: "12 years", email: "debabrata.das@dtnhs.in" },
    { id: 27, name: "Sutapa Mazumder", subject: "Commerce", qualification: "M.Com, B.Ed", experience: "10 years", email: "sutapa.mazumder@dtnhs.in" },
    { id: 28, name: "Biplab Rajbanshi", subject: "Philosophy", qualification: "M.A in Philosophy, B.Ed", experience: "15 years", email: "biplab.rajbanshi@dtnhs.in" },
    { id: 29, name: "Sukumar Das", subject: "Political Science", qualification: "M.A in Political Science, B.Ed", experience: "12 years", email: "sukumar.das@dtnhs.in" },
    { id: 30, name: "Ishita Pal", subject: "Computer Application", qualification: "M.Sc in Computer Science", experience: "10 years", email: "ishita.pal@dtnhs.in" },
    { id: 31, name: "Maya Roy", subject: "Work Education", qualification: "B.Ed in Work Education", experience: "10 years", email: "maya.roy@dtnhs.in" },
    { id: 32, name: "Sanat Kumar Mondal", subject: "Physical Education", qualification: "B.P.Ed", experience: "12 years", email: "sanat.mondal@dtnhs.in" }
];

  // Get unique subjects for the filter
  const subjects = ["all", ...new Set(teachers.map(teacher => teacher.subject))];

  // Filter teachers based on selected subject
  const filteredTeachers = subjectFilter === "all" 
    ? teachers 
    : teachers.filter(teacher => teacher.subject === subjectFilter);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, index) => (
              <AnimatedSection key={teacher.id} animation="fade-in-up" delay={index * 100}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{teacher.name}</CardTitle>
                    <p className="text-school-primary font-medium">{teacher.subject}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><span className="font-medium">Qualification:</span> {teacher.qualification}</p>
                      <p><span className="font-medium">Experience:</span> {teacher.experience}</p>
                      <p><span className="font-medium">Email:</span> {teacher.email}</p>
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
