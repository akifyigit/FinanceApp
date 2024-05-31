import React, { FC } from "react";

import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  children: React.ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = (props) => {
  const clientToken = localStorage.getItem("clientToken");

  if (clientToken) {
    return <>{props.children}</>;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;
