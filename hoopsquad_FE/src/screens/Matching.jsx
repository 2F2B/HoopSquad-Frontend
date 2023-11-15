import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { AntDesign, Feather, Entypo, Foundation } from "@expo/vector-icons";
import Match from "../components/Match";
import { REACT_APP_PROXY } from "@env";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../components/NavigationBar";
const Matching = () => {
  const [matchData, setMatchData] = useState(null);
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState("마감임박순");
  const [filterText, setFilterText] = useState("마감임박순");
  const navigation = useNavigation();

  useEffect(() => {
    getMatch();
  }, []);

  // useEffect(() => {
  //   searchGameType();
  // }, [filterText]);

  const searchGameType = async (gameType) => {
    try {
      const response = await axios.get(`${REACT_APP_PROXY}match/filter`, {
        Type: 5,
      });
      console.log("결과", response.data);

      if (response.data.result === "error") {
        setMatchData(null);
      }
      // 성공하면 수행
      else {
        // setMatchData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMatch = async () => {
    try {
      const response = await axios.get(`${REACT_APP_PROXY}match`);
      setMatchData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchTitle = async (text) => {
    try {
      if (text == "") {
        getMatch();
        return;
      }
      const response = await axios.get(`${REACT_APP_PROXY}match/filter`, {
        Title: text,
      });
      console.log("결과", response.data);

      if (response.data.result == "error") {
        setMatchData(null);
      }
      //성공하면 수행
      else {
        //setMatchData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={-60}
    >
      <SafeAreaView
        style={[
          { flex: 1 },
          filter && { backgroundColor: "rgba(0, 0, 0, 0.15)" },
        ]}
      >
        <StatusBar style="dark" />
        <View
          style={[
            styles.header,
            { borderBottomColor: filter ? "rgba(0, 0, 0, 0.5)" : "#E2E2E2" },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 700, marginRight: 10 }}>
              구미시 거의동
            </Text>
            <AntDesign name="down" size={15} color="black" />
          </View>
          <Feather name="bell" size={25} color="black" />
        </View>
        <View
          style={{
            padding: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 5 }}>
            매칭
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: "#8F8F8F",
              marginBottom: 15,
            }}
          >
            오늘 한 번 활약해볼까요?
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo
              name="magnifying-glass"
              size={15}
              color="black"
              style={{ position: "absolute", left: 18 }}
            />

            <TextInput
              placeholder="제목으로 검색해주세요"
              style={styles.input}
              onChangeText={searchTitle}
            ></TextInput>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <View style={[styles.filter, { marginRight: 10, width: 90 }]}>
              <Text style={{ fontSize: 10, marginRight: 5 }}>{filterText}</Text>
              <AntDesign
                style={{ marginTop: 3 }}
                name="down"
                size={10}
                color="black"
              />
            </View>
            <TouchableOpacity
              onPress={() => setFilter(true)}
              style={[styles.filter, { width: 60 }]}
            >
              <Text style={{ fontSize: 10, marginRight: 5 }}>필터</Text>
              <Foundation
                style={{ marginTop: 3 }}
                name="filter"
                size={10}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: "70%" }}>
            <ScrollView>
              <View>
                {matchData?.map((data, index) => (
                  <Match
                    key={index}
                    Title={data.Title}
                    gameType={data.GameType}
                    currentAmount={data.CurrentAmount}
                    recruitAmount={data.RecruitAmount}
                    Location={data.Location}
                    writeDate={data.WriteDate}
                  />
                ))}
              </View>
            </ScrollView>

            <View style={{ position: "absolute", bottom: 0, right: 5 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MatchRegister")}
              >
                <AntDesign name="pluscircle" size={35} color="#F3A241" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <NavigationBar />

        {filter && (
          <View
            style={{
              zIndex: 1,
              padding: 20,
              position: "absolute",
              bottom: 0,
              backgroundColor: "white",
              width: "100%",
              height: "75%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setFilter(false);
              }}
              style={{
                zIndex: 1,
              }}
            >
              <Feather
                name="x"
                size={24}
                color="black"
                style={{ position: "absolute", right: 5, top: 5 }}
              />
            </TouchableOpacity>

            <View>
              <Text style={{ fontSize: 16, marginTop: 60, fontWeight: 'bold' }}>게임 유형</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.filter,
                    {
                      width: 90,
                      backgroundColor: sort === "1" ? "#0064FF" : "white",
                    },
                  ]}
                  onPress={() => {
                    setSort("1");
                  }}
                >
                  <Text style={{ color: sort === "1" ? "white" : "black" }}>
                    1 VS 1
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filter,
                    {
                      width: 90,
                      backgroundColor: sort === "3" ? "#0064FF" : "white",
                    },
                  ]}
                  onPress={() => {
                    setSort("3");
                  }}
                >
                  <Text style={{ color: sort === "3" ? "white" : "black" }}>
                    3 VS 3
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filter,
                    {
                      width: 90,
                      backgroundColor: sort === "5" ? "#0064FF" : "white",
                    },
                  ]}
                  onPress={() => {
                    setSort("5");
                  }}
                >
                  <Text style={{ color: sort === "5" ? "white" : "black" }}>
                    5 VS 5
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={{ fontSize: 16, marginTop: 30, fontWeight: 'bold' }}>지역</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.filter,
                    {
                      width: 90,
                      backgroundColor: sort === "구미" ? "#0064FF" : "white",
                    },
                  ]}
                  onPress={() => {
                    setSort("구미");
                  }}
                >
                  <Text style={{ color: sort === "구미" ? "white" : "black" }}>
                    구미
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filter,
                    {
                      width: 90,
                      backgroundColor: sort === "부산" ? "#0064FF" : "white",
                    },
                  ]}
                  onPress={() => {
                    setSort("부산");
                  }}
                >
                  <Text style={{ color: sort === "부산" ? "white" : "black" }}>
                    부산
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filter,
                    {
                      width: 90,
                      backgroundColor: sort === "대구" ? "#0064FF" : "white",
                    },
                  ]}
                  onPress={() => {
                    setSort("대구");
                  }}
                >
                  <Text style={{ color: sort === "대구" ? "white" : "black" }}>
                    대구
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 20,
                left: 10,
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setFilter(false);
                  setFilterText(sort);
                  searchGameType(sort);
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#0064FF",
                    color: "white",
                    padding: 10,
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                >
                  적용하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CDCDCD",
    borderRadius: 10,
    flex: 1,
    height: 35,
    paddingLeft: 40,
    paddingTop: 6,
    paddingBottom: 6,
  },
  filter: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
});
export default Matching;
