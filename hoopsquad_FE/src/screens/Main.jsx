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
  const [nowLocation, setNowLocation] = useState();

  const [locationAlert, setLocationAlert] = useState();

  useEffect(() => {
    if (user.User_id && expoPushToken) {
      sendPushToken();
    }
    if (user.Location1.City === null) {
      setLocationAlert(true);
    }
  }, []);

  useEffect(() => {
    setNowLocation(user.Location1?.City);
  }, [user.Location1]);

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
      {locationAlert && (
        <View style={styles.deleteModalWrapper}>
          <Text style={styles.deleteModalTitle}>지역을 설정해 주세요</Text>
          <View>
            <Text style={styles.deleteModalText}>
              지역은 최대 2개까지 설정 가능합니다
            </Text>
          </View>

          <View style={styles.deleteModalButtonWrapper}>
            <TouchableOpacity
              onPress={() => {
                setLocationAlert(false);
                navigation.navigate("MyLocation", { team: false });
              }}
              style={styles.deleteModalDeleteButton}
            >
              <Text
                style={[
                  styles.deleteModalDeleteText,
                  {
                    color: "#F3A241",
                  },
                ]}
              >
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          setLocationModal(false);
        }}
        disabled={!locationModal}
      >
        <SafeAreaView
          style={[
            { flex: 1 },
            {
              backgroundColor:
                locationModal || locationAlert
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
                borderBottomColor:
                  locationModal || locationAlert
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
                    setLocationModal(false);
                    navigation.navigate("MyLocation", { team: false });
                  }
                }}
                disabled={locationAlert}
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
                    onPress={() => {
                      setLocationModal(false);
                      navigation.navigate("MyLocation", { team: false });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#CDCDCD",
                      }}
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
                disabled={locationModal || locationAlert}
              >
                <View
                  style={[
                    styles.userImageWrapper,
                    {
                      borderColor:
                        locationModal || locationAlert
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
                          (locationModal || locationAlert) && { opacity: 0.2 },
                        ]}
                      />
                    ) : (
                      <Image
                        resizeMode="cover"
                        source={{
                          uri: `${REACT_APP_PROXY}image/user/${user.Image[0].ImageData}`,
                        }}
                        style={[
                          { width: "100%", height: "100%" },
                          (locationModal || locationAlert) && { opacity: 0.1 },
                        ]}
                      ></Image>
                    )
                  ) : (
                    <Image
                      resizeMode="cover"
                      source={HoopSquadFullLogo}
                      style={[
                        { width: "100%", height: "100%" },
                        (locationModal || locationAlert) && { opacity: 0.1 },
                      ]}
                    ></Image>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Notification")}
                disabled={locationModal || locationAlert}
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
                style={[
                  styles.buttonStyle,
                  {
                    backgroundColor:
                      locationModal || locationAlert
                        ? "rgba(0, 0, 0, 0.05)"
                        : "#F3A241",
                  },
                ]}
                onPress={() => logout()}
                disabled={locationModal || locationAlert}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        locationModal || locationAlert
                          ? "rgba(0, 0, 0, 0.05)"
                          : "#ffffff",
                    },
                  ]}
                >
                  로그아웃
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <NavigationBar
            opacity={locationModal || locationAlert}
            touchable={locationModal || locationAlert}
          />
        </SafeAreaView>
      </TouchableOpacity>
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
  deleteModalWrapper: {
    position: "absolute",
    top: "40%",
    left: "15%",
    backgroundColor: "white",
    zIndex: 1,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    width: "70%",
    height: "20%",
    justifyContent: "space-between",
  },
  deleteModalTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  deleteModalText: {
    color: "#4E4C4C",
    fontSize: 11,
  },
  deleteModalButtonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteModalDeleteButton: {
    zIndex: 2,
    width: "15%",
    marginLeft: 20,
  },

  deleteModalDeleteText: {
    textAlign: "center",
    fontSize: 13,
  },
});

export default Main;
