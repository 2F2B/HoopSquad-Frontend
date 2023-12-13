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
import GoogleMap from "../../components/GoogleMap";
import MatchInfoSection from "./components/MatchInfoSection";
import GameType from "../Matching/components/GameType";
import Usercontext from "../../contexts/UserContext";
import MatchDetailModal from "./components/MatchDetailModal";
import HoopSquadFullLogo from "../../../assets/HoopSquadFullLogo.png";
import SocketContext from "../../contexts/SocketContext";

const MatchDetail = ({ route }) => {
  const navigation = useNavigation();
  const { postingId } = route.params;
  const [matchInfo, setMatchInfo] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(Usercontext);
  const screenWidth = Dimensions.get("window").width;
  const { socketRef, setChatList } = useContext(SocketContext);

  useEffect(() => {
    getMatchDetailInfo();
  }, []);

  const getMatchDetailInfo = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_PROXY}match/info/?postingId=${postingId}&guestId=${user.User_id}`
      );
      setMatchInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / Math.floor(screenWidth));
    setImageIndex(index);
  };

  const handleChatRoom = () => {
    const roomId = matchInfo.roomId;
    const userId = user.User_id;
    const nickname = matchInfo.postWriterNickname;
    const postingTitle = matchInfo.Title;

    if (roomId && userId) {
      enterRoom(roomId, userId, nickname, postingTitle);
    } else {
      const opponentImage =
        matchInfo?.Image.length > 0 ? matchInfo.Image[0].ImageData : null;
      const hostId = matchInfo.User_id;
      const guestId = user.User_id;
      const postingId = matchInfo.Posting_id;

      navigation.navigate("EmptyChatRoom", {
        opponentImage,
        hostId,
        guestId,
        postingId,
        nickname,
        postingTitle,
      });
    }
  };

  const enterRoom = (roomId, userId, nickname, postingTitle) => {
    socketRef.current.emit("enterRoom", roomId, userId, (chatInfo) => {
      const chatList = chatInfo.chatList;
      const opponentImage = chatInfo.opponentImageName;
      const hostId = matchInfo.User_id;
      setChatList((prevChatList) => ({
        ...prevChatList,
        [roomId]: chatList,
      }));
      navigation.navigate("ChatRoom", {
        roomId,
        postingId,
        nickname,
        opponentImage,
        hostId,
        postingTitle,
      });
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.matchDetail,
        openModal && { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      ]}
    >
      {openModal && (
        <MatchDetailModal
          matchUserId={matchInfo?.User_id}
          setOpenModal={setOpenModal}
          postingId={postingId}
        />
      )}
      <View
        style={[
          styles.header,
          { borderBottomColor: openModal ? "rgba(0, 0, 0, 0.1)" : "#E2E2E2" },
        ]}
      >
        <View style={styles.headerTitle}>
          <TouchableOpacity
            onPress={() => !openModal && navigation.navigate("Match")}
          >
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
          <TouchableOpacity
            onPress={
              matchInfo?.User_id === user.User_id
                ? () => setOpenModal(true)
                : () => handleChatRoom()
            }
          >
            <Text
              style={[
                styles.headerRightChildText,
                { opacity: openModal ? 0.3 : 1 },
              ]}
            >
              {matchInfo?.User_id === user.User_id ? "삭제" : "채팅"}
            </Text>
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
          scrollEventThrottle={16}
        >
          {matchInfo?.Image.length > 0 ? (
            matchInfo.Image.map((image, index) => {
              return (
                <View key={index} style={{ width: screenWidth }}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri: `${REACT_APP_PROXY}image/match/${image.ImageData}`,
                    }}
                    style={[styles.scrollImage, openModal && { opacity: 0.2 }]}
                  />
                </View>
              );
            })
          ) : (
            <View style={{ width: screenWidth }}>
              <Image
                resizeMode="contain"
                source={HoopSquadFullLogo}
                style={[styles.scrollImage, openModal && { opacity: 0.2 }]}
              ></Image>
            </View>
          )}
        </ScrollView>
        <View style={{ flexDirection: "row" }}>
          {matchInfo?.Image.map((_, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.imageDot,
                  {
                    backgroundColor:
                      index === imageIndex ? "#F49058" : "#D9D9D9",
                    opacity: openModal ? 0.3 : 1,
                  },
                ]}
              ></View>
            );
          })}
        </View>
      </View>

      <View
        style={[
          styles.titleContainer,
          { borderBottomColor: openModal ? "rgba(0, 0, 0, 0.1)" : "#E2E2E2" },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.matchWriteImage,
            openModal && { backgroundColor: "rgba(0, 0, 0, 0.3)" },
            { borderColor: openModal ? "rgba(0, 0, 0, 0.1)" : "#E2E2E2" },
          ]}
          onPress={() =>
            navigation.navigate("Profile", {
              profileId: matchInfo?.User_id,
            })
          }
        >
          {matchInfo?.WriterImage ? (
            <Image
              resizeMode="cover"
              source={{
                uri: `${REACT_APP_PROXY}image/user/${matchInfo?.WriterImage.ImageData}`,
              }}
              style={[styles.imageSize, { opacity: openModal ? 0.3 : 1 }]}
            ></Image>
          ) : (
            <Image
              resizeMode="cover"
              source={HoopSquadFullLogo}
              style={[styles.imageSize, { opacity: openModal ? 0.3 : 1 }]}
            ></Image>
          )}
        </TouchableOpacity>
        <View>
          <Text style={styles.titleText}>{matchInfo?.Title}</Text>
          <Text style={styles.timeText}>
            {formatDate(matchInfo?.WriteDate)}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.contentContainer}>
        <MatchInfoSection title="매칭 안내">
          <Text>{matchInfo?.Introduce}</Text>
        </MatchInfoSection>

        <MatchInfoSection title="게임 유형">
          {matchInfo && (
            <GameType gameType={matchInfo.GameType} opacity={openModal} />
          )}
        </MatchInfoSection>
        <MatchInfoSection title="참가 인원">
          <Text>
            {matchInfo?.CurrentAmount}명 / {matchInfo?.RecruitAmount}명
          </Text>
        </MatchInfoSection>
        <MatchInfoSection title="매칭 위치">
          {matchInfo && (
            <GoogleMap
              Latitude={matchInfo.Lat}
              Longitude={matchInfo.Lng}
              openModal={openModal}
              locationName={matchInfo.LocationName}
            />
          )}
        </MatchInfoSection>
      </ScrollView>
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
export default MatchDetail;
