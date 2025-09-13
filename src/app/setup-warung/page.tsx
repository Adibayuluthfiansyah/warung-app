"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SetupWarungPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Setup Warung</CardTitle>
            <CardDescription>
              Anda belum memiliki akses ke warung manapun
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Hubungi administrator untuk mendapatkan akses ke warung atau 
                untuk membuat warung baru.
              </AlertDescription>
            </Alert>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = 'mailto:admin@warungapp.com'}
            >
              Hubungi Administrator
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}