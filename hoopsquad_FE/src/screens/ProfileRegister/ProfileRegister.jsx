import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { REACT_APP_PROXY } from "@env";
import { Ionicons } from "@expo/vector-icons";
import NavigationBar from "../../components/NavigationBar";
import Usercontext from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import ProfileRegisterBox from "./components/ProfileRegisterBox";
import HoopSquadFullLogo from "../../../assets/HoopSquadFullLogo.png";

const ProfileRegister = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(Usercontext);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [userImage, setUserImage] = useState([]);
  const [userNickName, setUserNickName] = useState(user.Name);
  const [userIntroduce, setUserIntroduce] = useState(user.Introduce);
  const [userHeight, setUserHeight] = useState(user.Height);
  const [userWeight, setUserWeight] = useState(user.Weight);
  const [userYear, setUserYear] = useState(user.Year);
  const [gameTypeList, setGameTypeList] = useState(user.GameType);
  const formData = new FormData();

  useEffect(() => {
    setGameTypeList(user.GameType);
    if (user.Image.length > 0) {
      setUserImage([user.Image[0].ImageData]);
    } else {
      setUserImage([]);
    }
  }, []);

  const getGameTypeKey = (number) => {
    switch (number) {
      case 1:
        return "OneOnOne";
      case 3:
        return "ThreeOnThree";
      case 5:
        return "FiveOnFive";
      default:
        return "";
    }
  };

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
    setUserImage([result.assets[0].uri]);
  };

  const removeImage = () => {
    setUserImage([]);
  };

  const updateUserProfile = (newProfileData) => {
    setUser((prevUser) => ({
      ...prevUser,
      Name: newProfileData.Name !== "" ? newProfileData.Name : prevUser.Name,

      Introduce:
        newProfileData.Introduce !== ""
          ? newProfileData.Introduce
          : prevUser.Introduce,

      Height:
        newProfileData.Height !== "" ? newProfileData.Height : prevUser.Height,

      Weight:
        newProfileData.Weight !== "" ? newProfileData.Weight : prevUser.Weight,

      GameType: gameTypeList,

      Year: newProfileData.Year !== "" ? newProfileData.Year : prevUser.Year,

      Image:
        user.Image.length === 0
          ? newProfileData.Image.length > 0
            ? [{ ImageData: newProfileData.Image[0] }]
            : []
          : newProfileData.Image[0] !== user.Image[0].ImageData
          ? newProfileData.Image.length > 0
            ? [{ ImageData: newProfileData.Image[0] }]
            : []
          : prevUser.Image,
    }));
  };

  const changeNickName = (nickName) => {
    setUserNickName(nickName);
  };
  const changeIntroduce = (introduce) => {
    setUserIntroduce(introduce);
  };
  const changeHeight = (height) => {
    setUserHeight(height);
  };
  const changeWeight = (weight) => {
    setUserWeight(weight);
  };
  const changeYear = (year) => {
    setUserYear(year);
  };

  const getFormData = () => {
    if (userImage.length > 0) {
      if (userImage[0].startsWith("file://")) {
        const imageType = userImage[0].endsWith(".png")
          ? "image/png"
          : "image/jpg";
        formData.append("Image", {
          uri: userImage[0],
          type: imageType,
          name: "image." + (imageType === "image/png" ? "png" : "jpg"),
        });
      } else {
        formData.append("Image", userImage[0]);
      }
    }

    formData.append("data[Name]", String(userNickName));
    formData.append("data[Introduce]", String(userIntroduce));
    formData.append("data[Height]", String(userHeight));
    formData.append("data[Weight]", String(userWeight));
    formData.append("data[One]", String(gameTypeList.OneOnOne));
    formData.append("data[Three]", String(gameTypeList.ThreeOnThree));
    formData.append("data[Five]", String(gameTypeList.FiveOnFive));
    formData.append("data[Year]", String(userYear));
  };

  const registerProfile = async () => {
    getFormData();
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      await axios.post(`${REACT_APP_PROXY}profile/user`, formData, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigation.navigate("MyProfile", { profileId: user.User_id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={-60}
    >
      <SafeAreaView style={[styles.Profile]}>
        <StatusBar style="dark" />
        <View style={[styles.header]}>
          <View style={styles.headerTitle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={30}
                color="black"
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
            <Text style={styles.headerLeftChildText}>프로필 수정</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                updateUserProfile({
                  Name: userNickName,
                  Introduce: userIntroduce,
                  Height: userHeight,
                  Weight: userWeight,
                  GameType: gameTypeList,
                  Year: userYear,
                  Image: userImage,
                });
                registerProfile();
              }}
            >
              <Text style={[styles.headerRightChildText]}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.profileUserWrapper}>
            <View style={styles.profileImageWrapper}>
              <TouchableOpacity onPress={() => uploadImage()}>
                {userImage.length > 0 ? (
                  userImage[0].startsWith("file://") ? (
                    <Image
                      source={{ uri: String(userImage[0]) }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: `${REACT_APP_PROXY}image/user/${userImage[0]}`,
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
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                borderWidth: 0.3,
                paddingVertical: 5,
                borderColor: "#383838",
                borderRadius: 4,
                width: "30%",
              }}
              onPress={() => removeImage()}
            >
              <Text style={{ fontSize: 10, textAlign: "center" }}>
                이미지 제거
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ paddingHorizontal: 20 }}
            contentContainerStyle={{ paddingBottom: 330 }}
          >
            <View style={{ marginTop: 10 }}>
              <ProfileRegisterBox title={"닉네임"}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingRight: 10,
                    borderColor: "#CDCDCD",
                    fontSize: 12,
                    width: "85%",
                  }}
                  onChangeText={changeNickName}
                  placeholderTextColor="black"
                  placeholder={user.Name !== null ? user.Name : "작성해 주세요"}
                ></TextInput>
              </ProfileRegisterBox>
              <ProfileRegisterBox title={"한 줄 소개"}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingRight: 10,
                    borderColor: "#CDCDCD",
                    fontSize: 12,
                    width: "85%",
                  }}
                  onChangeText={changeIntroduce}
                  placeholderTextColor="black"
                  placeholder={
                    user.Introduce !== null ? user.Introduce : "작성해 주세요"
                  }
                ></TextInput>
              </ProfileRegisterBox>
              <ProfileRegisterBox title={"신장"}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingTop: 3,
                    paddingBottom: 3,
                    borderColor: "#CDCDCD",
                    fontSize: 12,
                    marginRight: 20,
                    width: "30%",
                    textAlign: "center",
                  }}
                  onChangeText={changeHeight}
                  placeholderTextColor="black"
                  placeholder={
                    user.Height !== null ? String(user.Height) : "작성해 주세요"
                  }
                ></TextInput>
                <Text>cm</Text>
              </ProfileRegisterBox>
              <ProfileRegisterBox title={"몸무게"}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingTop: 3,
                    paddingBottom: 3,
                    borderColor: "#CDCDCD",
                    fontSize: 12,
                    marginRight: 20,
                    width: "30%",
                    textAlign: "center",
                  }}
                  onChangeText={changeWeight}
                  placeholderTextColor="black"
                  placeholder={
                    user.Weight !== null ? String(user.Weight) : "작성해 주세요"
                  }
                ></TextInput>
                <Text>kg</Text>
              </ProfileRegisterBox>
              <ProfileRegisterBox title={"선호 게임 유형"}>
                {[1, 3, 5].map((number, index) => (
                  <TouchableOpacity
                    style={[
                      {
                        borderWidth: 1,
                        borderRadius: 10,
                        fontSize: 12,
                        width: "30%",
                        paddingTop: 7,
                        paddingBottom: 7,
                        textAlign: "center",
                        marginRight: 15,
                        borderColor: gameTypeList[getGameTypeKey(number)]
                          ? "#F3A241"
                          : "#CDCDCD",
                      },
                    ]}
                    key={index}
                    onPress={() => {
                      setGameTypeList((prevState) => ({
                        ...prevState,
                        [getGameTypeKey(number)]:
                          !prevState[getGameTypeKey(number)],
                      }));
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: gameTypeList[getGameTypeKey(number)]
                            ? "#F3A241"
                            : "black",
                        }}
                      >
                        {number} vs {number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ProfileRegisterBox>
              <ProfileRegisterBox title={"경력"}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingTop: 3,
                    paddingBottom: 3,
                    borderColor: "#CDCDCD",
                    fontSize: 12,
                    width: "30%",
                    marginRight: 20,
                    textAlign: "center",
                  }}
                  onChangeText={changeYear}
                  placeholderTextColor="black"
                  placeholder={
                    user.Year !== null ? String(user.Year) : "작성해 주세요"
                  }
                ></TextInput>
                <Text>년차</Text>
              </ProfileRegisterBox>
            </View>
          </ScrollView>
        </View>
        <NavigationBar />
      </SafeAreaView>
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

  profileImageWrapper: {
    width: "30%",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 100,
    aspectRatio: 1 / 1,
    borderColor: "#E2E2E2",
    overflow: "hidden",
  },
  profileUserName: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10,
  },
  profileUserIntroduce: {
    textAlign: "center",
    fontSize: 12,
    color: "#8F8F8F",
  },
  profileUserWrapper: {
    padding: 30,
    alignItems: "center",
  },
});
export default ProfileRegister;
