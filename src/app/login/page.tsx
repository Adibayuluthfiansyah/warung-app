import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            AnakinShop
          </h1>
          <p className="mt-2 text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, ipsam.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}