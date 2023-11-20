import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/Login";
import EsqueciSenha from "../screen/EsqueciSenha";

const { Screen, Navigator } = createStackNavigator();

export function DeslogadoRoutes() {
  return (
    <Navigator initialRouteName="" screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="EsqueciSenha" component={EsqueciSenha} />

    </Navigator>
  );
}
