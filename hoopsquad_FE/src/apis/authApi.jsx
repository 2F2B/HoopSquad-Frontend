import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_PROXY } from "@env";

const authApi = axios.create({
  baseURL: REACT_APP_PROXY,
  timeout: 5000,
});

authApi.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    } catch (error) {
      console.error("fail to get token :", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Interceptor error :", error);
    return Promise.reject(error);
  }
);

export default authApi;
