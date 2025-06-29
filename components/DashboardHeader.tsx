"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Bell, Menu, X, LogOut, User, Settings } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const HEADER_HEIGHT = 64;

export default function DashboardHeader() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { logout, user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full z-30 flex items-center justify-between gap-2 px-4 py-3 bg-[#f8eaea] border-b border-gray-200"
      style={{ height: HEADER_HEIGHT }}
    >
      {/* Sidebar Toggle, Logo and Brand */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2 rounded-full w-5 h-5 flex items-center justify-center hover:bg-[#f3d6d6]"
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <Menu size={20}/>
        </Button>
        <Image src="/globe.svg" alt="Logo" width={24} height={24} />
        <div className="flex flex-col">
          Logo
        </div>
      </div>
      {/* Search Bar */}
      <div className="flex-1 flex items-center justify-center max-w-md mx-8">
        <div className="relative w-full">
          <Input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white" />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </span>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex items-center gap-6 justify-end">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={22} className="text-[#a03c50]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <div className="flex flex-col items-end mr-2">
          <span className="text-xs text-gray-500">Amaan on Leave</span>
          <span className="text-xs text-gray-400">21 Oct Mon - Fri</span>
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-sm text-black">John Doe</span>
              <span className="text-xs text-gray-500">{user?.email || 'Admin'}</span>
            </div>
          </div>
          
          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-900">John Doe</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <div className="py-1">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} className="mr-3" />
                  Profile
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="mr-3" />
                  Settings
                </button>
                <button 
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={logout}
                >
                  <LogOut size={16} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
} 