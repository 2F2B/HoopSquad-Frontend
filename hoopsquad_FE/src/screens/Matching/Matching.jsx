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
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign, Feather, Entypo, Foundation } from "@expo/vector-icons";
import Match from "./components/Match";
import { REACT_APP_PROXY } from "@env";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../../components/NavigationBar";
import FilterButton from "./components/FilterButton";

const Matching = () => {
  const [matchData, setMatchData] = useState(null);
  const [filter, setFilter] = useState(false);
  const [showDropDownSort, setShowDropDownSort] = useState();
  const [selectSort, setSelectSort] = useState("WriteDate");
  const [activityLocation, setActivityLocation] = useState("구미");
  const [gameTypeList, setGameTypeList] = useState({
    One: false,
    Three: false,
    Five: false,
  });
  const navigation = useNavigation();

  const Sorts = [
    { label: "작성 날짜", value: "WriteDate" },
    { label: "마감임박순", value: "PlayTime" },
  ];

  useEffect(() => {
    getMatch(
      `?all=true&Sort=${selectSort}&Location=${activityLocation}&Filter=Title&Input=`
    );
  }, [selectSort]);

  const searchGameType = async () => {
    getMatch(
      `?all=true&Sort=${selectSort}&Location=${activityLocation}&Filter=GameType&One=${gameTypeList.One}&Three=${gameTypeList.Three}&Five=${gameTypeList.Five}`
    );
  };

  const getMatch = async (query) => {
    try {
      const response = await axios.get(`${REACT_APP_PROXY}match${query}`);
      setMatchData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchTitle = async (text) => {
    getMatch(
      `?all=true&Sort=${selectSort}&Location=${activityLocation}&Filter=Title&Input=${text}`
    );
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
          <View style={styles.location}>
            <Text style={styles.locationName}>{activityLocation}</Text>
            <AntDesign name="down" size={15} color="black" />
          </View>
          <Feather name="bell" size={25} color="black" />
        </View>
        <View style={styles.matchingContainer}>
          <Text style={styles.matchingTitle}>매칭</Text>
          <Text style={styles.matchingSubTitle}>오늘 한 번 활약해볼까요?</Text>
          <View style={styles.location}>
            <Entypo
              name="magnifying-glass"
              size={15}
              color="black"
              style={styles.searchIcon}
            />

            <TextInput
              placeholder="제목으로 검색해주세요"
              style={styles.input}
              onChangeText={searchTitle}
            ></TextInput>
          </View>

          <View style={styles.filterWrapper}>
            <View style={[styles.dropDownFilter]}>
              <DropDownPicker
                open={showDropDownSort}
                value={selectSort}
                items={Sorts}
                setOpen={setShowDropDownSort}
                setValue={setSelectSort}
                placeholder="작성 날짜"
                textStyle={styles.dropDownText}
                style={styles.dropDown}
                dropDownContainerStyle={styles.dropDownContainer}
                listParentContainerStyle={styles.dropDownListParentContainer}
                listParentLabelStyle={styles.dropDownListParentLabel}
              />
            </View>

            <TouchableOpacity
              onPress={() => setFilter(true)}
              style={[styles.filter, { width: 70 }]}
            >
              <Text style={styles.filterPage}>필터</Text>
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
              {matchData?.map((data, index) => {
                const postingId = data.Posting_id;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("MatchDetail", { postingId })
                    }
                    style={{ height: "50%" }}
                  >
                    <Match
                      Title={data.Title}
                      gameType={data.GameType}
                      currentAmount={data.CurrentAmount}
                      recruitAmount={data.RecruitAmount}
                      Location={data.Location}
                      writeDate={data.WriteDate}
                      Images={data.Image[0]}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.registerButton}>
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
          <View style={styles.filterPageWrapper}>
            <TouchableOpacity
              onPress={() => {
                setFilter(false);
              }}
              style={{ zIndex: 1 }}
            >
              <Feather
                name="x"
                size={24}
                color="black"
                style={styles.CancelButton}
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.filterTitle}>게임 유형</Text>
              <View style={styles.gameTypeCategory}>
                <FilterButton
                  buttonText="1 VS 1"
                  setGameTypeList={setGameTypeList}
                  typeName="One"
                  gameTypeList={gameTypeList.One}
                ></FilterButton>

                <FilterButton
                  buttonText="3 VS 3"
                  setGameTypeList={setGameTypeList}
                  typeName="Three"
                  gameTypeList={gameTypeList.Three}
                ></FilterButton>

                <FilterButton
                  buttonText="5 VS 5"
                  setGameTypeList={setGameTypeList}
                  typeName="Five"
                  gameTypeList={gameTypeList.Five}
                ></FilterButton>
              </View>
            </View>
            <View style={styles.applyFilter}>
              <TouchableOpacity
                onPress={() => {
                  setFilter(false);
                  searchGameType();
                }}
              >
                <Text style={styles.applyFilterText}>적용하기</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    height: 25,
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    fontSize: 20,
    fontWeight: "700",
    marginRight: 10,
  },
  matchingContainer: {
    padding: 20,
    flex: 1,
  },
  matchingTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  matchingSubTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8F8F8F",
    marginBottom: 15,
  },
  searchIcon: {
    position: "absolute",
    left: 18,
  },
  filterWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 1,
  },
  dropDownFilter: {
    marginRight: 10,
    width: 110,
    justifyContent: "center",
  },
  dropDownFilterText: {
    fontSize: 10,
    marginRight: 5,
  },
  filterPage: {
    fontSize: 10,
    marginRight: 5,
    fontWeight: "bold",
  },
  registerButton: {
    position: "absolute",
    bottom: 25,
    right: 5,
  },
  filterPageWrapper: {
    zIndex: 2,
    padding: 20,
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    height: "75%",
  },
  CancelButton: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  filterTitle: {
    fontSize: 16,
    marginTop: 60,
    fontWeight: "bold",
  },
  gameTypeCategory: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filetrButton: {
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
    width: 90,
  },
  applyFilter: {
    position: "absolute",
    bottom: 20,
    left: 10,
    width: "100%",
  },
  applyFilterText: {
    backgroundColor: "#0064FF",
    color: "white",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  dropDownText: {
    textAlign: "center",
    fontSize: 10,
    marginRight: -10,
    fontWeight: "bold",
  },
  dropDown: {
    minHeight: 25,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 20,
    height: 25,
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 20,
  },
  dropDownListParentContainer: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
  },
  dropDownListParentLabel: {
    textAlign: "left",
    paddingLeft: 10,
  },
});
export default Matching;
