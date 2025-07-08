import AuthForm from "@/components/AuthForm";
import WellnessAccent from "@/components/WellnessAccent";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setLoading(false);

    if (res.ok && result.token) {
      localStorage.setItem("token", result.token);
      router.push("/profile");
    } else {
      alert(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-10 w-full max-w-md border border-pink-200">
        <WellnessAccent />
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-6">Log in to continue your wellness journey 🌸</p>

        <AuthForm type="login" onSubmit={handleLogin} loading={loading} />

        {/* Forgot Password link - right aligned, subtle, spaced */}
        <div className="flex justify-end mt-2 mb-6">
          <a
            href="/forgot-password"
            className="text-pink-600 hover:underline font-medium text-sm tracking-wide transition-colors"
            aria-label="Forgot password"
          >
            Forgot Password?
          </a>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-pink-600 hover:underline font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
