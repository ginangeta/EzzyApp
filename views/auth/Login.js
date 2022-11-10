import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import Background from '../components/Background'
import Toast from 'react-native-toast-message';
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import AnimateLoadingButton from 'react-native-animate-loading-button';
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
                phoneNo: phone.value,
                pinNo: password.value,
                DeviceNo: phone.value
            })
        }

        fetch("https://testasili.devopsfoundry.cloud:8050/login", loginRequestOptions)
            .then((response) => response.json())
            .then(response => {
                console.log(response, "\n", loginRequestOptions);
                if (response[0].Is_Successfull) {
                    global.member_details = response[0].MemberDetails[0];
                    global.account_pin = password.value;

                    balanceApi();

                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed',
                        text2: 'Incorrect Credentials 🛑',
                        position: 'bottom'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'bottom'
                });
            });
    }

    const balanceApi = () => {

        const balanceRequestOptions = {
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
                phoneNo: phone.value,
            })
        }


        const snakeCase = (string) => {
            const toSnakeCase = (str = "") => {
                const strArr = str.split(" ");
                const snakeArr = strArr.reduce((acc, val) => {
                    return acc.concat(val.toLowerCase());
                }, []);
                return snakeArr.join("_");
            };
            const newText = toSnakeCase(string);
            return newText
        };


        fetch("https://testasili.devopsfoundry.cloud:8050/BalanceEnquiry", balanceRequestOptions)
            .then((balance_response) => balance_response.json())
            .then(balance_response => {
                // console.log("Before Error: ", balance_response[0].Is_Successful);

                let balance_arr = {};

                if (balance_response[0].Is_Successful) {
                    api_balance_details = balance_response[0].Account;
                    api_balance_details.forEach(api_balance_detail => {
                        // console.log(api_balance_detail, "\n")
                        balance_acc_name = api_balance_detail.AccountType.trim();
                        balance_acc_amount = api_balance_detail.Amount;

                        balance_arr[snakeCase(balance_acc_name)] = balance_acc_amount;

                    });
                    console.log(balance_arr);
                    global.account_balance = balance_arr;
                    global.account_phone = phone.value;
                    // navigation.navigate("Home");

                    debitablesApi();

                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Balance Inquiry Failed",
                        position: 'bottom'
                    });
                }
            })
            .catch((error) => {
                console.log("Balance Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'bottom'
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
                // console.log("Before Error: ", debitable_acc_response);

                if (debitable_acc_response[0].Is_Successful) {
                    const debitable_accounts = debitable_acc_response[0].debitables;

                    console.log(debitable_accounts);
                    global.debitable_accounts = debitable_accounts;
                    loanAccountsApi();
                    // navigation.navigate("Home")
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get debitable account at this point",
                        position: 'bottom'
                    });
                }
            })
            .catch((error) => {
                console.log("Debitable Accounts Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'bottom'
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

        fetch("https://testasili.devopsfoundry.cloud:8050/LoanEligibilty", loanAccountRequest)
            .then((loan_acc_response) => loan_acc_response.json())
            .then(loan_acc_response => {
                // console.log("Before Error: ", loan_acc_response);

                if (loan_acc_response[0].Is_Successful) {
                    const loan_accounts = loan_acc_response[0].EAmount;

                    console.log(loan_accounts);
                    global.loan_accounts = loan_accounts;
                    creditablesApi();
                    // navigation.navigate("Home")
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get loan accounts at this point",
                        position: 'bottom'
                    });
                }
            })
            .catch((error) => {
                console.log("Debitable Accounts Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'bottom'
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

                    console.log(creditable_accounts);
                    global.creditable_accounts = creditable_accounts;
                    navigation.navigate("Home")
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get creditable account at this point",
                        position: 'bottom'
                    });
                }
            })
            .catch((error) => {
                console.log("Creditable Accounts Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'bottom'
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