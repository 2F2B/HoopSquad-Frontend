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
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { REACT_APP_PROXY } from "@env";
import { Feather } from "@expo/vector-icons";
import Usercontext from "../../contexts/UserContext";
import ProfileInfo from "./components/ProfileInfo";
import HoopScoreModal from "./components/HoopScoreModal";
import NavigationBar from "../../components/NavigationBar";
import HoopSquadFullLogo from "../../../assets/HoopSquadFullLogo.png";
import Rank_Rookie from "../../../assets/Rank_Rookie.png";
import Rank_Amateur from "../../../assets/Rank_Amateur.png";
import Rank_Pro from "../../../assets/Rank_Pro.png";
import Rank_Superstar from "../../../assets/Rank_Superstar.png";
import profile_Weight from "../../../assets/profile_Weight.png";
import profile_Height from "../../../assets/profile_Height.png";
import profile_Location from "../../../assets/profile_Location.png";
import profile_GameType from "../../../assets/profile_GameType.png";
import profile_Year from "../../../assets/profile_Year.png";

const Profile = ({ route }) => {
  const navigation = useNavigation();
  const [profileInfo, setProfileInfo] = useState();
  const [hoopScoreModal, setHoopScoreModal] = useState(false);
  const { user } = useContext(Usercontext);
  const screenWidth = Dimensions.get("window").width;
  const { profileId } = route.params;
  const rankName = ["루키", "아마추어", "프로", "슈퍼스타"];
  const rankImage = [Rank_Rookie, Rank_Amateur, Rank_Pro, Rank_Superstar];

  const test = [1, 2];
  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_PROXY}profile/user/${profileId}`
      );
      setProfileInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGameTypeText = (gameType) => {
    const typeMappings = {
      FiveOnFive: "5 vs 5",
      OneOnOne: "1 vs 1",
      ThreeOnThree: "3 vs 3",
    };
    const trueKeys = Object.keys(gameType).filter((key) => gameType[key]);
    const resultStrings = trueKeys.map((key) => typeMappings[key]);
    const resultString = resultStrings.join("   ");

    return resultString;
  };

  return (
    <SafeAreaView
      style={[
        styles.Profile,
        hoopScoreModal && { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      ]}
    >
      <StatusBar style="dark" />
      {hoopScoreModal && (
        <HoopScoreModal setHoopScoreModal={setHoopScoreModal} />
      )}
      <View
        style={[
          styles.header,
          {
            borderBottomColor: hoopScoreModal
              ? "rgba(0, 0, 0, 0.1)"
              : "#E2E2E2",
          },
        ]}
      >
        <View style={styles.headerTitle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={30}
              color="black"
              style={{ marginTop: 5 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerLeftChildText}>프로필</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text
              style={[
                styles.headerRightChildText,
                { opacity: hoopScoreModal ? 0.3 : 1 },
              ]}
            >
              {profileInfo?.User_id === user.User_id ? "수정" : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 세부 내용 */}
      <ScrollView>
        {/* 프로필 */}
        <View style={styles.profileUserWrapper}>
          <View style={styles.profileImageWrapper}>
            <Image
              resizeMode="cover"
              source={{
                uri: `${REACT_APP_PROXY}image/user/${profileInfo?.Image.ImageData}`,
              }}
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </View>
          <View>
            <Text style={styles.profileUserName}>{profileInfo?.Name}</Text>
          </View>
          <View>
            <Text style={styles.profileUserIntroduce}>
              {profileInfo?.Introduce}
            </Text>
          </View>
        </View>

        {/* 훕 스코어 */}
        <View style={styles.profileHoopScore}>
          <TouchableOpacity onPress={() => setHoopScoreModal(true)}>
            <View style={styles.hoopScoreTitle}>
              <Text style={styles.hoopScoreText}>훕스코어</Text>
              <Feather name="info" size={12} color="#464646" />
            </View>
          </TouchableOpacity>
          <View style={styles.hoopScoreInfoContainer}>
            <View style={styles.hoopScoreRankImage}>
              <Image
                resizeMode="contain"
                source={
                  rankImage[
                    Math.floor(profileInfo?.Overall / 100) >= 3
                      ? 3
                      : Math.floor(profileInfo?.Overall / 100)
                  ]
                }
                style={{ width: "80%", height: "80%" }}
              ></Image>
            </View>
            <View style={{ width: "80%" }}>
              <View style={styles.hoopScoreInfoWrapper}>
                <View style={styles.hoopScoreInfoTitle}>
                  <Text style={styles.hoopScoreRankName}>
                    {
                      rankName[
                        Math.floor(profileInfo?.Overall / 100) >= 3
                          ? 3
                          : Math.floor(profileInfo?.Overall / 100)
                      ]
                    }
                  </Text>
                  <Text style={{ fontSize: 8, color: "#666666" }}>
                    {Math.floor(profileInfo?.Overall / 100) < 3
                      ? `( ${profileInfo?.Overall} / ${
                          (Math.floor(profileInfo?.Overall / 100) + 1) * 100
                        } )`
                      : `( ${profileInfo?.Overall} )`}
                  </Text>
                </View>
                {Math.floor(profileInfo?.Overall / 100) < 3 && (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 12, color: "#F3A241" }}>
                      {
                        rankName[
                          Math.floor(profileInfo?.Overall / 100) >= 3
                            ? 3
                            : Math.floor(profileInfo?.Overall / 100) + 1
                        ]
                      }
                    </Text>
                    <Text style={{ fontSize: 12, color: "#666666" }}>
                      까지{" "}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#F3A241" }}>
                      {100 - Math.floor(profileInfo?.Overall % 100)}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#666666" }}>
                      점 남았어요!
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.hoopScoreStatusBar}>
                <View
                  style={[
                    styles.hoopScoreStatus,
                    {
                      width: `${100 - Math.floor(profileInfo?.Overall % 100)}%`,
                    },
                  ]}
                ></View>
              </View>
            </View>
          </View>
        </View>

        {/* 소속 팀 */}
        <View style={styles.profileUserTeam}>
          <View style={styles.hoopScoreTitle}>
            <Text style={styles.profileUserTeamTitle}>소속 팀</Text>
            <Ionicons name="chevron-forward" size={18} color="#464646" />
          </View>
          {/* 팀 존재 or 팀 없음 */}
          <View
            style={[
              styles.profileUserTeamWrapper,
              {
                borderBottomColor: hoopScoreModal
                  ? "rgba(0, 0, 0, 0.1)"
                  : "#E2E2E2",
              },
            ]}
          >
            {profileInfo?.Team.length > 0 ? (
              <>
                <View
                  style={[
                    styles.teamImageWrapper,
                    {
                      backgroundColor: profileInfo.Team[0].TeamImage
                        ? "transparent"
                        : "#D9D9D9",
                    },
                  ]}
                >
                  <Image
                    resizeMode="cover"
                    source={{
                      uri: `${REACT_APP_PROXY}image/team/${profileInfo.Team[0].TeamImage}`,
                    }}
                    style={{ width: "100%", height: "100%" }}
                  ></Image>
                </View>
                <View>
                  <Text style={styles.teamName}>
                    {profileInfo.Team[0].Name}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#8F8F8F" }}>
                    {profileInfo.Team[0].Introduce}
                  </Text>
                </View>
              </>
            ) : (
              <View style={{ width: "100%", marginTop: 10, marginBottom: 40 }}>
                <Text style={styles.teamText}>소속 팀이 없어요.</Text>
                <Text style={styles.teamText}>
                  팀원들과 뜨거운 경기를 펼쳐보세요!
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 프로필 */}
        <View style={{ paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }}>
          <View style={styles.hoopScoreTitle}>
            <Text style={styles.hoopScoreText}>프로필</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <ProfileInfo
              Image={profile_Height}
              Title={"신장"}
              Text={
                profileInfo?.Height != null ? `${profileInfo?.Height} cm` : ""
              }
              showUnderline={true}
              opacity={hoopScoreModal}
            />
            <ProfileInfo
              Image={profile_Weight}
              Title={"몸무게"}
              Text={
                profileInfo?.Weight != null ? `${profileInfo?.Weight} cm` : ""
              }
              showUnderline={true}
              opacity={hoopScoreModal}
            />
            <ProfileInfo
              Image={profile_GameType}
              Title={"선호 게임 유형"}
              Text={
                profileInfo?.GameType && getGameTypeText(profileInfo?.GameType)
              }
              showUnderline={true}
              opacity={hoopScoreModal}
            />

            <ProfileInfo
              Image={profile_Location}
              Title={"활동 지역"}
              Text={
                profileInfo?.Location != null ? `${profileInfo?.Location}` : ""
              }
              showUnderline={true}
              opacity={hoopScoreModal}
            />
            <ProfileInfo
              Image={profile_Year}
              Title={"경력"}
              Text={profileInfo?.Year != null ? `${profileInfo?.Year}년차` : ""}
              showUnderline={true}
              opacity={hoopScoreModal}
            />
          </View>
        </View>

        {/* 최근 경기 후기 */}
        <View style={{ paddingBottom: 10, paddingLeft: 20 }}>
          <View style={styles.hoopScoreTitle}>
            <Text style={styles.hoopScoreText}>최근 경기 후기</Text>
          </View>
          <View style={{ paddingBottom: 80, marginTop: 20 }}>
            {/* 후기 있음 */}
            {test.length > 0 ? (
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{
                  flexDirection: "row",
                }}
              >
                {test.map((data, index) => (
                  <View
                    key={index}
                    style={{
                      width: screenWidth * 0.55,
                      paddingTop: 15,
                      paddingBottom: 50,
                      borderRadius: 5,
                      paddingLeft: 10,
                      marginRight: 10,
                      backgroundColor: "rgba(226, 226, 226, 0.4)",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "rgba(226, 226, 226)",

                          borderRadius: 100,
                          aspectRatio: 1 / 1,
                          width: "13%",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 10,
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          source={HoopSquadFullLogo}
                          style={{ width: "85%", height: "100%" }}
                        ></Image>
                      </View>
                      <Text style={{ fontSize: 12 }}>권수열</Text>
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 14 }}>
                      Great teammate!!
                    </Text>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View
                style={{
                  paddingTop: 30,
                  paddingBottom: 50,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#666666",
                    fontSize: 12,
                  }}
                >
                  최근 한달 간 경기가 없어요.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <NavigationBar opacity={hoopScoreModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Profile: {
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
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
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
  profileUserWrapper: {
    padding: 30,
    alignItems: "center",
    flex: 1,
  },
  profileImageWrapper: {
    width: "30%",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 100,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E2E2E2",
    overflow: "hidden",
  },
  profileUserName: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10,
  },
  profileUserIntroduce: {
    textAlign: "center",
    fontSize: 12,
    color: "#8F8F8F",
  },
  profileHoopScore: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    flex: 1,
  },
  hoopScoreTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  hoopScoreText: {
    fontSize: 16,
    fontWeight: "900",
    marginRight: 5,
  },
  hoopScoreInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 35,
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E2E2",
  },
  hoopScoreRankImage: {
    backgroundColor: "rgba(226, 226, 226, 0.4)",
    borderRadius: 100,
    aspectRatio: 1 / 1,
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  hoopScoreInfoWrapper: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  hoopScoreInfoTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  hoopScoreRankName: {
    fontSize: 16,
    fontWeight: "900",
    marginRight: 5,
  },
  hoopScoreStatusBar: {
    backgroundColor: "#E2E2E2",
    height: "25%",
    borderRadius: 10,
  },
  hoopScoreStatus: {
    backgroundColor: "#F3A241",
    height: "100%",
    borderRadius: 10,
  },
  profileUserTeam: {
    paddingLeft: 20,
    paddingBottom: 30,
    paddingRight: 20,
  },
  profileUserTeamTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  profileUserTeamWrapper: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E2E2",
    paddingBottom: 20,
    paddingTop: 20,
  },
  teamImageWrapper: {
    width: "25%",
    aspectRatio: 1 / 1,
    marginRight: 20,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 5,
  },
  teamText: {
    textAlign: "center",
    color: "#666666",
    fontSize: 12,
  },
});
export default Profile;
