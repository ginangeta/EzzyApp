import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication'
import React, { useState, useEffect } from "react";
import Background from '../components/Background';
import Toast from 'react-native-toast-message';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import AnimateLoadingButton from "react-native-animate-loading-button";
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Constants from 'expo-constants';
import { phoneValidator } from '../helpers/phoneValidator';
import { passwordValidator } from '../helpers/passwordValidator';

const Login = ({ navigation }) => {
    const [phone, setPhone] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' })
    const [state, setState] = useState({
        compatible: false,
        fingerprints: false,
        result: '',
    })

    const getData = async (userPhone) => {
        try {
            const value = await AsyncStorage.getItem('user_phone')
            if (value !== null) {
                setPhone({ value: value, error: '' })
                // console.log(value);
            } else {
                // console.log("Error: Empty Value");
            }
        } catch (e) {
            // console.log("Error: " + e);
        }
    }

    useEffect(() => {
        getData();
        checkDeviceForHardware();
        checkForFingerprints();
    }, []);

    const checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        setState({ compatible });
    };

    const checkForFingerprints = async () => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        setState({ fingerprints });
    };

    const scanFingerprint = async () => {
        let result = await LocalAuthentication.authenticateAsync(
            'Scan your finger.'
        );
        // console.log('Scan Result:', result);
        setState({
            result: JSON.stringify(result),
        });
    };

    const showAndroidAlert = () => {
        Alert.alert(
            'Fingerprint Scan',
            'Place your finger over the touch sensor and press scan.',
            [
                {
                    text: 'Scan',
                    onPress: () => {
                        scanFingerprint();
                    },
                },
                {
                    text: 'Cancel',
                    onPress: () => // console.log('Cancel'),
                    style: 'cancel',
                },
            ]
        );
    };

    const onLoginPressed = () => {

        const phoneError = phoneValidator(phone.value)
        const passwordError = passwordValidator(password.value)
        if (phoneError || passwordError) {
            setPhone({ ...phone, error: phoneError })
            setPassword({ ...password, error: passwordError })
            return
        }

        loginApi();
    }

    const loginApi = () => {

        loginButton.showLoading(true);

        const loginRequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                key: {
                    Api_Key: global.apiKey,
                    Token: global.token
                },
                phoneNo: phone.value.replace(/ /g, ''),
                pinNo: password.value,
                DeviceNo: phone.value
            })
        }

        fetch("https://asili.devopsfoundry.cloud:7074/" + "login", loginRequestOptions)
            .then((response) => response.json())
            .then(response => {
                // console.log(response, "\n", loginRequestOptions);
                if (response[0].Is_Successfull) {
                    global.member_details = response[0].MemberDetails[0];
                    global.account_pin = password.value;
                    global.account_phone = phone.value;
                    storeData(phone.value);
                    utilitiesApi();

                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed',
                        text2: 'Incorrect Credentials 🛑',
                        position: 'top'
                    });
                }
            })
            .catch(err => {
                // console.log(err);
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                });
            });
    }

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('user_phone', value)
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Saving Phone Number Failed',
                text2: 'System Issue 🏗️',
                position: 'top'
            });
        }
    }

    const utilitiesApi = () => {

        const utilitiesRequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                key: {
                    Api_Key: global.apiKey,
                    Token: global.token
                },
            })
        }

        fetch("https://asili.devopsfoundry.cloud:7074/" + "GetUtilityType", utilitiesRequestOptions)
            .then((utilities_response) => utilities_response.json())
            .then(utilities_response => {
                // // console.log("Before Error: ", utilities_response[0].Is_Successful);

                let utilities_arr = {};

                if (utilities_response[0].Is_Successful) {
                    api_utilities_details = utilities_response[0].utilties;

                    // console.log(api_utilities_details);
                    global.account_utilities = api_utilities_details;
                    // navigation.navigate("Home");

                    debitablesApi();

                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Utilities Inquiry Failed",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                // console.log("Utilities Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            });
    }

    const debitablesApi = () => {
        const debitableAccountRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                key: {
                    Api_Key: global.apiKey,
                    Token: global.token
                },
                phoneNo: global.account_phone,
            })
        }

        fetch("https://asili.devopsfoundry.cloud:7074/" + "GetDebitableAccounts", debitableAccountRequest)
            .then((debitable_acc_response) => debitable_acc_response.json())
            .then(debitable_acc_response => {
                // // console.log("Before Error: ", debitable_acc_response, "\n", debitableAccountRequest);

                if (debitable_acc_response[0].Is_Successful) {
                    const debitable_accounts = debitable_acc_response[0].debitables;

                    // console.log(debitable_accounts);
                    global.debitable_accounts = debitable_accounts;
                    loanAccountsApi();
                    // navigation.navigate("Home")
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get debitable account at this point",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                // console.log("Debitable Accounts Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            });

    }

    const loanAccountsApi = () => {
        const loanAccountRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                key: {
                    Api_Key: global.apiKey,
                    Token: global.token
                },
                phoneNo: global.account_phone,
            })
        }

        fetch("https://asili.devopsfoundry.cloud:7074/" + "LoanEligibilty", loanAccountRequest)
            .then((loan_acc_response) => loan_acc_response.json())
            .then(loan_acc_response => {
                // // console.log("Before Error: ", loan_acc_response);

                if (loan_acc_response[0].Is_Successful) {
                    const loan_accounts = loan_acc_response[0].EAmount;
                    loan_accounts.forEach(loan => {
                        if (loan.LoanCode == "Chap Chap") {
                            global.ChapChapLoanAccountNumber = loan.AccountNo;
                            global.ChapChaploanAccountName = loan.LoanCode;
                        } else {
                            // console.log("Other Loan Type");
                        }
                    });

                    const new_loan_account = loan_accounts.filter(item => item.LoanCode != "Chap Chap")

                    // console.log(new_loan_account);
                    global.loan_accounts = new_loan_account;
                    creditablesApi();
                    // navigation.navigate("Home")
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get loan accounts at this point",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                // console.log("Debitable Accounts Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            });

    }

    const creditablesApi = () => {
        const creditableAccountRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                key: {
                    Api_Key: global.apiKey,
                    Token: global.token
                },
                phoneNo: global.account_phone,
            })
        }

        fetch("https://asili.devopsfoundry.cloud:7074/" + "GetCreditableAccounts", creditableAccountRequest)
            .then((creditable_acc_response) => creditable_acc_response.json())
            .then(creditable_acc_response => {
                // // console.log("Before Error: ", creditable_acc_response);

                if (creditable_acc_response[0].Is_Successful) {
                    const creditable_accounts = creditable_acc_response[0].debitables;

                    // console.log(creditable_accounts);
                    global.creditable_accounts = creditable_accounts;
                    navigation.navigate("Main")
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get creditable account at this point",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                // console.log("Creditable Accounts Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            })
            .finally(() => loginButton.showLoading(false));

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
                    keyboardType="number-pad"
                    secureTextEntry
                />
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ResetPasswordScreen')}
                    >
                        <Text style={styles.forgot}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 20 }} />

                <AnimateLoadingButton
                    ref={c => (this.loginButton = c)}
                    width={300}
                    height={50}
                    title="LOGIN"
                    backgroundColor="#348bd3"
                    borderRadius={4}
                    onPress={onLoginPressed}
                />


                <View style={{ marginTop: 10 }}>
                    {state.fingerprints === true ? <AnimateLoadingButton
                        ref={c => (this.loginButton = c)}
                        width={300}
                        height={50}
                        title="Biometric Login"
                        backgroundColor="#a676de"
                        borderRadius={4}
                        onPress={
                            Platform.OS === 'android'
                                ? showAndroidAlert
                                : scanFingerprint
                        }
                    /> : ""}
                </View>


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