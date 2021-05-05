import axios from "axios";

const httpClient = axios.create({
  baseUrl: "http://localhost:1933",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export default httpClient;
