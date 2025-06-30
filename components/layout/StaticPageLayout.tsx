import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export function StaticPageLayout({ title, children }: Props) {
    return (
        <div className="container max-w-4xl py-10">
            <h1 className="text-4xl font-extrabold tracking-tighter mb-8">{title}</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                {children}
            </div>
        </div>
    );
}