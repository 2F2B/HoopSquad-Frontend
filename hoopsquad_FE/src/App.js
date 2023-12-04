import { UserProvider } from "./contexts/UserContext";
import Navigation from "./navigations/Navigation";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
