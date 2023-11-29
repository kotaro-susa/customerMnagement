import React from "react";
import CompanyModalContent from "./CompanyModalContent";

const CompanyModal = ({
  setCompanyModalState,
}: {
  setCompanyModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div
        id="overlay"
        className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center"
      >
        <div id="content" className="bg-white w-full max-w-md p-6 rounded-md">
          <CompanyModalContent setCompanyModalState={setCompanyModalState} />
        </div>
      </div>
    </>
  );
};

export default CompanyModal;
