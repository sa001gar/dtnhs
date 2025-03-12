
import React from "react";
import Layout from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";

const PageLoader: React.FC = () => {
  return (
    <Layout>
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-school-primary" />
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    </Layout>
  );
};

export default PageLoader;
