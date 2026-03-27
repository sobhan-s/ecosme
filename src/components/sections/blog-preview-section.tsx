import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { BlogPostPreview } from '@/interface/sanity.types';

interface BlogPreviewProps {
  data: BlogPostPreview[];
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function BlogPreviewSection({ data }: BlogPreviewProps) {
  const posts = data ?? [];
  if (!posts.length) return null;

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <span className="inline-flex items-center border border-[#F15A2B] text-[#F15A2B] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest mb-5">
            Blog
          </span>
          <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] uppercase tracking-tight leading-[0.9]">
            Latest Insights
          </h2>
          <p className="text-muted-foreground text-sm mt-3">
            Writing about design, development, and the things we build.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Posts:
          </span>
          <span className="text-xs font-semibold text-foreground">
            {posts.length}
          </span>
        </div>

        <div className="flex flex-col">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group">
              <div className="py-7 border-b border-border">
                <h3 className="font-semibold text-xl leading-snug mb-2 group-hover:text-[#F15A2B] transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground/60 uppercase tracking-widest font-medium">
                  {post.publishedAt && (
                    <span>{formatDate(post.publishedAt)}</span>
                  )}
                  {post.categories?.map((c) => (
                    <span key={c}>· {c}</span>
                  ))}
                  {post.readingTime && <span>· {post.readingTime} min</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/blog">
            <button className="flex items-center gap-2 text-sm font-semibold text-[#F15A2B] hover:gap-3 transition-all">
              View all posts <ArrowUpRight size={15} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
