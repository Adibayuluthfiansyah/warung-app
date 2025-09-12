import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6 md:flex-row md:gap-12">
          {/* Left side - Branding */}
          <div className="flex flex-col justify-center md:w-1/2">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                AnakinShop
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, ipsam.
              </p>
            </div>
            
            {/* Features */}
            <div className="mt-8 hidden space-y-4 md:block">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">
                  Multi-user dan multi-warung
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="md:w-1/2">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}