import { TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import React, { useMemo, lazy } from 'react'

const { Navigator, Screen } = createStackNavigator()

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
					{
						translateX: next
							? next.progress.interpolate({
									inputRange: [0, 1],
									outputRange: [0, -layouts.screen.width],
							  })
							: 1,
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

const CardOptions = {
	cardStyle: { backgroundColor: 'transparent' },
	...TransitionScreen,
	headerShown: false,
	gestureEnabled: false,
}

const Home = lazy(() => import('../screen/Home'))
/*const Adicionar = lazy(() => import("../screen/Adicionar"));
const Info = lazy(() => import("../screen/Info"));
const Testes = lazy(() => import("../screen/Testes")); */

export function LogadoRoutes() {
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

	const CardOptions = {
		cardStyle: { backgroundColor: 'transparent' },
		...TransitionScreen,
		headerShown: false,
		gestureEnabled: false,
	}
	return (
		<Navigator screenOptions={CardOptions} initialRouteName="Home">
			<Screen name="Home" component={Home} />
			{/*<Screen
        name="Adicionar"
        component={Adicionar}
        options={{ tabBarHideOnKeyboard: true, tabBarIcon: "add" }}
      />
      <Screen
        name="Info"
        component={Info}
        options={{ tabBarHideOnKeyboard: true, tabBarIcon: "info" }}
      /> */}
			{/* <Screen name="Testes" component={Testes} options={{ tabBarHideOnKeyboard: true, tabBarIcon: 'teste' }} /> */}
		</Navigator>
	)
}
