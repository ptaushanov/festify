import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { useTheme, Surface, Button } from 'react-native-paper'
import globalStyles from '../../styles/global'
import StyledTextInput from '../../shared/TextInput/StyledTextInput'
import { useNavigation } from '@react-navigation/native'

const SignUp = () => {
    const { colors } = useTheme();
    const navigation = useNavigation()

    const handleSignUp = () => {
        // const newUser = new User(username, email, password)
        // signUpUser(newUser).catch(error => alert(error.message))
    }

    const handleLoginPressed = () => { navigation.navigate("Login") }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <View
                style={[
                    globalStyles.container,
                    styles.container,
                    { backgroundColor: colors.auth }
                ]}>

                <Surface style={styles.surface}>
                    <Text style={styles.title}>Sign Up</Text>
                    <View style={styles.inputContainer}>
                        <StyledTextInput
                            placeholder="Username"
                            // value={null}
                            // onChangeText={}
                            style={styles.input}
                        />
                        <StyledTextInput
                            placeholder="Email"
                            // value={null}
                            // onChangeText={}
                            style={styles.input}
                        />
                        <StyledTextInput
                            placeholder="Password"
                            // value={null}
                            // onChangeText={}
                            style={styles.input}
                        />
                        <StyledTextInput
                            placeholder="Confirm Password"
                            // value={null}
                            // onChangeText={}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="text"
                            onPress={handleLoginPressed}
                            style={styles.button}
                            contentStyle={styles.buttonContent}
                            color={colors.accent}
                        >
                            Login
                        </Button>
                        <Button
                            mode="contained"
                            // onPress={handleLogin}
                            style={[styles.button, styles.buttonRight]}
                            contentStyle={styles.buttonContent}
                            color={colors.accent}
                        >
                            Sign Up
                        </Button>
                    </View>

                </Surface>

            </View>
        </TouchableWithoutFeedback>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        padding: 40
    },
    surface: {
        width: "100%",
        padding: 20,
        borderRadius: 15,
        elevation: 3
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        paddingLeft: 5,
        color: "#333"
    },
    inputContainer: {
        marginVertical: 10
    },
    input: {
        marginVertical: 5
    },
    buttonContainer: {
        flexDirection: "row"
    },
    button: {
        flex: 1,
        marginHorizontal: 5
    },
})