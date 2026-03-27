import type { SiteSettings } from '@/interface/sanity.types';

interface FooterProps {
  settings?: SiteSettings | null;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-foreground text-background py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-black text-xl">
            {settings?.siteName ?? 'Vantage'}
          </span>
          <span className="w-4 h-4 bg-orange rounded-sm rotate-12 inline-block" />
        </div>

        <p className="text-sm text-background/60">
          {settings?.footerText ??
            `© ${new Date().getFullYear()} All rights reserved.`}
        </p>

        {settings?.socialLinks && settings.socialLinks.length > 0 && (
          <div className="flex items-center gap-4">
            {settings.socialLinks.map((s, index) => (
              <a
                key={index}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-background/60 hover:text-background transition-colors"
              >
                {s.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
