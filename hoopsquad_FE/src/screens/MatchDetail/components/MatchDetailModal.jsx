import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_PROXY } from "@env";
import Usercontext from "../../../contexts/UserContext";
import authApi from "../../../apis/authApi";

const MatchDetailModal = (props) => {
  const navigation = useNavigation();
  const { user } = useContext(Usercontext);

  const matchDelete = async () => {
    try {
      await authApi.delete(`${REACT_APP_PROXY}match/${props.postingId}`, {});
      navigation.navigate("Match");
    } catch (error) {
      console.log(error);
    }
  };

  const matchJoin = () => {
    console.log("매치 참여");
  };

  return (
    <View style={styles.deleteModalWrapper}>
      <Text style={styles.deleteModalTitle}>
        {props.matchUserId === user.User_id
          ? "매칭을 삭제하시겠습니까?"
          : "매칭에 참여하시겠습니까?"}
      </Text>
      <View>
        <Text style={styles.deleteModalText}>
          {props.matchUserId === user.User_id
            ? "해당 매칭 정보가 삭제됩니다."
            : "참여 신청 후 정상적인 참여가 이뤄지지 않을 경우 훕스코어가 대폭 감소할 수 있습니다"}
        </Text>
      </View>

      <View style={styles.deleteModalButtonWrapper}>
        <TouchableOpacity
          onPress={() => props.setOpenModal(false)}
          style={styles.deleteModalCloseButton}
        >
          <Text style={styles.deleteModalCloseText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.matchUserId === user.User_id ? matchDelete() : matchJoin();
          }}
          style={styles.deleteModalDeleteButton}
        >
          <Text
            style={[
              styles.deleteModalDeleteText,
              {
                color:
                  props.matchUserId === user.User_id ? "#F34141" : "#F3A241",
              },
            ]}
          >
            {props.matchUserId === user.User_id ? "삭제" : "확인"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteModalWrapper: {
    position: "absolute",
    top: "40%",
    left: "15%",
    backgroundColor: "white",
    zIndex: 1,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    width: "70%",
    height: "20%",
    justifyContent: "space-between",
  },
  deleteModalTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  deleteModalText: {
    color: "#4E4C4C",
    fontSize: 11,
  },
  deleteModalButtonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteModalCloseButton: {
    zIndex: 2,
    width: "15%",
  },
  deleteModalDeleteButton: {
    zIndex: 2,
    width: "15%",
    marginLeft: 20,
  },
  deleteModalCloseText: {
    textAlign: "center",
    color: "#8F8F8F",
    fontSize: 13,
  },
  deleteModalDeleteText: {
    textAlign: "center",
    fontSize: 13,
  },
});

export default MatchDetailModal;
