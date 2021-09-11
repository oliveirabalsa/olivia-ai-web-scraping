import Axios from "axios";
import axiosRetry from "axios-retry";

export const http = Axios.create({
  baseURL: process.env.BASE_URL,
});

axiosRetry(http, { retries: 3 });

