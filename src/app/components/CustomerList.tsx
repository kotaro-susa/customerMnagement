// import _ from "lodash";
import React, { createContext, useEffect, useState } from "react";
import EditableCell from "./EditableCell";
import MenuModal from "./MenuModal";
import { useRouter } from "next/navigation";

export type AllUsers = {
  _id: string;
  company: string;
  name: string;
  phoneNumber: string;
  createdAt: number;
  updatedAt: number;
  __v: number;
  email: string;
  tenantId: string;
  userId: string;
  companyId: {
    address: string;
    buildingName: string;
    createdAt: number;
    industry: string;
    name: string;
    phoneNumber: string;
    pref: string;
    streetAddress: string;
    tenantId: string;
    updatedAt: number;
    userId: string;
    zipCode: string;
    __v: number;
    _id: string;
  };
};
export type ValueContextType = {
  setMenuModal: (value: boolean) => void;
  selectAccountId: string | null;
  setSelectAccountId: (value: string) => void;
  selectAccountCompany: string | null;
  setSelectAccountCompany: (value: string) => void;
  selectAccountName: string | null;
  setSelectAccountName: (value: string) => void;
};

export const ValueContext = createContext<ValueContextType | null>(null);

const CustomerList = () => {
  const [allUsers, setAllUsers] = useState<AllUsers[] | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<AllUsers[] | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [maxPageCount, setMaxPageCount] = useState<number>(1);
  const [menuModal, setMenuModal] = useState<boolean>(false);
  const [selectAccountId, setSelectAccountId] = useState<string | null>(null);
  const [selectAccountCompany, setSelectAccountCompany] = useState<
    string | null
  >(null);
  const [selectAccountName, setSelectAccountName] = useState<string | null>(
    null
  );

  const router = useRouter();

  useEffect(() => {
    const newController = new AbortController();
    const newSignal = newController.signal;
    const fetchSuggestions = async () => {
      try {
        if (inputValue !== "") {
          const res = await fetch(`api/suggestion/${inputValue}`, {
            method: "GET",
            signal: newSignal,
          });
          if (res.ok) {
            const data = await res.json();
            setSuggestions(data.suggestions);
          }
        } else if (inputValue === "") {
          setSuggestions(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestions();
    return () => {
      newController.abort();
    };
  }, [inputValue]);

  const handlePrevPage: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setPageNumber((pre) => (pre > 1 ? pre - 1 : 1));
    setHasNextPage(true);
  };

  // 新しいページとMaxページの比較
  const setLimitedPageNumber = (newPageNumber: number) => {
    const limitedPageNumber = Math.min(newPageNumber, maxPageCount);
    setPageNumber(limitedPageNumber);
  };

  const handleNextPage: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    if (hasNextPage) {
      setLimitedPageNumber(pageNumber + 1);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const res = await fetch(`api/createClient/${pageNumber}`, {
          method: "GET",
          signal: signal,
        });
        if (res.ok) {
          const data = await res.json();
          const AllUser = data.AllUsers;
          const NextAllUsers = data.NextAllUsers;
          const maxPageSize = data.maxPageSize;
          setHasNextPage(NextAllUsers.length > 0);
          setMaxPageCount(maxPageSize);
          setAllUsers(AllUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [pageNumber]);

  // 顧客情報の保存
  const handleSaveUserOption = async (
    userId: string,
    newValue: string,
    type: string
  ) => {
    try {
      const res = await fetch(`api/createClient/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newValue, type }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const SearchAccount = async (companyId: string) => {
    try {
      const res = await fetch(`api/SearchClient/${companyId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setAllUsers(data.selectAccount);
        setSuggestions(null);
        setInputValue("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMenu = (user: AllUsers) => {
    setMenuModal((pre) => !pre);
    setSelectAccountId(user._id);
    setSelectAccountCompany(user.companyId.name);
    setSelectAccountName(user.name);
  };

  const handleAccountDetails = (id: string) => {
    router.push(`dashboard/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 w-full"
          id="companySearch"
          placeholder="会社名で探す"
        />
        {suggestions && (
          <ul className="mt-2">
            {suggestions.map((suggestion, index) => {
              return (
                <li
                  key={index}
                  className="text-gray-600 hover:text-blue-800 cursor-pointer bg-white hover:font-bold"
                  onClick={() => SearchAccount(suggestion._id)}
                >
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Customer Table */}
      <div className="text-black text-3xl font-bold text-center mb-6">
        法人顧客一覧
      </div>
      {allUsers ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">顧客ID</th>
                <th className="py-2 px-4 border-b">企業名</th>
                <th className="py-2 px-4 border-b">担当者</th>
                <th className="py-2 px-4 border-b">会社住所</th>
                <th className="py-2 px-4 border-b">担当者携帯</th>
                <th className="py-2 px-4 border-b">メールアドレス</th>
                <th className="py-2 px-4 border-b">メニュー</th>
                <th className="py-2 px-4 border-b">詳細</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user) => {
                const Id = `${user._id.slice(0, 8)}……`;
                const address = `${user.companyId.zipCode} ${user.companyId.pref} ${user.companyId.address} ${user.companyId.buildingName}`;
                return (
                  <tr className="text-center" key={user._id}>
                    <td className="my-2">{Id}</td>
                    <td className="my-2">{user.companyId.name}</td>
                    <td className="cursor-pointer hover:bg-gray-300 my-2">
                      <EditableCell
                        initialValue={user.name}
                        onSave={(newValue) =>
                          handleSaveUserOption(user._id, newValue, "name")
                        }
                      />
                    </td>
                    <td className="my-2">〒 {address}</td>
                    <td className="cursor-pointer hover:bg-gray-300 my-2">
                      <EditableCell
                        initialValue={user.phoneNumber}
                        onSave={(newValue) =>
                          handleSaveUserOption(
                            user._id,
                            newValue,
                            "phoneNumber"
                          )
                        }
                      />
                    </td>
                    <td className="cursor-pointer hover:bg-gray-300 my-2">
                      <EditableCell
                        initialValue={user.email}
                        onSave={(newValue) =>
                          handleSaveUserOption(user._id, newValue, "email")
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="bg-gray-600 text-white hover:bg-gray-700 p-2 font-bold rounded-md my-2"
                        onClick={() => handleOpenMenu(user)}
                      >
                        メニュー
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-gray-600 text-white hover:bg-gray-700 p-2 font-bold rounded-md my-2"
                        onClick={() => handleAccountDetails(user._id)}
                      >
                        詳細を確認
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {menuModal ? (
            <ValueContext.Provider
              value={{
                setMenuModal,
                selectAccountId,
                setSelectAccountId,
                selectAccountCompany,
                setSelectAccountCompany,
                selectAccountName,
                setSelectAccountName,
              }}
            >
              <MenuModal />
            </ValueContext.Provider>
          ) : null}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce mx-2"></div>
          <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce mx-2"></div>
          <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce mx-2"></div>
        </div>
      )}

      {/* Pagination */}
      {allUsers && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            ◀ Prev
          </button>
          <div className="bg-gray-300 text-gray-800 font-bold py-2 px-4">
            {pageNumber}
          </div>
          <button
            onClick={handleNextPage}
            className={`${
              hasNextPage
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-200 cursor-not-allowed"
            } text-gray-800 font-bold py-2 px-4 rounded-r`}
            disabled={!hasNextPage}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
