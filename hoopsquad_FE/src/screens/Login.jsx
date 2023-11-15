import { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Usercontext from "../contexts/UserContext";
import { REACT_APP_PROXY } from "@env";
import axios from "axios";

const Login = () => {

  const navigation = useNavigation();
  const { setUser } = useContext(Usercontext);
  const [formFields, setformFields] = useState({
    email: "",
    password: "",
  });

  const handleChange = (fieldName, value) => {
    setformFields({
      ...formFields,
      [fieldName]: value,
    });
  };

  const submitLoginForm = async () =>{

    const { email, password } = formFields;
    try {
      const res = await axios.post(`${REACT_APP_PROXY}auth/login`, {
        Email : email,
        Password : password,
      });
      AsyncStorage.setItem('accessToken', res.data.token);
      setUser(res.data.Name);
      navigation.navigate('Main');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    submitLoginForm();
  }

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
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="비밀번호"
        value={formFields.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry={true}
      />
      <TouchableOpacity 
        style={styles.buttonStyle}
        onPress={() => handleLogin()}
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>아이디 찾기</Text>
        <Text style={styles.optionMiddle}>비밀번호 재설정</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.optionText}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.oauthContainer}>
        <View style={styles.line} />
        <Text style={styles.oauthText}>간편 로그인</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.oauthImgContainer}>
        <TouchableOpacity 
          style={styles.oauthImgWrapper}
          onPress={() => navigation.navigate("KakaoLogin")}
        >
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
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width : 230,
    height : 20,
    marginTop: 20,
  },
  optionText: {
    color: "#CDCDCD",
    fontSize: 10,
    fontWeight: "bold",
  },
  optionMiddle: {
    color: "#CDCDCD",
    fontSize: 10,
    fontWeight: "bold",
    borderColor: '#CDCDCD',
    borderRightWidth : 1,
    borderLeftWidth: 1,
    paddingHorizontal : 15,
  }
});

export default Login;
