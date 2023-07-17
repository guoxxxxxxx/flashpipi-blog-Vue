// const baseUrl = "http://192.168.50.37:8080";
const baseUrl = "http://localhost:8080"


import axios from "axios";

const request = axios.create({
    baseURL: baseUrl,
    timeout: 1000 * 3,
})

export default request;