import React from "react";
import Contract from "../components/Contract";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <main className="flex h-full">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <Contract />
      </div>
    </main>
  );
};

export default Home;
