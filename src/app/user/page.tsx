import React from "react";
import User from "../components/User";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Home = () => {
  // MongoDBと接続し、ユーザー情報を取得する
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col flex-1 p-4">
        <Header />
        <User />
      </div>
    </div>
  );
};

export default Home;
