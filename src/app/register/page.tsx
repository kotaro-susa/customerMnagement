import React from "react";
import RegisterForm from "../components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Home = async() => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Home;
