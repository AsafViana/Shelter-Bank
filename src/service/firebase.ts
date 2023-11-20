import {firebaseConfig} from '../../env.json'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail
}

