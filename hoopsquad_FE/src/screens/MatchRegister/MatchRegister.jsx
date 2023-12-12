import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useRef, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Calendar, LocaleConfig } from "react-native-calendars";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { REACT_APP_PROXY } from "@env";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import NavigationBar from "../../components/NavigationBar";
import InputAlert from "../../components/InputAlert";
import { alertUpward } from "../../components/InputAlert";
import Locationcontext from "../../contexts/LocationContext";

LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

const MatchRegister = () => {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectDate, setSelectDate] = useState("일자를 선택해주세요");
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [selectHour, setSelectHour] = useState("");
  const [selectMinute, setSelectMinute] = useState("");
  const [gameTypeList, setGameTypeList] = useState({
    One: false,
    Three: false,
    Five: false,
  });
  const [imageUrl, setImageUrl] = useState([]);
  const [title, setTitle] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [recruitAmount, setRecruitAmount] = useState("");
  const [matchIntroduce, setMatchIntroduce] = useState("");
  const { address, location, setAddress } = useContext(Locationcontext);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const formData = new FormData();
  const { height } = Dimensions.get("window");
  const translateY = useRef(new Animated.Value(height)).current;
  const [alertText, setAlertText] = useState("");

  const changeTitle = (title) => {
    setTitle(title);
  };
  const changeCurrentAmount = (currentAmount) => {
    setCurrentAmount(currentAmount);
  };
  const changeRecruitAmount = (recruitAmount) => {
    setRecruitAmount(recruitAmount);
  };
  const changeMatchIntroduce = (matchIntroduce) => {
    setMatchIntroduce(matchIntroduce);
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
    setImageUrl([...imageUrl, result.assets[0].uri]);
  };

  const removeImage = (index) => {
    const updatedImageUrl = [...imageUrl];
    updatedImageUrl.splice(index, 1);
    setImageUrl(updatedImageUrl);
  };

  const getGameTypeKey = (number) => {
    switch (number) {
      case 1:
        return "One";
      case 3:
        return "Three";
      case 5:
        return "Five";
      default:
        return "";
    }
  };

  const getFormData = () => {
    imageUrl.map((data, index) => {
      const imageType = data.endsWith(".png") ? "image/png" : "image/jpg";
      formData.append("Image", {
        uri: data,
        type: imageType,
        name: "image." + (imageType === "image/png" ? "png" : "jpg"),
      });
    });

    formData.append("data[Lat]", String(location.latitude));
    formData.append("data[Lng]", String(location.longitude));
    formData.append("data[CurrentAmount]", String(currentAmount));
    formData.append("data[Five]", String(gameTypeList.Five));
    formData.append("data[Introduce]", matchIntroduce);
    formData.append("data[IsTeam]", String(false));
    formData.append("data[LocationName]", address);
    formData.append("data[One]", String(gameTypeList.One));
    formData.append(
      "data[PlayTime]",
      String(`${selectDate}T${selectHour}:${selectMinute}`)
    );
    formData.append("data[RecruitAmount]", String(recruitAmount));
    formData.append("data[Three]", String(gameTypeList.Three));
    formData.append("data[Title]", title);
  };

  const registerMatch = async () => {
    if (isFormValid()) {
      getFormData();
      const accessToken = await AsyncStorage.getItem("accessToken");
      try {
        await axios.post(`${REACT_APP_PROXY}match`, formData, {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setAddress("장소를 선택해주세요");
        navigation.navigate("Match");
      } catch (error) {
        console.log(error);
      }
    } else {
      alertUpward(translateY, height);
    }
  };

  const isFormValid = () => {
    setAlertText("비어 있는 항목이 있습니다");
    if (!title.trim()) {
      return false;
    }

    if (selectDate === "일자를 선택해주세요") {
      return false;
    }

    if (selectHour === "" || selectMinute === "") {
      return false;
    }

    if (!gameTypeList.One && !gameTypeList.Three && !gameTypeList.Five) {
      return false;
    }

    if (!currentAmount.trim() || !recruitAmount.trim()) {
      return false;
    }

    if (address === "장소를 선택해주세요") {
      return false;
    }

    if (isNaN(parseFloat(currentAmount)) || isNaN(parseFloat(recruitAmount))) {
      setAlertText("참가 인원을 숫자로 입력해주세요");
      return false;
    }

    return true;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={-60}
    >
      <SafeAreaView style={[{ flex: 1 }]}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <View style={styles.headerTextWrapper}>
            <TouchableOpacity
              onPress={() => {
                setAddress("장소를 선택해주세요");
                navigation.navigate("Match");
              }}
            >
              <Ionicons
                name="chevron-back"
                size={30}
                color="black"
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>매칭 등록</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => registerMatch()}>
              <Text style={styles.headerTextSuccess}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={{ padding: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>제목</Text>
                <FontAwesome
                  name="asterisk"
                  size={10}
                  color="#F3A241"
                  style={styles.essentialIcon}
                />
              </View>
              <TextInput
                placeholder="제목을 입력해주세요"
                style={styles.textInputTitle}
                placeholderTextColor="#8F8F8F"
                onChangeText={changeTitle}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>경기 시간</Text>
                <FontAwesome
                  name="asterisk"
                  size={10}
                  color="#F3A241"
                  style={styles.essentialIcon}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.inputSubTitle}>시작 일자</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <View style={[styles.selectPlace, styles.inputText]}>
                    <Text
                      style={{
                        color:
                          selectDate === "일자를 선택해주세요"
                            ? "#8F8F8F"
                            : "black",
                        fontSize: 12,
                      }}
                    >
                      {selectDate}
                    </Text>
                    <Feather name="calendar" size={20} color="black" />
                  </View>
                </TouchableOpacity>
                {showDatePicker && (
                  <Calendar
                    onDayPress={(day) => {
                      setSelectDate(day.dateString);
                      setShowDatePicker(false);
                    }}
                    markedDates={{
                      [selectDate]: {
                        selected: true,
                        selectedColor: "#F49058",
                      },
                    }}
                    theme={styles.calendarTheme}
                  />
                )}
              </View>
              <View>
                <Text style={styles.inputSubTitle}>시작 시간</Text>
                <View>
                  <TouchableOpacity onPress={() => setTimeModalOpen(true)}>
                    <View style={[styles.selectPlace, styles.inputText]}>
                      <Text
                        style={{
                          color: selectHour === "" ? "#8F8F8F" : "black",
                          fontSize: 12,
                          paddingBottom: 3,
                        }}
                      >
                        {selectHour === ""
                          ? "시간을 선택해주세요"
                          : `${selectHour}시 ${selectMinute}분`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={timeModalOpen}
                    mode="time"
                    onConfirm={(selectTime) => {
                      setSelectHour(
                        selectTime.getHours().toString().padStart(2, "0")
                      );
                      setSelectMinute(
                        selectTime.getMinutes().toString().padStart(2, "0")
                      );
                      setTimeModalOpen(false);
                    }}
                    onCancel={() => setTimeModalOpen(false)}
                    display="spinner"
                  />
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>게임 유형</Text>
                <FontAwesome
                  name="asterisk"
                  size={10}
                  color="#F3A241"
                  style={styles.essentialIcon}
                />
              </View>
              <View style={styles.gameTypeWrapper}>
                {[1, 3, 5].map((number, index) => (
                  <TouchableOpacity
                    style={[
                      styles.gameType,
                      {
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
              </View>
            </View>

            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>참가 인원</Text>
                <FontAwesome
                  name="asterisk"
                  size={10}
                  color="#F3A241"
                  style={styles.essentialIcon}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholder="현재 인원"
                  style={styles.inputPersonnel}
                  placeholderTextColor="#8F8F8F"
                  onChangeText={changeCurrentAmount}
                ></TextInput>
                <MaterialCommunityIcons
                  name="slash-forward"
                  size={30}
                  color="#CDCDCD"
                  style={{ marginTop: 4 }}
                />
                <TextInput
                  placeholder="모집 인원"
                  style={styles.inputPersonnel}
                  placeholderTextColor="#8F8F8F"
                  onChangeText={changeRecruitAmount}
                ></TextInput>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>장소</Text>
                <FontAwesome
                  name="asterisk"
                  size={10}
                  color="#F3A241"
                  style={styles.essentialIcon}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("GoogleMapPin")}
              >
                <View style={[styles.selectPlace, styles.inputText]}>
                  <Text
                    style={{
                      color:
                        address == "장소를 선택해주세요" ? "#8F8F8F" : "black",
                      fontSize: 12,
                    }}
                  >
                    {address}
                  </Text>
                  <Entypo name="chevron-right" size={22} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.inputTitle}>
                사진 (이미지를 터치하면 이미지가 삭제됩니다)
              </Text>
              <ScrollView horizontal style={{ height: 120 }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.imageBox}
                    onPress={uploadImage}
                  >
                    <View>
                      <Feather name="plus-circle" size={35} color="#E2E2E2" />
                    </View>
                  </TouchableOpacity>
                  {imageUrl.map((imageUrl, index) => (
                    <TouchableOpacity
                      style={styles.imageWrapper}
                      onPress={() => removeImage(index)}
                      key={index}
                    >
                      <View style={styles.imageView}>
                        <Image
                          source={{ uri: imageUrl }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View>
              <Text style={styles.inputTitle}>매칭 안내</Text>
              <TextInput
                placeholder="매칭 안내 정보를 입력해주세요"
                style={styles.inputMatchGuide}
                placeholderTextColor="#8F8F8F"
                onChangeText={changeMatchIntroduce}
              ></TextInput>
            </View>
          </View>
        </ScrollView>
        <NavigationBar />
        <InputAlert translateY={translateY} text={alertText} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
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
  inputTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInputTitle: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 10,
    borderColor: "#CDCDCD",
    fontSize: 12,
    width: "85%",
  },
  inputSubTitle: {
    fontSize: 10,
    color: "#8F8F8F",
    marginBottom: 10,
  },
  essentialIcon: {
    marginTop: 5,
    marginLeft: 8,
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    borderColor: "#CDCDCD",
    fontSize: 12,
    width: "85%",
    alignContent: "center",
  },
  gameTypeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gameType: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 12,
    width: "30%",
    paddingTop: 7,
    paddingBottom: 7,
    textAlign: "center",
  },
  inputPersonnel: {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    borderColor: "#CDCDCD",
    width: "30%",
    fontSize: 12,
  },
  selectPlace: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E2E2E2",
    height: "85%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputMatchGuide: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CDCDCD",
    fontSize: 12,
    paddingLeft: 20,
    paddingTop: 15,
    flex: 1,
    aspectRatio: 2.5 / 1,
    textAlignVertical: "top",
  },
  calendar: {
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 20,
  },
  dropDownBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CDCDCD",
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center",
    width: "30%",
    marginRight: 20,
  },
  timeBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  calendarTheme: {
    todayTextColor: "black",
    textDayFontWeight: "bold",
    textMonthFontSize: 20,
    textMonthFontWeight: "bold",
    textSectionTitleColor: "rgba(138, 138, 138, 1)",
    dayTextColor: "#808080",
  },
  imageWrapper: {
    height: "85%",
    aspectRatio: 1,
    flexDirection: "row",
    marginLeft: 10,
  },
  imageView: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 10,
  },
});
export default MatchRegister;
