import { View, Text, StyleSheet } from "react-native";

const ProfileRegisterBox = ({ title, marginBottom, children }) => {
  return (
    <View>
      <Text style={styles.profileTitle}>{title}</Text>
      <View
        style={{ marginBottom, flexDirection: "row", alignItems: "center" }}
      >
        {children}
      </View>
    </View>
  );
};

ProfileRegisterBox.defaultProps = {
  marginBottom: 30,
};

const styles = StyleSheet.create({
  profileTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  profileInformation: {},
});
export default ProfileRegisterBox;
