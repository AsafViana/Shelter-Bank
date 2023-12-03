import { Center, Text, Button, ButtonIcon, Box, HStack, Avatar, AvatarFallbackText, VStack, AvatarBadge, Heading, ModalHeader, ButtonText } from '@gluestack-ui/themed'
import React, { useState, useEffect } from 'react'
import { Pressable } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { color, ministerio } from '../../../env.json'
import { signOut, db, collection, getDocs, auth } from '../../service/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function index(props: any) {
	const {} = props

	const navigation = useNavigation()
	const [Nome, setNome] = useState()
	const [Codigo, setCodigo] = useState(auth.currentUser.uid)
	const [Saldo, setSaldo] = useState()
	const [Carregou, setCarregou] = useState(false)
	const [Dados, setDados] = useState()

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

	const setData = async (key: string, value: any) => {
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			// saving error
		}
	}

	const pegaDados = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, ministerio))
			const dados: any[] = []
			querySnapshot.forEach((doc) => {
				if (doc.data().uid === Codigo) {
					setNome(doc.data().nome)
					setSaldo(doc.data().saldo)
					setCarregou(true)
					setDados(doc.data())
				}
			})
		} catch (error) {
			console.error('Erro ao obter dados:', error)
		}
	}

	const logout = () => {
		signOut(auth)
		setData('email', null)
		setData('senha', null)
		navigation.navigate('Deslogado')
	}

	useEffect(() => {
		const fetchData = async () => {
			await pegaDados()
		}

		fetchData()
	}, [Dados])

	if(!Carregou) return


	return (
		<Box flex={1} bg={color.amarelo} padding={20}>
			<VStack space="4xl" w={'$full'} paddingHorizontal={30}>
				{/* Cabeçalho */}
				<Box paddingTop={40} w={'$full'} justifyContent="space-between" flexDirection="row" alignItems="center">
					<Text marginTop={20} marginLeft={-20} alignSelf="flex-start" color={color.preto} fontSize={'$8xl'} fontFamily="shelterLogo">
						
					</Text>
					<Button flexDirection="column" alignItems="center" onPress={logout} hardShadow="1" bg={color.vermelho} h="$20" size="lg" borderRadius="$2xl">
						<ButtonIcon color={color.preto} as={() => <Entypo name="log-out" size={24} color="black" />} />
					</Button>
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
									{formatarStringComQuebraDeLinha(Codigo, 23)}
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
					<Button onPress={() => navigation.navigate('QrCode')} flexDirection="column" alignItems="center" w={'$32'} bg={color.preto} justifyContent="center" padding={20} minHeight={150} borderRadius={20} elevation={20} hardShadow="1">
						<ButtonIcon as={() => <Ionicons name="qr-code" color={color.amarelo} size={40} />} />
						<ButtonText marginTop={10} fontFamily="interRegular" color={color.branco}>
							Pagar
						</ButtonText>
					</Button>
					<Button onPress={() => navigation.navigate('Transferencia', { saldo: Saldo })} flexDirection="column" alignItems="center" w={'$32'} bg={color.preto} justifyContent="center" padding={20} minHeight={150} borderRadius={20} elevation={20} hardShadow="1">
						<ButtonIcon as={() => <Ionicons name="swap-horizontal" color={color.amarelo} size={40} />} />
						<ButtonText marginTop={10} fontFamily="interRegular" color={color.branco}>
							Transação
						</ButtonText>
					</Button>
				</HStack>
			</VStack>
		</Box>
	)
}
