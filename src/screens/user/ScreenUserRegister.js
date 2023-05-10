import _ from "lodash";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import { Button, TextInput } from "react-native-paper";

const ScreenUserRegister = ({ navigation }) => {
  const [user, setUser] = useState({}); // TODO: add schema user
  const [complete, setComplete] = useState(false);

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 16,
            }}>
            <TextInput
              style={{ flex: 1 }}
              label="First Name"
              placeholder="Masukan nama depan"
            />
            <TextInput
              style={{ flex: 1 }}
              label="Last Name"
              placeholder="Masukan nama belakang"
            />
          </View>
          <TextInput label="Email" placeholder="Masukan email" />
          <TextInput label="Password" />
          <Button mode="contained">Register</Button>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            mode="outlined">
            Login
          </Button>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ScreenUserRegister;
