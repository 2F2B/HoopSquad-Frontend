import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Calendar, LocaleConfig } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import NavigationBar from "../components/NavigationBar";

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

const MatchRegister = () => {
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectDate, setSelectDate] = useState("일자를 선택해주세요");
  const [showDropDownHour, setShowDropDownHour] = useState(false);
  const [selectHour, setSelectHour] = useState("");
  const [showDropDownMinute, setShowDropDownMinute] = useState(false);
  const [selectMinute, setSelectMinute] = useState("");

  const hours = Array.from({ length: 24 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
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
            <TouchableOpacity onPress={() => navigation.navigate("Match")}>
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
            <TouchableOpacity onPress={() => navigation.navigate("Match")}>
              <Text style={styles.headerTextSuccess}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View
            style={{
              padding: 20,
            }}
          >
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
                style={styles.inputText}
              ></TextInput>
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
                    <Text style={styles.placeText}>{selectDate}</Text>
                    <Feather name="calendar" size={20} color="black" />
                  </View>
                </TouchableOpacity>
                {showDatePicker && (
                  <Calendar
                    onDayPress={(day) => {
                      setSelectDate(day.dateString);
                      setShowDatePicker(false);
                    }}
                    theme={{
                      todayTextColor: "black",
                      textDayFontSize: 20,
                      textDayFontWeight: "bold",
                      textMonthFontSize: 20,
                      textMonthFontWeight: "bold",
                      textSectionTitleColor: "rgba(138, 138, 138, 1)",
                    }}
                  />
                )}
              </View>
              <View>
                <Text style={styles.inputSubTitle}>시작 시간</Text>
                <View style={styles.timeWrapper}>
                  <TouchableOpacity
                    style={styles.dropDownBox}
                    onPress={() => setShowDropDownHour(true)}
                  >
                    <View style={styles.timeBox}>
                      <Text>시간</Text>
                      <Entypo
                        name="triangle-down"
                        size={24}
                        color="black"
                        style={{ right: -20 }}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.dropDownBox}>
                    <View style={styles.timeBox}>
                      <Text>분</Text>
                      <Entypo
                        name="triangle-down"
                        size={24}
                        color="black"
                        style={{ right: -20 }}
                      />
                    </View>
                  </TouchableOpacity>
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
                  <TouchableOpacity style={styles.gameType} key={index}>
                    <View style={{ alignItems: "center" }}>
                      <Text>
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
              <TouchableOpacity>
                <View style={[styles.selectPlace, styles.inputText]}>
                  <Text style={styles.placeText}>장소를 선택해주세요</Text>
                  <Entypo name="chevron-right" size={22} color="black" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.inputTitle}>사진</Text>
              <View style={styles.gameTypeWrapper}>
                <TouchableOpacity style={styles.imageBox}>
                  <View>
                    <Feather name="plus-circle" size={35} color="#E2E2E2" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.inputTitle}>매칭 안내</Text>
              <TextInput
                placeholder="매칭 안내 정보를 입력해주세요"
                style={styles.inputMatchGuide}
              ></TextInput>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            borderWidth: 1,
            width: "100%",
          }}
        >
          <NavigationBar />
        </View>
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
  },
  gameTypeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gameType: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CDCDCD",
    fontSize: 12,
    width: "30%",
    paddingTop: 5,
    paddingBottom: 5,
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
  placeText: {
    fontSize: 12,
    color: "#8F8F8F",
  },
  imageBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E2E2E2",
    width: "30%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputMatchGuide: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CDCDCD",
    color: "#8F8F8F",
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
  timeWrapper: {
    flexDirection: "row",
    flex: 1,
  },
  timeBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default MatchRegister;
