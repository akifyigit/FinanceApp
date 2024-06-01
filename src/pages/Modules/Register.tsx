import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Alert from "../../components/Alert";
import { apiResHandler } from "../../utils/api";
import { useRegisterMutation } from "../../redux/auth/loginApi";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [Register] = useRegisterMutation();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });
  const [passwordAgain, setPasswordAgain] = useState<String>("");
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
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (passwordAgain === registerForm.password) {
      apiResHandler(
        Register({ data: registerForm }),
        (res: any) => {
          console.log(res);
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
          console.error("Register failed:", error);
          setAlertInfo({
            show: true,
            status: `error`,
            message: `Kayıt Başarısız.Lütfen tekrar deneyin.Hata Sebebi:${error.message}`,
          });
        }
      );
    } else {
      setAlertInfo({
        show: true,
        status: "error",
        message: "Şifreler uyuşmuyor. Lütfen tekrar deneyin",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mx-auto bg-white w-full sm:w-96 rounded-md shadow-2xl p-0 border-4">
          <form
            className="flex flex-col gap-y-4 items-center justify-center p-6 "
            onSubmit={handleRegister}
          >
            <Input
              name="email"
              label="Mail adresi"
              id="email"
              value={registerForm.email}
              onChange={handleInputOnChange}
            />
            <Input
              name="name"
              label="İsim"
              id="name"
              value={registerForm.name}
              onChange={handleInputOnChange}
            />
            <Input
              name="password"
              label="Şifre"
              id="password"
              type="password"
              value={registerForm.password}
              onChange={handleInputOnChange}
            />
            <Input
              name="password"
              label="Şifre Tekrar"
              id="password"
              type="password"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            <div className="flex flex-row justify-between">
              <button
                className="bg-black p-3 mr-2 text-white rounded-md"
                type="submit"
                onClick={handleRegister}
              >
                Kayıt Ol
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="bg-black p-3 ml-2 text-white rounded-md"
              >
                Geri dön
              </button>
            </div>
          </form>
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

export default Register;
