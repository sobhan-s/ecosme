import { getSiteSettings } from '@/lib/sanity/query';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <>
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
