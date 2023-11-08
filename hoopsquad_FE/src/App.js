import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <View>
      <SafeAreaView>
        <Text>App입니다...</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
};

export default App;
