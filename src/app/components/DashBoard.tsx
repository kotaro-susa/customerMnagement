"use client";
import "../globals.css";
import { useState } from "react";
import Header from "./Header";
import Modal from "./Modal";
import CustomerList from "./CustomerList";
import CompanyModal from "./CompanyModal";
import SideBar from "./SideBar";
import ContractModal from "./ContractModal";

export default function DashBoard() {
  const [modalState, setModalState] = useState(false);
  const [companyModalState, setCompanyModalState] = useState(false);
  const [contractModalState, setContractModalState] = useState(false);

  return (
    <main className="flex h-full">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <div className="flex flex-col flex-1 p-4">
        <Header />
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="font-bold p-2 bg-indigo-800 text-white rounded-3xl my-2"
            onClick={() => setModalState((pre) => !pre)}
          >
            顧客の新規作成
          </button>
          <button
            className="font-bold p-2 bg-indigo-800 text-white rounded-3xl my-2"
            onClick={() => setCompanyModalState((pre) => !pre)}
          >
            会社の新規作成
          </button>
        </div>

        {/* Modals */}
        {modalState ? <Modal setModalState={setModalState} /> : null}
        {companyModalState ? (
          <CompanyModal setCompanyModalState={setCompanyModalState} />
        ) : null}
        {/* Customer List */}
        <CustomerList />
      </div>
    </main>
  );
}
