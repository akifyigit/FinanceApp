import React, { useEffect, useState } from "react";
import { useGetDebtsQuery } from "../../redux/debts/debtsApi";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import { format, addMonths, parseISO } from "date-fns";

const monthNames = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const getNextMonths = (numMonths: number) => {
  const currentMonth = new Date().getMonth();
  return Array.from(
    { length: numMonths },
    (_, i) => monthNames[(currentMonth + i) % 12]
  );
};

const Dashboard = () => {
  const { data: debts, isLoading: isLoadingDebts } = useGetDebtsQuery("");
  const [debtAmount, setDebtAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [monthlyDebts, setMonthlyDebts] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    if (debts) {
      const totalDebtAmount = debts.data.reduce(
        (acc: number, debt: any) => acc + debt.debtAmount,
        0
      );
      const totalAmount = debts.data.reduce(
        (acc: number, debt: any) => acc + debt.amount,
        0
      );

      setDebtAmount(totalDebtAmount);
      setAmount(totalAmount);

      const groupedDebts: { [key: string]: number } = {};

      debts.data.forEach((debt: any) => {
        const { paymentStart, installment, debtAmount } = debt;
        const monthlyPayment = debtAmount / installment;

        const parsedDate = parseISO(paymentStart);

        for (let i = 0; i < installment; i++) {
          const month = format(addMonths(parsedDate, i), "yyyy-MM");
          if (!groupedDebts[month]) {
            groupedDebts[month] = 0;
          }
          groupedDebts[month] += monthlyPayment;
        }
      });

      setMonthlyDebts(groupedDebts);
    }
  }, [debts]);

  const upcomingMonths = getNextMonths(4);
  const upcomingMonthsKeys = Array.from({ length: 4 }, (_, i) =>
    format(addMonths(new Date(), i), "yyyy-MM")
  );
  const upcomingPayments = upcomingMonthsKeys.map(
    (month) => monthlyDebts[month] || 0
  );

  if (isLoadingDebts)
    return (
      <div className="flex justify-center items-center text-3xl font-bold">
        Yükleniyor...
      </div>
    );
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">Dashboard</h1>
      <div className="p-6 flex  justify-around m-10">
        <PieChart
          labels={["Alınan Borç Miktarı", "Ödenecek Borç Miktarı"]}
          data={[debtAmount, amount]}
        />
        <BarChart labels={upcomingMonths} data={upcomingPayments} />
      </div>
    </>
  );
};

export default Dashboard;
