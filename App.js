import "react-native-gesture-handler";

import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ScreenUserLogin from "./src/screens/user/ScreenUserLogin";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="ScreenUserLogin" component={ScreenUserLogin} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

