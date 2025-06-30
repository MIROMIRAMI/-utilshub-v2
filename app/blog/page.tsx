import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | UtilsHub",
  description: "News, updates, and guides from the UtilsHub team.",
};

export default function BlogIndex() {
    const allPostsData = getSortedPostsData();

    return (
        <div className="container max-w-4xl py-10">
            <h1 className="text-4xl font-extrabold tracking-tighter mb-8">The Blog</h1>
            <section className="space-y-6">
                {allPostsData.map(({ id, date, title, excerpt }) => (
                    <Link href={`/blog/${id}`} key={id}>
                        <Card className="hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <p className="text-sm text-muted-foreground">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <CardTitle className="text-2xl">{title}</CardTitle>
                                <CardDescription>{excerpt}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </section>
        </div>
    );
}