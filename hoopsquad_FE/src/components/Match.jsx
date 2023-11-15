import { Text, View, Button, StyleSheet, TextInput, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import GameType from "../components/GameType";
import HoopSquadFullLogo from "../../assets/HoopSquadFullLogo.png";

const Match = (props) => {
  const { Title, gameType, currentAmount, recruitAmount, Location, writeDate } =
    props;
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const newDate = new Date(writeDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    setFormattedDate(newDate.toLocaleString("ko", options));
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "#F6F6F6",
        marginBottom: 15,
      }}
    >
      <View
        style={{
          marginRight: 35,
          height: 100,
          width: 100,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#E2E2E2",
          borderRadius: 20,
        }}
      >
        <Image
          resizeMode="contain"
          source={HoopSquadFullLogo}
          style={{ width: "80%", height: "100%" }}
        ></Image>
      </View>
      <View>
        <Text
          style={{ fontSize: 13, fontWeight: "700", alignItems: "flex-start" }}
        >
          {Title}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {gameType.map((data, index) => (
            <GameType key={index} gameType={data} />
          ))}
        </View>

        <Text style={{ fontSize: 11, fontWeight: "600" }}>
          참가 인원 {currentAmount}명 / {recruitAmount}명
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Entypo name="location-pin" size={16} color="black" />
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            {Location}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 9,
            fontWeight: "600",
            marginBottom: 10,
            color: "#878787",
          }}
        >
          {formattedDate}
        </Text>
      </View>
    </View>
  );
};

export default Match;
