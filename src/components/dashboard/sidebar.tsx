"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Coffee,
  Home,
  Package,
  Receipt,
  Settings,
  Users,
} from "lucide-react";

interface SidebarProps {
  warungSlug: string;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Kasir",
    href: "/kasir",
    icon: Receipt,
  },
  {
    name: "Menu",
    href: "/menu",
    icon: Coffee,
  },
  {
    name: "Transaksi",
    href: "/transaksi",
    icon: Package,
  },
  {
    name: "Laporan",
    href: "/laporan",
    icon: BarChart3,
  },
  {
    name: "Pelanggan",
    href: "/pelanggan",
    icon: Users,
  },
  {
    name: "Pengaturan",
    href: "/pengaturan",
    icon: Settings,
  },
];

export function Sidebar({ warungSlug }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Coffee className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">WarungApp</span>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const href = `/${warungSlug}${item.href}`;
            const isActive = pathname === href;
            
            return (
              <li key={item.name}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}