import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/auth/loginApi";
import Input from "../../components/Input";
import Alert from "../../components/Alert";
import { apiResHandler } from "../../utils/api";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: "",
    message: "",
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    apiResHandler(
      login({ data: loginForm }),
      (res: any) => {
        localStorage.clear();
        localStorage.setItem("clientToken", res.data);

        navigate("/dashboard");
        setAlertInfo({
          show: true,
          status: `success`,
          message: "Giriş Başarılı",
        });
      },
      (error: any) => {
        console.error("Login failed:", error);
        setAlertInfo({
          show: true,
          status: `error`,
          message: "Giriş Başarısız.Lütfen tekrar deneyin",
        });
      }
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mx-auto bg-white w-full sm:w-96 rounded-md shadow-2xl p-0 border-4">
          <div className="flex flex-col gap-y-4 items-center justify-center p-6 ">
            <Input
              name="email"
              label="email"
              id="email"
              value={loginForm.email}
              onChange={handleInputOnChange}
            />
            <Input
              name="password"
              label="Password"
              id="password"
              type="password"
              value={loginForm.password}
              onChange={handleInputOnChange}
            />
            <div className="flex flex-row justify-between">
              <button
                className="bg-black p-3 mr-2 text-white rounded-md"
                type="submit"
                onClick={handleLogin}
              >
                Giriş Yap
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="bg-black p-3 ml-2 text-white rounded-md"
              >
                Kayıt Ol
              </button>
            </div>
          </div>
          <Alert
            message={alertInfo.message}
            position=""
            status={alertInfo.status}
            showAlert={alertInfo.show}
            handleOnClose={() =>
              setAlertInfo({ show: false, status: "", message: "" })
            }
          />
        </div>
      </div>
    </>
  );
};

export default Login;
