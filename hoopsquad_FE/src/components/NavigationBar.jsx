import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Team from "../../assets/Team.png";
import Chat from "../../assets/Chat.png";
import Matching from "../../assets/Matching.png";
import BasketBallCourt from "../../assets/BasketBallCourt.png";
import Profile from "../../assets/Profile.png";

const NavigationBar = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        borderWidth: 1,
        width: "100%",
        height: "10%",
      }}
    >
      <TouchableOpacity
        style={{
          height: 35,
          width: "20%",
          alignItems: "center",
        }}
      >
        <Image
          source={Team}
          resizeMode="contain"
          style={{ width: "100%", height: "100%", marginTop: 5 }}
        ></Image>
        <Text>팀</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ height: 35, width: "20%", alignItems: "center" }}
      >
        <Image
          source={Chat}
          resizeMode="contain"
          style={{ width: "100%", height: "100%", marginTop: 5 }}
        ></Image>
        <Text>채팅</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 35, width: "20%", alignItems: "center" }}
        onPress={() => navigation.navigate("Match")}
      >
        <Image
          source={Matching}
          resizeMode="contain"
          style={{ width: "100%", height: "100%", marginTop: 5 }}
        ></Image>
        <Text>매칭</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 35, width: "20%", alignItems: "center" }}
      >
        <Image
          source={BasketBallCourt}
          resizeMode="contain"
          style={{ width: "100%", height: "100%", marginTop: 5 }}
        ></Image>
        <Text>농구장</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 35, width: "20%", alignItems: "center" }}
      >
        <Image
          source={Profile}
          resizeMode="contain"
          style={{ width: "100%", height: "100%", marginTop: 5 }}
        ></Image>
        <Text>프로필</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;
