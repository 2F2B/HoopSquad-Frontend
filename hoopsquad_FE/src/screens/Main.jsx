import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import NavigationBar from "../components/NavigationBar";
import Usercontext from "../contexts/UserContext";

const Main = () => {
  const { user, logout } = useContext(Usercontext);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.testText1}>로그인 테스트 화면입니다</Text>
        <Text style={styles.testText2}>{user.Name}</Text>
      </View>
      <View style={styles.center}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => logout()}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <NavigationBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin : 20,
  },
  center: {
    justifyContent: 'center'
  },
  buttonStyle: {
    height: 40,
    backgroundColor: "#F3A241",
    color: "#ffffff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  testText1: {
    color: "#464646",
    fontSize: 20,
    fontWeight: "bold",
  },
  testText2: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Main;
