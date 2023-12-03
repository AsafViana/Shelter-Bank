import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/Login";

const { Screen, Navigator } = createStackNavigator();

export function DeslogadoRoutes() {
  return (
    <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
