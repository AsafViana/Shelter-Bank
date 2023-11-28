import { TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import React, { useMemo, lazy } from 'react'
import Home from '../screen/Home'
import { useRoute } from '@react-navigation/native'

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

export function LogadoRoutes() {
	const router = useRoute()
	const dados = router.params
	console.log(dados)
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
		</Navigator>
	)
}
