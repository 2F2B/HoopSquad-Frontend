import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import formatDate from "../../../utils/formatDate";

const NotificationItem = ({ item, type }) => {
  const {
    createdAt,
    guestId,
    image,
    isApply,
    nickname,
    postingId,
    postingTitle,
  } = item;

  return (
    <TouchableOpacity style={styles.notification}>
      <View style={styles.notificationTitle}>
        <Text style={styles.nickname}>테스트</Text>
        <Text> 님에게 매칭 요청이 왔습니다</Text>
      </View>
      <Text style={styles.timeFont}>2023년 11월 11일 오후 8:30</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notification: {
    height: 90,
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  notificationTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  nickname: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeFont: {
    fontSize: 10,
  },
});

export default NotificationItem;
