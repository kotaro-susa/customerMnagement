"use client";
import { useRouter } from "next/navigation";
import React, { ReactEventHandler, useReducer, useState } from "react";
// Emailのバリデーションチェック用
const validateEmail = (email: string): boolean => {
  const gmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return gmailPattern.test(email);
};

const RegisterForm = () => {
  const [company, setCompany] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isRole, setIsRole] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setEmailError("");
    setError("");
    e.preventDefault();
    if (!company || !name || !email || !isRole) {
      setError("全ての項目に記入してください");
      return;
    }
    // バリデーションチェック
    // Email(gmailのみ許可)
    if (!validateEmail(email)) {
      setEmailError("正しい形式のメールアドレスを設定してください");
      return;
    }
    try {
      const resUserExists = await fetch("api/userExist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExists.json();
      if (user) {
        setError("既に登録されています");
        return;
      }
      const registerUser = await fetch("api/adminRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, name, email, isRole }),
      });
      if (registerUser.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold mb-5 text-[20px]">新規ユーザーの登録</h1>
      <form
        className="flex flex-col gap-3 w-[400px]"
        onSubmit={handleSubmit}
        id="register"
      >
        <input
          value={company}
          type="text"
          placeholder="会社"
          id="company"
          className="border border-gray-200 p-2 w-[420px]"
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          value={name}
          type="text"
          placeholder="名前"
          id="name"
          className="border border-gray-200 p-2 w-[420px]"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={email}
          type="text"
          id="Email"
          placeholder="Googleのサービスで作成されたものをお使いください。"
          className="border border-gray-200 p-2 w-[420px]"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <>
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {emailError}
            </div>
          </>
        )}
        <select
          className="border border-gray-200 p-2 w-[420px]"
          value={isRole}
          onChange={(e) => setIsRole(e.target.value)}
        >
          <option value="" className="font-thin">
            ---役割を選ぶ---
          </option>
          <option value="admin">管理者</option>
        </select>
        <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2 w-[420px]">
          登録する
        </button>
        {error && (
          <>
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
