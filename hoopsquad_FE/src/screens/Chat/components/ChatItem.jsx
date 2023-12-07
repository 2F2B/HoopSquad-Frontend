import { Text, View, StyleSheet, Image } from "react-native";
import formatDate from "../../../utils/formatDate";

const ChatItem = ({ chatInfo, isUserChat }) => {
  const messageDirection = isUserChat ? "row-reverse" : "row";
  const chatBackground = isUserChat ? "#F3A241" : "#F8F8F8";
  const chatColor = isUserChat ? "#ffffff" : "black";

  return (
    <View style={[styles.chatContainer, isUserChat && styles.ownChatContainer]}>
      <View
        style={[styles.messageContainer, { flexDirection: messageDirection }]}
      >
        <Text
          style={[
            styles.chat,
            { backgroundColor: chatBackground, color: chatColor },
          ]}
        >
          {chatInfo.Msg}
        </Text>
        <Text style={styles.timeFont}>
          {formatDate(chatInfo.ChatTime, true)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 14,
    paddingLeft: 10,
  },
  ownChatContainer: {
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  messageContainer: {
    alignItems: "flex-end",
  },
  chat: {
    borderRadius: 10,
    padding: 10,
  },
  timeFont: {
    marginHorizontal: 10,
    fontSize: 10,
  },
});

export default ChatItem;
