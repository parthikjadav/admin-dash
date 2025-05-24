import axios from "axios";
import config from "./env"

const api = axios.create({
    baseURL: `${config.BASE_URL}/api`,
    withCredentials: true,
})

export default api;