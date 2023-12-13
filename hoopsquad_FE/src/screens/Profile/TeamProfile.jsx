import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { REACT_APP_PROXY } from "@env";
import formatDate from "../../utils/formatDate";
import NavigationBar from "../../components/NavigationBar";
import Usercontext from "../../contexts/UserContext";
import HoopSquadFullLogo from "../../../assets/HoopSquadFullLogo.png";
import TeamProfileBox from "./components/TeamProfileBox";
import ProfileInfo from "./components/ProfileInfo";
import profile_Location from "../../../assets/profile_Location.png";
import profile_Year from "../../../assets/profile_Year.png";

const TeamProfile = ({ route }) => {
  const navigation = useNavigation();
  const { teamId } = route.params;
  const [teamInfo, setTeamInfo] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [userIndex, setUserIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(Usercontext);
  const screenWidth = Dimensions.get("window").width;
  useEffect(() => {
    getTeamDetailInfo();
  }, []);

  const getTeamDetailInfo = async () => {
    try {
      const response = await axios.get(`${REACT_APP_PROXY}team/${teamId}`);
      setTeamInfo(response.data);
      // console.log("팀하나", response.data);
      // console.log("유저", user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / Math.floor(screenWidth - 85));
    setImageIndex(index);
  };

  const userScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / Math.floor(screenWidth - 150));
    setUserIndex(index);
  };

  const checkUser = () => {
    if (teamInfo?.Admin_id === user.User_id) {
      return "수정";
    }
    if (user?.Team.length === 0) {
      return "가입 신청";
    }

    if (user.Team.length > 0) {
      if (
        user.Team[0].Admin_id === user.User_id &&
        user.User_id !== teamInfo?.Admin_id
      ) {
        return "경기 신청";
      }
    }

    return "";
  };

  return (
    <SafeAreaView style={[styles.matchDetail]}>
      <View
        style={[
          styles.header,
          { borderBottomColor: false ? "rgba(0, 0, 0, 0.1)" : "#E2E2E2" },
        ]}
      >
        <View style={styles.headerTitle}>
          <TouchableOpacity onPress={() => navigation.navigate("Team")}>
            <Ionicons
              name="chevron-back"
              size={30}
              color="black"
              style={{ marginTop: 5 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerLeftChildText}>팀 프로필</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              checkUser() === "수정" &&
              navigation.navigate("TeamEdit", { teamId })
            }
          >
            <Text style={[styles.headerRightChildText]}>{checkUser()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imgWrapper}>
        <View style={{ width: screenWidth }}>
          <Image
            resizeMode="cover"
            source={
              teamInfo?.TeamImage !== null
                ? {
                    uri: `${REACT_APP_PROXY}image/team/${teamInfo?.TeamImage}`,
                  }
                : HoopSquadFullLogo
            }
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBlockColor: "#E2E2E2",
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: "700" }}>
            {teamInfo?.Name}
          </Text>
        </View>
        <ScrollView
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingBottom: 400 }}
        >
          <TeamProfileBox title="팀 소개">
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#E2E2E2",
                padding: 10,
                height: 120,
              }}
            >
              <Text>안녕하세요</Text>
            </View>
          </TeamProfileBox>
          <TeamProfileBox title="프로필">
            <View style={{ marginTop: 10 }}>
              <ProfileInfo
                Image={profile_Location}
                Title={"활동 지역"}
                Text={`${
                  teamInfo?.Location1?.City != "null"
                    ? `${teamInfo?.Location1?.location} ${teamInfo?.Location1?.City}`
                    : ""
                } ${
                  teamInfo?.Location2?.City != "null"
                    ? `/ ${teamInfo?.Location2?.location} ${teamInfo?.Location2?.City}`
                    : ""
                }`}
                showUnderline={true}
              />
              <ProfileInfo
                Image={profile_Year}
                Title={"활동 시간"}
                Text={teamInfo?.ActiveTime !== null ? teamInfo?.ActiveTime : ""}
                showUnderline={true}
              />
            </View>
          </TeamProfileBox>
          <TeamProfileBox title="팀 구성원">
            <View style={styles.gridContainer}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                style={styles.scrollImage}
                onScroll={(event) => userScroll(event)}
                scrollEventThrottle={16}
              >
                {teamInfo?.PlayerInfos.length > 0 &&
                  teamInfo?.PlayerInfos.map((info, index) => (
                    <View
                      style={[styles.gridItem, { width: screenWidth / 4 }]}
                      key={index}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Profile", {
                            profileId: info.User_id,
                          })
                        }
                      >
                        <View
                          style={{
                            borderWidth: 1,
                            height: "80%",
                            aspectRatio: 1 / 1,
                            borderRadius: 100,
                            overflow: "hidden",
                            borderColor: "#E2E2E2",
                          }}
                        >
                          <Image
                            resizeMode="cover"
                            source={
                              info?.Image.length > 0
                                ? {
                                    uri: `${REACT_APP_PROXY}image/team/${info.Image[0]}`,
                                  }
                                : HoopSquadFullLogo
                            }
                            style={{ width: "100%", height: "100%" }}
                          />
                        </View>
                      </TouchableOpacity>

                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 14,
                          fontWeight: "700",
                        }}
                      >
                        {info.Name}
                      </Text>
                    </View>
                  ))}
              </ScrollView>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              {teamInfo?.PlayerInfos.length > 0 &&
                teamInfo.PlayerInfos.map(
                  (player, index) =>
                    index % 3 === 0 && (
                      <View
                        key={index}
                        style={[
                          styles.imageDot,
                          {
                            backgroundColor:
                              index / 3 === userIndex ? "#F49058" : "black",
                          },
                        ]}
                      ></View>
                    )
                )}
            </View>
          </TeamProfileBox>
          <TeamProfileBox title="최근 경기 전적">
            <View style={{ alignItems: "center" }}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                style={styles.scrollImage}
                onScroll={(event) => handleScroll(event)}
                scrollEventThrottle={16}
              >
                {teamInfo?.Records.length > 0 &&
                  teamInfo?.Records.map((data, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          width: screenWidth - 40,
                        }}
                        key={index}
                      >
                        <View style={{ flex: 0.8 }}>
                          <View
                            style={{
                              width: "90%",
                              aspectRatio: 1 / 1,
                              marginBottom: 10,
                              borderWidth: 0.5,
                              borderColor: "#E2E2E2",
                              borderRadius: 10,
                              overflow: "hidden",
                            }}
                          >
                            <Image
                              resizeMode="cover"
                              source={
                                teamInfo?.TeamImage !== null
                                  ? {
                                      uri: `${REACT_APP_PROXY}image/team/${teamInfo?.TeamImage}`,
                                    }
                                  : HoopSquadFullLogo
                              }
                              style={{ width: "100%", height: "100%" }}
                            />
                          </View>
                          <Text
                            style={{
                              width: "90%",
                              textAlign: "center",
                              fontSize: 15,
                              fontWeight: "700",
                            }}
                          >
                            {teamInfo?.Name}
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            paddingVertical: 20,
                          }}
                        >
                          <Text style={{ fontSize: 10, color: "#878787" }}>
                            {formatDate(data.matchTime)}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-around",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                color:
                                  data.ourScore > data.opponentScore
                                    ? "#F3A241"
                                    : "black",
                              }}
                            >
                              {data.ourScore}
                            </Text>
                            <Text
                              style={{
                                fontSize: 20,
                                color:
                                  data.ourScore < data.opponentScore
                                    ? "#F3A241"
                                    : "black",
                              }}
                            >
                              {data.opponentScore}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 0.8,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("TeamProfile", { teamId })
                            }
                          >
                            <View
                              style={{
                                width: "90%",
                                aspectRatio: 1 / 1,
                                marginBottom: 10,
                                borderWidth: 0.5,
                                borderColor: "#E2E2E2",
                                borderRadius: 10,
                                overflow: "hidden",
                              }}
                            >
                              <Image
                                resizeMode="cover"
                                source={
                                  data?.opponentImage !== null
                                    ? {
                                        uri: `${REACT_APP_PROXY}image/team/${data?.opponentImage}`,
                                      }
                                    : HoopSquadFullLogo
                                }
                                style={{ width: "100%", height: "100%" }}
                              />
                            </View>
                          </TouchableOpacity>

                          <Text
                            style={{
                              width: "90%",
                              textAlign: "center",
                              fontSize: 15,
                              fontWeight: "700",
                            }}
                          >
                            {data?.opponentTeam}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </ScrollView>
              <View style={{ flexDirection: "row" }}>
                {teamInfo?.Records.length > 0 &&
                  teamInfo?.Records.map((_, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.imageDot,
                          {
                            backgroundColor:
                              index === imageIndex ? "#F49058" : "black",
                          },
                        ]}
                      ></View>
                    );
                  })}
              </View>
            </View>
          </TeamProfileBox>
        </ScrollView>
      </View>

      <NavigationBar opacity={openModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  matchDetail: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    justifyContent: "space-between",
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
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  titleContainer: {
    paddingLeft: 20,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    flexDirection: "row",
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
    flex: 1,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageDot: {
    width: 6,
    height: 6,
    marginRight: 5,
    borderRadius: 5,
  },
  matchWriteImage: {
    backgroundColor: "white",
    borderRadius: 100,
    aspectRatio: 1 / 1,
    width: "14%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageSize: {
    width: "100%",
    height: "100%",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  gridItem: {
    aspectRatio: 1 / 1,
    alignItems: "center",
    marginRight: 20,
  },
  imageDot: {
    width: 6,
    height: 6,
    marginRight: 5,
    borderRadius: 5,
  },
});
export default TeamProfile;
