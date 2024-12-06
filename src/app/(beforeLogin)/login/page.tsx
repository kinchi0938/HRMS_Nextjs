"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth/auth.api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/store/features/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) =>
      state.auth.isAuthenticated
  );

  const loginMutation = useMutation({
    mutationFn: (credentials: { username: string; password: string }) =>
      authApi.login(credentials),
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        })
      );
      router.push("/employee");
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    loginMutation.mutate({ username, password });
  };

  return (
    <div className="p-10 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-200">
      <div className="content basis-1/2 text-3xl text-center md:text-right">
        <h1 className="text-5xl text-blue-500 font-bold">HR Manager</h1>
        <p>Please Login to use this App.</p>
      </div>
      <div className="container basis-1/2 flex flex-col items-center">
        <form
          className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <input
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loginMutation.status === "pending"}
          />

          <input
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loginMutation.status === "pending"}
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-400 text-white p-3 rounded-lg font-semibold text-lg disabled:opacity-50"
            type="submit"
            disabled={loginMutation.status === "pending"}
          >
            {loginMutation.status === "pending" ? "Logging in..." : "Log In"}
          </button>

          <hr className="mt-8" />
          <button
            className="w-full bg-green-400 hover:bg-green-300 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
            type="button"
          >
            <Link href="/signup">Create New Account</Link>
          </button>
        </form>
      </div>
    </div>
  );
}
