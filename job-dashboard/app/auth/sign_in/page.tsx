"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-lg shadow"
      >
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-6">
          Welcome Back,
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              placeholder="Enter email address"
              type="email"
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              name="password"
              placeholder="Enter password"
              type="password"
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-800 text-white h-11 w-full rounded-full mt-6"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/auth/sign_up" className="text-indigo-700 font-semibold">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
