import { TransitionSpecs, createStackNavigator } from "@react-navigation/stack";
import React, { lazy } from "react";
import { LogadoRoutes } from "./logado.routes";
import Splash from '../screen/Splash'
import { DeslogadoRoutes } from "./deslogado.routes";

const { Screen, Navigator } = createStackNavigator();

export function RoutesRoutes() {
  const TransitionScreen = {
    gestureDirection: "horizontal",
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      };
    },
  };

  const CardOptions = {
    cardStyle: { backgroundColor: "transparent" },
    ...TransitionScreen,
    headerShown: false,
    gestureEnabled: false,
  };

  return (
    <Navigator initialRouteName="Logado" screenOptions={CardOptions}>
      <Screen name="SplashScreen" component={Splash} />
      <Screen name="Logado" component={LogadoRoutes} />
      <Screen name="Deslogado" component={DeslogadoRoutes}/>
    </Navigator>
  );
}
