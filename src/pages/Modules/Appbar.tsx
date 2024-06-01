import React from "react";
import { useNavigate } from "react-router";

const Appbar = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    localStorage.setItem("clientToken", "");
    navigate("/");
  };
  return (
    <div className="w-full bg-gray-600 h-fit flex items-center justify-between px-6">
      <div></div>
      <div className="text-white text-3xl">Finance App</div>
      <button
        className="border bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 focus:outline-none"
        onClick={handleNavigate}
      >
        Çıkış Yap
      </button>
    </div>
  );
};

export default Appbar;
