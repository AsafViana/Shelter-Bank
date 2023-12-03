import React, { useState, useEffect } from 'react'
import { color, ministerio } from '../../../env.json'
import { Box, Input, Button, Text, FormControl, FormControlLabel, FormControlLabelText, InputField, FormControlError, VStack, FormControlErrorText, ScrollView, ButtonText, Center, InputSlot } from '@gluestack-ui/themed'
import { CardAdolescente } from '../../models/cardAdolescentes'
import { realtime, onValue, ref, get, child, db, collection, getDocs, addDoc, doc } from '../../service/firebase'
import { updateDoc } from 'firebase/firestore'

export default function index(props: any) {
	const { route } = props
	const uid = route.params.uid
	const id = route.params.id
	const [Nome, setNome] = useState()
	const [Email, setEmail] = useState()
	const [Codigo, setCodigo] = useState()
	const [Saldo, setSaldo] = useState()
	const [Carregou, setCarregou] = useState(false)
	console.log(route.params)

	function formatarStringComQuebraDeLinha(str: string, caracteresPorLinha: Number) {
		const regex = new RegExp(`.{1,${caracteresPorLinha}}`, 'g')
		const linhas = str.match(regex)

		if (linhas) {
			return linhas.join('\n')
		}

		return str
	}

	const pegaDados = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, ministerio))
			querySnapshot.forEach((doc) => {
				const dados = doc.data()
				if (dados.uid === uid) {
					setNome(dados.nome)
					setEmail(dados.email)
					setCodigo(dados.uid)
					setSaldo(dados.saldo)
					setCarregou(true)
				}
			})
		} catch (error) {
			console.error('Erro ao obter dados:', error)
		}
	}

	function formatarNomeProprio(nome: string) {
		const palavras = nome.split(' ')

		const palavrasFormatadas = palavras.map((palavra: string) => {
			// Capitaliza a primeira letra e mantém as demais minúsculas
			return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()
		})

		// Junta as palavras formatadas de volta em uma string
		const nomeFormatado = palavrasFormatadas.join(' ')

		return nomeFormatado
	}

	const handleEnvia = () => {
		const docRef = updateDoc(doc(db, ministerio, id), {
			nome: formatarNomeProprio(Nome),
			email: Email,
			saldo: parseInt(Saldo),
			uid: Codigo,
		})
			.then(() => alert('Dados atualizados'))
			.catch(() => alert('Erro na atualização'))
	}

	useEffect(() => {
		pegaDados()
	}, [])

	if (!Carregou) return

	return (
		<Center flex={1} bg={color.amarelo} paddingHorizontal={20}>
			<Box w={'$full'} bg={color.preto} justifyContent="space-between" padding={20} minHeight={100} borderRadius={20} elevation={20} hardShadow="1">
				<Box justifyContent="space-between" flexDirection="row" alignItems="center">
					<VStack flex={1} space="xl" justifyContent="center" alignItems="center">
						<FormControl size="lg" isDisabled={false} isReadOnly={false}>
							<FormControlLabel mb="$1">
								<FormControlLabelText fontFamily="interBlack" color={color.branco}>
									Nome
								</FormControlLabelText>
							</FormControlLabel>
							<Input w="$full" h={'$12'} borderColor={color.vazio} borderRadius="$2xl">
								<InputField value={Nome} onChangeText={setNome} borderColor={color.branco} borderWidth="$2" color={color.branco} fontFamily="interMedium" borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="text" placeholder="Fulano" />
							</Input>
						</FormControl>
						<FormControl size="lg" isDisabled={false} isReadOnly={false}>
							<FormControlLabel mb="$1">
								<FormControlLabelText fontFamily="interBlack" color={color.branco}>
									E-mail
								</FormControlLabelText>
							</FormControlLabel>
							<Input w="$full" h={'$12'} borderColor={color.vazio} borderRadius="$2xl">
								<InputField value={Email} onChangeText={setEmail} borderColor={color.branco} borderWidth="$2" color={color.branco} fontFamily="interMedium" borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="text" placeholder="Fulano" />
							</Input>
						</FormControl>
						<VStack space="md">
							<Text fontFamily="interBlack" color={color.branco}>
								Código:
							</Text>
							<Text color={color.branco} fontFamily="interLight" fontSize={'$2xl'}>
								{formatarStringComQuebraDeLinha(Codigo, 18)}
							</Text>
						</VStack>
						<FormControl size="lg" isDisabled={false} isReadOnly={false}>
							<FormControlLabel mb="$1">
								<FormControlLabelText fontFamily="interBlack" color={color.branco}>
									Saldo
								</FormControlLabelText>
							</FormControlLabel>
							<Input w="$full" h={'$12'} borderColor={color.vazio} borderRadius="$2xl">
								<InputField value={Saldo} onChangeText={setSaldo} borderColor={color.branco} borderWidth="$2" color={color.branco} fontFamily="interMedium" borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="text" placeholder="SC$" />
							</Input>
						</FormControl>
						<FormControl paddingVertical="$4" w="$64">
							<Button onPress={handleEnvia} action="primary" size="sm" bgColor={color.amarelo} borderRadius="$xl">
								<ButtonText fontFamily="interBlack" fontSize="$lg" alignSelf="center" color={color.preto}>
									Entrar
								</ButtonText>
							</Button>
						</FormControl>
					</VStack>
				</Box>
			</Box>
		</Center>
	)
}
