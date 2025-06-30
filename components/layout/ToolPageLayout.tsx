import React from 'react';
import { AdPlaceholder } from '../ads/AdPlaceholder'; // Import the ad component


interface ToolPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function ToolPageLayout({ children, title, description }: ToolPageLayoutProps) {
  return (
    <div className="container py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        {children}
      </div>
      {/* --- ADD THE AD HERE --- */}
      <div className="flex justify-center mt-12">
        <AdPlaceholder type="banner" />
      </div>
    </div>

    
  );
}