import { Box, Text, Fab, FabIcon, AddIcon, FlatList, Button, ButtonIcon } from '@gluestack-ui/themed'
import React, { useState, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { color, ministerio } from '../../../env.json'
import { Card } from '../../component'
import { useNavigation } from '@react-navigation/native'
import { realtime, onValue, ref, get, child, db, collection, getDocs } from '../../service/firebase'
import { CardAdolescente } from '../../models/cardAdolescentes'

export default function index(props: any) {
	const {} = props
	const navigation = useNavigation()
	const [Dados, setDados] = useState<Array<any>>()
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [Carregou, setCarregou] = useState(false)
	const [Erro, setErro] = useState(false)

	const pegaDados = useCallback(async () => {
		const querySnapshot = await getDocs(collection(db, 'shelter'))
		const dados: any[] = []
		querySnapshot.forEach((doc) => {
			if (doc.id != 'adm') {
				dados.push(doc.data())
				console.log(doc.data())
			}
		})
		setDados(dados)
		setCarregou(true)
	}, [])

	const onRefresh = useCallback(async () => {
		setIsRefreshing(true)
		pegaDados()
		setIsRefreshing(false)
	}, [])

	useEffect(() => pegaDados(), [])

	return (
		<Box flex={1} bg={color.amarelo} paddingHorizontal={20} paddingTop={30}>
			<Button onPress={() => navigation.navigate('Add')} hardShadow="1" bg={color.vazio} h="$20" size="lg" borderRadius="$2xl">
				<ButtonIcon color={color.preto} as={() => <FontAwesome name="plus" size={40} color="black" />} />
			</Button>
			{/* {Carregou ? <FlatList data={Dados} renderItem={({ item }) => <Card Uid={item.Uid} Nome={item.Nome} Email={item.Email} Saldo={item.Saldo} />} /> : <></>} */}
		</Box>
	)
}
