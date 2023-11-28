import { Center, Text, Button, ButtonIcon, Box, HStack, Avatar, AvatarFallbackText, VStack, AvatarBadge, Heading, ModalHeader, ButtonText } from '@gluestack-ui/themed'
import React, { useState, useEffect } from 'react'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../../../env.json'

export default function index(props: any) {
	const {} = props
	const [Nome, setNome] = useState('Asaf Viana Araujo')
	const [Codigo, setCodigo] = useState('mel46fmCVVW36CcA4Ery1BwR2Dz2')
	const [Saldo, setSaldo] = useState(150)

	function abreviarNome(nomeCompleto: string) {
		// Divide o nome completo em partes
		const partesDoNome = nomeCompleto.split(' ')

		// Verifica se há mais de um nome
		if (partesDoNome.length > 1) {
			// Abrevia os nomes do meio (exceto o primeiro e o último)
			for (let i = 1; i < partesDoNome.length - 1; i++) {
				partesDoNome[i] = partesDoNome[i].charAt(0) + '.'
			}
		}

		// Junta as partes do nome de volta
		const nomeAbreviado = partesDoNome.join(' ')

		return nomeAbreviado
	}

	function formatarStringComQuebraDeLinha(str: string, caracteresPorLinha: Number) {
		const regex = new RegExp(`.{1,${caracteresPorLinha}}`, 'g')
		const linhas = str.match(regex)

		if (linhas) {
			return linhas.join('\n')
		}

		return str
	}

	useEffect(() => {
		setNome(abreviarNome(Nome))
		setCodigo(formatarStringComQuebraDeLinha(Codigo, 20))
	}, [])


	return (
		<Box flex={1} bg={color.amarelo} padding={20}>
			{/* <VStack space="2xl">
				<HStack space="md">
					<Avatar bgColor={color.cinza}>
						<AvatarFallbackText fontFamily="interMedium">Arlene McCoy</AvatarFallbackText>
					</Avatar>
					<Heading alignSelf="center" size="sm" fontFamily="interBlack">
						Arlene McCoy
					</Heading>
				</HStack>
			</VStack> */}

			<VStack space="4xl" w={'$full'} paddingHorizontal={30}>
				{/* Cabeçalho */}
				<Box paddingTop={40} w={'$full'} justifyContent="space-between" flexDirection="row" alignItems="center">
					<Text marginLeft={-20} alignSelf="flex-start" color={color.preto} fontSize={'$8xl'} fontFamily="shelterLogo">
						
					</Text>
					<Pressable style={{ height: '100%', justifyContent: 'center' }}>
						<Ionicons name="settings" color={color.preto} size={30} />
					</Pressable>
				</Box>
				{/* Identificador */}
				<Box w={'$full'} bg={color.preto} justifyContent="space-between" padding={20} h={200} borderRadius={20} hardShadow="1">
					<Box justifyContent="space-between" flexDirection="row" alignItems="center">
						<VStack space="xl">
							<Box>
								<Text fontFamily="interBlack" color={color.branco}>
									Nome:
								</Text>
								<Text color={color.branco} fontFamily="interRegular" fontSize={'$xl'}>
									{Nome}
								</Text>
							</Box>
							<VStack space="sm">
								<Text fontFamily="interBlack" color={color.branco}>
									Código:
								</Text>
								<Text color={color.branco} fontFamily="interRegular" fontSize={'$xl'}>
									{Codigo}
								</Text>
							</VStack>
						</VStack>
					</Box>
				</Box>
				{/* Saldo */}
				<Box w={'$full'} bg={color.preto} justifyContent="space-between" padding={20} minHeight={100} borderRadius={20} elevation={20} hardShadow="1">
					<Box justifyContent="space-between" flexDirection="row" alignItems="center">
						<VStack space="xl">
							<VStack space="md">
								<Text fontFamily="interBlack" color={color.branco}>
									Saldo dísponivel:
								</Text>
								<Text color={color.verde} fontFamily="interBlack" fontSize={'$3xl'}>
									<Text fontFamily="interRegular" fontSize={'$xs'} color={color.branco}>
										{'SC$ '}
									</Text>
									{Saldo}
								</Text>
							</VStack>
						</VStack>
					</Box>
				</Box>
				{/* Funções */}
				<Text fontFamily="interBold" fontSize={'$xl'} color={color.preto}>
					Do que precisa?
				</Text>
				<HStack justifyContent="space-around">
					<Button flexDirection="column" alignItems="center" w={'$32'} bg={color.preto} justifyContent="center" padding={20} minHeight={150} borderRadius={20} elevation={20} hardShadow="1">
						<ButtonIcon as={() => <Ionicons name="swap-horizontal" color={color.amarelo} size={40} />} />
						<ButtonText marginTop={10} fontFamily="interRegular" color={color.branco}>
							Transação
						</ButtonText>
					</Button>
					<Button flexDirection="column" alignItems="center" w={'$32'} bg={color.preto} justifyContent="center" padding={20} minHeight={150} borderRadius={20} elevation={20} hardShadow="1">
						<ButtonIcon as={() => <Ionicons name="qr-code" color={color.amarelo} size={40} />} />
						<ButtonText marginTop={10} fontFamily="interRegular" color={color.branco}>
							Pagar
						</ButtonText>
					</Button>
				</HStack>
			</VStack>
		</Box>
	)
}
