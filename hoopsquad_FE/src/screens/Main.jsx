import { Text, View, Button } from "react-native";
import { useContext } from "react";
import Usercontext from "../contexts/UserContext";
import NavigationBar from "../components/NavigationBar";
const Main = () => {
  const { user, logout } = useContext(Usercontext);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text>{user}</Text>
        <Button title="로그아웃" onPress={() => logout()} />
      </View>
      <NavigationBar />
    </View>
  );
};

export default Main;
