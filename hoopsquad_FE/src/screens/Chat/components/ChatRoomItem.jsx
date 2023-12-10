import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { REACT_APP_PROXY } from "@env";
import { useNavigation } from "@react-navigation/native";
import SocketContext from "../../../contexts/SocketContext";
import Usercontext from "../../../contexts/UserContext";
import formatDate from "../../../utils/formatDate";
import { useContext } from "react";

const ChatRoomItem = ({ item, socketRef }) => {
  const {
    image,
    lastChatMessage,
    lastChatTime,
    nickname,
    postingId,
    postingTitle,
    roomId,
  } = item;

  const navigation = useNavigation();
  const { setChatList } = useContext(SocketContext);
  const { user } = useContext(Usercontext);

  const handleEnterRoom = () => {
    const userId = user.User_id;
    if (userId) {
      enterRoom(roomId, userId);
    }
  };

  const enterRoom = (roomId, userId) => {
    socketRef.current.emit("enterRoom", roomId, userId, (chatInfo) => {
      const chatList = chatInfo.chatList;
      const opponentImage = chatInfo.opponentImageName;
      setChatList((prevChatList) => ({
        ...prevChatList,
        [roomId]: chatList,
      }));
      navigation.navigate("ChatRoom", {
        roomId,
        postingId,
        nickname,
        opponentImage,
      });
    });
  };

  return (
    <TouchableOpacity
      style={styles.chat}
      onPress={() => {
        handleEnterRoom();
      }}
    >
      <View style={styles.imgWrapper}>
        <Image
          resizeMode="cover"
          source={{
            uri: `${REACT_APP_PROXY}image/user/${image}`,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatLayout}>
          <Text style={styles.userNickname}>{nickname}</Text>
          <Text style={styles.timeFont}>{formatDate(lastChatTime, true)}</Text>
        </View>
        <View style={styles.chatLayout}>
          <Text>{lastChatMessage}</Text>
          <Text style={styles.chatCount}>{0}</Text>
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

export default ChatRoomItem;
