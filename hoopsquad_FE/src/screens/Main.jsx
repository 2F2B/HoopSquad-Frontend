import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import Usercontext from "../contexts/UserContext";
import { usePushNotifications } from "../hooks/usePushNotification";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { REACT_APP_PROXY } from "@env";

const Main = () => {
  const { user, logout } = useContext(Usercontext);
  const { expoPushToken } = usePushNotifications();
  const navigation = useNavigation();

  useEffect(() => {
    if (user.User_id && expoPushToken) {
      sendPushToken();
    }
  }, []);

  const sendPushToken = async () => {
    try {
      const res = await axios.post(
        `${REACT_APP_PROXY}notification/registerPushToken`,
        {
          userId: user.User_id,
          token: expoPushToken,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

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
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Notification")}
        >
          <Text style={styles.buttonText}>알림</Text>
        </TouchableOpacity>
      </View>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 20,
  },
  center: {
    justifyContent: "center",
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
