import _ from "lodash";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import { ServiceUserLogin } from "../../services/ServiceUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScreenUserLogin = ({ navigation }) => {
  // TODO: tambahkan context
  // const [, setIsAuthenticated] = useContext(ContextUserAuthentication)
  const [user, setUser] = useState({
    email: "",
    password: "",
  }); // TODO: add schema user
  const [complete, setComplete] = useState(false);

  const handleChange = (name, value) => {
    setUser((values) => ({ ...values, [name]: value }));
  };

  const userLogin = () => {
    ServiceUserLogin(user)
      .then(async (token) => {
        await AsyncStorage.setItem("@token", token);
        Alert.alert("Berhasil", "Anda berhasil login.");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => {
      setComplete(true);
    }, 500);
    debounce();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {complete && (
        <ScrollView
          contentContainerStyle={{
            gap: 16,
            marginHorizontal: 40,
            justifyContent: "center",
            height: "100%",
          }}>
          <WidgetBaseLogo />
          <TextInput
            label="Email"
            placeholder="Masukan email"
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            label="Password"
            value={user.password}
            secureTextEntry={true}
            onChangeText={(text) => handleChange("password", text)}
          />
          <Button onPress={userLogin} mode="contained">
            Login
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("ScreenUserRegister");
            }}
            mode="outlined">
            Register
          </Button>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ScreenUserLogin;
