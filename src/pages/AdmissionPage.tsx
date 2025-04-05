import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { 
  CalendarCheck, 
  FileText, 
  CheckCircle, 
  HelpCircle, 
  FileQuestion, 
  Download, 
  ChevronDown, 
  School, 
  ClipboardList,
  Users,
  BookOpen,
  AlertCircle
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PageLoader from "@/components/shared/PageLoader";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";

const AdmissionPage = () => {
  const [activeTab, setActiveTab] = useState("process");
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data to a server
    console.log("Form submitted");
  };

  if (isLoading) {
    return <PageLoader />;
  }

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const academicYear = `${currentYear}-${nextYear}`;

  return (
    <Layout
      title="Admissions - Durgapur Tarak Nath High School"
      description="Apply for admission to Durgapur Tarak Nath High School. Learn about our admission process, eligibility criteria, required documents, and important dates."
      keywords="admission DTNHS, school admission, application form, admission criteria, eligibility, documents, admission dates"
      canonicalUrl="https://dtnhs.edu.in/admission"
    >
      <div className="min-h-screen bg-muted/20">
        {/* Page Header */}
        <PageHeader
          title="Admissions"
          subtitle={`Join Our Educational Journey for ${academicYear}`}
          description="Everything you need to know about joining Durgapur Tarak Nath High School"
          className="relative bg-gradient-to-b from-school-primary via-school-secondary to-school-primary/80"
        />

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <AnimatedSection animation="fade-in-up">
                {/* Introduction Card with Download Options */}
                <Card className="mb-12 border-2 border-school-primary/20 shadow-md">
                  <CardHeader className="bg-school-primary/5">
                    <CardTitle className="text-2xl md:text-3xl text-school-primary flex items-center">
                      <Users className="mr-3 h-6 w-6" />
                      Admission Information {academicYear}
                    </CardTitle>
                    <CardDescription className="text-base">
                      Everything you need to know about joining Durgapur Tarak Nath High School
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-6">
                      Durgapur Tarak Nath High School is a prestigious government institution in West Bengal committed to 
                      providing quality education. Our admission process is designed to be transparent and merit-based, 
                      following the guidelines set by the West Bengal Board of Secondary Education.
                    </p>

                    {/* Download buttons moved from hero section */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <Button size="lg" className="bg-school-primary text-white hover:bg-school-primary/90 shadow-lg">
                        <ClipboardList className="mr-2 h-5 w-5" />
                        Apply Now
                      </Button>
                      <Button size="lg" variant="outline" className="border-school-primary text-school-primary hover:bg-school-primary/10">
                        <Download className="mr-2 h-5 w-5" />
                        Download Prospectus
                      </Button>
                    </div>

                    <Alert className="mt-2 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                      <AlertTitle className="text-amber-800 dark:text-amber-500">Important Notice</AlertTitle>
                      <AlertDescription className="text-amber-800/90 dark:text-amber-400">
                        Applications for the {academicYear} academic year are now open. The last date for submission is June 15, {currentYear}.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* Tabs for Different Sections */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full bg-muted/50">
                    <TabsTrigger value="process" className="data-[state=active]:bg-school-primary data-[state=active]:text-white">
                      <FileText className="mr-2 h-4 w-4" />
                      Process
                    </TabsTrigger>
                    <TabsTrigger value="eligibility" className="data-[state=active]:bg-school-primary data-[state=active]:text-white">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Eligibility
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="data-[state=active]:bg-school-primary data-[state=active]:text-white">
                      <FileQuestion className="mr-2 h-4 w-4" />
                      Documents
                    </TabsTrigger>
                    <TabsTrigger value="dates" className="data-[state=active]:bg-school-primary data-[state=active]:text-white">
                      <CalendarCheck className="mr-2 h-4 w-4" />
                      Important Dates
                    </TabsTrigger>
                  </TabsList>

                  {/* Process Tab */}
                  <TabsContent value="process" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-school-primary flex items-center">
                          <FileText className="mr-2 h-5 w-5" />
                          Admission Process
                        </CardTitle>
                        <CardDescription>
                          Step-by-step guide to our admission procedure
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-8">
                          {/* Step 1 */}
                          <div className="relative pl-10 pb-8 border-l-2 border-school-primary/30 last:border-0">
                            <div className="absolute -left-3 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-school-primary text-white text-xs font-bold">
                              1
                            </div>
                            <h3 className="text-lg font-medium mb-2">Application Form Submission</h3>
                            <p className="text-muted-foreground">
                              Collect the application form from the school office or download it from the school website. 
                              Fill out all the required details and submit it along with necessary documents either online 
                              or in person at the school office.
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="relative pl-10 pb-8 border-l-2 border-school-primary/30 last:border-0">
                            <div className="absolute -left-3 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-school-primary text-white text-xs font-bold">
                              2
                            </div>
                            <h3 className="text-lg font-medium mb-2">Document Verification</h3>
                            <p className="text-muted-foreground">
                              Submit all required documents for verification. Our administrative staff will verify 
                              the documents and issue an acknowledgment receipt with an application number.
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="relative pl-10 pb-8 border-l-2 border-school-primary/30 last:border-0">
                            <div className="absolute -left-3 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-school-primary text-white text-xs font-bold">
                              3
                            </div>
                            <h3 className="text-lg font-medium mb-2">Merit List Publication</h3>
                            <p className="text-muted-foreground">
                              Based on the criteria set by the West Bengal Board of Secondary Education, a merit list 
                              will be prepared and published on the school notice board and website. Selection is 
                              based on academic records and available seats.
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="relative pl-10 last:border-0">
                            <div className="absolute -left-3 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-school-primary text-white text-xs font-bold">
                              4
                            </div>
                            <h3 className="text-lg font-medium mb-2">Admission Confirmation</h3>
                            <p className="text-muted-foreground">
                              If selected, complete the admission formalities within the stipulated time. Attend the 
                              orientation program with parents/guardians to understand school policies and regulations.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Eligibility Tab */}
                  <TabsContent value="eligibility" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-school-primary flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Eligibility Criteria
                        </CardTitle>
                        <CardDescription>
                          Required qualifications for admission
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h3 className="font-medium text-lg mb-2 flex items-center">
                              <BookOpen className="mr-2 h-5 w-5 text-school-primary" />
                              For Class V (Age: 9-11 years)
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                              <li>Successful completion of Class IV from a recognized school</li>
                              <li>Transfer Certificate from the previous school</li>
                              <li>Residence proof within the school's catchment area (as per government guidelines)</li>
                            </ul>
                          </div>

                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h3 className="font-medium text-lg mb-2 flex items-center">
                              <BookOpen className="mr-2 h-5 w-5 text-school-primary" />
                              For Class VI (Age: 10-12 years)
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                              <li>Successful completion of Class V from a recognized school</li>
                              <li>Transfer Certificate from the previous school</li>
                              <li>Residence proof within the school's catchment area (as per government guidelines)</li>
                            </ul>
                          </div>

                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h3 className="font-medium text-lg mb-2 flex items-center">
                              <BookOpen className="mr-2 h-5 w-5 text-school-primary" />
                              For Class IX (Age: 13-15 years)
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                              <li>Successful completion of Class VIII from a recognized school</li>
                              <li>Minimum 50% marks in all major subjects (Bengali, English, Mathematics, Science, Social Science)</li>
                              <li>Transfer Certificate from the previous school</li>
                              <li>Residence proof within West Bengal</li>
                            </ul>
                          </div>

                          <Alert className="mt-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                            <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                            <AlertTitle className="text-blue-800 dark:text-blue-500">Special Cases</AlertTitle>
                            <AlertDescription className="text-blue-800/90 dark:text-blue-400">
                              Children with disabilities, those from disadvantaged backgrounds, or those who have lost a parent 
                              are eligible for specific reservation quotas as per West Bengal government guidelines.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Documents Tab */}
                  <TabsContent value="documents" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-school-primary flex items-center">
                          <FileQuestion className="mr-2 h-5 w-5" />
                          Required Documents
                        </CardTitle>
                        <CardDescription>
                          Documents needed for admission application
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h3 className="font-medium text-lg mb-3 text-school-primary">Essential Documents</h3>
                            <ul className="space-y-3">
                              {[
                                "Completed application form with recent photograph",
                                "Birth certificate (original and photocopy)",
                                "Transfer Certificate/School Leaving Certificate from previous school",
                                "Mark sheets of the last two academic years",
                                "Residence proof (Aadhaar card/Voter ID/Electricity bill/Ration card)",
                                "Student's Aadhaar card (if available)"
                              ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="mt-0.5 mr-2 h-4 w-4 text-green-600 flex-shrink-0" />
                                  <span className="text-muted-foreground">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h3 className="font-medium text-lg mb-3 text-school-primary">Additional Documents (If Applicable)</h3>
                            <ul className="space-y-3">
                              {[
                                "Caste certificate (for SC/ST/OBC categories)",
                                "Disability certificate (for differently-abled students)",
                                "Income certificate (for EWS category)",
                                "Character certificate from previous school",
                                "Parent's government service proof (if applicable under service quota)",
                                "Guardianship proof (if the child is not living with parents)"
                              ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="mt-0.5 mr-2 h-4 w-4 text-amber-600 flex-shrink-0" />
                                  <span className="text-muted-foreground">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6 p-4 border border-dashed border-school-primary/30 rounded-lg">
                          <h3 className="font-medium text-lg mb-2 text-school-primary flex items-center">
                            <AlertCircle className="mr-2 h-5 w-5" />
                            Important Notes:
                          </h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start">
                              <span className="inline-block h-1.5 w-1.5 mt-1.5 mr-2 bg-school-primary rounded-full flex-shrink-0"></span>
                              All original documents must be presented for verification along with self-attested photocopies
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block h-1.5 w-1.5 mt-1.5 mr-2 bg-school-primary rounded-full flex-shrink-0"></span>
                              Documents in languages other than English or Bengali must be accompanied by authorized translations
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block h-1.5 w-1.5 mt-1.5 mr-2 bg-school-primary rounded-full flex-shrink-0"></span>
                              Incomplete applications with missing documents will not be processed
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Important Dates Tab */}
                  <TabsContent value="dates" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-school-primary flex items-center">
                          <CalendarCheck className="mr-2 h-5 w-5" />
                          Important Dates
                        </CardTitle>
                        <CardDescription>
                          Key dates for the {academicYear} admission cycle
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-school-primary/10 text-left">
                                  <th className="p-3 border border-school-primary/20 font-medium">Event</th>
                                  <th className="p-3 border border-school-primary/20 font-medium">Start Date</th>
                                  <th className="p-3 border border-school-primary/20 font-medium">End Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="even:bg-muted/30">
                                  <td className="p-3 border border-school-primary/20">Application Form Distribution</td>
                                  <td className="p-3 border border-school-primary/20">May 1, {currentYear}</td>
                                  <td className="p-3 border border-school-primary/20">June 10, {currentYear}</td>
                                </tr>
                                <tr className="even:bg-muted/30">
                                  <td className="p-3 border border-school-primary/20">Form Submission Deadline</td>
                                  <td className="p-3 border border-school-primary/20">May 1, {currentYear}</td>
                                  <td className="p-3 border border-school-primary/20">June 15, {currentYear}</td>
                                </tr>
                                <tr className="even:bg-muted/30">
                                  <td className="p-3 border border-school-primary/20">Document Verification</td>
                                  <td className="p-3 border border-school-primary/20">May 5, {currentYear}</td>
                                  <td className="p-3 border border-school-primary/20">June 20, {currentYear}</td>
                                </tr>
                                <tr className="even:bg-muted/30">
                                  <td className="p-3 border border-school-primary/20">Publication of First Merit List</td>
                                  <td className="p-3 border border-school-primary/20">June 25, {currentYear}</td>
                                  <td className="p-3 border border-school-primary/20">June 25, {currentYear}</td>
                                </tr>
                                <tr className="even:bg-muted/30">
                                  <td className="p-3 border border-school-primary/20">First Merit List Admission</td>
                                  <td className="p-3 border border-school-primary/20">June 27, {currentYear}</td>
                                  <td className="p-3 border border-school-primary/20">July 5, {currentYear}</td>
                                </tr>
                                <tr className="even:bg-muted/30">
                                  <td className="p-3 border border-school-primary/20">Publication of Second Merit List (if required)</td>
                                  <td className="p-3 border border-school-primary/20">July 7, {currentYear}</td>
                                  <td className="p-3 border border-school-primary/20">July 7, {currentYear}</td>
                                </tr>
                                <tr className="even:bg-muted/30">
                                  <td className="p-3 border border-school-primary/20">Second Merit List Admission</td>
                                  <td className="p-3 border border-school-primary/20">July 9, {currentYear}</td>
                                  <td className="p-3 border border-school-primary/20">July 15, {currentYear}</td>
                                </tr>
                                <tr className="even:bg-muted/30">
                                  <td className="p-3 border border-school-primary/20">Orientation for New Students</td>
                                  <td className="p-3 border border-school-primary/20">July 20, {currentYear}</td>
                                  <td className="p-3 border border-school-primary/20">July 20, {currentYear}</td>
                                </tr>
                                <tr className="even:bg-muted/30">
                                  <td className="p-3 border border-school-primary/20">Commencement of Classes</td>
                                  <td className="p-3 border border-school-primary/20">July 25, {currentYear}</td>
                                  <td className="p-3 border border-school-primary/20">-</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-500" />
                            <AlertTitle className="text-red-800 dark:text-red-500">Important</AlertTitle>
                            <AlertDescription className="text-red-800/90 dark:text-red-400">
                              All dates are subject to change as per government directives. Please check the school 
                              notice board or website regularly for any updates.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* FAQs Section */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-school-primary flex items-center">
                    <HelpCircle className="mr-3 h-6 w-6" />
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-school-primary/20">
                      <AccordionTrigger className="text-lg font-medium hover:text-school-primary">
                        Is there any entrance test for admission?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        For classes V and VI, there is no entrance test. Admission is granted based on the previous 
                        academic records and availability of seats. For class IX, a basic assessment test in core 
                        subjects may be conducted if the number of applicants exceeds available seats.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b border-school-primary/20">
                      <AccordionTrigger className="text-lg font-medium hover:text-school-primary">
                        Is there a reservation policy for admissions?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, our school follows the West Bengal government's reservation policy. This includes 
                        reservations for SC, ST, OBC categories, economically weaker sections (EWS), and 
                        differently-abled students. The percentage of reservation is as per the current 
                        government regulations.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b border-school-primary/20">
                      <AccordionTrigger className="text-lg font-medium hover:text-school-primary">
                        Can I transfer my child mid-session?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Mid-session transfers are considered only in special circumstances such as parent's 
                        job transfer or relocation. This is subject to seat availability and the student's 
                        academic record. Additional documentation may be required for mid-session transfers.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-b border-school-primary/20">
                      <AccordionTrigger className="text-lg font-medium hover:text-school-primary">
                        What is the medium of instruction?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        The primary medium of instruction is Bengali, following the West Bengal Board of Secondary 
                        Education curriculum. English is taught as a second language and is given equal importance 
                        in the curriculum.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-b border-school-primary/20">
                      <AccordionTrigger className="text-lg font-medium hover:text-school-primary">
                        What are the school timings?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        The school operates from Monday to Saturday. The timings are from 10:00 AM to 4:00 PM, 
                        with a short break and lunch break in between. On Saturdays, the school closes at 1:00 PM.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Contact Section */}
                <div className="bg-muted/30 rounded-lg p-6 md:p-8 border border-school-primary/20 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6 text-school-primary">Need More Information?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Contact Us</h3>
                      <address className="not-italic text-muted-foreground space-y-2">
                        <p><strong>Admission Office:</strong> Durgapur Tarak Nath High School</p>
                        <p>B-Zone, Durgapur, West Bengal - 713205</p>
                        <p>Phone: 0343-2556789</p>
                        <p>Email: admissions@dtnhs.edu.in</p>
                        <p><strong>Office Hours:</strong> Monday to Friday, 10:00 AM to 3:00 PM</p>
                      </address>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-3">Visit Us</h3>
                      <p className="text-muted-foreground mb-4">
                        You're welcome to visit our campus during office hours. Our admission counselors will 
                        be happy to assist you with any queries and provide a tour of the facilities.
                      </p>
                      <Button asChild variant="default" className="bg-school-primary hover:bg-school-primary/90">
                        <Link to="/contact">
                          Get Directions
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AdmissionPage;
