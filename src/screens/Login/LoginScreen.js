import { StyleSheet, Keyboard, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import globalStyles from '../../styles/global'
import { palette } from '../../themes/palette'
import logo from "../../assets/images/logo.png"
import { Text, Surface } from "react-native-paper"

import { auth } from '../../../firebase.v8'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'react-native-paper';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()
    const { colors } = useTheme()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("BottomNavigation")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log("Registered with: ", user.email)
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log("Logged in with: ", user.email)
            })
            .catch(error => alert(error.message))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[globalStyles.container, styles.container]}>
                <View>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}>Festify</Text>
                </View>
                <Surface style={styles.surface}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </Surface>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "whitesmoke",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    button: {
        backgroundColor: "deepskyblue",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "deepskyblue",
        borderWidth: 2
    },
    buttonOutlineText: {
        color: "deepskyblue",
        fontWeight: "700",
        fontSize: 16
    },
    logo: {
        alignSelf: "center",
        width: 90,
        height: 90,
    },
    logoText: {
        fontSize: 40,
        fontFamily: "PacificoRegular",
        color: palette.logo,
        alignSelf: "center",
        marginBottom: 30
    },
    surface: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    }

})