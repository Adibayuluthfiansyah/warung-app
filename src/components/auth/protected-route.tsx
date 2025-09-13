"use client";

import { useAuth } from './auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireWarung?: boolean;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/login',
  requireWarung = true 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (requireWarung && (!user.warung || user.warung.length === 0)) {
        router.push('/setup-warung');
        return;
      }
    }
  }, [user, loading, router, redirectTo, requireWarung]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireWarung && (!user.warung || user.warung.length === 0)) {
    return null;
  }

  return <>{children}</>;
}
