import { Target } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark flex min-h-svh flex-col items-center justify-center bg-[#0a0e1a] px-4 py-12">
      {/* Subtle radial gradient overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,100,220,0.12)_0%,_transparent_60%)]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white transition-opacity hover:opacity-80"
        >
          <Target className="size-7 text-blue-400" />
          <span className="text-xl font-semibold tracking-tight">GovDart</span>
        </Link>

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}
