import { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../screens/Login";
import Main from "../screens/Main";
import Signup from "../screens/Signup/Signup";
import KakaoLogin from "../screens/KakaoLogin";
import Usercontext from "../contexts/UserContext";
import { REACT_APP_PROXY } from "@env";
import Matching from "../screens/Matching/Matching";
import MatchRegister from "../screens/MatchRegister/MatchRegister";
import MatchDetail from "../screens/MatchDetail/MatchDetail";
import ChatList from "../screens/Chat/ChatList";
import Profile from "../screens/Profile/Profile";
import authApi from "../apis/authApi";
import ChatRoom from "../screens/Chat/ChatRoom";
import EmptyChatRoom from "../screens/Chat/components/EmptyChatRoom";
import Notification from "../screens/Notification/Notification";
import GoogleMapPin from "../components/GoogleMapPin";
import ProfileRegister from "../screens/ProfileRegister/ProfileRegister";
import MyProfile from "../screens/Profile/MyProfile";
import MyLocation from "../screens/MyLocation";
import Team from "../screens/Team/Team";
import TeamProfile from "../screens/Profile/TeamProfile";
import TeamRegister from "../screens/Team/TeamRegister";
import TeamEdit from "../screens/Team/TeamEdit";
const Navigation = () => {
  const { user, setUser } = useContext(Usercontext);
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

  const checkValidation = async () => {
    try {
      const response = await authApi.post(`${REACT_APP_PROXY}auth/validation`);
      if (response.status == 201) {
        AsyncStorage.setItem("accessToken", response.headers["access-token"]);
      }
      setUser(response.data.profile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "white" } }}
      >
        {user ? (
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="Match"
          component={Matching}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
        <Stack.Screen
          name="MatchRegister"
          component={MatchRegister}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MatchDetail"
          component={MatchDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmptyChatRoom"
          component={EmptyChatRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoogleMapPin"
          component={GoogleMapPin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileRegister"
          component={ProfileRegister}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Team"
          component={Team}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyLocation"
          component={MyLocation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TeamProfile"
          component={TeamProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TeamRegister"
          component={TeamRegister}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TeamEdit"
          component={TeamEdit}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
