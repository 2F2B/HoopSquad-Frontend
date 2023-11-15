import { Text, View, StyleSheet } from "react-native";

const GameType = (props) => {
  const gameTypeColor =
    props.gameType === 1
      ? "#799EC1"
      : props.gameType === 3
      ? "#9AC78F"
      : "#F49058";

  return (
    <View
      style={[styles.type, { backgroundColor: gameTypeColor, marginRight: 10 }]}
    >
      <Text style={{ color: "white", fontSize: 12, fontWeight: "700" }}>
        {props.gameType} vs {props.gameType}
      </Text>
    </View>
  );
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
  },
});
export default GameType;
