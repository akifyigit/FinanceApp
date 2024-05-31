import { loginApiMiddleware } from "./auth/loginApi";
import { debtsApiMiddleware } from "./debts/debtsApi";

const middleware = [loginApiMiddleware, debtsApiMiddleware];
export default middleware;
