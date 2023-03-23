import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import AnimateLoadingButton from "react-native-animate-loading-button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons"
import * as LocalAuthentication from 'expo-local-authentication';
// import PhoneInput from 'react-native-smooth-phone-input';
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect, useRef } from "react";
import Background from '../components/Background';
import Toast from 'react-native-toast-message';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { phoneValidator } from '../helpers/phoneValidator';
import { passwordValidator } from '../helpers/passwordValidator';

const Login = ({ navigation }) => {
    const [phone, setPhone] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [savedLogins, setSavedLogins] = useState(false)
    const [state, setState] = useState({
        compatible: false,
        fingerprints: false,
        result: '',
        error: '',
    })


    const getData = async (userPhone) => {
        try {
            const value = await AsyncStorage.getItem('user_phone')
            if (value !== null) {
                setPhone({ value: value, error: '' })
                console.log(value);
            } else {
                console.log("Error: Empty Value");
            }
        } catch (e) {
            console.log("Error: " + e);
        }
    }

    useEffect(() => {
        setState({
            error: ''
        });

        getData();
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        try {
            const credentials = JSON.parse(await SecureStore.getItemAsync('Credentials'));

            console.log("Console Credentials:" + credentials);

            if (credentials != null) {
                setSavedLogins(true);
                console.log("Console Status:" + savedLogins);
                if (state.error != "user_cancel") {
                    checkDeviceForHardware(credentials);
                }
            } else {
                console.log('No saved credentials');
                console.log(savedLogins);
                setSavedLogins(false);
            }
        } catch (error) {
            console.log("Check status error: " + error);
        }
    }

    const getBiometricsFunction = async () => {
        const credentials = JSON.parse(await SecureStore.getItemAsync('Credentials'));

        checkDeviceForHardware(credentials);

    }

    const checkDeviceForHardware = async (credentials) => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        setState({ compatible });

        console.log("Checking Device:" + compatible);

        if (compatible) {
            checkForFingerprints(credentials);
        } else {
            console.log("Device is not Compatible");
        }
    };

    const checkForFingerprints = async (credentials) => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        setState({ fingerprints });

        console.log("Fingerprints is enrolled:" + fingerprints);

        if (fingerprints) {
            scanFingerprint(credentials);
            // showAndroidAlert(credentials);
        } else {
            console.log("No fingerprints enrolled");
        }
    };

    const scanFingerprint = async (credentials) => {
        let result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login with Biometrics",
            cancelLabel: "Cancel",
            disableDeviceFallback: true,
        });
        console.log('Scan Result:', result);
        console.log('Scan Result Error:', result['error']);
        setState({
            result: JSON.stringify(result),
            error: result['error']
        });

        if (result["success"] == true) {
            console.log(credentials);
            loginApi(credentials['username'], credentials['password'], true);
        }
    };

    const showAndroidAlert = (credentials) => {
        Alert.alert(
            'Fingerprint Scan',
            'Place your finger over the touch sensor and press scan.',
            [
                {
                    text: 'Scan',
                    onPress: () => {
                        scanFingerprint(credentials);
                    },
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel',
                },
            ]
        );
    };

    const showBiometricOptionAlert = () => {

        checkUserStatus();

        if (savedLogins == true) {
            // checkUserStatus();
            proceedLogin();
        } else {
            Alert.alert(
                'Biometric Options',
                'Save password and use biometrics on next login?',
                [
                    {
                        text: 'Yes',
                        onPress: () => {
                            promptForBiometrics();
                        },
                    },
                    {
                        text: 'No',
                        onPress: () => {
                            proceedLogin();
                            console.log('Cancel')
                        },
                        style: 'cancel',
                    },
                ]
            );
        }
    };

    const promptForBiometrics = async () => {
        const login_username = phone.value;
        const login_password = password.value;

        const login = {
            username: login_username,
            password: login_password
        }

        try {
            await SecureStore.setItemAsync('Credentials', JSON.stringify(login));
        } catch (err) {
            console.log("Prompt Biometrics Error: " + err);
            Toast.show({
                type: 'error',
                text1: 'Biometrics Prompt Error',
                text2: 'Kindly try again later🛑',
                position: 'top'
            });
        };

        // await Keychain.setGenericPassword(login_username, login_password);

        loginApi(login_username, login_password, true);

    }

    const proceedLogin = () => {
        utilitiesApi();
    }

    const onLoginPressed = () => {

        const phoneError = phone.current?.isValidNumber(phone.value);
        const passwordError = passwordValidator(password.value)
        if (phoneError || passwordError) {
            setPhone({ ...phone, error: phoneError })
            setPassword({ ...password, error: passwordError })
            return
        }

        console.log(phone.value, password.value);
        loginApi(phone.value, password.value);
    }

    const loginApi = (phone_input, password_input, is_logged_in = false) => {

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
                phoneNo: phone_input.replace(/ /g, ''),
                pinNo: password_input,
                DeviceNo: phone_input
            })
        }

        fetch("https://testasili.devopsfoundry.cloud:8050/login", loginRequestOptions)
            .then((response) => response.json())
            .then(response => {
                console.log(response, "\n", loginRequestOptions);
                if (response[0].Is_Successfull) {
                    global.member_details = response[0].MemberDetails[0];
                    global.account_pin = password_input;
                    global.account_phone = phone_input;
                    storeData(phone_input);

                    if (is_logged_in == true) {
                        proceedLogin();
                    } else {
                        showBiometricOptionAlert();
                    }
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed',
                        text2: 'Incorrect Credentials 🛑',
                        position: 'top'
                    });

                    console.log('Failed');

                    loginButton.showLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
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

        fetch("https://testasili.devopsfoundry.cloud:8050/GetUtilityType", utilitiesRequestOptions)
            .then((utilities_response) => utilities_response.json())
            .then(utilities_response => {
                // console.log("Before Error: ", utilities_response[0].Is_Successful);

                let utilities_arr = {};

                if (utilities_response[0].Is_Successful) {
                    api_utilities_details = utilities_response[0].utilties;

                    console.log(api_utilities_details);
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
                console.log("Utilities Error: ", error);
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

        fetch("https://testasili.devopsfoundry.cloud:8050/GetDebitableAccounts", debitableAccountRequest)
            .then((debitable_acc_response) => debitable_acc_response.json())
            .then(debitable_acc_response => {
                console.log("Before Error: ", debitable_acc_response, "\n", debitableAccountRequest);

                if (debitable_acc_response[0].Is_Successful) {
                    const debitable_accounts = debitable_acc_response[0].debitables;

                    console.log(debitable_accounts);
                    global.debitable_accounts = debitable_accounts;
                    loanEligibilityAccountsApi();
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
                console.log("Debitable Accounts Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            });

    }

    const loanEligibilityAccountsApi = () => {
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

        fetch("https://testasili.devopsfoundry.cloud:8050/LoanEligibilty", loanAccountRequest)
            .then((loan_acc_response) => loan_acc_response.json())
            .then(loan_acc_response => {
                // console.log("Before Error: ", loan_acc_response);

                if (loan_acc_response[0].Is_Successful) {
                    const loan_accounts = loan_acc_response[0].EAmount;
                    loan_accounts.forEach(loan => {
                        console.log("Before Error: ", loan.LoanCode);
                        if (loan.LoanCode == "Chap Chap") {
                            global.ChapChapLoanAccountNumber = loan.AccountNo;
                            global.ChapChaploanAccountName = loan.LoanCode;
                            global.ChapChaploanLoanLimit = loan.MaxAmount;
                            if (parseInt(loan.MaxAmount) > 0) {
                                global.ChapChaploanLoanLimitColor = 'red'
                            } else {
                                global.ChapChaploanLoanLimitColor = 'green'
                            }
                        } else {
                            console.log("Other Loan Type");
                        }
                    });

                    const new_loan_account = loan_accounts.filter(item => item.LoanCode == "Chap Chap")

                    console.log(new_loan_account);
                    global.loan_accounts = new_loan_account;
                    creditablesApi();
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get loan accounts at this point",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                console.log("Debitable Accounts Error: ", error);
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

        fetch("https://testasili.devopsfoundry.cloud:8050/GetCreditableAccounts", creditableAccountRequest)
            .then((creditable_acc_response) => creditable_acc_response.json())
            .then(creditable_acc_response => {
                // console.log("Before Error: ", creditable_acc_response);

                if (creditable_acc_response[0].Is_Successful) {
                    const creditable_accounts = creditable_acc_response[0].debitables;

                    creditable_accounts.forEach(account => {
                        if (account.ProductName == "ORDINARY ACCOUNTS") {
                            global.ordinaryAccNo = account.AccountNo;
                            global.ordinaryAccName = account.ProductName;
                        }

                    });

                    console.log(creditable_accounts);
                    global.creditable_accounts = creditable_accounts;
                    // navigation.navigate("Main")
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get creditable account at this point",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                console.log("Creditable Accounts Error: ", error);
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
                {/* <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate('ResetPasswordScreen')}
                        onPress={getBiometricsFunction}
                    >
                        <Text style={styles.forgot}>Use biometrics?</Text>
                    </TouchableOpacity>
                </View> */}

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

            </KeyboardAvoidingView>
            {savedLogins == true ? <TouchableOpacity style={styles.back}
                onPress={getBiometricsFunction}>
                <Icon name={"ios-finger-print"} size={50} color={theme.colors.primary} />
            </TouchableOpacity> : ''}
        </Background >
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
        color: theme.colors.primary,
        fontSize: 11
    },
    phoneNumberView: {
        width: '100%',
        height: 55,
        marginTop: 10,
        backgroundColor: 'white'
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
    },
    back: {
        marginTop: 40,
        marginLeft: 5,
        zIndex: 10,
        padding: 20,
        position: 'absolute',
        bottom: 0,
    }
});

export default Login;