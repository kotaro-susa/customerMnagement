import React, { useEffect, useState } from "react";

type Candidate = {
  companyId: { name: string; _id: string };
  name: string;
  _id: string;
};

const CaseModalContent = ({
  setCaseModalState,
}: {
  setCaseModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // アカウントID、会社名、担当者名
  const [accountId, setAccountId] = useState("");
  const [company, setCompany] = useState("");
  const [account, setAccount] = useState("");
  // 会社名を入れると、候補の会社とその担当者が出てくるようにする
  const [candidate, setCandidate] = useState<Candidate[] | null>(null);
  const [project, setProject] = useState("");
  const [projectType, setProjectType] = useState("");
  const [closeDate, setCloseDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");
  // カーソルがある間だけ、検索候補を出すように制御
  const [candidateSuggest, setCandidateSuggest] = useState(false);

  useEffect(() => {
    const Controller = new AbortController();
    const signal = Controller.signal;
    const suggestionCompany = async () => {
      try {
        if (company !== "") {
          const res = await fetch(`api/accountSearch/${company}`, {
            method: "GET",
            signal: signal,
          });
          if (res.ok) {
            const data = await res.json();
            const { selectAccount } = data;
            console.log(selectAccount);
            const flattenedArray = selectAccount.flat();
            setCandidate(flattenedArray);
          }
        } else if (company === "") {
          setCandidate(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (candidateSuggest) {
      suggestionCompany();
    }
    return () => {
      Controller.abort();
    };
  }, [company]);
  const createProject = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("../api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountId,
        project,
        projectType,
        closeDate,
        amount,
        description,
      }),
    });
    if (res.ok) {
      console.log("成功");
      setCaseModalState(false);
    }
  };
  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">
            会社名（※必須）
          </label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            id="company"
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onFocus={() => setCandidateSuggest(true)}
            onBlur={() => setCandidateSuggest(false)}
          />
          {candidate && (
            <ul className="mt-2 border rounded-md overflow-hidden">
              {candidate.map((option, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 px-3 py-2"
                    onClick={() => {
                      setAccountId(option._id);
                      setCompany(option.companyId.name);
                      setAccount(option.name);
                      setCandidate(null);
                    }}
                  >
                    {option.companyId.name}
                    {option.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">担当者名</label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            id="account"
            autoComplete="off"
            value={account}
            readOnly
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">案件名</label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            id="projectTitle"
            autoComplete="off"
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">案件のタイプ</label>
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="">タイプを選ぶ</option>
            <option value="seller">売り手</option>
            <option value="buyer">買い手</option>
            <option value="others">その他</option>
          </select>
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">終了予定日</label>
          <input
            type="date"
            className="border border-gray-600 p-2 mt-2"
            value={closeDate.toISOString().split("T")[0]}
            onChange={(e) => setCloseDate(new Date(e.target.value))}
            id="closeDate"
            autoComplete="off"
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">金額</label>
          <input
            type="number"
            className="border border-gray-600 p-2 mt-2"
            value={isNaN(amount) ? "" : amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            id="amount"
            autoComplete="off"
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">案件概要</label>
          <textarea
            className="border border-gray-600 p-2 mt-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            autoComplete="off"
          />
        </div>
        <button
          className="bg-gray-700 text-white m-2 font-bold p-2 rounded-md"
          onClick={createProject}
        >
          新規作成
        </button>
        <button
          onClick={() => setCaseModalState(false)}
          className="bg-gray-700 text-white m-2 font-bold p-2 rounded-md"
        >
          閉じる
        </button>

        {/* {error && (
          <div>
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          </div>
        )} */}
      </div>
    </form>
  );
};

export default CaseModalContent;
