import { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { REACT_APP_PROXY } from "@env";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Usercontext from "../../contexts/UserContext";
import NotificationItem from "./components/NotificationItem";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar";

const Notification = () => {
  const { user } = useContext(Usercontext);
  const [matchGuestNotificationList, setMatchGuestNotificationList] = useState(
    []
  );
  const [matchHostNotificationList, setmatchHostNotificationList] = useState(
    []
  );
  const [matchNotificationList, setmatchNotificationList] = useState([]);

  const [teamNotificationList, setTeamNotificationList] = useState([]);
  const navigation = useNavigation();
  const [selectTap, setSelectTap] = useState("match");

  useEffect(() => {
    const userId = user.User_id;
    if (userId) {
      getMatchHostNotification();
      getMatchGuestNotification();
      // getTeamNotification();
    }
  }, []);

  useEffect(() => {
    const mergedMatchNotifications = [
      ...matchGuestNotificationList,
      ...matchHostNotificationList,
    ];

    const sortedMatchNotifications = sortNotificationsByTime(
      mergedMatchNotifications
    );
    setmatchNotificationList(sortedMatchNotifications);
  }, [matchGuestNotificationList, matchHostNotificationList]);

  const getMatchHostNotification = async () => {
    try {
      const res = await axios.get(
        `${REACT_APP_PROXY}notification/match/host/${user.User_id}`
      );
      console.log("hostNoti", res.data);
      setmatchHostNotificationList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMatchGuestNotification = async () => {
    try {
      const res = await axios.get(
        `${REACT_APP_PROXY}notification/match/guest/${user.User_id}`
      );
      console.log("guestNoti", res.data);
      setMatchGuestNotificationList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTeamNotification = async () => {
    try {
      const res = await axios.get(
        `${REACT_APP_PROXY}notification/team/${user.User_id}`
      );
      setTeamNotificationList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortNotificationsByTime = (notifications) => {
    return notifications.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const handleTapChange = (tap) => {
    setSelectTap(tap);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerLeftChildText}>알림</Text>
        </View>
      </View>
      <View style={styles.tap}>
        <TouchableOpacity
          style={[styles.tapItem, selectTap === "match" && styles.selectedTap]}
          onPress={() => handleTapChange("match")}
        >
          <Text
            style={[
              styles.tapText,
              selectTap == "match" && styles.selectedFont,
            ]}
          >
            매칭
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tapItem, selectTap === "team" && styles.selectedTap]}
          onPress={() => handleTapChange("team")}
        >
          <Text
            style={[styles.tapText, selectTap == "team" && styles.selectedFont]}
          >
            팀
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.chatContent}
        data={
          selectTap === "match" ? matchNotificationList : teamNotificationList
        }
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerStyle={{ paddingBottom: 65 }}
      />
      <NavigationBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tap: {
    flexDirection: "row",
    height: 70,
  },
  tapItem: {
    flex: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#CDCDCD",
    color: "#878787",
  },
  tapText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#878787",
  },
  selectedTap: {
    borderBlockColor: "#F3A241",
  },
  selectedFont: {
    color: "#000000",
  },
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

export default Notification;
