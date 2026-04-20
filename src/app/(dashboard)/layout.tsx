import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/topnav";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px] flex flex-1 flex-col transition-all duration-300">
        <TopNav />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}
