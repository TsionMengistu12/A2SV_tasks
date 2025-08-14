"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import api from "@/lib/axiosInstance";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/signup", form);
      console.log("Signup success:", res.data);
      router.push(`/auth/sign_up/verification?email=${encodeURIComponent(form.email)}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-lg shadow">
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-6">Sign Up Today!</h1>

        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full border border-slate-200 rounded-lg h-11 px-3 flex items-center justify-center gap-2 mb-6 hover:bg-slate-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.731 31.91 29.267 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.869 6.053 29.706 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.814C14.491 16.272 18.877 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.869 6.053 29.706 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 44c5.192 0 9.899-1.986 13.46-5.229l-6.214-5.248C29.189 35.848 26.72 37 24 37c-5.24 0-9.675-3.613-11.263-8.482l-6.571 5.062C9.46 39.876 16.198 44 24 44z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.03 12.03 0 0 1-4.017 5.523l6.214 5.248C35.043 40.54 40 33.5 40 24c0-1.341-.138-2.651-.389-3.917z" />
          </svg>
          <span className="font-medium text-slate-700">Sign Up with Google</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <hr className="flex-1 border-slate-200" />
          <span className="px-2 text-sm text-gray-500">Or Sign Up with Email</span>
          <hr className="flex-1 border-slate-200" />
        </div>

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              name="name"
              onChange={handleChange}
              placeholder="Enter your full name"
              className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Enter email address"
              className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Enter password"
              className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              placeholder="Enter password"
              className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
        </div>

        <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white h-11 w-full rounded-full mt-6">
          Continue
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/auth/sign_in" className="text-indigo-700 font-semibold">Login</a>
        </p>

        <p className="text-xs text-center text-gray-500 mt-4">
          By clicking 'Continue', you acknowledge that you have read and accepted our
          <a className="text-indigo-700 font-semibold ml-1" href="#">Terms of Service</a>
          <span> and </span>
          <a className="text-indigo-700 font-semibold" href="#">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
}
