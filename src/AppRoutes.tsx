import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Academics from "./pages/Academics";
import Gallery from "./pages/Gallery";
import Notices from "./pages/Notices";
import Routine from "./pages/Routine";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import Alumni from "./pages/Alumni";
import AlumniRegistration from "./pages/AlumniRegistration";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Forum from "./pages/Forum";
import ForumDiscussion from "./pages/ForumDiscussion";
import Syllabus from "./pages/Syllabus";
import ExamSchedule from "./pages/ExamSchedule";
import PreviousYearPapers from "./pages/PreviousYearPapers";
import AdmissionPage from "./pages/AdmissionPage";
import Admin from "./pages/Admin";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
    <Route path="/students" element={<Students />} />
    <Route path="/teachers" element={<Teachers />} />
    <Route path="/academics" element={<Academics />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/notices" element={<Notices />} />
    <Route path="/routine" element={<Routine />} />
    <Route path="/results" element={<Results />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/alumni" element={<Alumni />} />
    <Route path="/alumni/register" element={<AlumniRegistration />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:id" element={<BlogPost />} />
    <Route path="/forum" element={<Forum />} />
    <Route path="/forum/:id" element={<ForumDiscussion />} />
    <Route path="/syllabus" element={<Syllabus />} />
    <Route path="/exam-schedule" element={<ExamSchedule />} />
    <Route path="/previous-year-papers" element={<PreviousYearPapers />} />
    <Route path="/admissions" element={<AdmissionPage />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);