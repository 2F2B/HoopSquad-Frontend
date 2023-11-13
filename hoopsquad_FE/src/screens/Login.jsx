import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Text>로그인 화면</Text>
      <Button
        title="카카오 로그인"
        onPress={() => navigation.navigate("Kakaologin")}
      />
    </View>
  );
};

export default Login;
