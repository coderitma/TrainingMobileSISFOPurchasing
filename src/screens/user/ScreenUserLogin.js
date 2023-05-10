import _ from "lodash";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";

const ScreenUserLogin = ({ navigation }) => {
  // TODO: tambahkan context
  // const [, setIsAuthenticated] = useContext(ContextUserAuthentication)
  const [user, setUser] = useState({}); // TODO: add schema user
  const [complete, setComplete] = useState(false);

  // const handleChange = (name, value) => {
  //   setUser((values) => ({ ...values, [name]: value }));
  // };

  // const useLogin = () => {
  //   // TODO: add services
  // };

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
          <TextInput label="Email" placeholder="Masukan email" />
          <TextInput label="Password" />
          <Button mode="contained">Login</Button>
          <Button mode="outlined">Register</Button>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ScreenUserLogin;
