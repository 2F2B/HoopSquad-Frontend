import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

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

  return (
    <Usercontext.Provider value={{ user, setUser, getUserInfo }}>
      {children}
    </Usercontext.Provider>
  );
};

UserStore.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
