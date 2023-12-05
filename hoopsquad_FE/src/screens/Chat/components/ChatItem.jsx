import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

const ChatItem = ({ chatImg, nickName, chat, chatTime, chatCount }) => {
  const props = { chatImg, nickName, chat, chatTime, chatCount };

  return (
    <TouchableOpacity style={styles.chat}>
      <View style={styles.imgWrapper}>
        <Image
          resizeMode="contain"
          source={require("../../../../assets/HoopSquadFullLogo.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatLayout}>
          <Text style={styles.userNickname}>{nickName}</Text>
          <Text style={styles.timeFont}>{chatTime}</Text>
        </View>
        <View style={styles.chatLayout}>
          <Text>{chat}</Text>
          <Text style={styles.chatCount}>{chatCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chat: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#E2E2E2",
  },
  imgWrapper: {
    width: 80,
    aspectRatio: 1 / 1,
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  chatContent: {
    flex: 1,
    justifyContent: "space-around",
    marginLeft: 16,
  },
  userNickname: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeFont: {
    fontSize: 10,
  },
  chatCount: {
    color: "#ffffff",
    backgroundColor: "#F3A241",
    width: 20,
    fontSize: 12,
    aspectRatio: 1 / 1,
    borderRadius: 40,
    textAlign: "center",
  },
});

export default ChatItem;
