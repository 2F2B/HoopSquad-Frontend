import { UserProvider } from "./contexts/UserContext";
import { SocketProvider } from "./contexts/SocketContext";
import Navigation from "./navigations/Navigation";
import { LogBox } from "react-native";
import { LocationProvider } from "./contexts/LocationContext";

LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);

export default function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <LocationProvider>
          <Navigation />
        </LocationProvider>
      </SocketProvider>
    </UserProvider>
  );
}
