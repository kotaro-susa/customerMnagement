import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Addresses = {
  address1: string;
  address2: string;
  address3: string;
};
const CompanyModalContent = ({
  setCompanyModalState,
}: {
  setCompanyModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // 会社名
  const [company, setCompany] = useState("");
  // 業種
  const [industry, setIndustry] = useState("");
  // 住所
  // 郵便番号
  const [zipCode, setZipCode] = useState("");
  // 都道府県
  const [pref, setPref] = useState("");
  // 市区町村
  const [address, setAddress] = useState("");
  // 番地
  const [streetAddress, setStreetAddress] = useState("");
  // 建物名・部屋番号
  const [buildingName, setBuildingName] = useState("");
  // 電話番号
  const [phoneNumber, setPhoneNumber] = useState("");
  // 住所候補
  const [addressCandidate, setAddressCandidate] = useState<Addresses[]>([]);
  // エラーを表示
  const [error, setError] = useState("");
  // URL遷移の為のハンドラーを取得
  const router = useRouter();
  //郵便番号から住所を取得
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value);
    if (value.length === 7) {
      getAddress(value);
    } else {
      setAddressCandidate([]);
    }
  };
  const getAddress = async (value: string): Promise<void> => {
    if (!value) {
      return;
    }
    try {
      const params = new URLSearchParams({ zipcode: value });
      const res = await fetch(
        "https://zipcloud.ibsnet.co.jp/api/search?" + params.toString(),
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        if (!data.results[1]) {
          setPref(data.results[0].address1);
          setAddress(data.results[0].address2 + " " + data.results[0].address3);
          setAddressCandidate([]);
        } else {
          setPref(data.results[0].address1);
          setAddressCandidate(
            data.results.map(
              (data: {
                address1: string;
                address2: string;
                address3: string;
              }) => ({
                address1: data.address1,
                address2: data.address2,
                address3: data.address3,
              })
            )
          );
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCompanyModalState((pre) => !pre);
  };
  const handleAddressClick = (address: Addresses) => {
    setAddress(address.address2 + " " + address.address3);
    setAddressCandidate([]);
  };

  const createCompany: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    if (
      !company ||
      !industry ||
      !zipCode ||
      !pref ||
      !address ||
      !streetAddress ||
      !phoneNumber
    ) {
      setError("全ての項目に記入してください");
      return;
    }
    try {
      const res = await fetch("api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          industry,
          zipCode,
          pref,
          address,
          streetAddress,
          buildingName,
          phoneNumber,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">会社名（※必須）</label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            id="company"
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">業種</label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            id="industry"
            autoComplete="off"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">
            郵便番号（※ハイフンを除いて、記述）
          </label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            value={zipCode}
            onChange={handleInputChange}
            id="zipCode"
            autoComplete="off"
          />
          <div>
            {addressCandidate.length > 0 && (
              <ul>
                {addressCandidate.map((address, index) => {
                  return (
                    <ol
                      key={index}
                      className="cursor-pointer hover:text-blue-500"
                      onClick={() => handleAddressClick(address)}
                    >
                      {`${index + 1}. ${address.address1} ${address.address2} ${
                        address.address3
                      }`}
                    </ol>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">都道府県（※必須）</label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            value={pref}
            onChange={(e) => setPref(e.target.value)}
            id="pref"
            autoComplete="off"
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">市区町村（※必須）</label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="address"
            autoComplete="off"
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">番地（※必須）</label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            id="streetAddress"
            autoComplete="off"
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">建物名・部屋番号（※任意）</label>
          <input
            type="text"
            className="border border-gray-600 p-2 mt-2"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
            id="buildingName"
            autoComplete="off"
          />
        </div>
        <div className="m-3">
          <label className="font-bold text-gray-700 block">代表電話</label>
          <input
            type="text"
            id="phone"
            value={phoneNumber}
            autoComplete="off"
            className="border border-gray-600 p-2 mt-2"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
          onClick={createCompany}
          className="bg-gray-700 text-white m-2 font-bold p-2 rounded-md"
        >
          新規作成
        </button>
        <button
          onClick={closeModal}
          className="bg-gray-700 text-white m-2 font-bold p-2 rounded-md"
        >
          閉じる
        </button>

        {error && (
          <div>
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default CompanyModalContent;
