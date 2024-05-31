import { loginApiReducer, loginApiReducerName } from "./auth/loginApi";
import { debtReducer, debtReducerName } from "./debts/debtSlice";
import { debtsApiReducer, debtsApiReducerName } from "./debts/debtsApi";

const rootReducer = {
  [loginApiReducerName]: loginApiReducer,
  [debtsApiReducerName]: debtsApiReducer,
  [debtReducerName]: debtReducer,
};

export default rootReducer;
