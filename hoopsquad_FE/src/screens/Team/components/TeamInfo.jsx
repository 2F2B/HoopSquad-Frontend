import { Text, View, Button, StyleSheet, TextInput, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { REACT_APP_PROXY } from "@env";
import formatDate from "../../../utils/formatDate";
import HoopSquadFullLogo from "../../../../assets/HoopSquadFullLogo.png";

const TeamInfo = (props) => {
  const {
    Name,
    teamImage,
    lastDate,
    Location1,
    City1,
    Location2,
    City2,
    game,
    lose,
    win,
  } = props;

  return (
    <View style={[styles.matchContainer]}>
      <View style={[styles.matchImageWrapper]}>
        <Image
          resizeMode="cover"
          source={
            teamImage.length > 0
              ? {
                  uri: `${REACT_APP_PROXY}image/team/${teamImage[0].ImageName}`,
                }
              : HoopSquadFullLogo
          }
          style={[styles.matchImage, props.opacity && { opacity: 0.1 }]}
        ></Image>
      </View>

      <View
        style={{
          height: "95%",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.matchTitle}>{Name}</Text>

        <View style={styles.matchLocationWrapper}>
          <Entypo name="location-pin" size={16} color="black" />
          <Text style={styles.matchLocation}>
            {`${Location1} ${City1} ${Location2 && City2 ? "/" : ""} ${
              Location2 || ""
            } ${City2 || ""}`}
          </Text>
        </View>
        <Text style={styles.teamRecord}>{`${game}전 ${win}승 ${lose}패`}</Text>
        <Text style={styles.matchDate}>
          {lastDate !== null ? formatDate(lastDate) : "최근 경기 없음"}
        </Text>
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
    alignItems: "center",
    paddingBottom: 10,
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
  },
  teamRecord: {
    fontSize: 11,
    fontWeight: "600",
  },
  matchDate: {
    fontSize: 9,
    fontWeight: "600",
    color: "#878787",
  },
});
export default TeamInfo;
