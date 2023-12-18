"use client";

import React, { useEffect } from "react";
import CaseListPresenter from "./CaseList.presenter";

const CaseListContainer = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`.../api/project`, {
          method: "GET",
        });
        if (res.ok) {
          console.log("成功");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <CaseListPresenter />
    </div>
  );
};

export default CaseListContainer;
