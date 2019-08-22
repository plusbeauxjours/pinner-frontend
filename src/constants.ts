import dotenv from "dotenv";
dotenv.config();
require("dotenv").config();

const API_SERVER = "https://pinner-fun.herokuapp.com";
export const BACKEND_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : API_SERVER;
