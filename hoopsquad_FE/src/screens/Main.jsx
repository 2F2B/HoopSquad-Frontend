import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Usercontext from "../contexts/UserContext";
import LocationContext from "../contexts/LocationContext";
import { usePushNotifications } from "../hooks/usePushNotification";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { REACT_APP_PROXY } from "@env";
import { AntDesign, Feather } from "@expo/vector-icons";
import HoopSquadFullLogo from "../../assets/HoopSquadFullLogo.png";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import sunny from "../../assets/weather/sunny.png";
import cloudy from "../../assets/weather/cloudy.png";
import compete from "../../assets/weather/compete.png";
import { MaterialIcons } from "@expo/vector-icons";
import { Linking } from "react-native";

const Main = () => {
  const { user, logout } = useContext(Usercontext);
  const { nowSelectLocation, setNowSelectLocation } =
    useContext(LocationContext);
  const { expoPushToken } = usePushNotifications();
  const navigation = useNavigation();
  const [locationModal, setLocationModal] = useState(false);

  const [locationAlert, setLocationAlert] = useState();
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [deadLineList, setDeadLineList] = useState(null);
  useEffect(() => {
    if (user.User_id && expoPushToken) {
      sendPushToken();
    }
    if (user.Location1.City === null) {
      setLocationAlert(true);
    }
    setNowSelectLocation(user.Location1?.City);
  }, []);

  useEffect(() => {
    if (user.Location1) {
      console.log("ASdsaasd");
      getWeatherInfo();
      getDeadlineInfo();
    }
  }, [user.Location1, nowSelectLocation]);

  const getWeatherInfo = async () => {
    const location =
      nowSelectLocation === user.Location1.City
        ? user.Location1.location
        : user.Location2.location;

    const city = nowSelectLocation;
    try {
      const response = await axios.get(
        `${REACT_APP_PROXY}weather?location=${location}&city=${city}`
      );
      setWeatherInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDeadlineInfo = async () => {
    const location =
      nowSelectLocation === user.Location1.City
        ? user.Location1.location
        : user.Location2.location;

    try {
      const response = await axios.get(
        `${REACT_APP_PROXY}match/deadline/${location} ${nowSelectLocation}`
      );
      setDeadLineList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const formattedTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const hour = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedMonth}.${formattedDay} ${ampm} ${formattedHour}:${formattedMinute}`;
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
                  {nowSelectLocation}
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
                    setNowSelectLocation(user.Location1?.City);
                    setLocationModal(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color:
                        user.Location1?.City === nowSelectLocation
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
                      setNowSelectLocation(user.Location2?.City);
                      setLocationModal(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color:
                          user.Location2?.City === nowSelectLocation
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
                style={{ marginLeft: 8 }}
                onPress={() => navigation.navigate("Notification")}
                disabled={locationModal || locationAlert}
              >
                <Feather name="bell" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => logout()}
                disabled={locationModal || locationAlert}
              >
                <MaterialIcons
                  style={{ marginLeft: 20 }}
                  name="logout"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
              <View>
                <Text style={styles.mainTitle}>오늘의 날씨</Text>
                <Text style={styles.subTitle}>
                  농구 하러 가기 전 날씨 확인은 필수!
                </Text>
              </View>
              {weatherInfo && (
                <>
                  <View
                    style={[
                      styles.weatherInfo,
                      {
                        backgroundColor:
                          weatherInfo && weatherInfo.sunny === "sunny"
                            ? "#80aeea"
                            : "#4e5164",

                        opacity: locationModal || locationAlert ? 0.2 : 1,
                      },
                    ]}
                  >
                    <View style={styles.weatherInfoFisrtLine}>
                      <View style={styles.weatherImageWrapper}>
                        <Image
                          style={styles.weatherImage}
                          source={
                            weatherInfo.sunny === "sunny" ? sunny : cloudy
                          }
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={styles.temperature}>
                        {weatherInfo.temperature} °
                      </Text>
                    </View>
                    <View style={styles.weatherInfoSecondLine}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <View style={styles.rowView}>
                          <FontAwesome5 name="wind" size={16} color="white" />
                          <Text
                            style={{
                              fontSize: 16,
                              color: "#ffffff",
                              marginLeft: 5,
                            }}
                          >
                            풍속 {weatherInfo.windSpeed}
                          </Text>
                        </View>
                        <View style={styles.rowView}>
                          <MaterialCommunityIcons
                            name="weather-rainy"
                            size={16}
                            color="white"
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              color: "#ffffff",
                              marginLeft: 5,
                            }}
                          >
                            강수 확률 : {weatherInfo.precipitationPercentage}%
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.weatherComment}>
                      <Text style={styles.weatherInfoFourthLine}>
                        {weatherInfo.sunny === "sunny" ? (
                          "좋은 날씨에요! 농구 한 판 어떠세요?"
                        ) : (
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            <Text style={{ color: "#ffffff" }}>
                              구름이 많은 날이네요.
                            </Text>
                            <Text style={{ color: "#ffffff" }}>
                              실내 농구로 기분 전환 어떠세요?
                            </Text>
                          </View>
                        )}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
            <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
              <Text style={styles.mainTitle}>마감임박</Text>
              <Text style={styles.subTitle}>시작이 얼마 남지 않았어요!</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              {deadLineList ? (
                deadLineList.map((deadline, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("MatchDetail", {
                        postingId: deadline.Posting_id,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.deadlineItem,
                        {
                          borderColor:
                            locationModal || locationAlert
                              ? "rgba(226, 226, 226, 0.1)"
                              : "#E2E2E2",
                        },
                      ]}
                    >
                      <View style={[styles.imageContainer]}>
                        <Image
                          resizeMode="cover"
                          source={
                            deadline.Image
                              ? {
                                  uri: `${REACT_APP_PROXY}image/match/${deadline.Image}`,
                                }
                              : HoopSquadFullLogo
                          }
                          style={[
                            styles.imageStyle,
                            {
                              opacity: locationModal || locationAlert ? 0.2 : 1,
                            },
                          ]}
                        />
                      </View>
                    </View>
                    <Text
                      style={{ fontSize: 12, color: "#878787", paddingTop: 6 }}
                    >
                      {formattedTime(deadline.PlayTime)}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      paddingVertical: 30,
                      color: "#CDCDCD",
                    }}
                  >
                    현재 지역에 매칭 정보가 없습니다
                  </Text>
                </View>
              )}
            </View>
            <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
              <Text style={styles.mainTitle}>대회정보</Text>
              <Text style={styles.subTitle}>갈고 닦은 실력을 보여주세요!</Text>
            </View>

            <TouchableOpacity
              style={{ height: 100, paddingHorizontal: 20 }}
              onPress={() => {
                Linking.openURL(
                  "https://www.koreabasketball.or.kr/game/dom_schedule.php"
                );
              }}
              disabled={locationModal || locationAlert}
            >
              <Image
                resizeMode="cover"
                source={compete}
                style={[
                  styles.competeImageStyle,
                  (locationModal || locationAlert) && { opacity: 0.2 },
                ]}
              />
            </TouchableOpacity>
          </ScrollView>
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
  weatherInfo: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#80aeea",
  },
  weatherImageWrapper: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 26,
  },
  weatherImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: "#8F8F8F",
    paddingBottom: 10,
  },
  temperature: {
    fontSize: 60,
    color: "#ffffff",
  },
  weatherInfoFisrtLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherInfoSecondLine: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  weatherInfoFourthLine: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 4,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 4,
  },
  weatherComment: {
    backgroundColor: "rgba(205, 205, 205, 0.4)",
    marginVertical: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deadlineItem: {
    width: 110,
    height: 110,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  competeImageStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});

export default Main;
