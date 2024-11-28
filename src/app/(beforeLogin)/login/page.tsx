"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="p-10 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-200">
      <div className="content basis-1/2 text-3xl text-center md:text-right">
        <h1 className="text-5xl text-blue-500 font-bold">HR Manager</h1>

        <p>Please Login to use this App.</p>
      </div>
      <div className="container basis-1/2 flex flex-col items-center">
        <form className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
          <input
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            placeholder="Pasword"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-400 text-white p-3 rounded-lg font-semibold text-lg"
            type="submit"
          >
            Log In
          </button>
          <hr className="mt-8" />
          <button className="w-full bg-green-400 hover:bg-green-300 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg">
            <Link href="/signup">Create New Account</Link>
          </button>
        </form>
      </div>
    </div>
  );
}
