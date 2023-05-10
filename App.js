import "react-native-gesture-handler";

import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ScreenUserLogin from "./src/screens/user/ScreenUserLogin";
import { RouterUserNotAuthenticated } from "./src/routers/RouterUser";
import WidgetBaseSidebar from "./src/widgets/base/WidgetBaseSidebar";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <WidgetBaseSidebar {...props} />}
        initialRouteName="Home">
        <Drawer.Screen
          options={{
            drawerLabel: "Login",
          }}
          name="RouterUser"
          component={RouterUserNotAuthenticated}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

