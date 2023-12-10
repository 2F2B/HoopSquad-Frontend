import { Text, View, StyleSheet } from "react-native";
import { PureComponent } from "react";
import formatDate from "../../../utils/formatDate";

class ChatItem extends PureComponent {
  render() {
    const { chatInfo, isUserChat } = this.props;
    const messageDirection = isUserChat ? "row-reverse" : "row";
    const chatBackground = isUserChat ? "#F3A241" : "#F8F8F8";
    const chatColor = isUserChat ? "#ffffff" : "black";

    return (
      <View
        style={[styles.chatContainer, isUserChat && styles.ownChatContainer]}
      >
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
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 14,
    paddingTop : 5,
    paddingLeft: 10,
  },
  ownChatContainer: {
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  messageContainer: {
    alignItems: "flex-end",
    maxWidth : 300,
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
