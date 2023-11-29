"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SideBar = () => {
  const router = useRouter();
  return (
    <div>
      <aside>
        <button
          className="font-bold m-2 p-2 bg-indigo-800 text-white rounded-3xl block text-[14px]"
          onClick={() => router.push("/user")}
        >
          契約企業一覧（※）
        </button>
        <button
          className="font-bold m-2 p-2 bg-indigo-800 text-white rounded-3xl block text-[14px]"
          onClick={() => router.push("/dashboard")}
        >
          法人顧客一覧
        </button>
        <button
          className="font-bold m-2 p-2 bg-indigo-800 text-white rounded-3xl block text-[14px]"
          onClick={() => router.push("/user")}
        >
          ユーザー一覧(※)
        </button>
        <button
          className="font-bold m-2 p-2 bg-indigo-800 text-white rounded-3xl block text-[14px]"
          onClick={() => router.push("/user")}
        >
          契約一覧(※)
        </button>
      </aside>
    </div>
  );
};

export default SideBar;
