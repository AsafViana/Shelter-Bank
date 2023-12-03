import { Center, Text } from '@gluestack-ui/themed'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import {Camera} from 'expo-camera'
//import {color} from '../../../env.json'

export default function index(props: any) {
	const {} = props
	const [permission, requestPermission] = Camera.useCameraPermissions()

	useEffect(() => {
		requestPermission()

	}, [])

	if(!permission?.granted) return
	return (
		<Center flexGrow={1}>
			<Camera style={{flex: 1}}/>
		</Center>
	)
}
