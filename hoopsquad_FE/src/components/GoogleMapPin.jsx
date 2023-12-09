import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "./NavigationBar";
import HoopSquadLogoPin from "../../assets/HoopSquadLogoPin.png";
import { Ionicons } from "@expo/vector-icons";
import Locationcontext from "../contexts/LocationContext";

const GoogleMapPin = () => {
  const [mapRef, setMapRef] = useState(null);
  const [opactiy, setOpactiy] = useState(false);
  const { height } = Dimensions.get("window");
  const screenWidth = Dimensions.get("window").width;
  const [locationName, setLocationName] = useState("");
  const [nowLocation, nowSetLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [pinLocation, setPinLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const { setAddress, setLocation } = useContext(Locationcontext);
  const navigation = useNavigation();

  useEffect(() => {
    getNowLocation();
  }, []);

  const getNowLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      console.log("지도 사용 거절");
      return null;
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 10 });

    requestAnimationFrame(() => {
      setPinLocation({ latitude, longitude });
      nowSetLocation({ latitude, longitude });
    });
  };

  const locationChange = async () => {
    const location = await mapRef.getMapBoundaries();
    const centerLocation = {
      latitude: (location.southWest.latitude + location.northEast.latitude) / 2,
      longitude:
        (location.southWest.longitude + location.northEast.longitude) / 2,
    };

    requestAnimationFrame(() => {
      setLocation(centerLocation);
    });
  };

  const changeLocationName = (location) => {
    setLocationName(location);
  };

  return (
    <SafeAreaView>
      <Modal>
        <View
          style={{
            flex: 1,
            ...(opactiy && { backgroundColor: "rgba(0, 0, 0, 0.5)" }),
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setOpactiy();
              setLocationName("");
            }}
            disabled={!opactiy}
          >
            <View
              style={[
                styles.header,
                {
                  borderBottomColor: opactiy ? "rgba(0, 0, 0, 0.1)" : "#E2E2E2",
                },
              ]}
            >
              <View style={styles.headerTextWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MatchRegister")}
                >
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="black"
                    style={{ marginTop: 5 }}
                  />
                </TouchableOpacity>
                <Text style={styles.headerText}>위치 등록</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => setOpactiy(true)}>
                  <Text
                    style={[
                      styles.headerTextSuccess,
                      { color: opactiy ? "rgba(0, 0, 0, 0.5)" : "#F3A241" },
                    ]}
                  >
                    완료
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.googleMapTitleWrapper]}>
              <Text style={styles.googleMapTitle}>
                매칭이 이루어질 장소를 선택해주세요.
              </Text>
              <Text style={styles.googleMapSubTitle}>
                매칭 장소는 경기가 이루어지는 곳이 좋아요
              </Text>
            </View>
            <View>
              {nowLocation.latitude && (
                <>
                  <MapView
                    ref={(ref) => {
                      setMapRef(ref);
                    }}
                    style={{
                      width: screenWidth,
                      height: height * 0.66,
                      ...(opactiy && { opacity: 0.1 }),
                    }}
                    initialRegion={{
                      latitude: nowLocation.latitude,
                      longitude: nowLocation.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    provider={PROVIDER_GOOGLE}
                    onRegionChangeComplete={locationChange}
                  ></MapView>

                  <View
                    style={[
                      styles.googleMapPinWrapper,
                      {
                        top: (height * 0.66) / 2 - 50,
                        left: screenWidth / 2 - 25,
                      },
                    ]}
                  >
                    <Image
                      resizeMode="contain"
                      source={HoopSquadLogoPin}
                      style={[
                        styles.googleMapPinImage,
                        opactiy && { opacity: 0.1 },
                      ]}
                    ></Image>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>

          <NavigationBar opacity={opactiy} />

          {opactiy && (
            <View
              style={[styles.locationModalWrapper, { height: height * 0.27 }]}
            >
              <Text style={styles.locationModalTitle}>
                선택한 매칭 장소의 이름을 입력해주세요
              </Text>

              <Text style={{ fontSize: 12, color: "#4E4C4C" }}>
                예) 금오공대 체육관
              </Text>
              <TextInput
                style={styles.locationModalInput}
                value={locationName}
                onChangeText={changeLocationName}
                placeholderTextColor="#CDCDCD"
                placeholder="장소의 이름을 입력해주세요"
              ></TextInput>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setAddress(locationName);
                    navigation.navigate("MatchRegister");
                  }}
                  style={styles.locationModalButton}
                >
                  <Text style={styles.locationModalButtonText}>
                    매칭 장소 등록
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    justifyContent: "space-between",
    borderBottomColor: "#E2E2E2",
  },
  headerTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  headerTextSuccess: {
    fontSize: 16,
    fontWeight: "bold",
  },

  googleMapTitleWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  googleMapTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  googleMapSubTitle: {
    fontSize: 14,
    color: "#8F8F8F",
    fontWeight: "600",
    marginBottom: 10,
  },
  googleMapPinWrapper: {
    width: 50,
    height: 50,
    position: "absolute",
  },
  googleMapPinImage: {
    width: "100%",
    height: "100%",
  },
  locationModalWrapper: {
    backgroundColor: "white",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  locationModalTitle: {
    color: "black",
    fontSize: 16,
    marginBottom: 2,
    fontWeight: "700",
    marginBottom: 5,
  },
  locationModalInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    fontSize: 13,
    borderColor: "#CDCDCD",
  },
  locationModalButton: {
    paddingVertical: 8,
    backgroundColor: "#F3A241",
    borderRadius: 6,
  },
  locationModalButtonText: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
});

export default GoogleMapPin;
