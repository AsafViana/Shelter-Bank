import { StatusBar } from 'expo-status-bar'
import { LogBox } from 'react-native'
import { Routes } from './src/routes'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import env from './env.json'
import React, { useCallback, useEffect, useState } from 'react'
import { GluestackUIProvider, Text, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { useFonts, Inter_900Black as interBlack, Inter_400Regular as interRegular, Inter_500Medium as interMedium, Inter_700Bold as interBold, Inter_200ExtraLight as interLight } from '@expo-google-fonts/inter'
import {color} from './env.json'

export default function App() {
	let [fontsLoaded] = useFonts({
		interBlack,
		interRegular,
		interMedium,
		interBold,
		interLight,
		shelterLogo: require('./src/assets/fonts/shelterlogo.ttf')
	})
	LogBox.ignoreAllLogs()

	if (!fontsLoaded) return
	return (
		<SafeAreaProvider style={{ flex: 1, backgroundColor: color.preto }}>
			<SafeAreaView style={{ flex: 1 }}>
				<GluestackUIProvider config={config}>
					<Routes />
					<StatusBar style="light" backgroundColor={color.preto} />
				</GluestackUIProvider>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
