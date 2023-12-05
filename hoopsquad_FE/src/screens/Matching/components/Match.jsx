import { Text, View, Button, StyleSheet, TextInput, Image } from "react-native";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { REACT_APP_PROXY } from "@env";
import GameType from "./GameType";
import HoopSquadFullLogo from "../../../../assets/HoopSquadFullLogo.png";

const Match = (props) => {
  const {
    Title,
    gameType,
    currentAmount,
    recruitAmount,
    Location,
    writeDate,
    Images,
  } = props;
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
  }, [writeDate]);

  return (
    <View style={styles.matchContainer}>
      <View style={styles.matchImageWrapper}>
        <Image
          resizeMode="cover"
          source={
            Images
              ? { uri: `${REACT_APP_PROXY}image/match/${Images.ImageData}` }
              : HoopSquadFullLogo
          }
          style={styles.matchImage}
        ></Image>
      </View>
      <View>
        <Text style={styles.matchTitle}>{Title}</Text>

        <GameType gameType={gameType} />

        <Text style={styles.matchMember}>
          참가 인원 {currentAmount}명 / {recruitAmount}명
        </Text>
        <View style={styles.matchLocationWrapper}>
          <Entypo name="location-pin" size={16} color="black" />
          <Text style={styles.matchLocation}>{Location}</Text>
        </View>
        <Text style={styles.matchDate}>{formattedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  matchContainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#F6F6F6",
    marginBottom: 15,
  },
  matchImageWrapper: {
    marginRight: 25,
    width: "27%",
    aspectRatio: 1 / 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 20,
    overflow: "hidden",
  },
  matchImage: {
    width: "100%",
    height: "100%",
  },
  matchTitle: {
    fontSize: 13,
    fontWeight: "700",
    alignItems: "flex-start",
  },
  matchMember: {
    fontSize: 11,
    fontWeight: "600",
  },
  matchLocationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  matchLocation: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 5,
  },
  matchDate: {
    fontSize: 9,
    fontWeight: "600",
    marginBottom: 10,
    color: "#878787",
  },
});
export default Match;
