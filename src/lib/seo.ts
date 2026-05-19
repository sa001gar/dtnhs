import { createSiteUrl } from "@/lib/site";

export type SeoMetadata = {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots?: string;
};

const stripTrailingSlash = (pathname: string) => pathname.replace(/\/+$/, "") || "/";

const seoByPath: Record<string, Omit<SeoMetadata, "canonicalUrl">> = {
  "/": {
    title: "Durgapur Tarak Nath High School - Excellence in Education",
    description:
      "Durgapur Tarak Nath High School provides quality education since 1941. Join our school for academic excellence, extracurricular activities, and holistic development.",
    keywords:
      "Durgapur Tarak Nath High School, DTNHS, education, school, Durgapur, West Bengal, best school, admission",
  },
  "/about": {
    title: "About Us - Durgapur Tarak Nath High School",
    description:
      "Learn about the history, mission, and vision of Durgapur Tarak Nath High School, one of the leading educational institutions since 1941.",
    keywords: "about DTNHS, school history, school mission, school vision, Durgapur school",
  },
  "/academics": {
    title: "Academics - Durgapur Tarak Nath High School",
    description:
      "Explore academic programs, subject streams, curriculum details, and learning opportunities at Durgapur Tarak Nath High School.",
    keywords: "DTNHS academics, school curriculum, subject streams, school programs, education",
  },
  "/students": {
    title: "Students - Durgapur Tarak Nath High School",
    description:
      "Access student resources, support services, activities, and important information for students at Durgapur Tarak Nath High School.",
    keywords: "DTNHS students, student portal, student resources, school life, student services",
  },
  "/teachers": {
    title: "Our Teachers - Durgapur Tarak Nath High School",
    description:
      "Meet our dedicated faculty members and learn about their qualifications, experience, and subject expertise.",
    keywords: "DTNHS teachers, school faculty, teaching staff, educators, subject teachers",
  },
  "/gallery": {
    title: "Gallery - Durgapur Tarak Nath High School",
    description:
      "View photos and highlights from school events, classrooms, sports, and campus life at Durgapur Tarak Nath High School.",
    keywords: "DTNHS gallery, school photos, campus photos, school events, school life",
  },
  "/notices": {
    title: "Notices & Announcements - Durgapur Tarak Nath High School",
    description:
      "Stay updated with the latest announcements, events, and important information from our school.",
    keywords: "school notices, announcements, school updates, DTNHS notices, events",
  },
  "/routine": {
    title: "Class Routines - Durgapur Tarak Nath High School",
    description:
      "View class routines and timetables for all grades at Durgapur Tarak Nath High School.",
    keywords: "class routine, school timetable, class schedule, DTNHS routine",
  },
  "/results": {
    title: "Examination Results - Durgapur Tarak Nath High School",
    description:
      "View examination results and academic performance data for students of Durgapur Tarak Nath High School.",
    keywords: "DTNHS results, examination results, academic performance, school results",
  },
  "/contact": {
    title: "Contact Us - Durgapur Tarak Nath High School",
    description:
      "Connect with Durgapur Tarak Nath High School for admissions, inquiries, directions, and school contact details.",
    keywords: "DTNHS contact, school contact, school address, admissions contact, school phone",
  },
  "/alumni": {
    title: "Alumni - Durgapur Tarak Nath High School",
    description:
      "Reconnect with the DTNHS alumni community and explore alumni stories, events, and opportunities.",
    keywords: "DTNHS alumni, alumni community, alumni stories, alumni events",
  },
  "/alumni/register": {
    title: "Alumni Registration - Durgapur Tarak Nath High School",
    description:
      "Register as an alumnus of Durgapur Tarak Nath High School to stay connected with the community.",
    keywords: "alumni registration, DTNHS alumni sign up, alumni form",
  },
  "/blog": {
    title: "School Blog - Durgapur Tarak Nath High School",
    description:
      "Read the latest school news, events, achievements, and educational insights from DTNHS.",
    keywords: "school blog, DTNHS news, school events, student achievements, school updates",
  },
  "/forum": {
    title: "Community Forum - Durgapur Tarak Nath High School",
    description:
      "Join discussions with students, parents, and teachers on school-related topics.",
    keywords: "school forum, community discussion, DTNHS forum, academic forum",
  },
  "/syllabus": {
    title: "Syllabus - Durgapur Tarak Nath High School",
    description:
      "Access the syllabus and subject outlines for all classes at Durgapur Tarak Nath High School.",
    keywords: "school syllabus, DTNHS syllabus, subject outline, curriculum",
  },
  "/exam-schedule": {
    title: "Examination Schedule - Durgapur Tarak Nath High School",
    description:
      "View the complete examination schedule for all classes at Durgapur Tarak Nath High School.",
    keywords: "exam schedule, school exams, DTNHS examination, board exams",
  },
  "/previous-year-papers": {
    title: "Previous Year Papers - Durgapur Tarak Nath High School",
    description:
      "Download previous year question papers and practice materials for school exam preparation.",
    keywords: "previous year papers, exam papers, practice papers, DTNHS downloads",
  },
  "/admissions": {
    title: "Admissions - Durgapur Tarak Nath High School",
    description:
      "Learn about the admission process, eligibility criteria, required documents, and important dates.",
    keywords: "school admission, DTNHS admissions, application form, eligibility, documents",
  },
  "/admin": {
    title: "Admin Portal - Durgapur Tarak Nath High School",
    description: "Administrative access for managing the Durgapur Tarak Nath High School website.",
    keywords: "admin portal, school admin, content management",
    robots: "noindex, nofollow",
  },
};

export const getSeoMetadata = (pathname: string): SeoMetadata => {
  const normalizedPath = stripTrailingSlash(pathname);
  const meta = seoByPath[normalizedPath] || seoByPath["/"];

  return {
    ...meta,
    canonicalUrl: createSiteUrl(normalizedPath),
  };
};