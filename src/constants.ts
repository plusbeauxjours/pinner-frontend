import dotenv from "dotenv";
dotenv.config();
require("dotenv").config();

// const MEDIA_URL = "https://pinner-backend.herokuapp.com";
const BUCKET_URL = process.env.REACT_APP_AWS_STORAGE_BUCKET_NAME;
export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : `https://${BUCKET_URL}.s3.amazonaws.com`;
