import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import WidgetBaseSidebar from "./WidgetBaseSidebar";
import { RouterUserNotAuthenticated } from "../../routers/RouterUser";
import { useHookUserAuthenticationInterface } from "../../hooks/HookUser";
import { ContextUserAuthentication } from "../../context/ContextUser";
import { Text } from "react-native";
import { useContext } from "react";
import { RouterBarangAuthenticated } from "../../routers/RouterBarang";

const Drawer = createDrawerNavigator();

const ScreenContoh = () => {
  const [, setIsAuthenticated] = useContext(ContextUserAuthentication);
  return (
    <Text style={{ marginTop: 40 }} onPress={() => setIsAuthenticated(false)}>
      Hello Ini sudah login
    </Text>
  );
};

export default function WidgetBaseDrawer() {
  const [isAuthenticated, setIsAuthenticated] =
    useHookUserAuthenticationInterface();

  return (
    <ContextUserAuthentication.Provider
      value={[isAuthenticated, setIsAuthenticated]}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{ headerShown: false }}
          drawerContent={(props) => <WidgetBaseSidebar {...props} />}
          initialRouteName="Home">
          {!isAuthenticated && (
            <>
              <Drawer.Screen
                options={{
                  drawerLabel: "Login",
                }}
                name="RouterUser"
                component={RouterUserNotAuthenticated}
              />
            </>
          )}

          {isAuthenticated && (
            <>
              <Drawer.Screen
                options={{
                  drawerLabel: "Master Barang",
                }}
                name="RouterBarang"
                component={RouterBarangAuthenticated}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </ContextUserAuthentication.Provider>
  );
}
