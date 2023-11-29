import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserRegister from "@/app/components/UserRegister";
import { getServerSession } from "next-auth";
import React from "react";

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log("セッションです",session)
  return (
    <div>
      <div>
        <UserRegister />
      </div>
    </div>
  );
};

export default Home;
