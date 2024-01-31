import axios from "axios";
export const BASE_URL = 'http://82.97.241.205/';
export const CLIENT_URL = 'http://localhost:5173/'

export const commentsBase = axios.create({
    baseURL: `${BASE_URL}api/comments/get`
})

export const paymentBase = axios.create({
    baseURL: `${BASE_URL}api/payment`,
})