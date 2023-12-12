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
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(Usercontext);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    getTeamDetailInfo();
    console.log(user);
  }, []);

  const getTeamDetailInfo = async () => {
    try {
      const response = await axios.get(`${REACT_APP_PROXY}team/${teamId}`);
      setTeamInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkUser = () => {
    if (teamInfo?.Admin_id === user.User_id) {
      return "수정";
    }

    // 팀 유저 아이디가 있는 배열에서 안에 내 아이디가 없다 신청
    // 만약 내가 팀이 있다 아무것도 안나옴
    // if() {
    // 만약 내가 팀이 없다 return "신청"
    //   아니면 빈문자열
    // }
    // if(user.TeamId !== null) {
    //   return ""
    // } else {
    //   return "신청"
    // }

    // 만약 내가 팀 대장이다 그러면 매칭 신청
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
          <TouchableOpacity>
            <Text style={[styles.headerRightChildText]}>{checkUser()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imgWrapper}>
        <View style={{ width: screenWidth }}>
          <Image
            resizeMode="contain"
            source={HoopSquadFullLogo}
            style={[styles.scrollImage, openModal && { opacity: 0.2 }]}
          ></Image>
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
        <ScrollView style={{ marginTop: 30, borderWidth: 1 }}>
          <TeamProfileBox title="팀 소개">
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#E2E2E2",
                padding: 10,
              }}
            >
              {/* {teamInfo?.Introduce} */}
              <Text>안녕하세요</Text>
            </View>
          </TeamProfileBox>
          <TeamProfileBox title="프로필">
            <View style={{ marginTop: 10 }}>
              <ProfileInfo
                Image={profile_Location}
                Title={"활동 지역"}
                Text={`${
                  teamInfo?.Location1.City != null
                    ? `${teamInfo?.Location1.location} ${teamInfo?.Location1.City}`
                    : ""
                } ${
                  teamInfo?.Location2.City != null
                    ? `/ ${teamInfo?.Location2.location} ${teamInfo?.Location2.City}`
                    : ""
                }`}
                showUnderline={true}
              />
              <ProfileInfo
                Image={profile_Year}
                Title={"활동 시간"}
                // 활동시간들어갈 자리
                Text={"매주 화, 목 저녁 8시"}
                showUnderline={true}
              />
            </View>
          </TeamProfileBox>
          <TeamProfileBox title="팀 구성원">
            {/* 이미지, 및 이름 받아와 처리 */}
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
    padding: 10,
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
    height: "25%",
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
});
export default TeamProfile;
