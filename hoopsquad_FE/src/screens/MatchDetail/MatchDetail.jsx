import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { REACT_APP_PROXY } from "@env";
import { useEffect, useState } from "react";
import formatDate from "../../utils/formatDate";
import MatchInfoSection from "./components/MatchInfoSection";
import GameType from "../Matching/components/GameType";

const MatchDetail = ({ route }) => {
  const navigation = useNavigation();
  const { postingId } = route.params;
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    getMatchDetailInfo();
  }, []);

  const getMatchDetailInfo = async () => {
    try {
      const response = await axios.get(`${REACT_APP_PROXY}match/info`, {
        Posting_id: postingId,
      });
      setMatchInfo(response.data.Posting);
      console.log(response.data.Posting);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.matchDetail}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Match")}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerLeftChildText}>매칭 상세</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Match")}>
            <Text style={styles.headerRightChildText}>신청</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imgWrapper}>
        <Image
          resizeMode="contain"
          source={
            matchInfo?.Image_id ||
            require("../../../assets/HoopSquadFullLogo.png")
          }
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{matchInfo?.Title}</Text>
        <Text style={styles.timeText}>
          {matchInfo && formatDate(matchInfo.WriteDate)}
        </Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <MatchInfoSection title="매칭 안내">
          <Text>{matchInfo?.Introduce}</Text>
        </MatchInfoSection>
        <MatchInfoSection title="게임 유형">
          {matchInfo?.GameType.map((gameType, idx) => {
            return <GameType key={idx} gameType={gameType} />;
          })}
        </MatchInfoSection>
        <MatchInfoSection title="참가 인원">
          <Text>
            참가 인원 {matchInfo?.CurrentAmount} / {matchInfo?.RecruitAmount}
          </Text>
        </MatchInfoSection>
        <MatchInfoSection title="매칭 위치"></MatchInfoSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  matchDetail: {
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
  headerRightChildText: {
    color: "#F3A241",
    fontSize: 16,
    fontWeight: "bold",
  },
  imgWrapper: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    paddingLeft: 20,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: "#E2E2E2",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  timeText: {
    fontSize: 13,
    color: "#878787",
  },
  contentContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
export default MatchDetail;
