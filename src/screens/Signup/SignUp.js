import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { useTheme, Surface, Button } from 'react-native-paper'
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

                        onSubmit={(values, { setErrors, setSubmitting }) => {
                            const { username, email, password } = values

                            checkDuplicateUsername(username)
                                .then(isDuplicate => {
                                    if (isDuplicate) {
                                        setErrors({
                                            username: i18n.t("auth:username-exists")
                                        })
                                        setSubmitting(false)
                                        return
                                    }

                                    const newUser = new User(username, email, password)
                                    signUpUser(newUser)
                                })
                                .catch(error => alert(error.message))
                        }}
                    >{
                            ({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => (
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
                                        />
                                        <StyledTextInput
                                            placeholder={i18n.t("auth:Email")}
                                            value={values.email}
                                            onChangeText={handleChange("email")}
                                            onBlur={handleBlur("email")}
                                            style={styles.input}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
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
                                            {i18n.t("auth:Login")}
                                        </Button>
                                        <Button
                                            mode="contained"
                                            onPress={handleSubmit}
                                            style={[styles.button, styles.buttonRight]}
                                            contentStyle={styles.buttonContent}
                                            color={colors.accent}
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