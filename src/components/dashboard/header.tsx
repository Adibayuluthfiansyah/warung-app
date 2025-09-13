"use client";

import { UserMenu } from "@/components/auth/user-menu";
import { useAuth } from "@/components/auth/auth-context";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  warungSlug: string;
}

export function Header({ warungSlug }: HeaderProps) {
  const { user } = useAuth();
  const currentWarung = user?.warung?.find(w => w.slug === warungSlug);

  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">
            {currentWarung?.nama || "Warung"}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari menu, transaksi..."
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
}