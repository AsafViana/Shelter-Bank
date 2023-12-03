import { Box, Text, Fab, FabIcon, AddIcon, FlatList, Button, ButtonIcon, Modal, ModalBackdrop, ModalContent, ModalHeader, Heading, ModalCloseButton, ModalBody, ModalFooter, ButtonText, Input, InputField, HStack } from '@gluestack-ui/themed'
import React, { useState, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { color, ministerio } from '../../../env.json'
import { Card, Contador } from '../../component'
import { useNavigation } from '@react-navigation/native'
import { realtime, onValue, ref, get, child, db, collection, getDocs, auth, signOut } from '../../service/firebase'
import { CardAdolescente } from '../../models/cardAdolescentes'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function index(props: any) {
	const {} = props
	const navigation = useNavigation()
	const [Dados, setDados] = useState<any[]>()
	const [Carregou, setCarregou] = useState(false)
	const [Erro, setErro] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const ref = React.useRef(null)

	const pegaDados = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, ministerio))
			const dados: any[] = []
			querySnapshot.forEach((doc) => {
				if (doc.id !== 'adm') {
					dados.push({ ...doc.data(), id: doc.id })
				}
			})
			setDados(dados)
			setCarregou(true)
		} catch (error) {
			console.error('Erro ao obter dados:', error)
			setErro(true)
		}
	}

	const setData = async (key: string, value: any) => {
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			// saving error
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

	if (!Dados) return

	return (
		<Box flex={1} bg={color.amarelo} paddingHorizontal={20} paddingTop={30}>
			<HStack justifyContent="space-around">
				<Button minHeight={150} w={'$32'} flexDirection="column" alignItems="center" onPress={logout} hardShadow="1" bg={color.vermelho} h="$20" size="lg" borderRadius="$2xl">
					<ButtonIcon color={color.preto} as={() => <Entypo name="log-out" size={40} color="black" />} />
					<ButtonText marginTop={10} fontFamily="interRegular" color={color.preto}>
						Sair
					</ButtonText>
				</Button>
				<Button minHeight={150} w={'$32'} flexDirection="column" alignItems="center" onPress={() => navigation.navigate('Add')} hardShadow="1" bg={color.vazio} h="$20" size="lg" borderRadius="$2xl">
					<ButtonIcon color={color.preto} as={() => <FontAwesome name="plus" size={40} color="black" />} />
					<ButtonText marginTop={10} fontFamily="interRegular" color={color.preto}>
						Novo Adolescente
					</ButtonText>
				</Button>
			</HStack>
			<FlatList data={Dados} renderItem={({ item }: { item: CardAdolescente }) => <Card Email={item.email} Saldo={item.saldo} Uid={item.uid} Nome={item.nome} onPress={() => navigation.navigate('Detalhes', { uid: item.uid, id: item.id })} />} />
		</Box>
	)
}
