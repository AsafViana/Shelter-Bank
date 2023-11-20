import { StatusBar } from 'expo-status-bar'
import { LogBox } from 'react-native'
import { Routes } from './src/routes'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import env from './env.json'
import React, { useCallback, useEffect, useState } from 'react'
import { GluestackUIProvider, Text, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { useFonts, Inter_900Black as interBlack, Inter_400Regular as interRegular, Inter_500Medium as interMedium } from '@expo-google-fonts/inter'

export default function App() {
	const { color } = env
	let [fontsLoaded] = useFonts({
		interBlack,
		interRegular,
		interMedium,
	})
	LogBox.ignoreAllLogs()

	if (!fontsLoaded) return
	return (
		<SafeAreaProvider style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<GluestackUIProvider config={config}>
					<Routes />
					<StatusBar style="light" backgroundColor={color.preto} />
				</GluestackUIProvider>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
