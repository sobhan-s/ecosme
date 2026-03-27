import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/sanity/query';
import type { BlogPostPreview } from '@/interface/sanity.types';

export const revalidate = 60;

export const metadata = {
  title: 'Blog Vantage',
  description: 'Writing about design, development, and the things we build.',
};

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogPage() {
  const posts: BlogPostPreview[] = await getAllBlogPosts().catch(() => []);

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <h1 className="font-display font-black text-[clamp(3rem,7vw,6rem)] uppercase tracking-tight leading-[0.88]">
              All Posts
            </h1>
            <p className="text-muted-foreground text-sm mt-3 max-w-sm">
              Writing about design, development, and the things we build.
            </p>
          </div>

          {/* Auth notice */}
          <div className="flex items-center gap-2 bg-[#F15A2B]/5 border border-[#F15A2B]/20 rounded-full px-4 py-2 self-start md:self-end">
            <Lock size={13} className="text-[#F15A2B]" />
            <span className="text-xs font-medium text-[#F15A2B]">
              Sign in to read full articles
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 pb-4 mb-2 border-b border-border">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Posts:
          </span>
          <span className="text-xs font-semibold">{posts.length}</span>
        </div>

        {posts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display font-black text-4xl uppercase text-foreground/10">
              No posts yet
            </p>
            <p className="text-muted-foreground text-sm mt-3">
              Check back soon — we&apos;re writing.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {posts.map((post, i) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-2 py-8 border-b border-border items-start hover:bg-transparent transition-colors">
                  <span className="hidden md:block font-display font-black text-5xl text-foreground/[0.07] leading-none mt-1 w-12 text-right select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {post.categories?.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] font-bold uppercase tracking-widest text-[#F15A2B] border border-[#F15A2B]/30 rounded-full px-2.5 py-0.5"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <h2 className="font-semibold text-xl md:text-2xl leading-snug mb-2 group-hover:text-[#F15A2B] transition-colors duration-200">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 max-w-2xl mb-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground/50 uppercase tracking-widest font-medium">
                      {post.publishedAt && (
                        <span>{formatDate(post.publishedAt)}</span>
                      )}
                      {post.author?.name && (
                        <>
                          <span className="text-border">·</span>
                          <span>{post.author.name}</span>
                        </>
                      )}
                      {post.readingTime && (
                        <>
                          <span className="text-border">·</span>
                          <span>{post.readingTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:flex items-center self-center">
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-[#F15A2B] group-hover:border-[#F15A2B] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              ← Back to home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
