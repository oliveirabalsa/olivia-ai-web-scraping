import Axios from "axios";
import axiosRetry from "axios-retry";

export const http = Axios.create({
  baseURL: "https://fit-web-scraping-challenge.herokuapp.com/",
});

axiosRetry(http, { retries: 3 });

