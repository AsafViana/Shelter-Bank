import { useEffect, useState } from 'react'
import Android from './android'
import Web from './web'
import { Alert, Platform, View } from 'react-native'
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, realtime, ref, set, onValue, signInAnonymously, collection, db, getDocs } from '../../service/firebase'
import { useNavigation } from '@react-navigation/native'
import { ministerio } from '../../../env.json'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function index(props: any) {
	const {} = props
	const navigation = useNavigation()
	const [Invalido, setInvalido] = useState(false)

	const handlerLogin = async (email: string, senha: string) => {
		if (!auth.currentUser?.uid && email !== '' && senha !== '') {
			signInWithEmailAndPassword(auth, email, senha)
				.then((userCredential) => {
					setData('email', email)
					setData('senha', senha)
					if (userCredential.user.email === 'shelteradolescentes@gmail.com') {
						navigation.navigate('Adm')
					} else {
						navigation.navigate('Logado')
					}
				})
				.catch((value) => {
					alert('Senha ou e-mail errado')
					setInvalido(true)
				})
		} else {
			alert('Preencha os campos corretamente')
			setInvalido(true)
		}
	}
	
	const setData = async (key: string, value: any) => {
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			// saving error
		}
	}

	//setData('teste', 'opa')

	/* useEffect(() => {
		signOut(auth)

		auth.onAuthStateChanged((user) => {
			if (user) {
				if (user.email === 'shelteradolescentes@gmail.com') {
					navigation.navigate('Adm')
				} else {
					navigation.navigate('Logado')
				}
			} else {
				// Usuário não está logado
				console.log('Usuário não está logado.')
			}
		})
	}, []) */

	const handlerEsqueciSenha = (email: string) => {
		if (email != '') {
			sendPasswordResetEmail(auth, email)
				.then(() => alert('E-mail para redefinição enviado'))
				.catch((e) => {
					switch (e.code) {
						case 'auth/invalid-email':
							alert('Este e-mail não é válido')
							break

						default:
							alert('Algo deu errado, Avise seus lideres.')
							break
					}
				})
		} else {
			alert('Preencha o campo email')
		}
	}

	switch (Platform.OS) {
		case 'web':
			return <Web invalido={Invalido} loginFunc={handlerLogin} esqueciSenha={handlerEsqueciSenha} />
		default:
			return <Android invalido={Invalido} loginFunc={handlerLogin} esqueciSenha={handlerEsqueciSenha} />
	}
}
