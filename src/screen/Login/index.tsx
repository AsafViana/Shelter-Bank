import { useState } from 'react'
import Android from './android'
import Web from './web'
import { Alert, Platform } from 'react-native'
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '../../service/firebase'
import { useNavigation } from '@react-navigation/native'

export default function index(props: any) {
	const {} = props
	const navigation = useNavigation()
	const [Invalido, setInvalido] = useState(false)

	const handlerLogin = (email: string, senha: string) => {
		if (!auth.currentUser?.uid && email !== '' && senha !== '') {
			signInWithEmailAndPassword(auth, email, senha)
				.then((userCredential) => {})
				.catch((value) => {
					setInvalido(true)
				})
		} else {
			setInvalido(true)
		}
	}

	const handlerEsqueciSenha = (email: string) => {
		if (email != '') {
			sendPasswordResetEmail(auth, email)
				.then(() => alert("E-mail para redefinição enviado"))
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
