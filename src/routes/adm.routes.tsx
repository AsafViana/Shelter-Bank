import { StackNavigationOptions, TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import React, { useMemo, lazy } from 'react'
import Home from '../screen/AdmHome'
import Add from '../screen/AddAdolescente'
import Detalhes from '../screen/DetalheAdolescente'
import {color} from '../../env.json'

const { Navigator, Screen } = createStackNavigator()

export function AdmRoutes() {
	const TransitionScreen = {
		gestureDirection: 'horizontal',
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
			}
		},
	}

	const CardOptions: StackNavigationOptions = {
		cardStyle: { backgroundColor: 'transparent' },
		...TransitionScreen,
		headerTitle: '',
		headerTransparent: true,
		headerBackTitleVisible: false, // Esconde o título padrão do botão de voltar
		headerLeftContainerStyle: {
			marginLeft: 20, // Ajusta a posição do botão de voltar
		},
	}
	return (
		<Navigator screenOptions={CardOptions} initialRouteName="Home">
			<Screen name="Home" component={Home} options={{ headerShown: false }} />
			<Screen name="Add" component={Add} />
			<Screen name="Detalhes" component={Detalhes} options={{ headerShown: false }} />
		</Navigator>
	)
}
