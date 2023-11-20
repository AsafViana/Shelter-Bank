import { Center, Text, Box, HStack, Avatar, AvatarFallbackText, VStack, AvatarBadge, Heading } from '@gluestack-ui/themed'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import {color} from '../../../env.json'

export default function index(props: any) {
	const {} = props
	return (
		<Box flex={1}>
			<Box flex={1.5} bg={color.amarelo} />
			<Box flex={4} bg={color.preto} />
			<Box position="relative" top={10} left={10} w={100} h={100}>
				<VStack space="2xl">
					<HStack space="md">
						<Avatar bgColor="$orange600">
							<AvatarFallbackText>Arlene McCoy</AvatarFallbackText>
						</Avatar>
						<VStack>
							<Heading size="sm">Arlene McCoy</Heading>
						</VStack>
					</HStack>
				</VStack>
			</Box>
		</Box>
	)
}
