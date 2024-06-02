import React, { useState } from "react";
import {
  useDeleteDebtMutation,
  useGetDebtsQuery,
} from "../../redux/debts/debtsApi";
import { useNavigate } from "react-router-dom";
import { apiResHandler } from "../../utils/api";
import Alert from "../../components/Alert";

const Debts = () => {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: "",
    message: "",
  });
  const { data: debts, isLoading, refetch } = useGetDebtsQuery("");
  const [deleteDebt] = useDeleteDebtMutation();
  const handleEdit = (id: string) => {
    navigate(`/debts-update/${id}`);
  };

  const handleShowPaymentPlan = (id: string) => {
    navigate(`/payment-plan/${id}`);
  };
  const handleDelete = (id: string) => {
    apiResHandler(
      deleteDebt({ id }),
      () => {
        setAlertInfo({
          show: true,
          status: "success",
          message: "Ödeme Kaydı başarıyla güncellendi.",
        });
        refetch();
      },
      () => {
        console.error(" Ödeme Kaydı Güncellenemedi:");
        setAlertInfo({
          show: true,
          status: "error",
          message: "Ödeme Kaydı Güncellenemedi.Lütfen tekrar deneyin.",
        });
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-3xl font-bold">
        Yükleniyor...
      </div>
    );

  return (
    <>
      <div className="flex  flex-wrap justify-start m-4 ">
        {debts?.data?.map((debt: any) => (
          <div
            key={debt.id}
            className="p-4 m-4 border rounded shadow w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <button
              onClick={() => handleDelete(debt.id)}
              className="w-10 h-10 bg-red-500 float-right text-white rounded"
            >
              X
            </button>
            <p>
              <strong>Aktiflik:</strong> <strong>Aktiflik:</strong>
              <i
                className={
                  debt.isActive
                    ? "ml-2 fa-solid fa-circle-check "
                    : "fa-solid fa-circle-xmark"
                }
              />
            </p>
            <p>
              <strong>Borcun Adı:</strong> {debt.debtName}
            </p>
            <p>
              <strong>Borç alınan kişi/yer:</strong> {debt.lenderName}
            </p>
            <p>
              <strong>Borç miktarı:</strong> {debt.debtAmount}
            </p>
            <p>
              <strong>Faiz oranı:</strong> {debt.interestRate}
            </p>
            <p>
              <strong>Miktar:</strong> {debt.amount}
            </p>
            <p>
              <strong>Ödeme başlangıç tarihi:</strong>{" "}
              {new Date(debt.paymentStart).toLocaleDateString()}
            </p>
            <p>
              <strong>Taksit sayısı:</strong> {debt.installment}
            </p>
            <p>
              <strong>Açıklama:</strong> {debt.description}
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEdit(debt.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleShowPaymentPlan(debt.id)}
                className="bg-purple-500 text-white px-4 py-2 rounded-md"
              >
                Ödeme planı gör
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center m-8">
        <button
          onClick={() => navigate("/debts-create")}
          className="bg-green-500 text-white px-6 py-3 rounded-md"
        >
          Yeni Borç Ekle
        </button>
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
    </>
  );
};

export default Debts;
