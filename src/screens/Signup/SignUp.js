import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import React from 'react'
import { useTheme, Surface, Button, Text } from 'react-native-paper'
import globalStyles from '../../styles/global'
import StyledTextInput from '../../shared/TextInput/StyledTextInput'
import { useNavigation } from '@react-navigation/native'
import i18n from 'i18n-js'
import User from '../../models/User'
import { signUpUser, checkDuplicateUsername } from '../../services/authenticate'

import { Formik } from 'formik'
import * as Yup from "yup"

const SignUp = () => {
    const { colors } = useTheme();
    const navigation = useNavigation()

    const handleLoginPressed = () => { navigation.navigate("Login") }
    const handleTWFPress = () => {
        switch (Platform.OS) {
            case "android":
            case "ios":
                Keyboard.dismiss()
                break;
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={handleTWFPress}
        >
            <View
                style={[
                    globalStyles.container,
                    styles.container,
                    { backgroundColor: colors.auth }
                ]}>

                <Surface style={styles.surface}>
                    <Text style={styles.title}>
                        {i18n.t("auth:Sign Up")}
                    </Text>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}

                        validationSchema={Yup.object({
                            username: Yup.string()
                                .trim(i18n.t("auth:username-trim"))
                                .strict(true)
                                .min(4, i18n.t("auth:username-min").replace("{0}", 4))
                                .max(512, i18n.t("auth:username-max").replace("{0}", 512))
                                .required(i18n.t("auth:username-required")),

                            email: Yup.string()
                                .trim(i18n.t("auth:email-trim"))
                                .strict(true)
                                .email(i18n.t("auth:email-email"))
                                .required(i18n.t("auth:email-required")),

                            password: Yup.string()
                                .trim(i18n.t("auth:password-trim"))
                                .strict(true)
                                .min(6, i18n.t("auth:password-min").replace("{0}", 6))
                                .max(256, i18n.t("auth:password-max").replace("{0}", 256))
                                .required(i18n.t("auth:password-required")),

                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], i18n.t("auth:password-confirm"))
                        })}

                        onSubmit={async (values, { setErrors, setSubmitting }) => {
                            const { username, email, password } = values
                            try {
                                const isDuplicate = await checkDuplicateUsername(username)
                                if (isDuplicate) {
                                    setErrors({
                                        username: i18n.t("auth:username-exists")
                                    })
                                    setSubmitting(false)
                                    return
                                }

                                const newUser = new User(username, email, password)
                                await signUpUser(newUser)

                            } catch (error) {
                                setSubmitting(false)
                                if (error.code === "auth/email-already-in-use") {
                                    setErrors({
                                        email: i18n.t("auth:email-exists")
                                    })
                                } else if (error.code === "auth/invalid-email") {
                                    setErrors({
                                        email: i18n.t("auth:email-email")
                                    })
                                } else if (error.code === "auth/operation-not-allowed") {
                                    alert(i18n.t("auth:operation-not-allowed"))
                                } else if (error.code === "auth/weak-password") {
                                    setErrors({
                                        password: i18n.t("auth:week-password")
                                    })
                                }
                                else { console.error(error) }
                            }
                        }}
                    >{
                            ({ values, touched, errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValidating }) => (
                                <View>
                                    <View style={styles.inputContainer}>
                                        <StyledTextInput
                                            placeholder={i18n.t("auth:Username")}
                                            value={values.username}
                                            onChangeText={handleChange("username")}
                                            onBlur={handleBlur("username")}
                                            style={styles.input}
                                            error={touched.username && Boolean(errors.username)}
                                            helperText={touched.username && errors.username}
                                            darken
                                        />
                                        <StyledTextInput
                                            placeholder={i18n.t("auth:Email")}
                                            value={values.email}
                                            onChangeText={handleChange("email")}
                                            onBlur={handleBlur("email")}
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
                                            style={styles.input}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            secureTextEntry
                                            darken
                                        />
                                        <StyledTextInput
                                            placeholder={i18n.t("auth:Confirm Password")}
                                            value={values.confirmPassword}
                                            onChangeText={handleChange("confirmPassword")}
                                            onBlur={handleBlur("confirmPassword")}
                                            style={styles.input}
                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                            secureTextEntry
                                            darken
                                        />
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            mode="text"
                                            onPress={handleLoginPressed}
                                            style={styles.button}
                                            contentStyle={styles.buttonContent}
                                            buttonColor={colors.accent}
                                        >
                                            {i18n.t("auth:Login")}
                                        </Button>
                                        <Button
                                            mode="contained"
                                            onPress={handleSubmit}
                                            style={[styles.button, styles.buttonRight]}
                                            contentStyle={styles.buttonContent}
                                            buttonColor={colors.accent}
                                            disabled={isSubmitting || isValidating}
                                        >
                                            {i18n.t("auth:Sign Up")}
                                        </Button>
                                    </View>
                                </View>)}
                    </Formik>

                </Surface>

            </View>
        </TouchableWithoutFeedback>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    surface: {
        width: "100%",
        padding: 30,
        paddingHorizontal: 40,
        borderRadius: 15,
        elevation: 3
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        paddingLeft: 5,
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
    buttonRight: {
        flex: 4
    }
})