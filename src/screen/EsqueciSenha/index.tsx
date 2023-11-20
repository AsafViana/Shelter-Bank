import { Center, Text, VStack } from '@gluestack-ui/themed'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import {color} from '../../../env.json'

export default function index(props: any) {
	const {} = props
	return (
		<Center backgroundColor={color.preto} flex={1}>
			<Center backgroundColor={color.amarelo} w={350} h={600} px={5} justifyContent={'center'} alignItems={'center'} borderRadius="$3xl">

				<Text fontSize={15} fontFamily={'interBlack'} color={color.preto}>
					Clique no botão abaixo para entrar em contato
				</Text>
			</Center>
		</Center>
	)
}
