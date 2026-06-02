"use client";

import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function Navigation() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Trang chủ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      id: "discover",
      label: "Khám phá",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253"
          />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Hồ sơ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Sidebar for PC */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-zinc-800 bg-black p-6 hidden md:flex flex-col z-50">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            VScroll Feed
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-zinc-900 group ${
                  isActive
                    ? "text-red-500 bg-zinc-900/50"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <div
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? "text-red-500" : "text-zinc-400 group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="text-zinc-500 text-xs px-4 mt-auto">
          <p>© 2026 VScroll Feed</p>
          <p className="mt-1">Built with Next.js & Tailwind</p>
        </div>
      </aside>

      {/* Bottom Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-zinc-800 bg-black/90 backdrop-blur-md flex justify-around items-center md:hidden z-50 px-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200 ${
                isActive ? "text-red-500" : "text-zinc-400"
              }`}
            >
              <div
                className={`transition-transform duration-150 ${
                  isActive ? "scale-110 text-red-500" : "text-zinc-400"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
