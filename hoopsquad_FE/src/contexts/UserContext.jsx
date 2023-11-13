import { createContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Usercontext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `https://hoopsquad.link/profile/user/${userId}`
      );
      setUser(response.data.Name);
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
