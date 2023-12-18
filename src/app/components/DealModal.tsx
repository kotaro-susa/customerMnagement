import React, { useEffect } from "react";
import DealModalContent from "./DealModalContent";

const DealModal = ({
  setDealModalState,
  caseId,
}: {
  setDealModalState: React.Dispatch<React.SetStateAction<boolean>>;
  caseId: string;
}) => {
  return (
    <div>
      <div
        id="overlay"
        className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center"
      >
        <div id="content" className="bg-white w-full max-w-md p-6 rounded-md">
          <DealModalContent setDealModalState={setDealModalState} caseId={caseId}/>
        </div>
      </div>
    </div>
  );
};

export default DealModal;
