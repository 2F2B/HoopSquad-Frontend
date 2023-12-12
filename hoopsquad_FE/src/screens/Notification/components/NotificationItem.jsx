import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import formatDate from "../../../utils/formatDate";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import Usercontext from "../../../contexts/UserContext";

const NotificationItem = ({ item }) => {
  const {
    createdAt,
    guestId,
    image,
    hostId,
    isApply,
    nickname,
    postingId,
    postingTitle,
    roomId,
    type,
  } = item;

  const navigation = useNavigation();

  const navigateToChatroom = () => {
    navigation.navigate("ChatRoom", {
      hostId,
      roomId,
      postingId,
      nickname,
      image,
      postingTitle,
    });
  };

  console.log("item : ", item);

  return (
    <TouchableOpacity
      style={styles.notification}
      onPress={() => {
        navigateToChatroom();
      }}
    >
      <View style={styles.notificationTitle}>
        <MaterialCommunityIcons
          name="basketball-hoop-outline"
          size={20}
          color="#F3A241"
        />
        {type === "host" ? (
          <>
            <Text style={styles.nickname}>{nickname}</Text>
            <Text> 님에게 매칭 참여 요청이 왔습니다</Text>
          </>
        ) : isApply === true ? (
          <>
            <Text style={styles.nickname}>{postingTitle}</Text>
            <Text> 매칭 참여가 수락되었습니다</Text>
          </>
        ) : (
          <>
            <Text style={styles.nickname}>{postingTitle}</Text>
            <Text> 매칭 참여가 거절되었습니다</Text>
          </>
        )}
      </View>
      <Text style={styles.timeFont}>{formatDate(createdAt)}</Text>
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
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  timeFont: {
    fontSize: 10,
  },
});

export default NotificationItem;
