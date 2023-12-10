import { createContext, useState } from "react";
const Locationcontext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [address, setAddress] = useState("장소를 선택해주세요");

  return (
    <Locationcontext.Provider
      value={{ location, setLocation, address, setAddress }}
    >
      {children}
    </Locationcontext.Provider>
  );
};

export default Locationcontext;
