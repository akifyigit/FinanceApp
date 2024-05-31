import React, { useState } from "react";
import {
  useGetPaymentPlansByIdQuery,
  useUpdatePaymentPlansMutation,
} from "../../redux/debts/debtsApi";
import { useParams } from "react-router";
import { apiResHandler } from "../../utils/api";
import Alert from "../../components/Alert";

const PaymentPlansTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [updatedPaymentPlan, setUpdatedPaymentPlan] = useState({
    paymentDate: "",
    paymentAmount: 0,
    isPaid: true,
  });
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: "",
    message: "",
  });
  const {
    data: paymentPlans,
    isLoading,
    isError,
    refetch,
  } = useGetPaymentPlansByIdQuery({ id });
  console.log(paymentPlans);
  const [updatePaymentPlan] = useUpdatePaymentPlansMutation();

  const handleUpdateStatus = (paymentPlanId: string) => {
    console.log(paymentPlanId);
    const planToUpdate = paymentPlans.data.find(
      (plan: any) => plan.id === paymentPlanId
    );
    setUpdatedPaymentPlan({
      paymentDate: planToUpdate.paymentDate,
      paymentAmount: planToUpdate.paymentAmount,
      isPaid: true,
    });
    apiResHandler(
      updatePaymentPlan({
        data: {
          ...updatedPaymentPlan,
        },
        id: paymentPlanId,
      }),
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

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="flex justify-center mt-10">
      <table className="border-collapse border w-3/4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Ödeme Tarihi</th>
            <th className="border p-2">Ödeme Miktarı</th>
            <th className="border p-2">Ödeme Durumu</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentPlans.data.map((plan: any) => (
            <tr key={plan.id}>
              <td className="border p-2">
                {new Date(plan.paymentDate).toLocaleDateString()}
              </td>
              <td className="border p-2">{plan.paymentAmount}</td>
              <td className="border p-2">
                {plan.isPaid ? "Ödendi" : "Ödenmedi"}
              </td>
              <td className="border p-2">
                {!plan.isPaid && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleUpdateStatus(plan.id)}
                  >
                    Ödenmiş olarak işaretle.
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default PaymentPlansTable;
