import { Text, View, StyleSheet } from "react-native";

const GameType = (props) => {
  const { OneOnOne, ThreeOnThree, FiveOnFive } = props.gameType[0];

  return (
    <View style={{ flexDirection: "row" }}>
      {OneOnOne ? (
        <View
          style={[
            styles.type,
            {
              backgroundColor: "#799EC1",
              opacity: props.opacity ? 0.1 : 1,
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 12, fontWeight: "700" }}>
            1 vs 1
          </Text>
        </View>
      ) : null}
      {ThreeOnThree ? (
        <View
          style={[
            styles.type,
            {
              backgroundColor: "#9AC78F",
              opacity: props.opacity ? 0.1 : 1,
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 12, fontWeight: "700" }}>
            3 vs 3
          </Text>
        </View>
      ) : null}
      {FiveOnFive ? (
        <View
          style={[
            styles.type,
            {
              backgroundColor: "#F49058",
              opacity: props.opacity ? 0.1 : 1,
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 12, fontWeight: "700" }}>
            5 vs 5
          </Text>
        </View>
      ) : null}
    </View>
  );
};

GameType.defaultProps = {
  opacity: false,
};

const styles = StyleSheet.create({
  type: {
    borderWidth: 1,
    borderRadius: 10,
    borderWidth: 0,
    width: 50,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginTop: 5,
    marginRight: 10,
  },
});
export default GameType;
