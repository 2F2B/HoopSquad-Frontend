import { View, Text, StyleSheet } from "react-native";

const TeamProfileBox = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.contentTitle}>{title}</Text>
      <View style={styles.contentView}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },
  contentView: {
    fontSize: 12,
  },
});

export default TeamProfileBox;
