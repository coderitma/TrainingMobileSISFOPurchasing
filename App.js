import "react-native-gesture-handler";

import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ScreenUserLogin from "./src/screens/user/ScreenUserLogin";
import { RouterUserNotAuthenticated } from "./src/routers/RouterUser";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home">
        <Drawer.Screen
          name="RouterUser"
          component={RouterUserNotAuthenticated}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

