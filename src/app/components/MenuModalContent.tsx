import React, { useContext } from "react";
import { ValueContext, ValueContextType } from "./CustomerList";

const MenuModalContent = ({
  setSelectedModal,
}: {
  setSelectedModal: React.Dispatch<
    React.SetStateAction<"Menu" | "File" | "Delete">
  >;
}) => {
  const { setMenuModal, selectAccountId, setSelectAccountId } =
    useContext<ValueContextType | null>(ValueContext) || {
      setMenuModal: () => {},
      selectAccountId: null,
      setSelectAccountId: () => {},
    };
  const handleCreateContract = () => {
    setSelectedModal("File");
  };

  const handleDeleteAccount = () => {
    setSelectedModal("Delete");
  };

  const handleCloseModal: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setMenuModal(false);
    setSelectedModal("Menu");
  };
  return (
    <div>
      <div className="grid grid-cols-3 text-center">
        <div
          className="col-span-1 font-bold m-2 cursor-pointer hover:text-blue-300"
          onClick={handleCreateContract}
        >
          ファイルの
          <br />
          アップロード
        </div>
        <div
          className="col-span-1 font-bold m-2 cursor-pointer hover:text-blue-300"
          onClick={handleDeleteAccount}
        >
          顧客を削除する
        </div>
        <div className="col-span-1 font-bold m-2 cursor-pointer hover:text-blue-300">
          契約
        </div>
      </div>
      <div className="grid grid-cols-3 text-center">
        <div className="col-span-1 font-bold m-2 cursor-pointer hover:text-blue-300">
          作業D
        </div>
        <div className="col-span-1 font-bold m-2 cursor-pointer hover:text-blue-300">
          作業E
        </div>
        <div className="col-span-1 font-bold m-2 cursor-pointer hover:text-blue-300">
          作業G
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <button
          onClick={handleCloseModal}
          className="bg-gray-700 text-white m-2 font-bold p-2 rounded-md"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default MenuModalContent;
