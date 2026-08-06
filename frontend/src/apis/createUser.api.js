// imported items:-
import axiosInstance from "../utils/axiosInstance.js"

// register a new user:-
export const registerUser = async (name, email, password) => {
  const { data } = await axiosInstance.post("/api/auth/register", { name, email, password })
  return data;
}

// login for registered user:-
export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post("/api/auth/login", { email, password })
  return data
}

// current login user:-
export const currentUser = async () => {
  const { data } = await axiosInstance.get("/api/auth/me")
  return data;
}

// logout the user:-
// export const logoutUser = async () => {
//   const res = await axiosInstance.post("/api/auth/register")
//   console.log(res);
// }
