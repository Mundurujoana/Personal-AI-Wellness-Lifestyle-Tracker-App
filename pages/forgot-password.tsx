import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: call your backend API to send reset email
    // await fetch('/api/auth/forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 p-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-md w-full border border-pink-200">
        <h1 className="text-3xl font-bold mb-6 text-pink-600 text-center">Reset Your Password</h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <p className="text-center text-green-600">
            If an account with that email exists, a reset link has been sent.
          </p>
        )}
      </div>
    </div>
  );
}
