import { Text, View, StyleSheet, Animated, Image } from "react-native";
import Exclamation from "../../assets/Exclamation.png";

export const alertUpward = (translateY, height) => {
  Animated.timing(translateY, {
    toValue: height - 145,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  setTimeout(() => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, 3000);
};

const InputAlert = ({ translateY }) => {
  return (
    <Animated.View
      style={[styles.animatedView, { transform: [{ translateY }] }]}
    >
      <View style={styles.alertWrapper}>
        <View style={styles.imageView}>
          <Image
            source={Exclamation}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={styles.alertText}>비어 있는 항목이 있습니다</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    width: "100%",
    padding: 25,
  },
  alertWrapper: {
    backgroundColor: "#7F8289",
    height: 36,
    borderRadius: 14,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  imageView: {
    width: 25,
    aspectRatio: 1 / 1,
    marginRight: 25,
    marginLeft: 15,
  },
  alertText: {
    color: "white",
    fontSize: 12,
    marginBottom: 2,
  },
});
export default InputAlert;
