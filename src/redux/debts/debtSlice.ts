import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the types for the state
interface PaymentPlan {
  paymentDate: string;
  paymentAmount: number;
}

interface DebtInfo {
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

interface DebtState {
  debtInfo: DebtInfo;
}
const initialState: DebtState = {
  debtInfo: {
    debtName: "",
    lenderName: "",
    debtAmount: 0,
    interestRate: 0,
    amount: 1,
    paymentStart: "",
    installment: 0,
    description: "",
    paymentPlan: [
      {
        paymentDate: "",
        paymentAmount: 0,
      },
    ],
  },
};

export const debtSlice = createSlice({
  name: "debts",
  initialState,
  reducers: {
    setDebtInfo: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      (state.debtInfo as any)[field] = value;
    },
    clearDebtsInfo: () => initialState,
  },
});

export const debtInfoSelector = (state: RootState) => state.debts.debtInfo;
export const { setDebtInfo, clearDebtsInfo } = debtSlice.actions;
export const debtReducerName = debtSlice.name;
export const debtReducer = debtSlice.reducer;
