import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../../env.json'
import { Box, Input, Button, Text, FormControl, FormControlLabel, FormControlLabelText, InputField, FormControlError, VStack, FormControlErrorText, ScrollView, ButtonText, Center } from '@gluestack-ui/themed'
import { useFonts, Inter_900Black as interBlack, Inter_400Regular as interRegular, Inter_500Medium as interMedium } from '@expo-google-fonts/inter'

export default function index(props: any) {
	const {loginFunc} = props
	let [fontsLoaded] = useFonts({
		interBlack,
		interRegular,
		interMedium,
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<ScrollView h='$full' w='$full' bg={color.preto}>
			<Center flex={1} bg={color.azul}>
				<Center maxWidth="$96" borderWidth="$1" m={40} w="$80" bg={color.amarelo} borderRadius="$3xl">
					<Text color={color.preto} fontSize={40} fontFamily="interBlack" paddingTop="$1" paddingLeft="$5">
						Login
					</Text>
					<VStack flex={1} space="3xl" h="$80" alignItems="center" justifyContent="center">
						{/* Usuario */}
						<FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
							<FormControlLabel mb="$1">
								<FormControlLabelText fontFamily="interBlack" color={color.preto}>
									Usuario
								</FormControlLabelText>
							</FormControlLabel>
							<Input w="$64" h={'$12'} borderColor={color.vazio}>
								<InputField borderColor={color.preto} borderWidth="$2" color={color.vazio} borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="text" placeholder="Fulano" />
							</Input>
							<FormControlError>
								<FormControlErrorText>Usuario incorreto</FormControlErrorText>
							</FormControlError>
						</FormControl>

						{/* Senha */}
						<FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
							<FormControlLabel mb="$1">
								<FormControlLabelText fontFamily="interBlack" color={color.preto}>
									Senha
								</FormControlLabelText>
							</FormControlLabel>
							<Input w="$64" h={'$12'} borderColor={color.vazio}>
								<InputField borderColor={color.preto} borderWidth="$2" color={color.vazio} borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="password" placeholder="******" />
							</Input>
							<FormControlError>
								<FormControlErrorText>Senha incorreta</FormControlErrorText>
							</FormControlError>
							<Button variant="link" alignSelf="flex-end">
								<ButtonText
									fontWeight="$medium"
									fontSize="$sm"
									fontFamily="interBlack"
									color="$textLight900"
									sx={{
										_dark: {
											color: '$textDark300',
										},
									}}>
									Esqueceu a senha?
								</ButtonText>
							</Button>
						</FormControl>

						{/* Enviar */}
						<FormControl w="$64">
							<Button action="primary" size="sm" bgColor={color.preto} borderRadius="$xl">
								<ButtonText fontFamily="interBlack" fontSize="$lg" alignSelf="center">
									Entrar
								</ButtonText>
							</Button>
						</FormControl>
					</VStack>
				</Center>
			</Center>
		</ScrollView>
	)
}
