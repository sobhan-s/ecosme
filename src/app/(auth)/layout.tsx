export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-8 py-12 bg-background">
        {children}
      </div>

      <div className="hidden lg:flex bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F15A2B]/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
