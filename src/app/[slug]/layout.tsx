"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export default function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  return (
    <ProtectedRoute requireWarung={true}>
      <div className="flex min-h-screen">
        <Sidebar warungSlug={params.slug} />
        <div className="flex-1 flex flex-col">
          <Header warungSlug={params.slug} />
          <main className="flex-1 p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}