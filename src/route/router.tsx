import React, { lazy } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NonLoginRoute from "./NonLoginRoute";
import ProtectedRoute from "./ProtectedRoute";

const Register = lazy(() => import("../pages/Modules/Register"));
const Login = lazy(() => import("../pages/Modules/Login"));
const NotFound = lazy(() => import("../pages/Layout/NotFound"));
const DashboardView = lazy(() => import("../pages/Views/DashboardView"));
const DebtsView = lazy(() => import("../pages/Views/DebtsView"));
const DebtsCreateView = lazy(() => import("../pages/Views/DebtsCreateView"));
const DebtsUpdateView = lazy(() => import("../pages/Views/DebtsUpdateView"));
const PaymentPlansView = lazy(() => import("../pages/Views/PaymentPlansView"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <NonLoginRoute>
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            </NonLoginRoute>
          }
        />
        <Route
          path="/register"
          element={
            <NonLoginRoute>
              <React.Suspense fallback={<>...</>}>
                <Register />
              </React.Suspense>
            </NonLoginRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <NotFound />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <DashboardView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/debts"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <DebtsView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/debts-create"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <DebtsCreateView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/debts-update/:id"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <DebtsUpdateView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-plan/:id"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <PaymentPlansView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
