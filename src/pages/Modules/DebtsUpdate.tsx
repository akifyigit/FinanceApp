import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDebtsInfo,
  debtInfoSelector,
  setDebtInfo,
} from "../../redux/debts/debtSlice";
import Modal from "../../components/Modal";
import { apiResHandler } from "../../utils/api";
import Alert from "../../components/Alert";
import {
  useGetDebtsByIdQuery,
  useUpdateDebtMutation,
} from "../../redux/debts/debtsApi";
import { useNavigate, useParams } from "react-router";

interface PaymentPlan {
  paymentDate: string;
  paymentAmount: number;
}

const DebtsUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams();
  const [updateDept] = useUpdateDebtMutation();
  const debtInfo = useSelector(debtInfoSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const isValid = Object.values(debtInfo).every((value) => !!value);
    setIsFormValid(isValid);
  }, [debtInfo]);
  const debtInfoById = useGetDebtsByIdQuery(id);
  useEffect(() => {
    if (debtInfoById?.data?.data) {
      Object.entries(debtInfoById.data.data).forEach(([field, value]) => {
        dispatch(setDebtInfo({ field, value }));
      });
    }
  }, [debtInfoById, dispatch]);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: "",
    message: "",
  });
  const handleChange = (field: string, value: any) => {
    dispatch(setDebtInfo({ field, value }));
  };
  useEffect(() => {
    clearDebtsInfo();
  }, []);
  const amountWithInterest = useMemo(() => {
    return (
      debtInfo.debtAmount *
      (1 + (debtInfo.interestRate / 100) * debtInfo.installment)
    );
  }, [debtInfo.debtAmount, debtInfo.interestRate, debtInfo.installment]);
  useEffect(() => {
    handleChange("amount", amountWithInterest);
  }, [amountWithInterest]);

  const calculatePaymentPlan = () => {
    const { installment, paymentStart } = debtInfo;
    const plan: PaymentPlan[] = [];
    let paymentDate = new Date(paymentStart);
    for (let i = 0; i < installment; i++) {
      plan.push({
        paymentDate: paymentDate.toISOString().split("T")[0],
        paymentAmount: amountWithInterest / installment,
      });
      paymentDate.setMonth(paymentDate.getMonth() + 1);
    }
    setPaymentPlan(plan);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    handleChange("paymentPlan", paymentPlan);
  }, [paymentPlan]);

  const handlePlanSave = () => {
    setIsModalOpen(false);
    handleSubmit("");
  };

  const handleSubmit = (event: any) => {
    apiResHandler(
      updateDept({ data: { ...debtInfo, id: id.id }, id: id.id }),
      () => {
        setAlertInfo({
          show: true,
          status: "success",
          message: "Borç Kaydı başarıyla güncellendi.",
        });
        navigate("/debts");
      },
      () => {
        console.error(" Borç Oluşturulamadı:");
        setAlertInfo({
          show: true,
          status: "error",
          message: "Borç Oluşturulamadı.Lütfen tekrar deneyin.",
        });
      }
    );
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 gap-4 p-6 bg-white shadow-2xl rounded-lg">
        <div className="w-full text-center text-xl font-bold ">
          Borcu Düzenle
        </div>
        <div className="flex flex-col items-center  ">
          <div className="flex flex-row items-center m-2">
            <label htmlFor="debtName" className="w-40 text-right mr-4">
              Borç Adı:
            </label>
            <input
              required
              className="border-black border rounded p-2 w-full"
              name="debtName"
              id="debtName"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={debtInfo.debtName}
            />
          </div>
          <div className="flex flex-row items-center m-2">
            <label htmlFor="lenderName" className="w-40 text-right mr-4">
              Borç Alınan kişi/kurum:
            </label>
            <input
              required
              className="border-black border rounded p-2 w-full"
              name="lenderName"
              id="lenderName"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={debtInfo.lenderName}
            />
          </div>
          <div className="flex flex-row items-center m-2">
            <label htmlFor="debtAmount" className="w-40 text-right mr-4">
              Alınan Borç Miktarı:
            </label>
            <input
              required
              className="border-black border rounded p-2 w-full"
              name="debtAmount"
              id="debtAmount"
              type="number"
              onChange={(e) =>
                handleChange(e.target.name, parseFloat(e.target.value))
              }
              value={debtInfo.debtAmount}
            />
          </div>
          <div className="flex flex-row items-center m-2">
            <label htmlFor="interestRate" className="w-40 text-right mr-4">
              Faiz oranı:
            </label>
            <input
              required
              className="border-black border rounded p-2 w-full"
              name="interestRate"
              id="interestRate"
              type="number"
              onChange={(e) =>
                handleChange(e.target.name, parseFloat(e.target.value))
              }
              value={debtInfo.interestRate}
            />
          </div>{" "}
          <div className="flex flex-row items-center m-2">
            <label htmlFor="installment" className="w-40 text-right mr-4">
              Taksit Sayısı:
            </label>
            <input
              required
              className="border-black border rounded p-2 w-full"
              name="installment"
              id="installment"
              type="number"
              onChange={(e) =>
                handleChange(e.target.name, parseFloat(e.target.value))
              }
              value={debtInfo.installment}
            />
          </div>
          <div className="flex flex-row items-center m-2">
            <label htmlFor="amount" className="w-40 text-right mr-4">
              Ödenecek Borç Miktarı:
            </label>
            <input
              disabled
              className="border-black border rounded p-2 w-full"
              name="amountWithInterest"
              id="amountWithInterest"
              type="number"
              value={amountWithInterest}
            />
          </div>
          <div className="flex flex-row items-center m-2">
            <label htmlFor="paymentStart" className="w-40 text-right mr-4">
              Ödeme Başlama Tarihi:
            </label>
            <input
              required
              className="border-black border rounded p-2 w-full"
              name="paymentStart"
              id="paymentStart"
              type="date"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={debtInfo.paymentStart}
            />
          </div>
          <div className="flex flex-row items-center m-2">
            <label htmlFor="description" className="w-40 text-right mr-4">
              Açıklama:
            </label>
            <input
              className="border-black border rounded p-2 w-full"
              name="description"
              id="description"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={debtInfo.description}
            />
          </div>
          <button
            type="button"
            className={`bg-green-500 text-white p-2 rounded mt-4 ${
              !isFormValid && "opacity-50 cursor-not-allowed"
            }`}
            onClick={calculatePaymentPlan}
            disabled={!isFormValid}
          >
            Ödeme Planını Aç
          </button>
        </div>
      </div>

      {/* Modal for payment plans */}
      <Modal
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xl"
        isOpen={isModalOpen}
        handleModalClose={handleModalClose}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Payment Plans</h2>
          {paymentPlan.map((plan, index) => (
            <div key={index} className="flex flex-row items-center mb-4">
              <label
                className="mr-4 w-40 text-right"
                htmlFor={`paymentDate-${index}`}
              >
                Ödeme Günü:
              </label>
              <input
                className="border border-black rounded p-2 w-full mr-2"
                name={`paymentDate-${index}`}
                id={`paymentDate-${index}`}
                type="date"
                value={plan.paymentDate}
                readOnly
              />
              <label
                className="mr-4 w-40 text-right"
                htmlFor={`paymentAmount-${index}`}
              >
                Ödeme Miktarı:
              </label>
              <input
                className="border border-black rounded p-2 w-full"
                name={`paymentAmount-${index}`}
                id={`paymentAmount-${index}`}
                type="number"
                value={plan.paymentAmount}
                readOnly
              />
            </div>
          ))}

          <button
            type="button"
            className="bg-green-500 text-white p-2 rounded mt-4"
            onClick={handleModalClose}
          >
            Vazgeç
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={handlePlanSave}
          >
            Planı Oluştur
          </button>
        </div>
      </Modal>
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
  );
};

export default DebtsUpdate;
