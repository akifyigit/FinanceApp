import React, { FC, useEffect } from "react";

import { useNavigate } from "react-router-dom";

interface INonLoginRoute {
  children: React.ReactNode;
}

const NonLoginRoute: FC<INonLoginRoute> = (props) => {
  const navigate = useNavigate();
  const clientToken = localStorage.getItem("clientToken");
  const handleNavigate = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (clientToken) {
      handleNavigate();
    }
  }, []);

  return <>{props.children}</>;
};

export default NonLoginRoute;
