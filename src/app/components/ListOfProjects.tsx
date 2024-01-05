import React, { useEffect, useState } from "react";
import DealModal from "./DealModal";
import { useRouter } from "next/navigation";

type allCaseType = {
  AskingPrice: string;
  CloseDate: Date;
  Description: string;
  ProjectName: string;
  ProjectOwner: {
    _id: string;
    name: string;
    companyId: { name: string; _id: string };
  };
  ProjectType: string;
  Progress: string;
  createdAt: Date;
  tenantId: string;
  updatedAt: Date;
  userId: string;
  __v: number;
  _id: string;
};

const ListOfProjects = () => {
  const [allCase, setAllCase] = useState<allCaseType[] | null>(null);
  const [dealModalState, setDealModalState] = useState(false);
  const [caseId, setCaseId] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const ProjectList = async () => {
      try {
        const res = await fetch("api/project", {
          method: "GET",
        });
        if (res.ok) {
          const { AllCase } = await res.json();
          setAllCase(AllCase);
        }
      } catch (error) {
        console.log(error);
      }
    };
    ProjectList();
  }, []);

  const handlePageTransition = (id: string) => {
    router.push(`./CaseList/${id}`);
  };

  const createDeal = (id: string) => {
    setCaseId(id);
    setDealModalState(true);
  };

  return (
    <div>
      {allCase ? (
        <div className="overflow-x-auto">
          <table className="w-[100%] bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">作成日</th>
                <th className="py-2 px-4 border-b">種別</th>
                <th className="py-2 px-4 border-b">案件名</th>
                <th className="py-2 px-4 border-b">顧客名</th>
                <th className="py-2 px-4 border-b">予算</th>
                <th className="py-2 px-4 border-b">進捗</th>
                <th className="py-2 px-4 border-b">終了予定日</th>
                <th className="py-2 px-4 border-b">作成</th>
              </tr>
            </thead>
            <tbody>
              {allCase?.reverse().map((project) => {
                // 日付の修正
                const formatDate = (date: Date) => {
                  const dateObject = new Date(date);
                  const year = dateObject.getFullYear();
                  const month = String(dateObject.getMonth() + 1).padStart(
                    2,
                    "0"
                  );
                  const day = String(dateObject.getDate()).padStart(2, "0");
                  return `${year}/${month}/${day}`;
                };

                // 担当者
                const account = project.ProjectOwner.name;
                const company = project.ProjectOwner.companyId.name;
                const pic = `${company}\n${account}`;
                // 進捗の対応
                const statusMap = {
                  initial: "相談",
                  ongoing: "進行中",
                  contracting: "完了",
                  hold: "保留中",
                } as Record<string, string>;
                const convertedStatus = statusMap[project.Progress];
                // 種別の対応
                const typeMap = {
                  seller: "売り",
                  buyer: "買い",
                  others: "その他",
                } as Record<string, string>;
                const convertedMap = typeMap[project.ProjectType];
                return (
                  <tr
                    className="text-center hover:bg-blue-300 cursor-pointer"
                    key={project._id}
                  >
                    <td
                      onClick={() => {
                        handlePageTransition(project._id);
                      }}
                    >
                      {formatDate(project.createdAt)}
                    </td>
                    <td
                      onClick={() => {
                        handlePageTransition(project._id);
                      }}
                    >
                      {convertedMap}
                    </td>
                    <td
                      onClick={() => {
                        handlePageTransition(project._id);
                      }}
                    >
                      {project.ProjectName}
                    </td>
                    <td
                      onClick={() => {
                        handlePageTransition(project._id);
                      }}
                    >
                      {pic}
                    </td>
                    <td
                      onClick={() => {
                        handlePageTransition(project._id);
                      }}
                    >
                      {project.AskingPrice}円
                    </td>
                    <td
                      onClick={() => {
                        handlePageTransition(project._id);
                      }}
                    >
                      {convertedStatus}
                    </td>
                    <td
                      onClick={() => {
                        handlePageTransition(project._id);
                      }}
                    >
                      {formatDate(project.CloseDate)}
                    </td>
                    <td>
                      <button
                        className="font-bold p-2 bg-indigo-800 text-white rounded-3xl my-2 cursor-pointer"
                        onClick={() => createDeal(project._id)}
                      >
                        商談の作成
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce mx-2"></div>
          <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce mx-2"></div>
          <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce mx-2"></div>
        </div>
      )}
      {dealModalState ? (
        <DealModal setDealModalState={setDealModalState} caseId={caseId} />
      ) : null}
    </div>
  );
};

export default ListOfProjects;
