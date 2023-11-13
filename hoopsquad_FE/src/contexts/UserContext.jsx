import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Usercontext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`,
        {}
      );
      setUser(response.data.Profile.Name);
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
