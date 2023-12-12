import { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Usercontext from "../../../contexts/UserContext";
import SocketContext from "../../../contexts/SocketContext";
import { REACT_APP_PROXY } from "@env";
import axios from "axios";

const Dialog = ({ postingTitle, postingId, hostId, roomId }) => {
  const navigation = useNavigation();
  const { user } = useContext(Usercontext);
  const { socketRef } = useContext(SocketContext);
  const [guestStatus, setGuestStatus] = useState(false);
  const [hostStatus, setHostStatus] = useState(0);
  const [isHost, setIsHost] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getGuestStatus();
    getHostStatus();
    setIsHost(user.User_id === hostId);

    socketRef.current.on("signUpComplete", () => {
      setGuestStatus(true);
      setHostStatus(1);
    });

    socketRef.current.on("applyMatchComplete", (isApply) => {
      isApply ? setHostStatus(2) : setHostStatus(3);
    });
  }, [isFocused]);

  const getGuestStatus = async () => {
    try {
      const res = await axios.get(
        `${REACT_APP_PROXY}notification/matchSignUp?roomId=${roomId}`
      );
      setGuestStatus(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const getHostStatus = async () => {
    try {
      const res = await axios.get(
        `${REACT_APP_PROXY}notification/apply?roomId=${roomId}`
      );
      setHostStatus(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = () => {
    socketRef.current.emit("signUp", postingId, roomId, () => {
      setGuestStatus((prev) => !prev);
    });
  };

  const handleApply = (hostAccept) => {
    socketRef.current.emit("applyMatch", roomId, hostAccept, (isApply) => {
      isApply ? setHostStatus(2) : setHostStatus(3);
    });
  };

  return (
    <View style={styles.dialog}>
      <View style={styles.dialogTitleContainer}>
        <View style={styles.dialogleftChild}>
          <AntDesign name="notification" size={20} color="#F3A241" />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MatchDetail", { postingId: postingId })
            }
          >
            <Text style={styles.dialogPostingTitle}>{postingTitle} </Text>
          </TouchableOpacity>
          <Text style={styles.dialogTitle}>글에 대한 채팅입니다</Text>
        </View>
      </View>
      {!isHost && !guestStatus && (
        <TouchableOpacity
          style={styles.dialogBtn}
          onPress={() => handleSignUp()}
        >
          <Text> 매칭 신청하기</Text>
        </TouchableOpacity>
      )}
      {!isHost && guestStatus && hostStatus !== 2 && hostStatus !== 3 && (
        <View style={styles.signupDiv}>
          <AntDesign name="checkcircle" size={20} color="#7db5d3" />
          <Text style={styles.signupDivText}>매칭 신청이 완료되었습니다!</Text>
        </View>
      )}
      {!isHost && hostStatus === 2 && (
        <View style={[styles.signupDiv, styles.dialogAcceptBtn]}>
          <AntDesign name="checkcircle" size={20} color="#609c70" />
          <Text style={styles.acceptText}>매칭 신청이 수락되었습니다!</Text>
        </View>
      )}
      {!isHost && hostStatus === 3 && (
        <View style={[styles.signupDiv, styles.dialogRejectBtn]}>
          <AntDesign name="closecircle" size={20} color="#b87976" />
          <Text style={styles.rejectText}>매칭 신청이 거절되었습니다!</Text>
        </View>
      )}
      {isHost && hostStatus === 0 && (
        <View style={[styles.signupDiv, styles.dialogCommonBtn]}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={20}
            color="black"
          />
          <Text style={styles.commonText}>
            게스트의 참여 신청을 기다려주세요
          </Text>
        </View>
      )}
      {isHost && hostStatus === 1 && (
        <View style={styles.hostBtnContainer}>
          <TouchableOpacity
            style={[styles.dialogHostBtn, styles.dialogAcceptBtn]}
            onPress={() => handleApply(true)}
          >
            <Text style={styles.acceptText}> 수락하기 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dialogHostBtn, styles.dialogRejectBtn]}
            onPress={() => handleApply(false)}
          >
            <Text style={styles.rejectText}> 거절하기 </Text>
          </TouchableOpacity>
        </View>
      )}
      {isHost && hostStatus === 2 && (
        <View style={[styles.signupDiv, styles.dialogAcceptBtn]}>
          <AntDesign name="checkcircle" size={20} color="#5b9868" />
          <Text style={styles.acceptText}>매칭 신청을 수락했습니다</Text>
        </View>
      )}
      {isHost && hostStatus === 3 && (
        <View style={[styles.signupDiv, styles.dialogRejectBtn]}>
          <AntDesign name="closecircle" size={20} color="#b87976" />
          <Text style={styles.rejectText}>매칭 신청을 거절했습니다</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  signupDiv: {
    backgroundColor: "#ebf7fb",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  signupDivText: {
    marginLeft: 8,
    color: "#7db5d3",
  },
  dialog: {
    borderRadius: 6,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    justifyContent: "space-around",
  },
  dialogPostingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
  },
  dialogTitle: {
    fontSize: 16,
  },
  dialogTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 26,
    marginBottom: 10,
  },
  dialogleftChild: {
    flexDirection: "row",
  },
  dialogBtn: {
    backgroundColor: "#efefef",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  hostBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dialogHostBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 5,
  },
  dialogAcceptBtn: {
    backgroundColor: "#ecfaef",
  },
  acceptText: {
    color: "#5b9868",
    marginLeft: 6,
  },
  dialogRejectBtn: {
    backgroundColor: "#ffebea",
  },
  dialogCommonBtn: {
    backgroundColor: "#efefef",
  },
  rejectText: {
    color: "#b87976",
    marginLeft: 6,
  },
  commonText: {
    marginLeft: 6,
  },
});

export default Dialog;
