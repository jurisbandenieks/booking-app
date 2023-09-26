import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { auth } from "../config";

const axiosHttp = axios.create({
  baseURL: "/auth"
});

axiosHttp.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    // Fetch the token each time, if necessary
    const token = await auth.currentUser?.getIdToken();

    if (token && config.headers) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosHttp.interceptors.response.use(
  (response: AxiosResponse) => {
    //const url = response.config.url;

    //setLocalStorageToken(token);
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      //(`unauthorized :)`);
      //localStorage.removeItem("persist:root");
      //removeLocalStorageToken
      //window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosHttp;
