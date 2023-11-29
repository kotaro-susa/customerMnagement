import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CompanyAddresses = {
  address: string;
  buildingName: string;
  createdAt: string;
  industry: string;
  name: string;
  phoneNumber: string;
  pref: string;
  streetAddress: string;
  tenantId: string;
  updatedAt: string;
  userId: string;
  zipCode: string;
  __v: number;
  _id: string;
};

// メールアドレスのバリデーションチェック
const validateEmail = (email: string): boolean => {
  const gmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return gmailPattern.test(email);
};

// 電話番号のバリデーションチェック
const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberPattern = /^\d{10,11}$/;
  return phoneNumberPattern.test(phoneNumber);
};

const ModalContent = ({
  setModalState,
}: {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // 会社名
  const [company, setCompany] = useState("");
  // 会社Id
  const [companyId, setCompanyId] = useState("");
  // 担当者名
  const [name, setName] = useState("");
  // 電話番号
  const [phoneNumber, setPhoneNumber] = useState("");
  // メールアドレス
  const [email, setEmail] = useState("");
  // 会社の候補
  const [companyOption, setCompanyOption] = useState<CompanyAddresses[] | null>(
    null
  );
  // エラー表示(全体)
  const [error, setError] = useState("");
  // Emailのエラー表示
  const [emailError, setEmailError] = useState("");
  // 電話番号のエラー表示
  const [phoneNumberError, setPhoneNumberError] = useState("");
  // 入力欄の制御
  const [companyInputBoolean, setCompanyInputBoolean] = useState(false);
  // ルート遷移
  const router = useRouter();
  const { data: session } = useSession();
  // アカウント作成用の通信
  const createAccount: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setError("");
    setPhoneNumberError("");
    setEmailError("");
    if (!company || !name || !phoneNumber || !email) {
      setError("全ての項目に記入してください");
      return;
    }

    if (!validatePhoneNumber(phoneNumber) && !validateEmail(email)) {
      setPhoneNumberError("正しい形式の電話番号を入力してください");
      setEmailError("正しい形式のメールアドレスを入力してください");
      return;
    } else if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError("正しい形式の電話番号を入力してください");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("正しい形式のメールアドレスを入力してください");
      return;
    }

    try {
      const res = await fetch(`./api/createClient`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          companyId,
          name,
          phoneNumber,
          email,
        }),
      });
      if (res.ok) {
        router.push("/");
        setModalState((pre) => !pre);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setModalState((pre) => !pre);
  };

  useEffect(() => {
    const Controller = new AbortController();
    const signal = Controller.signal;
    const suggestionCompany = async () => {
      try {
        if (company !== "") {
          const res = await fetch(`api/clientSearch/${company}`, {
            method: "GET",
            signal: signal,
          });
          if (res.ok) {
            const data = await res.json();
            setCompanyOption(data.suggestions);
          }
        } else if (company === "") {
          setCompanyOption(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (companyInputBoolean) {
      suggestionCompany();
    }
    return () => {
      Controller.abort();
    };
  }, [company]);

  const SelectCompany = (option: CompanyAddresses) => {
    setCompany(option.name);
    setCompanyId(option._id);
    setCompanyOption(null);
    setCompanyInputBoolean(false);
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-6">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-bold text-gray-700"
          >
            会社名
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring focus:border-blue-300"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            id="company"
            autoComplete="off"
            onFocus={() => setCompanyInputBoolean(true)}
            onBlur={() => setCompanyInputBoolean(false)}
          />
          {companyOption && (
            <ul className="mt-2 border rounded-md overflow-hidden">
              {companyOption.map((option, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 px-3 py-2"
                  onClick={() => SelectCompany(option)}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">
            担当者名
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring focus:border-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">
            担当者電話番号（ハイフン無し）
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring focus:border-blue-300"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="phoneNumber"
            autoComplete="off"
          />
          {phoneNumberError && (
            <div>
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md my-2">
                {phoneNumberError}
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">
            担当者メールアドレス
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="Email"
            autoComplete="off"
          />
          {emailError && (
            <div>
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md my-2">
                {emailError}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-gray-600 text-white hover:bg-gray-700 p-2 font-bold rounded-md"
            onClick={createAccount}
          >
            クライアント新規作成
          </button>
          <button
            className="bg-gray-600 text-white hover:bg-gray-700 ml-4 p-2 rounded-md"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-4">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default ModalContent;
