import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
//import {color} from '../../../env.json'

import { Text, Box } from '@gluestack-ui/themed'

export default function index(props: any) {
	const {} = props
	return (
		<Box width="100%" justifyContent="center" alignItems="center">
			<Text>Open up App.js to start working on your app!</Text>
		</Box>
	)
}
