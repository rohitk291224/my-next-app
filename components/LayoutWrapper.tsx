"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { SidebarProvider } from "./SidebarContext";
import ProtectedRoute from "./ProtectedRoute";
const HEADER_HEIGHT = 64;
// Routes that should NOT show the dashboard layout (sidebar and header)
const PUBLIC_ROUTES = ["/login", "/", "/signup", "/forgot-password"];
interface LayoutWrapperProps {
  children: ReactNode;
}
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  // Check if current route should show dashboard layout
  const shouldShowDashboardLayout = !PUBLIC_ROUTES.includes(pathname);
  if (shouldShowDashboardLayout) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <LayoutWithSidebar>{children}</LayoutWithSidebar>
        </SidebarProvider>
      </ProtectedRoute>
    );
  }
  // For public routes, just render children without dashboard layout
  return <>{children}</>;
}
function LayoutWithSidebar({ children }: { children: ReactNode }) {
  const { isOpen } = require("./SidebarContext").useSidebar();
  const sidebarWidth = isOpen ? 224 : 64;
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <Sidebar />
      <main
        className="transition-all duration-300 ease-in-out bg-[#f7f3f3]"
        style={{
          marginLeft: sidebarWidth,
          marginTop: HEADER_HEIGHT,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        {children}
      </main>
    </div>
  );
}
