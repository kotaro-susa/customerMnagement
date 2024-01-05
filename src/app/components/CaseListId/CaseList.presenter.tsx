import React from "react";
import Header from "../Header";


const CaseListPresenter = () => {
  return (
    <div>
      <Header />
      <div className="ml-2 mt-2">
        <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-tr-[50px] rounded-br-[50px] ">
          相談ベース
        </span>
        <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-tr-[50px] rounded-br-[50px]">
          進行中
        </span>
        <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-tr-[50px] rounded-br-[50px]">
          契約
        </span>
        <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-tr-[50px] rounded-br-[50px]">
          保留
        </span>
      </div>
    </div>
  );
};

export default CaseListPresenter;
