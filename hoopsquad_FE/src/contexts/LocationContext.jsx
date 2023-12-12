import { createContext, useState } from "react";
const Locationcontext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [address, setAddress] = useState("장소를 선택해주세요");

  const [teamFirstLocation, setTeamFirstLocation] = useState({
    location: null,
    City: null,
  });

  const [teamSecondLocation, setTeamSecondLocation] = useState({
    location: null,
    City: null,
  });

  return (
    <Locationcontext.Provider
      value={{
        location,
        setLocation,
        address,
        setAddress,
        teamFirstLocation,
        setTeamFirstLocation,
        teamSecondLocation,
        setTeamSecondLocation,
      }}
    >
      {children}
    </Locationcontext.Provider>
  );
};

export default Locationcontext;
