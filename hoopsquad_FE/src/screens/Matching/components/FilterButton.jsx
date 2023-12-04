import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const FilterButton = (props) => {
  const { buttonText, setGameTypeList, typeName, gameTypeList } = props;

  return (
    <TouchableOpacity
      style={[
        styles.filetrButton,
        {
          backgroundColor: gameTypeList ? "#0064FF" : "white",
        },
      ]}
      onPress={() => {
        setGameTypeList((prevState) => ({
          ...prevState,
          [typeName]: !prevState[typeName],
        }));
      }}
    >
      <Text style={{ color: gameTypeList ? "white" : "black" }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
export default FilterButton;
