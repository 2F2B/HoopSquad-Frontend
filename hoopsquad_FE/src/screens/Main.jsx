import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Usercontext from "../contexts/UserContext";
import { usePushNotifications } from "../hooks/usePushNotification";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { REACT_APP_PROXY } from "@env";
import { AntDesign, Feather } from "@expo/vector-icons";
import HoopSquadFullLogo from "../../assets/HoopSquadFullLogo.png";

const Main = () => {
  const { user, logout } = useContext(Usercontext);
  const { expoPushToken } = usePushNotifications();
  const navigation = useNavigation();

  const [locationModal, setLocationModal] = useState(false);
  const [nowLocation, setNowLocation] = useState(user.Location1?.City);

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
          token: expoPushToken.data,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={-60}
    >
      <SafeAreaView
        style={[
          { flex: 1 },
          {
            backgroundColor: locationModal
              ? "rgba(0, 0, 0, 0.5)"
              : "transparent",
          },
        ]}
      >
        <StatusBar style="dark" />
        <View
          style={[
            styles.header,
            {
              borderBottomColor: locationModal
                ? "rgba(0, 0, 0, 0.1)"
                : "#E2E2E2",
            },
          ]}
        >
          <View
            style={{
              height: "100%",
              width: "30%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (user.Location2?.City !== null) {
                  setLocationModal((prevLocationModal) => !prevLocationModal);
                } else {
                  navigation.navigate("MyLocation");
                }
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={{ fontSize: 20, fontWeight: 700, marginRight: 5 }}>
                {nowLocation}
              </Text>
              <AntDesign
                name="down"
                size={24}
                color="black"
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>
          {locationModal && (
            <View
              style={{
                position: "absolute",
                top: 60,
                left: 20,
                width: "50%",
                paddingHorizontal: 15,
                paddingVertical: 15,
                backgroundColor: "white",
                borderRadius: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setNowLocation(user.Location1?.City);
                  setLocationModal(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color:
                      user.Location1?.City === nowLocation
                        ? "black"
                        : "#CDCDCD",
                    marginBottom: 20,
                  }}
                >
                  {user.Location1?.City}
                </Text>
              </TouchableOpacity>

              {user.Location2 !== null && (
                <TouchableOpacity
                  onPress={() => {
                    setNowLocation(user.Location2?.City);
                    setLocationModal(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color:
                        user.Location2?.City === nowLocation
                          ? "black"
                          : "#CDCDCD",
                      marginBottom: 20,
                    }}
                  >
                    {user.Location2?.City}
                  </Text>
                </TouchableOpacity>
              )}

              {user.Location2?.City !== null && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("MyLocation")}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: 700, color: "#CDCDCD" }}
                  >
                    내 동네 설정
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MyProfile", { profileId: user.User_id })
              }
            >
              <View
                style={[
                  styles.userImageWrapper,
                  {
                    borderColor: locationModal
                      ? "rgba(0, 0, 0, 0.1)"
                      : "#E2E2E2",
                  },
                ]}
              >
                {user.Image.length > 0 ? (
                  user.Image[0].ImageData.startsWith("file://") ? (
                    <Image
                      source={{ uri: user.Image[0].ImageData }}
                      style={[
                        { width: "100%", height: "100%" },
                        locationModal && { opacity: 0.2 },
                      ]}
                    />
                  ) : (
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: `${REACT_APP_PROXY}image/user/${user.Image[0].ImageData}`,
                      }}
                      style={{ width: "100%", height: "100%" }}
                    ></Image>
                  )
                ) : (
                  <Image
                    resizeMode="cover"
                    source={HoopSquadFullLogo}
                    style={{ width: "100%", height: "100%" }}
                  ></Image>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
            >
              <Feather name="bell" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            <Text style={styles.testText1}>로그인 테스트 화면입니다</Text>
            <Text style={styles.testText2}>{user.Name}</Text>
          </View>
          <View style={styles.center}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => logout()}
            >
              <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
        <NavigationBar opacity={locationModal} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    justifyContent: "space-between",
    borderBottomColor: "#E2E2E2",
    position: "relative",
    zIndex: 1,
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    fontSize: 20,
    fontWeight: "700",
    marginRight: 10,
  },
  userImageWrapper: {
    borderWidth: 1,
    width: 35,
    marginRight: 10,
    borderRadius: 100,
    aspectRatio: 1 / 1,
    overflow: "hidden",
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
