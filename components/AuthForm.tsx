import { useState } from "react";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (data: { email: string; password: string; username?: string }) => void;
  loading?: boolean;
}

export default function AuthForm({ type, onSubmit, loading }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, username: type === "signup" ? username : undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {type === "signup" && (
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
        />
      )}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
      />
      <input
        type="password"
        placeholder="Password (min 8 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
        className="border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
      >
        {loading ? (type === "signup" ? "Signing up..." : "Logging in...") : type === "signup" ? "Sign Up" : "Log In"}
      </button>
    </form>
  );
}
