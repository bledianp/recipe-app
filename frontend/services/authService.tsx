import { api } from "../lib/axios";

export const registerUser = async (email: string, password: string) => {
    console.log(email);
    console.log(password);
  return api.post("/user/register", { email, password })
}

export const loginUser = async (email: string, password: string) => {
  return api.post("/user/login", { email, password })
}