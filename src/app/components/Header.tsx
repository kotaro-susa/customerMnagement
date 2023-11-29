"use client";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-gray-300 p-4">
      <div className="flex justify-between items-center container mx-auto">
        <div className="text-3xl font-bold text-gray-800">{session?.user?.company}</div>
        <div className="flex items-center">
          <div className="text-gray-800 font-bold text-lg mr-4">
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
