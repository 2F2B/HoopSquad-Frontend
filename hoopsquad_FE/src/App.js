import { UserContext } from "./UserContext";
import Navigation from "./Navigation";

function App() {
  return (
    <UserContext>
      <Navigation />
    </UserContext>
  );
}

export default App;
