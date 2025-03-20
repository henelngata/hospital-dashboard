import { RegisterForm } from "@/components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
      <div className="w-full max-w-md p-6 bg-background rounded-lg shadow-lg">
        <div className="flex flex-col space-y-2 text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to register
          </p>
        </div>
        <RegisterForm />
        <div className="mt-4 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
