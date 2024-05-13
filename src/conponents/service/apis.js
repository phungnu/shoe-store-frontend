import axios from 'axios';

const PORT = 3008;
const URL_API = `http://localhost:${PORT}`

export const registerAPI = async(payload) => axios.post(`${URL_API}/user/register`, payload)

export const loginAPI = async(payload) => axios.post(`${URL_API}/user/login`, payload)