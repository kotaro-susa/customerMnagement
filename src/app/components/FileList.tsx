import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import FilePanel from "./FilePanel";

type PdfArray = {
  _id: string;
  name: string;
  description: string;
  tenantId: string;
  updatedAt: string;
  userId: string;
};

const FileList = () => {
  const [pdfFiles, setPdfFiles] = useState<PdfArray[] | null>(null);
  const [showFilePanel, setShowFilePanel] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const elementPdfMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  // ファイル名一覧を取得
  const pathname = useParams();
  useEffect(() => {
    // URLのパスパラメータを取得
    const fileList = async () => {
      try {
        const res = await fetch(`/api/fileUpload/?q=${pathname.id}`, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setPdfFiles(data.selectPdf);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fileList();
  }, []);

  // ダウンロードの動作を記載
  const handleDownload = async (id: string) => {
    try {
      const res = await fetch(`/api/fileDownLoad/?q=${id}`, {
        method: "GET",
      });
      if (res.ok) {
        // json形式で受け取ったデータをオブジェクトに変換
        const data = await res.json();
        // オブジェクトからbase64データを受け取る
        const base64Data = data.base64Data;
        // バイナリーデータに変換
        const binaryData = Buffer.from(base64Data, "base64");
        //  リンクを生成
        const link = document.createElement("a");
        // リンクにダウンロードコンテンツを追加
        link.href = URL.createObjectURL(new Blob([binaryData]));
        link.download = `${fileName}.pdf`;
        link.click();
        setShowFilePanel(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 削除の動作を記載
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/fileDownLoad/?q=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setShowFilePanel(null);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMenu = (
    id: string,
    name: string,
    e: React.MouseEvent<HTMLTableRowElement>
  ) => {
    const clickedElement = e.target as HTMLTableRowElement;
    const elementRect = clickedElement.getBoundingClientRect();
    if (elementPdfMenuRef.current) {
      elementPdfMenuRef.current.style.top = `${elementRect.top + 30}px`;
      elementPdfMenuRef.current.style.left = `${elementRect.left}px`;
    }
    setFileName(name);
    if (showFilePanel === id) {
      // 開いた場所を再度押すので、閉じる
      setShowFilePanel(null);
    } else {
      // 開いた場所と違うところを押すので、開いている場所を閉じて、押した場所を開きます
      setShowFilePanel(id);
    }
  };

  return (
    <React.Fragment>
      <div className="shadow-md w-auto border border-black">
        <table className="m-[10px]">
          <thead className="text-left">
            <tr>
              <th>ファイル名</th>
              <th>更新日時</th>
            </tr>
          </thead>
          <tbody>
            {pdfFiles?.map((file, index) => {
              // 時間の見た目を整える
              const UpdateTime = new Date(file.updatedAt);
              const UpdateTimeCorrection = UpdateTime.toLocaleString();
              //pdfを取る
              const fileName = file.name.replace(/\.[^/.]+$/, "");
              return (
                <React.Fragment key={file._id}>
                  <tr
                    onClick={(e) => handleOpenMenu(file._id, file.name, e)}
                    className="cursor-pointer hover:bg-blue-300"
                  >
                    <td>{fileName}</td>
                    <td>{UpdateTimeCorrection}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className="filePanelPosition"
        ref={elementPdfMenuRef}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "#fff",
        }}
      >
        {showFilePanel && (
          <FilePanel
            handleDownload={handleDownload}
            handleDelete={handleDelete}
            showFilePanel={showFilePanel}
            setShowFilePanel={setShowFilePanel}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default FileList;
