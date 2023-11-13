import { createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Usercontext = createContext();

const UserContext = ({ children }) => {
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

UserStore.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
