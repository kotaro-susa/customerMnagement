import React, { useState } from "react";
import MenuModalContent from "./MenuModalContent";
import ContractModalContent from "./ContractModalContent";

const MenuModal = () => {
  // モーダルメニュー内の各メニューの開閉の制御を行う
  const [selectedModal, setSelectedModal] = useState<
    "Menu" | "File" | "Delete"
  >("Menu");
  return (
    <div>
      <div
        id="overlay"
        className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center"
      >
        <div id="content" className="bg-white w-full max-w-md p-6 rounded-md">
          {selectedModal === "Menu" && (
            <MenuModalContent setSelectedModal={setSelectedModal} />
          )}
          {selectedModal === "File" && (
            <ContractModalContent setSelectedModal={setSelectedModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
