import axios from 'axios';

const PORT = 3008;
const URL_API = `http://localhost:${PORT}`

export const registerAPI = async(payload) => axios.post(`${URL_API}/users/register`, payload)

export const loginAPI = async(payload) => axios.post(`${URL_API}/users/login`, payload)


export const addToCartAPI = async(payload) => axios.post(`${URL_API}/shoebill/create`, payload)
export const getShoeByUserAPI = async(payload) => axios.post(`${URL_API}/shoebill/user/cart`, payload)

export const removeFromCartAPI = async(payload) => axios.post(`${URL_API}/shoebill/delete`, payload)

export const changeAmountInCartAPI = async(payload) => axios.post(`${URL_API}/shoebill/changeAmount`, payload)

export const createBillAPI = async(payload) => axios.post(`${URL_API}/bill`, payload)

export const updateStatusBillAPI = async(payload) => axios.post(`${URL_API}/bill/updateStatus`, payload)

export const getBillByUserAPI = async(payload) => axios.post(`${URL_API}/bill/user`, payload)

export const getDataExport = async(payload) => axios.get(`${URL_API}/bill/statistics?month=${payload.month}&year=${payload.year}`)