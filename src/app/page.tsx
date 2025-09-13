"use client";

import { useAuth } from "@/components/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('HomePage - User:', user);
    console.log('HomePage - Loading:', loading);
    console.log('HomePage - User warung:', user?.warung);

    if (!loading) {
      if (!user) {
        console.log('No user, redirecting to login');
        router.push('/login');
      } else if (user.warung && user.warung.length > 0) {
        console.log('User has warung, redirecting to dashboard');
        const slug = user.warung[0].slug;
        console.log('Redirecting to:', `/${slug}/dashboard`);
        router.push(`/${slug}/dashboard`);
      } else {
        console.log('No warung access, redirecting to setup');
        router.push('/setup-warung');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Redirecting...</span>
      </div>
    </div>
  );
}