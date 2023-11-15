import { View, Text, StyleSheet } from 'react-native';

const MatchInfoSection = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.contentTitle}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default MatchInfoSection;
