import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { getBlogPost, getAllBlogSlugs } from '@/lib/sanity/query';
import { PostBody } from '@/components/blog/postBody';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs().catch(() => []);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/login?redirect=/blog/${slug}`);

  const post = await getBlogPost(slug).catch(() => null);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-4">
        <Link href="/#blog">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 -ml-3 mb-8"
          >
            <ArrowLeft size={16} /> Back to blog
          </Button>
        </Link>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-4">
          {post.categories?.map((c: string) => (
            <Badge
              key={c}
              variant="outline"
              className="rounded-full border-orange text-orange text-xs font-semibold px-3 uppercase"
            >
              {c}
            </Badge>
          ))}
        </div>

        <h1 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] uppercase tracking-tight leading-[0.95] mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 flex-wrap">
          {post.author?.name && (
            <div className="flex items-center gap-2">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-orange/20 flex items-center justify-center">
                  <span className="text-orange text-xs font-bold">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="font-medium text-foreground">
                {post.author.name}
              </span>
            </div>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {formatDate(post.publishedAt)}
            </span>
          )}
          {post.readingTime && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readingTime} min read
            </span>
          )}
        </div>
      </div>

      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={900}
            height={500}
            className="rounded-2xl w-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 pb-24">
        {post.body?.length ? (
          <PostBody body={post.body} />
        ) : (
          <p className="text-muted-foreground text-lg">{post.excerpt}</p>
        )}
      </div>
    </div>
  );
}
