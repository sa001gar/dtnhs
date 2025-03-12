
import React from "react";
import { Loader2 } from "lucide-react";

interface PageLoaderProps {
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-school-primary" />
        <div className="absolute inset-0 blur-lg bg-school-primary/20 rounded-full" />
      </div>
      <p className="mt-4 text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
};

export default PageLoader;
