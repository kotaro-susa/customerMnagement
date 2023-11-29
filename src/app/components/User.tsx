"use client";
import React, { useEffect, useState } from "react";

type allUser = { _id: string; email: string; name: string; isRole: string };

const User = () => {
  const [allUser, setAllUser] = useState<allUser[] | null>(null);
  useEffect(() => {
    const UserInfoDisplay = async () => {
      try {
        const res = await fetch(`./api/userList`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setAllUser(data.allUser);
        }
      } catch (error) {
        console.log("エラーだよ", error);
      }
    };
    UserInfoDisplay();
  }, []);

  return (
    <div>
      <div>ユーザーの管理</div>
      <table>
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th>登録メールアドレス</th>
            <th>ロール</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isRole}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
