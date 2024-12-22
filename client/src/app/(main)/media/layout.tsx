import { MemoryArchiveSidebar } from "@/components/media_components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-screen">
          <MemoryArchiveSidebar />
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}
