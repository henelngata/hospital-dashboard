import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
      <div className="w-full max-w-md p-6 bg-background rounded-lg shadow-lg">
        <div className="flex flex-col space-y-2 text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">MediCare</h1>
          <p className="text-sm text-muted-foreground">
            Hospital Management System
          </p>
        </div>
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
