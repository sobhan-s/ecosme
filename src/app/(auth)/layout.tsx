import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="font-display font-black text-xl tracking-tight">
            Vantage
          </span>
          <span className="w-4 h-4 bg-orange rounded-sm rotate-12 inline-block" />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
