import { Box, Input, Button, Text, FormControl, FormControlLabel, FormControlLabelText, InputField, FormControlError, VStack, FormControlErrorText, ScrollView, ButtonText, Center, InputSlot } from '@gluestack-ui/themed'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color, ministerio } from '../../../env.json'
import { auth, db, collection, getDocs, addDoc, doc } from '../../service/firebase'
import { updateDoc } from 'firebase/firestore'

export default function index(props: any) {
	const { route } = props
	let saldo = route.params.saldo
	const [Transferir, setTransferir] = useState<number>()

	const enviar = async () => {
		const resultado = saldo - parseInt(Transferir)
		if (resultado < 0 || isNaN(Number(Transferir))) {
			alert('Valor inválido ou Saldo insuficiente')
		} else {
			let id
			try {
				const querySnapshot = await getDocs(collection(db, ministerio))
				const dados: any[] = []
				querySnapshot.forEach((doc) => {
					if (doc.data().uid === auth.currentUser.uid) {
						id = doc.id
					}
				})
			} catch (error) {
				console.error('Erro ao obter dados:', error)
			}

			const docRef = updateDoc(doc(db, ministerio, id), {
				saldo: resultado
			})
				.then(() => alert('Transferencia realizada'))
				.catch(() => alert('Erro na atualização'))
		}
	}

	return (
		<Center flex={1} bg={color.amarelo} paddingHorizontal={20}>
			<Box w={'$full'} bg={color.preto} justifyContent="space-between" padding={20} minHeight={100} borderRadius={20} elevation={20} hardShadow="1">
				<Box justifyContent="space-between" flexDirection="row" alignItems="center">
					<VStack flex={1} space="xl" justifyContent="center" alignItems="center">
						<Text fontSize="$4xl" color={color.amarelo} fontFamily="interBlack" paddingTop="$10">
							Transferência:
						</Text>
						<Text fontSize="$xl" color={color.cinza} fontFamily="interLight" paddingTop="$10">
							Quantidade de Solo que quer trasnferir.
						</Text>

						<FormControl size="lg" isDisabled={false} isReadOnly={false}>
							<FormControlLabel mb="$1">
								<FormControlLabelText fontFamily="interBlack" color={color.branco}>
									Saldo
								</FormControlLabelText>
							</FormControlLabel>
							<Input w="$full" h={'$12'} borderColor={color.vazio} borderRadius="$2xl">
								<InputField value={Transferir} onChangeText={setTransferir} borderColor={color.branco} borderWidth="$2" color={color.branco} fontFamily="interMedium" borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="text" placeholder="SC$" />
							</Input>
						</FormControl>
						<FormControl paddingVertical="$4" w="$64">
							<Button onPress={enviar} action="primary" size="sm" bgColor={color.amarelo} borderRadius="$xl">
								<ButtonText fontFamily="interBlack" fontSize="$lg" alignSelf="center" color={color.preto}>
									Enviar
								</ButtonText>
							</Button>
						</FormControl>
					</VStack>
				</Box>
			</Box>
		</Center>
	)
}
