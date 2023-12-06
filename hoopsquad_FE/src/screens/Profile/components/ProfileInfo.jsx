import { Text, View, StyleSheet, Image } from "react-native";

const ProfileInfo = (props) => {
  return (
    <View
      style={[
        styles.profileInfoContainer,
        { borderBottomWidth: props.showUnderline ? 0.5 : 0 },
        { paddingBottom: props.showUnderline ? 15 : 0 },
        { marginBottom: props.textMargin },
        { borderBottomColor: props.opacity ? "rgba(0, 0, 0, 0.1)" : "#E2E2E2" },
      ]}
    >
      <View
        style={[
          styles.profileInfoImageWrapper,
          { width: props.rankImageWidth },
          { marginRight: props.textMargin },
          props.opacity && { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        ]}
      >
        <Image
          resizeMode="contain"
          source={props.Image}
          style={{ width: "70%", ...(props.opacity && { opacity: 0.2 }) }}
        ></Image>
      </View>
      <View>
        <Text
          style={{
            fontSize: props.titleFontSize,
            marginBottom: props.titleFontSize !== 14 ? 5 : 0,
          }}
        >
          {props.Title}
        </Text>
        <Text style={{ color: "#666666", fontSize: 12 }}>{props.Text}</Text>
      </View>
    </View>
  );
};

ProfileInfo.defaultProps = {
  showUnderline: false,
  titleFontSize: 14,
  rankImageWidth: "10%",
  textMargin: 15,
  opacity: false,
};

const styles = StyleSheet.create({
  profileInfoContainer: {
    borderBottomColor: "#E2E2E2",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileInfoImageWrapper: {
    backgroundColor: "rgba(226, 226, 226, 0.4)",
    borderRadius: 100,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileInfo;
