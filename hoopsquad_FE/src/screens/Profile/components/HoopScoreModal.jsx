import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileInfo from "./ProfileInfo";
import Rank_Rookie from "../../../../assets/Rank_Rookie.png";
import Rank_Amateur from "../../../../assets/Rank_Amateur.png";
import Rank_Pro from "../../../../assets/Rank_Pro.png";
import Rank_Superstar from "../../../../assets/Rank_Superstar.png";

const HoopScoreModal = (props) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalCloseButton}>
        <TouchableOpacity onPress={() => props.setHoopScoreModal(false)}>
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.modalTitleWrapper}>
        <Text style={styles.modalTitle}>훕스코어</Text>
        <Text style={styles.modalText}>
          훕스코어는 훕스쿼드 사용자들로 부터 받은
        </Text>
        <Text style={styles.modalText}>
          평가, 후기, 매칭 참가 여부 등을 종합해서 만든 지표입니다.
        </Text>
      </View>
      <View style={{ paddingLeft: 30 }}>
        <ProfileInfo
          Image={Rank_Rookie}
          Title={"루키"}
          Text={"훕스코어 0 ~ 99점의 루키"}
          titleFontSize={20}
          rankImageWidth={"26%"}
          textMargin={20}
        />
        <ProfileInfo
          Image={Rank_Amateur}
          Title={"아마추어"}
          Text={"훕스코어 100 ~ 199점의 아마추어"}
          titleFontSize={20}
          rankImageWidth={"26%"}
          textMargin={20}
        />
        <ProfileInfo
          Image={Rank_Pro}
          Title={"프로"}
          Text={"훕스코어 200 ~ 299점의 프로"}
          titleFontSize={20}
          rankImageWidth={"26%"}
          textMargin={20}
        />
        <ProfileInfo
          Image={Rank_Superstar}
          Title={"슈퍼스타"}
          Text={"훕스코어 300점 이상의 슈퍼스타"}
          titleFontSize={20}
          rankImageWidth={"26%"}
          textMargin={20}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: "15%",
    left: "5%",
    backgroundColor: "white",
    zIndex: 1,
    width: "90%",
    height: "75%",
  },
  modalCloseButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  modalTitleWrapper: {
    paddingTop: 30,
    paddingBottom: 25,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: 12,
    color: "#4E4C4C",
  },
});
export default HoopScoreModal;
