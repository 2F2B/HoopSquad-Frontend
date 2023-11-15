import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const MatchRegister = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <StatusBar style="dark" />
      <View style={[styles.header]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Match")}>
            <Ionicons
              name="chevron-back"
              size={30}
              color="black"
              style={{ marginTop: 5 }}
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: 700, marginRight: 10 }}>
            매칭 등록
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Match")}>
            <Text
              style={{
                color: "#F3A241",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              완료
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            padding: 20,
          }}
        >
          <View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, fontWeight: 700 }}>제목</Text>

                <FontAwesome
                  name="asterisk"
                  size={10}
                  color="#F3A241"
                  style={{ marginTop: 10, marginLeft: 5 }}
                />
              </View>
              <TextInput
                placeholder="제목을 입력해주세요"
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingLeft: 20,
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderColor: "#CDCDCD",
                }}
              ></TextInput>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: 700 }}>경기 시간</Text>
              <FontAwesome
                name="asterisk"
                size={10}
                color="#F3A241"
                style={{ marginTop: 10, marginLeft: 5 }}
              />
            </View>
            <Text style={{ fontSize: 10 }}>시작 일자</Text>
            <TextInput
              placeholder="제목을 입력해주세요"
              style={{
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 20,
                paddingTop: 5,
                paddingBottom: 5,
                borderColor: "#CDCDCD",
              }}
            ></TextInput>
            <Text style={{ fontSize: 10 }}>시작 시간</Text>
            <TextInput placeholder="일자를 선택해 주세요"></TextInput>
          </View>
          <View>
            <Text>게임 유형</Text>
          </View>
          <View>
            <Text>참가 인원</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="현재 인원"
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingLeft: 20,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingRight: 20,
                  borderColor: "#CDCDCD",
                }}
              ></TextInput>
              <MaterialCommunityIcons
                name="slash-forward"
                size={30}
                color="#CDCDCD"
                style={{ marginTop: 4 }}
              />
              <TextInput
                placeholder="모집 인원"
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingLeft: 20,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingRight: 20,
                  borderColor: "#CDCDCD",
                }}
              ></TextInput>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 700 }}>장소</Text>
          </View>

          <View>
            <Text style={{ fontSize: 20, fontWeight: 700 }}>사진</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 700 }}>매칭 안내</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          borderWidth: 1,
          width: "100%",
          height: "10%",
        }}
      >
        <Text>아래 Nav바 자리</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    justifyContent: "space-between",
    borderBottomColor: "#E2E2E2",
  },
});
export default MatchRegister;
