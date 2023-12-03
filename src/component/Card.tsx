import { Box, Center, Text, VStack, Pressable } from '@gluestack-ui/themed'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../env.json'
import { useNavigation } from '@react-navigation/native'
import { CardAdolescente } from '../models/cardAdolescentes'

export function index(props: any) {
	const { Email, Nome, Saldo, Uid, onPress } = props
	const navigation = useNavigation()

	function abreviarNome(nomeCompleto: string) {
		// Divide o nome completo em partes
		if (!nomeCompleto) return

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

	return (
		<>
			<Pressable onPress={onPress} paddingVertical={15}>
				<Box w={'$full'} bg={color.preto} justifyContent="space-between" padding={20} minHeight={100} borderRadius={20} elevation={20} hardShadow="1">
					<Box justifyContent="space-between" flexDirection="row" alignItems="center">
						<VStack space="xl">
							<VStack space="md">
								<Text fontFamily="interBlack" color={color.branco}>
									Nome:
								</Text>
								<Text color={color.branco} fontFamily="interLight" fontSize={'$2xl'}>
									{abreviarNome(Nome)}
								</Text>
							</VStack>
							<VStack space="md">
								<Text fontFamily="interBlack" color={color.branco}>
									E-mail:
								</Text>
								<Text color={color.branco} fontFamily="interLight" fontSize={'$2xl'}>
									{Email}
								</Text>
							</VStack>
							<VStack space="md">
								<Text fontFamily="interBlack" color={color.branco}>
									Código:
								</Text>
								<Text color={color.branco} fontFamily="interLight" fontSize={'$2xl'}>
									{formatarStringComQuebraDeLinha(Uid, 24)}
								</Text>
							</VStack>
							<VStack space="md">
								<Text fontFamily="interBlack" color={color.branco}>
									Saldo:
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
			</Pressable>
		</>
	)
}
