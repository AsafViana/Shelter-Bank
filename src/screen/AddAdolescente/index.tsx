import { Box, Center, Text, VStack, FormControl, FormControlLabel, Input, InputField, FormControlLabelText, Button, ButtonText, ScrollView } from '@gluestack-ui/themed'
import React, { useState, useEffect, useCallback } from 'react'
import { realtime, ref, set, createUserWithEmailAndPassword, auth, addDoc, collection, db, setPersistence, signOut, NONE, SESSION, getDocs, signInWithEmailAndPassword } from '../../service/firebase'
import { color, ministerio } from '../../../env.json'
import { useNavigation } from '@react-navigation/native'

export default function index(props: any) {
	const {} = props
	const navigation = useNavigation()
	const [Nome, setNome] = useState('')
	const [Email, setEmail] = useState('')
	const [Saldo, setSaldo] = useState('')
	const [Desabilitado, setDesabilitado] = useState(true)

	const handleEnviar = useCallback(async () => {
		let senhaAdm = ''
		const querySnapshot = await getDocs(collection(db, ministerio))
		querySnapshot.forEach((doc: any) => {
			if (doc.id === 'adm') {
				senhaAdm = doc.data().Senha
			}
		})
		// Configura a persistência de autenticação para 'NONE'
		setPersistence(auth, NONE)

		// Cria uma nova conta usando o método de criação de usuário
		createUserWithEmailAndPassword(auth, Email, '123456')
			.then(async (user) => {
				const uid = user.user.uid

				try {
					const docRef = await addDoc(collection(db, ministerio), {
						nome: formatarNomeProprio(Nome),
						email: Email,
						saldo: parseInt(Saldo),
						uid: uid,
					})
					alert('Adolescente adicionado')
				} catch (e) {
					alert('Erro na criação do perfil')
				}
			})
			.catch((error) => {
				alert('Erro na criação do perfil')
				const errorCode = error.code
				const errorMessage = error.message
				switch (errorCode) {
					case 'auth/email-already-in-use':
						alert('E-mail já cadastrado')
				}
				console.log(errorCode)
				console.log(errorMessage)
			})
	}, [Nome, Email, Saldo])

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

	useEffect(() => {
		if (Nome === '' || Email === '' || Saldo === '') {
			setDesabilitado(true)
		} else {
			setDesabilitado(false)
		}
	}, [Nome, Email, Saldo])

	return (
		<ScrollView flex={1} w={'$full'} h={'$full'} bg={color.amarelo} p={20} justifyContent="center">
			<Center w={'$full'} bg={color.preto} justifyContent="space-between" padding={20} minHeight={100} borderRadius={20} elevation={20} hardShadow="1">
				<Box justifyContent="space-between" flexDirection="row" alignItems="center">
					<VStack marginVertical={'$8'} space="3xl">
						<FormControl size="lg" isDisabled={false} isReadOnly={false}>
							<FormControlLabel mb="$1">
								<FormControlLabelText fontFamily="interBlack" color={color.amarelo}>
									Nome completo:
								</FormControlLabelText>
							</FormControlLabel>
							<Input w="$full" h={'$12'} borderColor={color.vazio} borderRadius="$2xl">
								<InputField onChangeText={setNome} value={Nome} borderColor={color.amarelo} borderWidth="$2" color={color.branco} fontFamily="interMedium" borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="text" placeholder="Fulano" />
							</Input>
						</FormControl>

						<FormControl size="lg" isDisabled={false} isReadOnly={false}>
							<FormControlLabel mb="$1">
								<FormControlLabelText fontFamily="interBlack" color={color.amarelo}>
									E-mail
								</FormControlLabelText>
							</FormControlLabel>
							<Input w="$full" h={'$12'} borderColor={color.vazio} borderRadius="$2xl">
								<InputField onChangeText={setEmail} value={Email} borderColor={color.amarelo} borderWidth="$2" color={color.branco} fontFamily="interMedium" borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="text" placeholder="fulano@mail.com" />
							</Input>
						</FormControl>

						<FormControl size="lg" isDisabled={false} isReadOnly={false}>
							<FormControlLabel mb="$1">
								<FormControlLabelText fontFamily="interBlack" color={color.amarelo}>
									Saldo inicial:
								</FormControlLabelText>
							</FormControlLabel>
							<Input w="$full" h={'$12'} borderColor={color.vazio} borderRadius="$2xl">
								<InputField onChangeText={setSaldo} value={Saldo} inputMode="decimal" borderColor={color.amarelo} borderWidth="$2" color={color.branco} fontFamily="interMedium" borderRadius="$2xl" style={{ fontFamily: 'interMedium' }} type="text" placeholder="15" />
							</Input>
						</FormControl>

						<Text color={color.branco} fontFamily="interRegular" fontSize={'$lg'}>
							Senha padrão:
							<Text marginLeft={'$2'} color={color.branco} fontFamily="interBlack" fontSize={'$lg'}>
								123456
							</Text>
						</Text>

						<Button onPress={handleEnviar} bg={color.amarelo} borderRadius={'$2xl'} isDisabled={Desabilitado}>
							<ButtonText color={color.preto} fontFamily="interBlack">
								Enviar
							</ButtonText>
						</Button>
					</VStack>
				</Box>
			</Center>
		</ScrollView>
	)
}
