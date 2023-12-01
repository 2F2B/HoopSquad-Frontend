import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { REACT_APP_PROXY } from "@env";
import formatDate from "../../utils/formatDate";
import NavigationBar from "../../components/NavigationBar";
import MatchInfoSection from "./components/MatchInfoSection";
import GameType from "../Matching/components/GameType";
import HoopSquadFullLogo from "../../../assets/HoopSquadFullLogo.png";
import HoopSquadLogoPin from "../../../assets/HoopSquadLogoPin.png";
const MatchDetail = ({ route }) => {
  const navigation = useNavigation();
  const { postingId } = route.params;
  const [matchInfo, setMatchInfo] = useState(null);
  const [matchLocation, setMatchLocation] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    getMatchDetailInfo();
  }, []);

  const getMatchDetailInfo = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_PROXY}match/?info=true&Posting_id=${postingId}`
      );
      setMatchLocation(response.data);
      setMatchInfo(response.data.Posting);
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / Math.floor(screenWidth));
    setImageIndex(index);
  };

  return (
    <SafeAreaView style={styles.matchDetail}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity onPress={() => navigation.navigate("Match")}>
            <Ionicons
              name="chevron-back"
              size={30}
              color="black"
              style={{ marginTop: 5 }}
            />
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
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            flexDirection: "row",
          }}
          style={styles.scrollImage}
          onScroll={(event) => handleScroll(event)}
        >
          {matchInfo && matchInfo[0].Image.length > 0 ? (
            matchInfo[0].Image.map((image, index) => {
              return (
                <View key={index} style={{ width: screenWidth }}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri: `${REACT_APP_PROXY}image/match/${image.ImageData}`,
                    }}
                    style={styles.scrollImage}
                  />
                </View>
              );
            })
          ) : (
            <View style={{ width: screenWidth }}>
              <Image
                resizeMode="contain"
                source={HoopSquadFullLogo}
                style={styles.scrollImage}
              ></Image>
            </View>
          )}
        </ScrollView>
        <View style={{ flexDirection: "row" }}>
          {matchInfo &&
            matchInfo[0].Image.map((_, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.imageDot,
                    {
                      backgroundColor:
                        index === imageIndex ? "#F49058" : "#D9D9D9",
                    },
                  ]}
                ></View>
              );
            })}
        </View>
      </View>

      <View style={styles.titleContainer}>
        {matchInfo && matchInfo[0] && (
          <>
            <Text style={styles.titleText}>{matchInfo[0].Title}</Text>
            {matchInfo[0].WriteDate && (
              <Text style={styles.timeText}>
                {formatDate(matchInfo[0].WriteDate)}
              </Text>
            )}
          </>
        )}
      </View>

      <ScrollView style={styles.contentContainer}>
        <MatchInfoSection title="매칭 안내">
          {matchInfo && matchInfo[0] && <Text>{matchInfo[0].Introduce}</Text>}
        </MatchInfoSection>

        <MatchInfoSection title="게임 유형">
          {matchInfo && matchInfo[0] && (
            <GameType gameType={matchInfo[0]?.GameType} />
          )}
        </MatchInfoSection>
        <MatchInfoSection title="참가 인원">
          {matchInfo && matchInfo[0] && (
            <Text>
              {matchInfo[0].CurrentAmount}명 / {matchInfo[0].RecruitAmount}명
            </Text>
          )}
        </MatchInfoSection>
        <MatchInfoSection title="매칭 위치">
          {matchLocation && (
            <MapView
              style={styles.googleMap}
              initialRegion={{
                latitude: matchLocation.Lat,
                longitude: matchLocation.Lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              provider={PROVIDER_GOOGLE}
            >
              <Marker
                coordinate={{
                  latitude: matchLocation.Lat,
                  longitude: matchLocation.Lng,
                }}
                pinColor="#FF0000"
                title={matchLocation.LocationName}
                image={HoopSquadLogoPin}
              />
            </MapView>
          )}
        </MatchInfoSection>
      </ScrollView>
      <NavigationBar />
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
    marginBottom: 15,
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
  scrollImage: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleMap: {
    width: "100%",
    height: 200,
    marginBottom: 80,
  },
  imageDot: {
    width: 6,
    height: 6,
    marginRight: 5,
    borderRadius: 5,
  },
});
export default MatchDetail;
