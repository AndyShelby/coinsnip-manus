"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Coins,
  CheckCircle,
  Trophy,
  Megaphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navigation = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      title: "Coins Management",
      icon: Coins,
      items: [
        {
          title: "All Coins",
          href: "/admin/coins",
          active: pathname === "/admin/coins",
        },
        {
          title: "Pending Approval",
          href: "/admin/coins/pending",
          active: pathname === "/admin/coins/pending",
        },
        {
          title: "Featured",
          href: "/admin/coins/featured",
          active: pathname === "/admin/coins/featured",
        },
      ],
    },
    {
      title: "Promotions",
      icon: Megaphone,
      items: [
        {
          title: "Promoted Coins",
          href: "/admin/promoted",
          active: pathname === "/admin/promoted",
        },
        {
          title: "Banner Ads",
          href: "/admin/ads",
          active: pathname === "/admin/ads",
        },
      ],
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
      active: pathname === "/admin/users",
    },
    {
      title: "Airdrops",
      href: "/admin/airdrops",
      icon: Trophy,
      active: pathname === "/admin/airdrops",
    },
    {
      title: "KYC Verification",
      href: "/admin/kyc",
      icon: CheckCircle,
      active: pathname === "/admin/kyc",
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      active: pathname === "/admin/analytics",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside
        className={`fixed inset-y-0 z-10 flex flex-col border-r bg-white dark:bg-gray-950 dark:border-gray-800 transition-all ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="border-b p-4 flex items-center justify-between">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Coins className="h-6 w-6" />
              <span>CoinSniper</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/" className="w-full flex justify-center">
              <Coins className="h-6 w-6" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
            >
              <path d="m15 6-6 6 6 6" />
            </svg>
          </Button>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {navigation.map((item, index) => (
              <div key={index}>
                {!item.items ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      item.active
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                        : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                ) : (
                  <div className="space-y-1">
                    <div
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                        collapsed ? "" : "font-medium"
                      } text-gray-500 dark:text-gray-400`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed &&
                      item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors pl-10 ${
                            subItem.active
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t p-4">
          <Link
            href="/logout"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors`}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>
      <div
        className={`flex-1 transition-all ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white dark:bg-gray-950 dark:border-gray-800 px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              View Site
            </Link>
            <div className="relative">
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  3
                </span>
              </Button>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800"></div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
