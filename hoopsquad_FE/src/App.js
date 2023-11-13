import { UserProvider } from "./contexts/UserContext";
import Navigation from "./navigations/Navigation";

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
