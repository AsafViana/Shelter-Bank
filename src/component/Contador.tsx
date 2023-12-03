import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

const Contador = () => {
	const [contador, setContador] = useState(0)
	const [numeroDigitado, setNumeroDigitado] = useState('')

	const incrementar = () => {
		setContador(contador + 1)
	}

	const decrementar = () => {
		setContador(contador - 1)
	}

	const definirNumero = () => {
		if (numeroDigitado !== '') {
			setContador(parseInt(numeroDigitado, 10))
			setNumeroDigitado('')
		}
	}

	return (
		<View style={{ alignItems: 'center' }}>

			<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
				<Button title="-" onPress={decrementar} />
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: 'black',
						padding: 8,
						marginRight: 10,
						width: 50,
					}}
					keyboardType="numeric"
					onChangeText={(text) => setNumeroDigitado(text)}
					value={numeroDigitado}
				/>
				<Button title="+" onPress={incrementar} />
			</View>
		</View>
	)
}

export default Contador
