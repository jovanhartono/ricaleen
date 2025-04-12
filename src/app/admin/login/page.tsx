import { LoginForm } from "@/components/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
