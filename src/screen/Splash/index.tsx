import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../../env.json'

import { Text, Box } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { auth, signInWithEmailAndPassword, signOut } from '../../service/firebase'

export default function index(props: any) {
	const {} = props
	const navigation = useNavigation()
	const [Dados, setDados] = useState({})

	const getData = async () => {
		try {
			const senha = await AsyncStorage.getItem('senha')
			const email = await AsyncStorage.getItem('email')
			setDados({Email: email, Senha: senha})
		} catch (e) {
			console.log(e)
		}
	}
	const getValue = async () => {
		try {
			const senha = await AsyncStorage.getItem('senha')
			const email = await AsyncStorage.getItem('email')
			console.log([senha, email])

			if (senha == null || email == null) {
				navigation.navigate('Deslogado')
			} else {
				if (email === 'shelteradolescentes@gmail.com') {
					signInWithEmailAndPassword(auth, email, senha).then((userCredential) => {
						navigation.navigate('Adm')
					}).catch((e) => console.log(e))
				} else {
					signInWithEmailAndPassword(auth, email, senha).then((userCredential) => {
						navigation.navigate('Logado')
					}).catch(console.log)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		signOut(auth)
		getValue()

	}, [])

	return
}
