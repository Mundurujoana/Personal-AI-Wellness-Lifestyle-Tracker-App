import AuthForm from "@/components/AuthForm";
import WellnessAccent from "@/components/WellnessAccent";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (data: { email: string; password: string; username?: string }) => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Signup successful! Please log in ✨");
      router.push("/login");
    } else {
      alert(result.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 w-full max-w-md border border-pink-200">
        <WellnessAccent />
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-2">Join the Wellness Journey</h1>
        <p className="text-center text-gray-500 mb-6">Create your personal wellness space 🌸</p>
        <AuthForm type="signup" onSubmit={handleSignup} loading={loading} />
        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-pink-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
