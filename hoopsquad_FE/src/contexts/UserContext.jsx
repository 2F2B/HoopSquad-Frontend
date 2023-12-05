import { createContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_PROXY } from "@env";
const Usercontext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `${REACT_APP_PROXY}profile/user/${userId}`
      );
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser("");
    AsyncStorage.clear();
  };

  return (
    <Usercontext.Provider value={{ user, setUser, getUserInfo, logout }}>
      {children}
    </Usercontext.Provider>
  );
};

export default Usercontext;
