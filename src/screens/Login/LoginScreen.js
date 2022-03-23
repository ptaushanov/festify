import { StyleSheet, Keyboard, View, TouchableWithoutFeedback, TextInput, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import globalStyles from '../../styles/global'
import { palette } from '../../themes/palette'
import logo from "../../assets/images/logo.png"
import { useNavigation } from '@react-navigation/core'
import { useTheme, Button, Text, Surface } from 'react-native-paper';
import useAuth from '../../services/hooks/useAuth'
import { signUpUser, logInUser } from '../../services/authenticate'
import User, { UserBuilder } from '../../models/User'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()
    const { colors } = useTheme()

    const hasLoggedIn = useAuth()

    const changeScreen = useCallback(() => {
        if (hasLoggedIn) {
            console.log("Logged in")
            navigation.replace("BottomNavigation")
        }
    }, [hasLoggedIn])


    useEffect(() => {
        changeScreen()
    }, [hasLoggedIn])

    const handleSignUpPressed = () => {
        navigation.navigate("SignUp")
    }

    const handleLogin = () => {
        const user =
            new UserBuilder()
                .email(email)
                .password(password)
                .build()

        logInUser(user).catch(error => alert(error.message))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[
                globalStyles.container,
                styles.container,
                { backgroundColor: colors.auth }
            ]}>
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
                        <Button
                            mode="contained"
                            onPress={handleLogin}
                            style={styles.button}
                            contentStyle={styles.buttonContent}
                            color={colors.accent}
                        >
                            Login
                        </Button>

                        <Button
                            mode="text"
                            onPress={handleSignUpPressed}
                            style={styles.button}
                            contentStyle={styles.buttonContent}
                            color={colors.accent}
                        >
                            Sign up
                        </Button>

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
        width: "100%",
        marginVertical: 2
    },
    buttonContent: {
        width: "100%",
        padding: 5,
        alignItems: "center"
    },
    logo: {
        alignSelf: "center",
        width: 100,
        height: 100,
    },
    logoText: {
        fontSize: 45,
        fontFamily: "PacificoRegular",
        color: palette.logo,
        alignSelf: "center",
        marginBottom: 60
    },
    surface: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 4
    }

})