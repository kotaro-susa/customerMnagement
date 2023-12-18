"use client";

import React from "react";
import Header from "./Header";
import FileList from "./FileList";
import SideBar from "./SideBar";

const AccountInformation = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <div className="ml-auto mt-2 mr-4">
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
