import { useContext } from "react";
import axios from "axios";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Usercontext from "./UserStore";

const Kakaologin = () => {
  const navigation = useNavigation();
  const { getUserInfo } = useContext(Usercontext);

  const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

  const getCode = (url) => {
    const exp = "code=";
    var condition = url.indexOf(exp);
    if (condition !== -1) {
      requestToken();
    }
  };

  const requestToken = async () => {
    try {
      const response = await axios.get(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${preocess.env.REACT_APP_CLIENTID}&redirect_uri=${preocess.env.REACT_APP_REDIRECT_URL}`
      );
      await AsyncStorage.setItem(
        "accessToken",
        response.headers["access-token"]
      );

      await getUserInfo(response.headers["user-id"]);
      navigation.navigate("Main");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WebView
      style={{ flex: 1, width: "100%" }}
      source={{
        uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${preocess.env.REACT_APP_CLIENTID}&redirect_uri=${preocess.env.REACT_APP_REDIRECT_URL}`,
      }}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      javaScriptEnabled
      onMessage={(event) => {
        getCode(event.nativeEvent["url"]);
      }}
    />
  );
};

export default Kakaologin;
