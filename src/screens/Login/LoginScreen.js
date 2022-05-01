import { StyleSheet, Keyboard, View, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import globalStyles from '../../styles/global'
import { palette } from '../../themes/palette'
import logo from "../../assets/images/logo.png"
import { useNavigation } from '@react-navigation/core'
import { useTheme, Button, Text, Surface } from 'react-native-paper';
import useAuth from '../../services/hooks/useAuth'
import { logInUser } from '../../services/authenticate'
import { UserBuilder } from '../../models/User'

import i18n from 'i18n-js'
import { Formik } from 'formik'
import * as Yup from "yup"

import StyledTextInput from '../../shared/TextInput/StyledTextInput'

const LoginScreen = () => {
    const navigation = useNavigation()
    const { colors } = useTheme()

    const hasLoggedIn = useAuth()
    const [generalError, setGeneralError] = useState(null)

    const handleInputFocus = () => {
        if (generalError) {
            setGeneralError(null)
        }
    }


    useEffect(() => {
        if (hasLoggedIn) {
            navigation.replace("BottomNavigation")
        }
    }, [hasLoggedIn])

    const handleSignUpPressed = () => {
        navigation.navigate("SignUp")
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
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}

                    validationSchema={Yup.object({
                        email: Yup.string()
                            .trim(i18n.t("auth:email-trim"))
                            .strict(true)
                            .email(i18n.t("auth:email-email"))
                            .required(i18n.t("auth:email-required")),

                        password: Yup.string()
                            .trim(i18n.t("auth:password-trim"))
                            .strict(true)
                            .required(i18n.t("auth:password-required")),
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        const { email, password } = values

                        const user =
                            new UserBuilder()
                                .email(email)
                                .password(password)
                                .build()

                        logInUser(user)
                            .catch(error => {
                                setSubmitting(false)
                                if (error.name = "FirebaseAuthInvalidCredentialsException") {
                                    setGeneralError(i18n.t("auth:invalid-credentials"))
                                }
                            })
                    }}
                >{
                        ({ values, touched, errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValidating }) => (
                            <Surface style={styles.surface}>
                                <View style={styles.inputContainer}>
                                    <StyledTextInput
                                        placeholder={i18n.t("auth:Email")}
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        onFocus={handleInputFocus}
                                        style={styles.input}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        darken
                                    />
                                    <StyledTextInput
                                        placeholder={i18n.t("auth:Password")}
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        onFocus={handleInputFocus}
                                        style={styles.input}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        secureTextEntry
                                        darken
                                    />
                                    <Text
                                        style={{
                                            display: generalError ? "flex" : "none",
                                            color: colors.danger,
                                            textAlign: "center"
                                        }}
                                    >
                                        {generalError}
                                    </Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        mode="contained"
                                        onPress={handleSubmit}
                                        style={styles.button}
                                        contentStyle={styles.buttonContent}
                                        color={colors.accent}
                                        disabled={isSubmitting || isValidating}
                                    >
                                        {i18n.t("auth:Login")}
                                    </Button>

                                    <Button
                                        mode="text"
                                        onPress={handleSignUpPressed}
                                        style={styles.button}
                                        contentStyle={styles.buttonContent}
                                        color={colors.accent}
                                        disabled={isSubmitting || isValidating}
                                    >
                                        {i18n.t("auth:Sign Up")}
                                    </Button>
                                </View>
                            </Surface>
                        )}
                </Formik>
            </View>
        </TouchableWithoutFeedback >
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
        marginVertical: 5,
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