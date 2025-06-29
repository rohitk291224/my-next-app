"use client";

import { Home, FileText, BarChart2, File, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const HEADER_HEIGHT = 64;

const navItems = [
  { icon: <Home size={22} />, label: "Home", href: "/dashboard" },
  { icon: <FileText size={22} />, label: "Article", href: "/article" },
  { icon: <BarChart2 size={22} />, label: "Finance" },
  { icon: <File size={22} />, label: "Report" },
  { icon: <Users size={22} />, label: "User" },
  { icon: <Settings size={22} />, label: "Other" },
  { icon: <LogOut size={22} />, label: "Logout", action: "logout" },
];

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [sidebarWidth, setSidebarWidth] = useState(224);
  const { logout } = useAuth();

  // Update CSS custom property for main content margin and sidebar width
  useEffect(() => {
    const updateWidth = () => {
      const isMobile = window.innerWidth < 768;
      const width = isOpen ? (isMobile ? 280 : 224) : 64;
      setSidebarWidth(width);
      document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [isOpen]);

  const handleItemClick = (item: any) => {
    if (item.action === "logout") {
      logout();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      {/* Desktop Sidebar: always visible, collapses to icons-only */}
      <aside
        className={`hidden md:flex flex-col bg-[#f8eaea] border-r border-gray-200 transition-all duration-300 ease-in-out fixed z-50`}
        style={{
          top: HEADER_HEIGHT,
          left: 0,
          height: `calc(100vh - ${HEADER_HEIGHT}px)` ,
          width: isOpen ? 224 : 64,
          paddingLeft: isOpen ? 16 : 0,
          paddingRight: isOpen ? 16 : 0,
          paddingTop: 24,
          paddingBottom: 24,
        }}
      >
        <nav
          className={`flex flex-col gap-2 text-[#a03c50] mt-4 ${isOpen ? '' : 'items-center'}`}
        >
          {navItems.map((item, idx) => {
            const isActive = item.href ? pathname === item.href : idx === 0 && pathname === "/dashboard";
            const buttonContent = <>
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </>;
            const buttonClass = `flex items-center ${isOpen ? 'gap-3 px-3 py-2 justify-start text-base' : 'justify-center p-0 w-12 h-12 rounded-full'} font-medium transition-colors ${
              isActive ? "bg-[#a03c50] text-white" : "hover:bg-[#f3d6d6] text-[#a03c50]"
            } ${!isOpen && idx === 0 ? '' : ''}`;
            if (item.href) {
              return (
                <Link href={item.href} key={item.label} passHref legacyBehavior>
                  <a className={buttonClass} title={!isOpen ? item.label : undefined}>
                    {buttonContent}
                  </a>
                </Link>
              );
            } else {
              return (
                <Button
                  key={item.label}
                  variant={isActive ? "default" : "ghost"}
                  className={buttonClass}
                  title={!isOpen ? item.label : undefined}
                  onClick={() => handleItemClick(item)}
                >
                  {buttonContent}
                </Button>
              );
            }
          })}
        </nav>
      </aside>
      {/* Mobile Sidebar: slides in/out */}
      <aside
        className={`md:hidden flex flex-col bg-[#f8eaea] border-r border-gray-200 transition-all duration-300 ease-in-out fixed z-50`}
        style={{
          top: HEADER_HEIGHT,
          left: isOpen ? 0 : '-100%',
          height: `calc(100vh - ${HEADER_HEIGHT}px)` ,
          width: 280,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 24,
          paddingBottom: 24,
        }}
      >
        <nav
          className={`flex flex-col gap-2 text-[#a03c50] mt-4`}
        >
          {navItems.map((item, idx) => {
            const isActive = item.href ? pathname === item.href : idx === 0 && pathname === "/dashboard";
            const buttonContent = <>
              {item.icon}
              <span>{item.label}</span>
            </>;
            const buttonClass = `flex items-center gap-3 px-3 py-2 justify-start text-base font-medium transition-colors ${
              isActive ? "bg-[#a03c50] text-white" : "hover:bg-[#f3d6d6] text-[#a03c50]"
            } ${idx === 0 ? 'mt-2' : ''}`;
            if (item.href) {
              return (
                <Link href={item.href} key={item.label} passHref legacyBehavior>
                  <a className={buttonClass} title={item.label}>
                    {buttonContent}
                  </a>
                </Link>
              );
            } else {
              return (
                <Button
                  key={item.label}
                  variant={isActive ? "default" : "ghost"}
                  className={buttonClass}
                  title={item.label}
                  onClick={() => handleItemClick(item)}
                >
                  {buttonContent}
                </Button>
              );
            }
          })}
        </nav>
      </aside>
    </>
  );
} 