import React, { useState } from "react";

interface InputProps {
  label: string;
  id: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
}) => {
  const [textVisible, setTextVisible] = useState(false);
  const handleTextVisible = () => {
    setTextVisible(!textVisible);
  };

  return (
    <div className="w-full">
      <div>{label}</div>
      <div className="relative flex gap-x-2 items-center">
        <input
          type={type === "password" && !textVisible ? "password" : "text"}
          placeholder=""
          id={id}
          name={name}
          className="max-h-10 outline-none border rounded w-full text-small px-4 py-3"
          value={value || ""}
          onChange={onChange}
        />
        {type === "password" && (
          <i
            className="absolute right-1 cursor-pointer fa-solid fa-eye"
            onClick={() => handleTextVisible()}
          ></i>
        )}
      </div>
    </div>
  );
};

export default Input;
