import React, { Dispatch, SetStateAction } from "react";

const FilePanel = ({
  handleDownload,
  handleDelete,
  showFilePanel,
  setShowFilePanel,
}: {
  handleDownload: Function;
  handleDelete: Function;
  showFilePanel: string;
  setShowFilePanel: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <div
      className="border border-black rounded-lg flex flex-col p-2"
      style={{ width: "fit-content" }}
    >
      <a
        className="cursor-pointer hover:text-blue-500 hover:font-bold"
        onClick={() => handleDownload(showFilePanel)}
      >
        ダウンロード
      </a>
      <a
        className="cursor-pointer hover:text-blue-500 hover:font-bold"
        onClick={() => handleDelete(showFilePanel)}
      >
        削除
      </a>
      <a
        className="cursor-pointer hover:text-blue-500 hover:font-bold"
        onClick={() => setShowFilePanel(null)}
      >
        閉じる
      </a>
    </div>
  );
};

export default FilePanel;
