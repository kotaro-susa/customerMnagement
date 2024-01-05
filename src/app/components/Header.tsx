"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="flex justify-between items-center container mx-auto">
        <div
          className="text-3xl font-bold text-white cursor-pointer hover:text-yellow-300"
          onClick={() => router.push("/")}
        >
          {session?.user?.company}
        </div>
        <div className="flex items-center">
          <div className="text-white font-bold text-lg mr-4">
            ユーザー名: {session?.user?.name}
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white font-bold cursor-pointer px-4 py-2 text-lg rounded"
          >
            ログアウトする
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
