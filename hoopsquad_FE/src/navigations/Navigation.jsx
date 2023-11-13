import { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Login from "./login";
import Main from "./main";
import KakaoLogin from "./kakaologin";
import UserContext from "./UserContext";

const Navigation = () => {
  const { user, getUserInfo } = useContext(UserContext);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token && typeof token === "string") {
      checkValidation(token);
    }
  };

  const checkValidation = async (token) => {
    try {
      const response = await axios.post(
        "https://hoopsquad.link/auth/validation",
        {
          access_token: token,
        }
      );

      if (response.status == 201) {
        AsyncStorage.setItem("accessToken", response.headers["access-token"]);
      }
      getUserInfo(response.data.User_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">{user ? <Main /> : <Login />}</Stack.Screen>
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
