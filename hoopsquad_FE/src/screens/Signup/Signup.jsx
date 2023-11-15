import { useState } from "react";
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
import axios from "axios";
import fieldConfigs from "./fieldConfigs";
import { REACT_APP_PROXY } from "@env";

const Signup = () => {
  const navigation = useNavigation();
  const configs = { ...fieldConfigs };
  const [formFields, setformFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (fieldName, value) => {
    setformFields({
      ...formFields,
      [fieldName]: value,
    });
  };

  const checkRegex = (fieldName) => {
    const regex = configs[fieldName].regex;
    return regex.test(formFields[fieldName]);
  };

  const checkConfirmPassword = () => {
    return formFields.password === formFields.confirmPassword;
  };

  const validateFields = () => {
    const { email, password, confirmPassword } = formFields;
  
    if (email === '' || password === '' || confirmPassword === '') {
      alert('비어있는 항목이 있습니다.');
      return false;
    }
  
    if (!checkRegex('email')) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return false;
    }

    if (!checkRegex('password')) {
      alert('비밀번호 조건을 확인해주세요.');
      return false;
    }
  
    if (!checkConfirmPassword()) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
    
    return true;
  };
  
  const submtiSignupForm = async () => {
    if (!validateFields()) {
      return;
    }
  
    const { email, password } = formFields;
  
    try {
      const response = await axios.post(`${REACT_APP_PROXY}auth/register`, {
        Email: email,
        Password: password,
      });
      alert('회원 가입 성공! 😀');
      AsyncStorage.setItem('accessToken', response.data.token);
      navigation.navigate('Main');
    } catch (error) {
      alert('회원 가입 실패. 다시 한번 시도해주세요.😥');
      console.error(error);
    }
  };
  
  const handleSignup = () => {
    submtiSignupForm();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../../assets/HoopSquad_Title.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View>
        <TextInput
          style={styles.inputStyle}
          placeholder={configs.email.placeholder}
          value={formFields.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        {formFields.email !== "" && !checkRegex("email") && (
          <Text style={styles.alertText}>{configs.email.alert}</Text>
        )}
        <TextInput
          style={styles.inputStyle}
          placeholder={configs.password.placeholder}
          value={formFields.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry={true}
        />
        {formFields.password !== "" && !checkRegex("password") && (
          <Text style={styles.alertText}>{configs.password.alert}</Text>
        )}
        <TextInput
          style={styles.inputStyle}
          placeholder={configs.confirm.placeholder}
          value={formFields.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          secureTextEntry={true}
        />
        {formFields.confirmPassword !== "" && !checkConfirmPassword() && (
          <Text style={styles.alertText}>{configs.confirm.alert}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => handleSignup()}
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
      <View style={styles.oauthContainer}>
        <View style={styles.line} />
        <Text style={styles.oauthText}>간편 회원가입</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.oauthImgContainer}>
        <TouchableOpacity
          style={styles.oauthImgWrapper}
          onPress={() => navigation.navigate("KakaoLogin")}
        >
          <Image
            source={require("../../../assets/kakaoLogin.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.oauthImgWrapper}>
          <Image
            source={require("../../../assets/googleLogin.png")}
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
    marginTop: 50,
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
  alertText: {
    fontSize: 10,
    color: "#F3A241",
    marginLeft: 15,
  },
});

export default Signup;
