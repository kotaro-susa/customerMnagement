import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type status = "" | "initial" | "ongoing" | "contracting" | "hold";

const DealModalContent = ({
  setDealModalState,
  caseId,
}: {
  setDealModalState: React.Dispatch<React.SetStateAction<boolean>>;
  caseId: string;
}) => {
  const [dealName, setDealName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<status>("");
  const [source, setSource] = useState("");
  const [nextDealDay, setNextDealDay] = useState<Date>(new Date());
  // 1時間後のデータを取得
  const currentDate = new Date();
  const oneHourLater = new Date(currentDate.getTime() + 60 * 60 * 1000);
  const [nextDealDayAfter, setNextDealDayAfter] = useState<Date>(oneHourLater);
  const [amount, setAmount] = useState(0);
  const closeModal = () => {
    setDealModalState(false);
  };
  const createDeal = async (e: React.FormEvent<HTMLButtonElement>) => {
    // 商談を作成する機能を付ける
    try {
      e.preventDefault();
      const res = await fetch("../api/deal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseId,
          dealName,
          description,
          status,
          source,
          nextDealDay,
          nextDealDayAfter,
          amount,
        }),
      });
      if (res.ok) {
        console.log("成功");
        setDealModalState(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <div>
        <div className="mt-3">
          <label className="font-bold text-gray-700 block">
            商談名（※必須）
          </label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            id="name"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="mt-3">
          <label className="font-bold text-gray-700 block">
            商談概要（※必須）
          </label>
          <textarea
            className="border border-gray-600 p-2 mt-2"
            id="description"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mt-3">
          <label className="font-bold text-gray-700 block">進捗（※必須）</label>
          <select
            id="progress"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value as status)}
          >
            <option value="">進捗を選択</option>
            <option value="initial">相談ベース</option>
            <option value="ongoing">進行中</option>
            <option value="contracting">契約</option>
            <option value="hold">保留</option>
          </select>
        </div>
        <div className="mt-3">
          <label className="font-bold text-gray-700 block">
            商談の発生源（※必須）
          </label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            id="source"
            autoComplete="off"
            required
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label className="font-bold text-gray-700 block">
            次の商談予定時間
          </label>
          <DatePicker
            selected={nextDealDay}
            onChange={(date) => date && setNextDealDay(date)}
            showTimeSelect
            timeIntervals={60} // 60分ごとの時間を指定
            dateFormat="yyyy/MM/dd HH:mm"
            className="border border-gray-600 p-2 mt-2"
          />
          <div>〜</div>
          <DatePicker
            selected={nextDealDayAfter}
            onChange={(date) => date && setNextDealDayAfter(date)}
            showTimeSelect
            timeIntervals={60} // 60分ごとの時間を指定
            dateFormat="yyyy/MM/dd HH:mm"
            className="border border-gray-600 p-2 mt-2"
          />
        </div>
        <div className="mt-3">
          <label className="font-bold text-gray-700 block">希望金額</label>
          <input
            type="number"
            className="border border-gray-600 p-2 mt-2"
            id="nextDay"
            autoComplete="off"
            value={isNaN(amount) ? "" : amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
          />
        </div>
      </div>
      <button
        className="bg-gray-700 text-white m-2 font-bold p-2 rounded-md"
        onClick={createDeal}
      >
        新規作成
      </button>
      <button
        className="bg-gray-700 text-white m-2 font-bold p-2 rounded-md"
        onClick={closeModal}
      >
        閉じる
      </button>
    </form>
  );
};

export default DealModalContent;
