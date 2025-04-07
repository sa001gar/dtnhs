
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AlumniRegistration from "@/components/alumni/AlumniRegistration";
import AnimatedSection from "@/components/ui/AnimatedSection";

const AlumniRegistrationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Alumni Registration"
        description="Join our alumni network and stay connected with your school community"
        pattern="grid"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>
        
        <AnimatedSection animation="fade-in-up">
          <div className="max-w-3xl mx-auto">
            <AlumniRegistration />
          </div>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default AlumniRegistrationPage;
