import { TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import React, { useMemo, lazy } from 'react'
import Home from '../screen/AdmHome'
import Add from '../screen/AddAdolescente'
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

	const CardOptions = {
		cardStyle: { backgroundColor: 'transparent' },
		...TransitionScreen,
		headerStyle: {
			backgroundColor: color.amarelo,
		}
	}
	return (
		<Navigator screenOptions={CardOptions} initialRouteName="Home">
			<Screen name="Home" component={Home} />
			<Screen name="Add" component={Add} />
		</Navigator>
	)
}
