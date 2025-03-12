
import React from "react";
import Layout from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <Layout>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-school-primary/20 animate-ping" />
              <Loader2 className="h-12 w-12 animate-spin text-school-primary relative" />
            </div>
            <p className="text-muted-foreground animate-pulse text-lg">Loading...</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PageLoader;
