import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { phoneValidator } from '../helpers/phoneValidator'
import { passwordValidator } from '../helpers/passwordValidator'

const Login = ({ navigation }) => {
    const [phone, setPhone] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onLoginPressed = () => {
        const phoneError = phoneValidator(phone.value)
        const passwordError = passwordValidator(password.value)
        if (phoneError || passwordError) {
            setPhone({ ...phone, error: phoneError })
            setPassword({ ...password, error: passwordError })
            return
        }
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Dashboard' }],
        // })
        loginApi();
    }

    const loginApi = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                key: {
                    Api_Key: global.apiKey,
                    Token: global.token
                },
                phoneNo: phone.value,
                pinNo: password.value,
                DeviceNo: "string"
            })
        }

        fetch("http://54.225.69.7:8050/login", requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response, requestOptions);
                navigation.navigate("Home");
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Background>
            <Logo />
            <Header>Welcome back.</Header>
            <KeyboardAvoidingView style={styles.container} >
                <TextInput
                    label="Phone"
                    returnKeyType="next"
                    value={phone.value}
                    onChangeText={(text) => setPhone({ value: text, error: '' })}
                    error={!!phone.error}
                    errorText={phone.error}
                    autoCapitalize="none"
                    autoCompleteType="tel"
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ResetPasswordScreen')}
                    >
                        <Text style={styles.forgot}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <Button mode="contained" style={styles.loginBtn} onPress={onLoginPressed}>
                    Login
                </Button>
            </KeyboardAvoidingView>
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        marginBottom: 40
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#3e6cce",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#dfe7fa",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "black"
    },
    forgot: {
        color: "black",
        fontSize: 11
    },
    loginBtn: {
        backgroundColor: "#348bd3",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});

export default Login;