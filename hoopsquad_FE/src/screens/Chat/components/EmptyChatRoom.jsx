import { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { REACT_APP_PROXY } from "@env";
import { useNavigation } from "@react-navigation/native";
import HoopSquadFullLogo from "../../../../assets/HoopSquadFullLogo.png";
import SocketContext from "../../../contexts/SocketContext";
import Usercontext from "../../../contexts/UserContext";

const EmptyChatRoom = ({ route }) => {
  const { opponentImage, hostId, guestId, postingId, nickname } = route.params;

  const navigation = useNavigation();
  const { socketRef } = useContext(SocketContext);
  const { user } = useContext(Usercontext);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message) {
      makeRoom();
      setMessage("");
    }
  };

  const makeRoom = () => {
    socketRef.current.emit("makeRoom", hostId, guestId, postingId, (roomId) => {
      socketRef.current.emit(
        "send",
        user.Name,
        user.User_id,
        message,
        postingId,
        roomId
      );
      navigation.replace("ChatRoom", {
        roomId,
        postingId,
        nickname,
        opponentImage,
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.imgWrapper}>
            {opponentImage ? (
              <Image
                resizeMode="cover"
                source={{
                  uri: `${REACT_APP_PROXY}image/user/${opponentImage}`,
                }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Image
                resizeMode="cover"
                source={HoopSquadFullLogo}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
          <Text style={styles.headerLeftChildText}>{nickname}</Text>
        </View>
      </View>
      <View style={styles.chatContent}></View>
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

export default EmptyChatRoom;
