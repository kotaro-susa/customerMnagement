import React, { useContext, useEffect, useState } from "react";
import { ValueContext, ValueContextType } from "./CustomerList";
import { useRouter } from "next/navigation";

const ContractModalContent = ({
  setSelectedModal,
}: {
  setSelectedModal: React.Dispatch<
    React.SetStateAction<"Menu" | "File" | "Delete">
  >;
}) => {
  // ファイルのセット
  const [file, setFile] = useState<File | null>(null);
  // エラーメッセージ
  const [errorMessage, setErrorMessage] = useState<string>("");
  // ドキュメントについて
  const [documentName, setDocumentName] = useState<string | undefined>("");
  const [description, setDescription] = useState<string>("");
  // ルーター処理
  const router = useRouter();
  
  const {
    selectAccountId,
    setSelectAccountId,
    selectAccountCompany,
    setSelectAccountCompany,
    selectAccountName,
    setSelectAccountName,
  } = useContext<ValueContextType | null>(ValueContext) || {
    selectAccountId: null,
    setSelectAccountId: () => {},
    selectAccountCompany: null,
    setSelectAccountCompany: () => {},
    selectAccountName: null,
    setSelectAccountName: () => {},
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    setDocumentName(file?.name);
  }, [file]);

  const handleUpload: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    setErrorMessage("");
    e.preventDefault();
    if (!file) {
      setErrorMessage("ファイルをアップロードしてください");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      // 必要なデータを追加
      const jsonData = { selectAccountId, documentName, description };
      formData.append("json", JSON.stringify(jsonData));
      const res = await fetch("/api/fileUpload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseContract: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    setSelectedModal("Menu");
  };

  return (
    <form className="mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mt-2">
        <label className="font-bold text-gray-700 block">契約企業名</label>
        <input
          type="text"
          className="border border-gray-600 p-2 mt-2 w-full"
          id="contractCompany"
          autoComplete="off"
          value={selectAccountCompany || ""}
          disabled
        />
      </div>
      <div className="mt-2">
        <label className="font-bold text-gray-700 block">担当者名</label>
        <input
          type="text"
          className="border border-gray-600 p-2 mt-2 w-full"
          id="contractName"
          autoComplete="off"
          disabled
          value={selectAccountName || ""}
        />
      </div>
      <div className="mt-2">
        <label className="font-bold text-gray-700 block">説明</label>
        <textarea
          className="border border-gray-600 p-2 mt-2 w-full h-[100px]"
          id="contractDescription"
          autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <label className="font-bold text-gray-700 block">
          ファイルのアップロード
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-2 w-full"
          id="contractFile"
          autoComplete="off"
          accept=".pdf"
        />
      </div>
      <button
        className="bg-gray-700 text-white m-2 font-bold p-2 rounded-md"
        onClick={handleUpload}
      >
        新規作成
      </button>
      <button
        onClick={handleCloseContract}
        className="bg-gray-700 text-white m-2 font-bold p-2 rounded-md"
      >
        閉じる
      </button>
      {errorMessage && (
        <div className="text-red-500 font-bold">{errorMessage}</div>
      )}
    </form>
  );
};

export default ContractModalContent;
