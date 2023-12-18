"use client";

import React, { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import MenuModal from "./MenuModal";
import CaseModal from "./CaseModal";
import ListOfProjects from "./ListOfProjects";

const CaseList = () => {
  const [caseModalState, setCaseModalState] = useState(false);
  return (
    <main className="flex h-full">
      <SideBar />
      <div className="flex flex-col flex-1 p-4">
        <Header />
        <div className="flex justify-end space-x-4">
          <button
            className="font-bold p-2 bg-indigo-800 text-white rounded-3xl my-2"
            onClick={() => setCaseModalState(true)}
          >
            案件の新規作成
          </button>
        </div>
        <ListOfProjects />
      </div>
      {caseModalState ? (
        <CaseModal setCaseModalState={setCaseModalState} />
      ) : null}
    </main>
  );
};

export default CaseList;
