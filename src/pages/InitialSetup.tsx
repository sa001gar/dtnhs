
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import CreateFirstAdmin from "@/components/admin/CreateFirstAdmin";
import PageLoader from "@/components/shared/PageLoader";
import Layout from "@/components/layout/Layout";

const InitialSetup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAdmins, setHasAdmins] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const { count, error } = await supabase
        .from("admin_users")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      
      // If there are admin users already, redirect to admin login
      if (count && count > 0) {
        setHasAdmins(true);
        // Redirect to admin login after a short delay
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        setHasAdmins(false);
      }
    } catch (error) {
      console.error("Error checking for admin users:", error);
      // If there's an error, still show the setup page
      setHasAdmins(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (hasAdmins) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Setup Already Completed</h1>
          <p className="mb-4">An admin user already exists. Redirecting to admin login...</p>
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return <CreateFirstAdmin />;
};

export default InitialSetup;
