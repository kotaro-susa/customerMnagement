"use client";
import { useRouter } from "next/navigation";
import React, { ReactEventHandler, useReducer, useState } from "react";
// Emailのバリデーションチェック用
const validateEmail = (email: string): boolean => {
  const gmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return gmailPattern.test(email);
};

const UserRegister = () => {
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
    if (!name || !email || !isRole) {
      setError("全ての項目に記入してください");
      return;
    }
    // バリデーションチェック
    if (!validateEmail(email)) {
      setEmailError("正しい形式のメールアドレスを設定してください");
      return;
    }
    try {
      const resUserExists = await fetch("../api/userExist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExists.json();
      if (user) {
        setError("既に登録されています");
        return;
      }
      const registerUser = await fetch("../api/userRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, isRole }),
      });
      if (registerUser.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
      }
    } catch (error) {
      console.log("ssss");
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
          value={name}
          type="text"
          placeholder="名前"
          id="name"
          className="border border-gray-200 p-2 w-[420px]"
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <input
          value={email}
          type="text"
          id="Email"
          placeholder="Googleのサービスで作成されたメールアドレス"
          className="border border-gray-200 p-2 w-[420px]"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        {emailError && (
          <div>
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {emailError}
            </div>
          </div>
        )}
        <select
          className="border border-gray-200 p-2 w-[420px]"
          value={isRole}
          id="roleSelect"
          onChange={(e) => setIsRole(e.target.value)}
        >
          <option value="" className="font-thin" id="select">
            ---役割を選ぶ---
          </option>
          <option value="admin" id="admin">
            管理者
          </option>
          <option value="manager" id="manager">
            マネージャー
          </option>
          <option value="user" id="user">
            一般ユーザー
          </option>
        </select>
        <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2 w-[420px]">
          登録する
        </button>
        {error && (
          <div>
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserRegister;
