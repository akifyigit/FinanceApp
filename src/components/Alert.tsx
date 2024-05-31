import React, { useEffect, useState } from "react";
import { Transition } from "@tailwindui/react";

interface AlertProps {
  status?: string;
  position?: string;
  message?: string;
  showAlert?: boolean;
  duration?: number;
  handleOnClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  status = "info",
  position = "bottom-right",
  message = "",
  showAlert = false,
  duration = 2000,
  handleOnClose = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(showAlert);
  }, [showAlert]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, duration);
    } else {
      handleOnClose?.();
    }
  }, [isOpen]);

  const handleStatus = () => {
    switch (status) {
      case "success":
        return "bg-green-300 border-green-300";
      case "error":
        return "bg-red-300 border-red-700";
      case "warning":
        return "bg-yellow-300 border-700";
      case "info":
      default:
        return "bg-black-300 border-black-900";
    }
  };

  const handlePosition = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-0 left-0 mb-4 ml-4";
      case "top-left":
        return "left-0 top-0 mt-4 ml-4";
      case "top-right":
        return "top-0 right-0 mt-4 mr-4";
      case "bottom-right":
      default:
        return "bottom-0 right-0 mb-4 mr-4";
    }
  };

  const handleIcon = () => {
    switch (status) {
      case "success":
        return "fa-circle-check text-green";
      case "error":
        return "fa-triangle-exclamation text-red";
      case "warning":
        return "fa-circle-exclamation text-yellow";
      case "info":
      default:
        return "fa-circle-info text-ink";
    }
  };

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`fixed z-50 flex items-center w-fit px-6 py-4 rounded border ${handleStatus()} ${handlePosition()}`}
        role="alert"
      >
        <i className={`fa-solid ${handleIcon()} mr-2`} />
        <text className="font-bold">{message}</text>
        <i
          onClick={() => setIsOpen(false)}
          className="absolute top-1 right-1 fa-solid fa-circle-xmark cursor-pointer"
        />
      </div>
    </Transition>
  );
};

export default Alert;
