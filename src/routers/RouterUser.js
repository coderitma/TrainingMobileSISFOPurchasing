import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenUserLogin from "../screens/user/ScreenUserLogin";

const Stack = createNativeStackNavigator();

export const RouterUserNotAuthenticated = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenUserLogin" component={ScreenUserLogin} />
    </Stack.Navigator>
  );
};
