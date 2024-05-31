import React from "react";

import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="text-black text-center flex flex-col h-screen w-screen items-center justify-center gap-y-4">
      <div className=" border border-default-border flex w-full md:w-2/3 h-52">
        <h2 className="text-black text-title1 font-semibold w-full m-auto ">
          404
        </h2>
        <p className=" font-bold text-large m-auto border-l-2 border-default-border ml-4 p-8 w-full">
          Sayfa Bulunamadı{" "}
        </p>
      </div>
      <button
        className="w-40 h-12 bg-blue-300 rounded-lg"
        onClick={() => navigate("/dashboard")}
      >
        Ana Sayfaya dön
      </button>
    </div>
  );
};

export default Page404;
