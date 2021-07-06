import Axios from "axios";

export const http = Axios.create({
  baseURL: "https://fit-web-scraping-challenge.herokuapp.com/",
});
