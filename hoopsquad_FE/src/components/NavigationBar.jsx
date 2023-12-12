import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import Usercontext from "../contexts/UserContext";
import Team from "../../assets/Team.png";
import Chat from "../../assets/Chat.png";
import Matching from "../../assets/Matching.png";
import BasketBallCourt from "../../assets/BasketBallCourt.png";
import Main from "../../assets/Main.png";

const NavigationBar = (props) => {
  const navigation = useNavigation();
  const { user } = useContext(Usercontext);
  const currentScreen =
    navigation.getState().routes[navigation.getState().index].name;

  return (
    <View
      style={[
        styles.navigationBarContainer,
        { borderTopColor: props.opacity ? "rgba(0, 0, 0, 0.1)" : "#E2E2E2" },
        { backgroundColor: props.opacity ? "#878787" : "#ffffff" },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.navigationBox,
          {
            borderBottomWidth: currentScreen === "Team" ? 1.5 : 0,
            borderColor: currentScreen === "Team" ? "#F3A241" : "transparent",
          },
        ]}
        onPress={() => navigation.navigate("Team")}
        disabled={props.touchable}
      >
        <View
          style={{
            height: "60%",
            width: "100%",
            marginBottom: 5,
          }}
        >
          <Image
            source={Team}
            resizeMode="contain"
            style={styles.navigationImg}
          ></Image>
        </View>

        <Text>팀</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navigationBox,
          {
            borderBottomWidth: currentScreen === "ChatList" ? 1.5 : 0,
            borderColor:
              currentScreen === "ChatList" ? "#F3A241" : "transparent",
          },
        ]}
        onPress={() => navigation.navigate("ChatList")}
        disabled={props.touchable}
      >
        <View style={{ height: "60%", width: "100%", marginBottom: 5 }}>
          <Image
            source={Chat}
            resizeMode="contain"
            style={styles.navigationImg}
          ></Image>
        </View>

        <Text>채팅</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navigationBox,
          {
            borderBottomWidth: currentScreen === "Main" ? 1.5 : 0,
            borderColor: currentScreen === "Main" ? "#F3A241" : "transparent",
          },
        ]}
        onPress={() => navigation.navigate("Main")}
        disabled={props.touchable}
      >
        <View style={{ height: "60%", width: "100%", marginBottom: 5 }}>
          <Image
            source={Main}
            resizeMode="contain"
            style={styles.navigationImg}
          ></Image>
        </View>

        <Text>메인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navigationBox,
          {
            borderBottomWidth: currentScreen === "Match" ? 1.5 : 0,
            borderColor: currentScreen === "Match" ? "#F3A241" : "transparent",
          },
        ]}
        onPress={() => navigation.navigate("Match")}
        disabled={props.touchable}
      >
        <View style={{ height: "60%", width: "100%", marginBottom: 5 }}>
          <Image
            source={Matching}
            resizeMode="contain"
            style={styles.navigationImg}
          ></Image>
        </View>

        <Text>매칭</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navigationBox,
          {
            borderBottomWidth: currentScreen === "aa" ? 1.5 : 0,
            borderColor: currentScreen === "aa" ? "#F3A241" : "transparent",
          },
        ]}
        disabled={props.touchable}
      >
        <View style={{ height: "60%", width: "100%", marginBottom: 5 }}>
          <Image
            source={BasketBallCourt}
            resizeMode="contain"
            style={styles.navigationImg}
          ></Image>
        </View>

        <Text>농구장</Text>
      </TouchableOpacity>
    </View>
  );
};

NavigationBar.defaultProps = {
  opacity: false,
  touchable: false,
};

const styles = StyleSheet.create({
  navigationBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    height: 65,
  },
  navigationBox: {
    width: "20%",
    alignItems: "center",
    paddingBottom: 5,
  },
  navigationImg: {
    width: "100%",
    height: "100%",
    marginTop: 5,
  },
});
export default NavigationBar;
