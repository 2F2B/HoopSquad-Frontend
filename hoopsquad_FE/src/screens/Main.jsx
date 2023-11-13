import { Text, View, Button } from "react-native";
import { useContext } from "react";
import Usercontext from "../contexts/UserContext";

const Main = () => {
  const { user, logout } = useContext(Usercontext);

  return (
    <View>
      <Text>{user}</Text>
      <Button title="로그아웃" onPress={() => logout()} />
    </View>
  );
};

export default Main;
