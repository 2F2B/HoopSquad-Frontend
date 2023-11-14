import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Signup = () => {

  const [formFields, setformFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/HoopSquad_Title.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <TextInput
        style={styles.inputStyle}
        placeholder="이메일"
        value={formFields.email}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="비밀번호"
        value={formFields.password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="비밀번호 확인"
        value={formFields.confirmPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
      <View style={styles.oauthContainer}>
        <View style={styles.line} />
        <Text style={styles.oauthText}>간편 회원가입</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.oauthImgContainer}>
        <TouchableOpacity style={styles.oauthImgWrapper}>
          <Image
            source={require("../../assets/kakaoLogin.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.oauthImgWrapper}>
          <Image
            source={require("../../assets/googleLogin.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginLeft: 16,
    marginRight: 16,
  },
  imageWrapper: {
    width: 200,
    height: 50,
    marginTop: 40,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  inputStyle: {
    width: 300,
    borderColor: "#CDCDCD",
    borderBottomWidth: 1,
    margin: 10,
    padding: 5,
  },
  buttonStyle: {
    width: 300,
    height: 40,
    backgroundColor: "#F3A241",
    color: "#ffffff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  oauthContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    marginTop: 30,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "#CDCDCD",
    margin: 10,
    width: 100,
    marginVertical: 10,
  },
  oauthText: {
    marginVertical: 10,
    color: "#CDCDCD",
    fontSize: 10,
    fontWeight: "bold",
  },
  oauthImgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  oauthImgWrapper: {
    marginTop: 20,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Signup;
