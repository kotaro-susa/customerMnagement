"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LoginForm = () => {
  const router = useRouter();
  const handleNextPage = () => {
    router.push(`/register`);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-3xl font-bold mb-8">User Login</div>
        <div className="flex gap-2">
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold"
          >
            Googleでログインする
          </button>
          <button
            onClick={handleNextPage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold"
          >
            新規登録する
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
