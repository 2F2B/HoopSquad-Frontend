import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import locationConfig from "../components/locationConfig";
import { useState, useContext, useRef } from "react";
import Usercontext from "../contexts/UserContext";
import authApi from "../apis/authApi";
import { REACT_APP_PROXY } from "@env";
import Locationcontext from "../contexts/LocationContext";
import InputAlert from "../components/InputAlert";
import { alertUpward } from "../components/InputAlert";

const MyLocation = ({ route }) => {
  const { team } = route.params;
  const navigation = useNavigation();
  const { user, setUser } = useContext(Usercontext);
  const { height } = Dimensions.get("window");
  const translateY = useRef(new Animated.Value(height)).current;
  const { setTeamFirstLocation, setTeamSecondLocation, setNowSelectLocation } =
    useContext(Locationcontext);
  const [startLocation, setStartLocation] = useState("강원도");
  const [firstLocation, setFirstLocation] = useState({
    location: team ? null : user.Location1.location,
    City: team ? null : user.Location1.City,
  });
  const [secondLocation, setSecondLocation] = useState({
    location: team ? null : user.Location2.location,
    City: team ? null : user.Location2.City,
  });

  const regions = Object.keys(locationConfig);

  const selectLocation = (selectLocation, selectCity) => {
    if (
      (firstLocation.City === selectCity &&
        firstLocation.location === selectLocation) ||
      (secondLocation.City === selectCity &&
        secondLocation.location === selectLocation)
    ) {
      if (
        firstLocation.City === selectCity &&
        firstLocation.location === selectLocation
      ) {
        setFirstLocation({ location: null, City: null });
        if (secondLocation !== null) {
          setFirstLocation(secondLocation);
          setSecondLocation({ location: null, City: null });
        }
      } else {
        setSecondLocation({ location: null, City: null });
      }
    } else {
      if (firstLocation.City === null) {
        setFirstLocation({ location: selectLocation, City: selectCity });
      } else {
        if (secondLocation.City === null) {
          setSecondLocation({ location: selectLocation, City: selectCity });
        }
      }
    }
  };

  const locationRegister = async () => {
    try {
      await authApi.post(`${REACT_APP_PROXY}location`, {
        Location1: {
          location: firstLocation.location,
          city: firstLocation.City,
        },
        Location2: {
          location: secondLocation.location,
          city: secondLocation.City,
        },
      });
      setNowSelectLocation(firstLocation.City);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.headerTextWrapper}>
          <TouchableOpacity
            onPress={() => {
              {
                team
                  ? navigation.goBack()
                  : user.Location1.City !== null && navigation.goBack();
              }
            }}
          >
            <Ionicons
              name="chevron-back"
              size={30}
              color="black"
              style={{ marginTop: 5 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>우리 지역 설정</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              if (firstLocation.City !== null) {
                team
                  ? (() => {
                      setTeamFirstLocation((prevLocation) => ({
                        ...prevLocation,
                        location: firstLocation.location,
                        City: firstLocation.City,
                      }));
                      setTeamSecondLocation((prevLocation) => ({
                        ...prevLocation,
                        location: secondLocation.location,
                        City: secondLocation.City,
                      }));
                      navigation.goBack();
                    })()
                  : (() => {
                      setUser((prevUser) => ({
                        ...prevUser,
                        Location1: {
                          location: firstLocation.location,
                          City: firstLocation.City,
                        },
                        Location2: {
                          location: secondLocation.location,
                          City: secondLocation.City,
                        },
                      }));
                      locationRegister();
                      navigation.navigate("Main");
                    })();
              } else {
                alertUpward(translateY, height);
              }
            }}
          >
            <Text style={styles.headerTextSuccess}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.matchingContainer}>
        <Text style={styles.matchingTitle}>우리 지역</Text>
        <Text style={styles.matchingSubTitle}>
          활동을 주로 진행할 지역을 선택해주세요
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text>현재 선택 지역</Text>
          <Text style={{ color: "#F3A241", marginLeft: 6 }}>
            {firstLocation?.City}
          </Text>
          <Text style={{ color: "#F3A241", marginLeft: 6 }}>
            {secondLocation?.City}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.locationWrapper}>
            <View style={{ flex: 1 }}>
              {regions.map((region, index) => (
                <TouchableOpacity
                  onPress={() => setStartLocation(region)}
                  key={index}
                  style={[
                    styles.locationName,
                    {
                      backgroundColor:
                        regions[index] === startLocation
                          ? "#F3A241"
                          : "#E2E2E2",
                    },
                  ]}
                >
                  <Text style={{ color: "white" }}>{region}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <ScrollView style={{ flex: 1 }}>
          <View>
            {locationConfig[startLocation].map((city, index) => (
              <TouchableOpacity
                style={styles.cityName}
                key={index}
                onPress={() => selectLocation(startLocation, city)}
              >
                <View style={styles.headerTextWrapper}>
                  <AntDesign
                    name="checkcircle"
                    size={20}
                    color={
                      (firstLocation.City === city &&
                        firstLocation.location === startLocation) ||
                      (secondLocation.City === city &&
                        secondLocation.location === startLocation)
                        ? "#F3A241"
                        : "#CDCDCD"
                    }
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      color:
                        (firstLocation.City === city &&
                          firstLocation.location === startLocation) ||
                        (secondLocation.City === city &&
                          secondLocation.location === startLocation)
                          ? "black"
                          : "#CDCDCD",
                    }}
                  >
                    {city}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <InputAlert translateY={translateY} text={"지역을 설정해주세요"} />
    </SafeAreaView>
  );
};

MyLocation.defaultProps = {
  team: false,
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
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
    color: "#F3A241",
    fontSize: 16,
    fontWeight: "bold",
  },
  matchingContainer: {
    padding: 20,
  },
  matchingTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  matchingSubTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8F8F8F",
    marginBottom: 15,
  },
  locationWrapper: {
    flexDirection: "row",
    flex: 1,
  },
  locationName: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: "white",
  },
  cityName: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
export default MyLocation;
