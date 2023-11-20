import React, { useState, useEffect } from 'react'
import { Dimensions, Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../../env.json'
import { Box, Input, Button, Text, FormControl, FormControlLabel, FormControlLabelText, InputField, FormControlError, VStack, FormControlErrorText, ScrollView, ButtonText, Center } from '@gluestack-ui/themed'
import { useFonts, Inter_900Black as interBlack, Inter_400Regular as interRegular, Inter_500Medium as interMedium } from '@expo-google-fonts/inter'

export default function index(props: any) {
	const {loginFunc, invalido, esqueciSenha} = props
	let [fontsLoaded] = useFonts({
		interBlack,
		interRegular,
		interMedium,
	})
	const [Email, setEmail] = useState('')
	const [Password, setPassword] = useState('')
	const [Invalido, setInvalido] = useState(false)
	const [screenDimensions, setScreenDimensions] = useState({
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	})
	const [Largura, setLargura] = useState(0)
	const [Altura, setAltura] = useState(450)

	const handleEnviar = () => {
		loginFunc(Email, Password)
	}

	useEffect(() => {
		const updateScreenDimensions = () => {
			setScreenDimensions({
				width: Dimensions.get('window').width,
				height: Dimensions.get('window').height,
			})
		}

		// Adicione um listener para atualizações de dimensões quando a tela é redimensionada
		Dimensions.addEventListener('change', updateScreenDimensions)

		// Lembre-se de remover o listener quando o componente é desmontado
		return () => {
			Dimensions.removeEventListener('change', updateScreenDimensions)
		}
	}, [])

	useEffect(() => {
		if (screenDimensions.width >= 620) {
			setLargura(600)
		} else if (screenDimensions.width >= 420) {
			setLargura(380)
		} else {
			setLargura(350)
		}
	}, [screenDimensions])

	useEffect(() => {
		setInvalido(invalido)
	}, [invalido])

	if (!fontsLoaded) {
		return null
	}

	return (
		<Box bg={color.preto} flex={1} justifyContent="center" alignItems="center" paddingHorizontal="$12">
			<Box padding={'$7'} sx={{ h: Altura, w: Largura }} bg={color.amarelo} borderRadius="$3xl">
				<Text fontSize="$4xl" color={color.preto} fontFamily="interBlack" paddingTop="$10">
					Login
				</Text>
				<VStack flex={1} space="3xl" h="$80" alignItems="center" justifyContent="center">
					{/* Usuario */}
					<FormControl size="lg" isDisabled={false} isInvalid={Invalido} isReadOnly={false}>
						<FormControlLabel mb="$1">
							<FormControlLabelText fontFamily="interBlack" color={color.preto}>
								E-mail
							</FormControlLabelText>
						</FormControlLabel>
						<Input w="$full" h={'$12'} borderColor={color.vazio} borderRadius="$2xl">
							<InputField value={Email} onChangeText={setEmail} borderColor={color.preto} borderWidth="$2" color={color.preto} fontFamily="interMedium" borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="text" placeholder="Fulano" />
						</Input>
					</FormControl>

					{/* Senha */}
					<FormControl size="md" isDisabled={false} isInvalid={Invalido} isReadOnly={false}>
						<FormControlLabel mb="$1">
							<FormControlLabelText fontFamily="interBlack" color={color.preto}>
								Senha
							</FormControlLabelText>
						</FormControlLabel>
						<Input w="$64" h={'$12'} borderColor={color.vazio} borderRadius="$2xl">
							<InputField value={Password} onChangeText={setPassword} borderColor={color.preto} borderWidth="$2" color={color.preto} borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="password" placeholder="******" />
						</Input>
						<Button onPress={() => esqueciSenha(Email)} variant="link" alignSelf="flex-end">
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
						<Button onPress={handleEnviar} action="primary" size="sm" bgColor={color.preto} borderRadius="$xl">
							<ButtonText fontFamily="interBlack" fontSize="$lg" alignSelf="center">
								Entrar
							</ButtonText>
						</Button>
					</FormControl>
				</VStack>
			</Box>
		</Box>
	)
}
