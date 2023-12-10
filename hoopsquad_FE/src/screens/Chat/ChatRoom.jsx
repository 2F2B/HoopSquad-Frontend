import { useState, useContext, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { REACT_APP_PROXY } from "@env";
import SocketContext from "../../contexts/SocketContext";
import Usercontext from "../../contexts/UserContext";
import ChatItem from "./components/ChatItem";

const ChatRoom = ({ route, navigation }) => {
  const { roomId, postingId, nickname, image } = route.params;
  const { socketRef, chatList } = useContext(SocketContext);
  const { user } = useContext(Usercontext);
  const [message, setMessage] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatList]);

  const handleSendMessage = () => {
    if (message) {
      socketRef.current.emit(
        "send",
        user.Name,
        user.User_id,
        message,
        postingId,
        roomId
      );
      setMessage("");
    }
  };

  const checkOwnChat = (userId) => {
    return user.User_id === userId;
  };

  const onLayoutHandler = () => {
    flatListRef.current.scrollToEnd({ animated: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.imgWrapper}>
            <Image
              resizeMode="cover"
              source={{
                uri: `${REACT_APP_PROXY}image/user/${image}`,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text style={styles.headerLeftChildText}>{nickname}</Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        style={styles.chatContent}
        data={chatList[roomId]}
        keyExtractor={(item) => item.Message_id}
        renderItem={({ item }) => (
          <ChatItem chatInfo={item} isUserChat={checkOwnChat(item.User_id)} />
        )}
        onContentSizeChange={() => {
          flatListRef.current.scrollToEnd({ animated: true });
        }}
        onLayout={onLayoutHandler}
        extraData={chatList[roomId]}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    justifyContent: "flex-start",
    borderBottomColor: "#E2E2E2",
  },
  headerLeftChildText: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: "bold",
  },
  chatContent: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E2E2E2",
  },
  sendButton: {
    height: 50,
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3A241",
  },
  imgWrapper: {
    width: 40,
    aspectRatio: 1 / 1,
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    marginHorizontal: 6,
  },
});

export default ChatRoom;
