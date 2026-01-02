"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Lock } from "lucide-react";
import { authApi } from "@/lib/api";
import { AxiosError } from "axios";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateUserId = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserId(value);
    
    if (value && !validateUserId(value)) {
      setError("User ID must contain only numbers");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userId || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateUserId(userId)) {
      setError("User ID must contain only numbers");
      return;
    }

    setIsLoading(true);

    try {
      const data = await authApi.login({ id: userId, password });
      setSuccess(data.message || "Login successful!");
      setUserId("");
      setPassword("");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      <div 
        className="hidden lg:flex lg:w-1/2 items-center justify-center"
        style={{ backgroundColor: '#2B8A3E' }}
      >
        <Image
          src="/leftside.png"
          alt="Native Farm"
          width={400}
          height={480}
          className="object-contain"
          style={{ height: 'auto' }}
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Hello Again!
              </h1>
              <p className="text-gray-500 text-sm">
                Welcome back to Your Native Farm. Please login to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                  User ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your User ID (Numbers only)"
                    value={userId}
                    onChange={handleUserIdChange}
                    autoComplete="username"
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>

        <div className="py-6 text-center border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="text-green-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
