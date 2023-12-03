import { TransitionSpecs, createStackNavigator } from "@react-navigation/stack";
import React, { lazy } from "react";
import { LogadoRoutes } from "./logado.routes";
import Splash from '../screen/Splash'
import { DeslogadoRoutes } from "./deslogado.routes";
import { AdmRoutes } from './adm.routes'
import { color } from '../../env.json'

const { Screen, Navigator } = createStackNavigator()

export function RoutesRoutes() {
	return (
		<Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false, gestureEnabled: false}}>
			<Screen name="SplashScreen" component={Splash} />
			<Screen name="Logado" component={LogadoRoutes} />
			<Screen name="Deslogado" component={DeslogadoRoutes} />
			<Screen name="Adm" component={AdmRoutes} />
		</Navigator>
	)
}
