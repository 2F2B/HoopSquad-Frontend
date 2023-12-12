import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import TeamProfileBox from "../Profile/components/TeamProfileBox";
import { useState, useContext, useEffect, useRef } from "react";
import NavigationBar from "../../components/NavigationBar";
import * as ImagePicker from "expo-image-picker";
import Locationcontext from "../../contexts/LocationContext";
import Usercontext from "../../contexts/UserContext";
import InputAlert from "../../components/InputAlert";
import { alertUpward } from "../../components/InputAlert";
const TeamRegister = () => {
  const navigation = useNavigation();
  const {
    teamFirstLocation,
    teamSecondLocation,
    setTeamFirstLocation,
    setTeamSecondLocation,
  } = useContext(Locationcontext);

  const { user } = useContext(Usercontext);
  const [teamName, setTeamName] = useState("");
  const [teamIntroduce, setTeamInroduce] = useState("");
  const [teamActiveTime, setTeamActiveTime] = useState("");

  const registerTeamName = (teamName) => {
    setTeamName(teamName);
  };
  const registerTeamIntroducee = (teamIntroduce) => {
    setTeamInroduce(teamIntroduce);
  };
  const registerTeamActiveTime = (teamActiveLocation) => {
    setTeamActiveTime(teamActiveLocation);
  };

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [teamImageUrl, setTeamImageUrl] = useState("");
  const { height } = Dimensions.get("window");
  const translateY = useRef(new Animated.Value(height)).current;

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (result.canceled) {
      return null;
    }
    setTeamImageUrl(result.assets[0].uri);
  };

  const formData = new FormData();

  const getFormData = () => {
    if (teamImageUrl) {
      const imageType = teamImageUrl.endsWith(".png")
        ? "image/png"
        : "image/jpg";
      formData.append("Image", {
        uri: teamImageUrl,
        type: imageType,
        name: "image." + (imageType === "image/png" ? "png" : "jpg"),
      });
    }

    formData.append("data[admind]", user.User_Id);
    formData.append("data[name]", teamName);
    formData.append("data[location1][location]", teamFirstLocation.location);
    formData.append("data[introduce]", teamIntroduce);
    formData.append("data[location1][city]", teamFirstLocation.City);
    formData.append("data[location2][location]", teamSecondLocation.location);
    formData.append("data[location2][city]", teamSecondLocation.City);
  };

  const isFormValid = () => {
    if (!teamName.trim()) {
      return false;
    }
    if (!teamFirstLocation?.location || !teamFirstLocation?.City) {
      return false;
    }

    return true;
  };

  const registerTeam = async () => {
    //등록
    if (isFormValid()) {
      getFormData();
      // const accessToken = await AsyncStorage.getItem("accessToken");
      // try {
      //   await axios.post(`${REACT_APP_PROXY}team`, formData, {
      //     headers: {
      //       authorization: `Bearer ${accessToken}`,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      //   resetTeamLocation();
      //   navigation.navigate("Team");
      // } catch (error) {
      //   console.log(error);
      // }
    } else {
      alertUpward(translateY, height);
    }
  };

  const resetTeamLocation = () => {
    setTeamFirstLocation(() => ({
      location: null,
      City: null,
    }));
    setTeamSecondLocation(() => ({
      location: null,
      City: null,
    }));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={-70}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <View style={[styles.header]}>
          <View style={styles.headerTitle}>
            <TouchableOpacity
              onPress={() => {
                resetTeamLocation();
                navigation.goBack();
              }}
            >
              <Ionicons
                name="chevron-back"
                size={30}
                color="black"
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
            <Text style={styles.headerLeftChildText}>팀 등록</Text>
          </View>
          <View>
            {/* 완료 누르면 전역 팀 위치 초기화 */}
            <TouchableOpacity onPress={() => registerTeam()}>
              <Text style={styles.headerTextSuccess}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
            <TeamProfileBox title={"팀 대표 이미지"}>
              <Text
                style={{
                  marginTop: -10,
                  marginBottom: 15,
                  fontSize: 12,
                  color: "#666666",
                }}
              >
                이미지를 터치하면 이미지가 삭제됩니다
              </Text>
              <View style={{ height: 120 }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.imageBox}
                    onPress={uploadImage}
                  >
                    <View>
                      <Feather name="plus-circle" size={35} color="#E2E2E2" />
                    </View>
                  </TouchableOpacity>
                  {teamImageUrl && (
                    <TouchableOpacity
                      style={styles.imageWrapper}
                      onPress={() => setTeamImageUrl("")}
                    >
                      <View style={styles.imageView}>
                        <Image
                          source={{ uri: teamImageUrl }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TeamProfileBox>
            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}
                >
                  팀 이름
                </Text>
                <FontAwesome
                  name="asterisk"
                  size={10}
                  color="#F3A241"
                  style={styles.essentialIcon}
                />
              </View>
              <TextInput
                style={[
                  styles.registerWrapper,
                  { paddingHorizontal: 20, paddingVertical: 3 },
                ]}
                onChangeText={registerTeamName}
                placeholderTextColor="#8F8F8F"
                placeholder={"팀 이름을 작성해 주세요"}
              ></TextInput>
            </View>

            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}
                >
                  팀 소개
                </Text>
              </View>
              <TextInput
                style={[
                  styles.registerWrapper,
                  { paddingHorizontal: 20, paddingVertical: 10, height: 100 },
                ]}
                onChangeText={registerTeamIntroducee}
                placeholderTextColor="#8F8F8F"
                placeholder={"팀 소개를 작성해 주세요"}
                maxLength={100}
                textAlignVertical="top"
              ></TextInput>
            </View>

            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}
                >
                  활동 지역
                </Text>
                <FontAwesome
                  name="asterisk"
                  size={10}
                  color="#F3A241"
                  style={styles.essentialIcon}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MyLocation", { team: true })
                }
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingRight: 10,
                    paddingVertical: 8,
                    borderColor: "#CDCDCD",
                    fontSize: 12,
                    width: "85%",
                    color:
                      teamFirstLocation?.location != null ? "black" : "#8F8F8F",
                  }}
                >
                  {teamFirstLocation?.location != null
                    ? `${teamFirstLocation?.location} ${teamFirstLocation?.City}`
                    : "활동 지역을 선택해 주세요"}

                  {teamSecondLocation?.location != null
                    ? ` / ${teamSecondLocation?.location} ${teamSecondLocation?.City}`
                    : ""}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}
                >
                  활동 시간
                </Text>
              </View>
              <TextInput
                style={[
                  styles.registerWrapper,
                  { paddingHorizontal: 20, paddingVertical: 10, height: 100 },
                ]}
                onChangeText={registerTeamActiveTime}
                placeholderTextColor="#8F8F8F"
                placeholder={"활동 시간을 작성해 주세요"}
                maxLength={100}
                textAlignVertical="top"
              ></TextInput>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <NavigationBar />
      <InputAlert translateY={translateY} text={"비어 있는 항목이 있습니다"} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Profile: {
    flex: 1,
  },
  header: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    justifyContent: "space-between",
    borderBottomColor: "#E2E2E2",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeftChildText: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: "bold",
  },
  headerRightChildText: {
    color: "#F3A241",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E2E2E2",
    height: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    height: "100%",
    aspectRatio: 1,
    flexDirection: "row",
    marginLeft: 10,
  },
  imageView: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 10,
  },
  headerTextSuccess: {
    color: "#F3A241",
    fontSize: 16,
    fontWeight: "bold",
  },
  essentialIcon: {
    marginTop: 5,
    marginLeft: 8,
  },
  registerWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CDCDCD",
    fontSize: 12,
    width: "85%",
  },
});
export default TeamRegister;
