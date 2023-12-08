import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NavigationBar from "../../components/NavigationBar";
import ChatRoomItem from "./components/ChatRoomItem";
import { useContext, useEffect } from "react";
import Usercontext from "../../contexts/UserContext";
import SocketContext from "../../contexts/SocketContext";

const ChatList = () => {
  const navigation = useNavigation();

  const { user } = useContext(Usercontext);
  const { socketRef, chatRooms, setChatRooms } = useContext(SocketContext);

  useEffect(() => {
    const userId = user.User_id;

    socketRef.current.emit("joinAllRooms", userId, (chatRooms) => {
      setChatRooms(chatRooms);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerLeftChildText}>채팅</Text>
        </View>
      </View>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.postingId}
        renderItem={({ item }) => (
          <ChatRoomItem item={item} socketRef={socketRef} />
        )}
      />
      <NavigationBar />
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
    justifyContent: "space-between",
    borderBottomColor: "#E2E2E2",
  },
  headerLeftChildText: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: "bold",
  },
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
  buttonStyle: {
    width: 300,
    height: 40,
    backgroundColor: "#F3A241",
    color: "#ffffff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChatList;
