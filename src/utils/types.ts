// types.ts
export interface PaymentPlan {
  paymentDate: string;
  paymentAmount: number;
}

export interface DebtInfo {
  id: string;
  debtName: string;
  lenderName: string;
  debtAmount: number;
  interestRate: number;
  amount: number;
  paymentStart: string;
  installment: number;
  description: string;
  paymentPlan: PaymentPlan[];
}
