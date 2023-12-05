import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Team from "../../assets/Team.png";
import Chat from "../../assets/Chat.png";
import Matching from "../../assets/Matching.png";
import BasketBallCourt from "../../assets/BasketBallCourt.png";
import Profile from "../../assets/Profile.png";

const NavigationBar = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.navigationBarContainer,
        { borderTopColor: props.opacity ? "rgba(0, 0, 0, 0.1)" : "#E2E2E2" },
        { backgroundColor: props.opacity ? "#878787" : "#ffffff" },
      ]}
    >
      <TouchableOpacity style={styles.navigationBox}>
        <Image
          source={Team}
          resizeMode="contain"
          style={styles.navigationImg}
        ></Image>
        <Text>팀</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navigationBox}>
        <Image
          source={Chat}
          resizeMode="contain"
          style={styles.navigationImg}
        ></Image>
        <Text>채팅</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationBox}
        onPress={() => navigation.navigate("Match")}
      >
        <Image
          source={Matching}
          resizeMode="contain"
          style={styles.navigationImg}
        ></Image>
        <Text>매칭</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navigationBox}>
        <Image
          source={BasketBallCourt}
          resizeMode="contain"
          style={styles.navigationImg}
        ></Image>
        <Text>농구장</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationBox}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={Profile}
          resizeMode="contain"
          style={styles.navigationImg}
        ></Image>
        <Text>프로필</Text>
      </TouchableOpacity>
    </View>
  );
};

NavigationBar.defaultProps = {
  opacity: false,
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
    height: 35,
    width: "20%",
    alignItems: "center",
  },
  navigationImg: {
    width: "100%",
    height: "100%",
    marginTop: 5,
  },
});
export default NavigationBar;
