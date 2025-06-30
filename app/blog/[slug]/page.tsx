import { getPostData, getAllPostIds } from '@/lib/posts';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const postData = await getPostData(params.slug);
    return {
        title: `${postData.title} | UtilsHub Blog`,
        description: postData.excerpt,
    };
}

export default async function Post({ params }: { params: { slug: string } }) {
    const postData = await getPostData(params.slug);
    
    return (
        <StaticPageLayout title={postData.title}>
            <p className="text-sm text-muted-foreground -mt-6 mb-8">
                Published on {new Date(postData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </StaticPageLayout>
    );
}

export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths;
}