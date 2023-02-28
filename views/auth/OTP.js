import React, { useEffect, useRef, useState } from "react"
import { TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Text } from "react-native"
import Constants from 'expo-constants'
import Background from '../components/Background'
import Icon from "react-native-vector-icons/Ionicons"
import ReactNativePinView from "react-native-pin-view"
import { theme } from '../core/theme'
import Spinner from 'react-native-loading-spinner-overlay'
import { StackActions } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
// import { Countdown } from 'react-native-countdown-text'
import moment from "moment"
// import { Constants } from 'expo'

function Password({ navigation }) {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [showCancelButton, setShowCancelButton] = useState(false)
    const [showRetryOTP, setShowRetryOTP] = useState(true)
    const [enteredPin, setEnteredPin] = useState("")
    const [finishTime, setFinishTime] = useState(moment(new Date()).add(1, 'minutes').unix())
    const [count, setCount] = useState(60);
    const counter = useRef(0);

    const [loading, setLoading] = useState({
        isLoading: false
    })

    useEffect(() => {
        if (enteredPin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.length === 4) {
            // setShowCancelButton(true)
            processTransaction()
        } else {
            setShowCancelButton(true)
        }
        startCountDown()
    }, [enteredPin])

    const processTransaction = () => {
        setLoading({
            isLoading: true,
        })

        console.log("Loading: " + loading.isLoading)
        if (enteredPin.length < 0) {
            Toast.show({
                type: 'error',
                text1: 'Transaction Failed',
                text2: 'Kindly enter pin to proceed 🛑',
                position: 'top'
            })
            setLoading({
                isLoading: false,
            })
        } else if (enteredPin != global.otp) {
            Toast.show({
                type: 'error',
                text1: 'Transaction Failed',
                text2: 'Incorrect Credentials 🛑',
                position: 'top'
            })
            setLoading({
                isLoading: false,
            })
            console.log("OTP: " + enteredPin)
        } else {
            if (global.transactionType == "Loan") {
                verfyLoan()
            } else if (global.transactionType == "Deposit") {
                verfyDeposit()
            } else if (global.transactionType == "Utilities") {
                verfyUtilities()
            } else if (global.transactionType == "Withdraw") {
                verifyWithdrawal(enteredPin)
            }
        }

        pinView.current.clearAll()
    }

    const verifyWithdrawal = () => {

        const transactionRequestOptions = {
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
                Acccount: global.withdrawAccountNumber,
                Amount: global.transaction_amount,
                PhoneNo: global.account_phone
            })
        }

        fetch("https://testasili.devopsfoundry.cloud:8050/withdrawal", transactionRequestOptions)
            .then((response) => response.json())
            .then(response => {
                console.log(response, "\n", transactionRequestOptions)
                if (response[0].Is_Successful) {
                    Toast.show({
                        type: 'success',
                        text1: 'Transaction Successful',
                        text2: 'KES ' + global.transaction_amount + ' Withdrawn 😊',
                        position: 'top'
                    })

                    navigation.navigate("Home")

                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Transaction Failed',
                        text2: 'Incorrect Credentials 🛑',
                        position: 'top'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                })
            }).finally(() => {
                setLoading({
                    isLoading: false,
                })
                console.log("Loading: " + loading.isLoading)
            })
    }

    const verfyUtilities = () => {

        const transactionRequestOptions = {
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
                UtilityType: global.UtilitiesType,
                SourcAcccount: global.transaction_account,
                Amount: global.transaction_amount,
                PhoneNo: global.account_phone
            })
        }

        fetch("https://testasili.devopsfoundry.cloud:8050/PayUtility", transactionRequestOptions)
            .then((response) => response.json())
            .then(response => {
                console.log(response, "\n", transactionRequestOptions)
                if (response[0].Is_Successful) {
                    Toast.show({
                        type: 'success',
                        text1: 'Transaction Successful',
                        text2: 'KES ' + global.transaction_amount + ' Paid 😊',
                        position: 'top'
                    })

                    navigation.navigate("Home")

                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Transaction Failed',
                        text2: 'Incorrect Credentials 🛑',
                        position: 'top'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                })
            }).finally(() => {
                setLoading({
                    isLoading: false,
                })
                console.log("Loading: " + loading.isLoading)
            })
    }

    const verfyDeposit = () => {

        const transactionRequestOptions = {
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
                IsMpesa: true,
                SourcAcccount: global.depositAccountNumber,
                DestAcccount: global.transaction_account,
                Amount: global.transaction_amount,
                PhoneNo: global.account_phone
            })
        }

        fetch("https://testasili.devopsfoundry.cloud:8050/Deposit", transactionRequestOptions)
            .then((response) => response.json())
            .then(response => {
                console.log(response, "\n", transactionRequestOptions)
                Toast.show({
                    type: 'success',
                    text1: 'Transaction Successful',
                    text2: 'KES ' + global.transaction_amount + ' Deposited 😊',
                    position: 'top'
                })

                navigation.navigate("Home")
            })
            .catch(err => {
                console.log(err)
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                })
            }).finally(() => {
                setLoading({
                    isLoading: false,
                })
                console.log("Loading: " + loading.isLoading)
            })
    }

    const verfyLoan = () => {

        const loanRequestOptions = {
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
                DeviceID: "",
                AccountNo: global.LoanAccountNumber,
                Amount: global.transaction_amount,
                PhoneNo: global.account_phone
            })
        }

        fetch("https://testasili.devopsfoundry.cloud:8050/withdrawal", loanRequestOptions)
            .then((response) => response.json())
            .then(response => {
                console.log(response, "\n", loanRequestOptions)
                if (response[0].Is_Successful) {
                    Toast.show({
                        type: 'success',
                        text1: 'Loan Request Successful',
                        text2: 'KES ' + global.transaction_amount + ' Loan Being Processed. A notification will be sent out once the application has been approved 😊',
                        position: 'top'
                    })

                    navigation.navigate("Home")

                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Loan Request Failed',
                        text2: 'Incorrect Credentials 🛑',
                        position: 'top'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                })
            }).finally(() => {
                setLoading({
                    isLoading: false,
                })
                console.log("Loading: " + loading.isLoading)
            })
    }

    const startCount = () => {
        const interval = setInterval(() => {
            console.log(count);
            setCount((prevCounter) => prevCounter + 1);
        }, 1000);

        setTimeout(() => {
            return () => {
                clearInterval(interval)
                setShowRetryOTP(!showRetryOTP)
            };
        }, 60000);

    }

    const startCountDown = () => {
        // console.log('Logs every minute');
        const interval = setInterval(() => {
            setCount((prevCounter) => prevCounter - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval)
            resetCountDown()
        }, 60000);
    }

    const resetCountDown = () => {
        // setFinishTime(0)
        setCount(60);
        console.log("Reset: " + finishTime)
        setShowRetryOTP(false)
    }

    const resendOTP = () => {
        const otpRequestOptions = {
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
                PhoneNo: global.account_phone,
                DeviceNo: ""
            })
        }

        fetch("https://testasili.devopsfoundry.cloud:8050/GetOTP", otpRequestOptions)
            .then((response) => response.json())
            .then(response => {
                console.log(response, "\n", otpRequestOptions)
                if (response[0].Is_Successful) {
                    global.otp = response[0].otp
                    console.log("Input OTP: " + global.otp)
                    startCountDown()
                    setShowRetryOTP(true)
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Process Failed Not Sent',
                        text2: 'Incorrect Credentials 🛑',
                        position: 'top'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                })
            }).finally(() => {
                setLoading({
                    isLoading: false,
                })
                console.log("Loading: " + loading.isLoading)
            })
    }

    return (
        <Background>
            <Spinner
                visible={loading.isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <StatusBar barStyle="dark-content" />
            <SafeAreaView
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)", justifyContent: 'center', alignItems: "center", width: "100%" }}>
                <Text
                    style={{
                        paddingTop: 24,
                        paddingBottom: 10,
                        color: theme.colors.primary,
                        fontSize: 28,
                        textAlign: 'center',
                    }}>
                    Enter One Time Pin
                </Text>
                <Text
                    style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        color: theme.colors.primary,
                        fontSize: 18,
                        textAlign: 'center',
                    }}>
                    Kindly input the one time pin sent to your registered number
                </Text>
                {showRetryOTP ? <Text
                    style={{
                        paddingTop: 10,
                        paddingBottom: 58,
                        color: theme.colors.secondary,
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>RESEND OTP: {count}
                    {/* <Countdown finishTime={finishTime} textStyle={{
                        paddingTop: 10,
                    }} format={' s'} onFinish={resetCountDown} /> */}
                </Text> :
                    <TouchableOpacity style={styles.back}
                        onPress={resendOTP}>
                        <Text
                            style={{
                                paddingTop: 10,
                                paddingBottom: 58,
                                color: theme.colors.primary,
                                fontSize: 18,
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}>
                            CLICK TO RESEND OTP
                        </Text>
                    </TouchableOpacity>
                }
                <ReactNativePinView
                    inputSize={30}
                    ref={pinView}
                    pinLength={4}
                    buttonSize={70}
                    onValueChange={value => setEnteredPin(value)}
                    buttonAreaStyle={{
                        marginTop: 24,
                    }}
                    inputAreaStyle={{
                        marginBottom: 34,
                    }}
                    inputViewEmptyStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: theme.colors.primary,
                    }}
                    inputViewFilledStyle={{
                        backgroundColor: theme.colors.primary,
                    }}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: theme.colors.primary,
                    }}
                    buttonTextStyle={{
                        color: theme.colors.primary,
                    }}
                    onButtonPress={key => {
                        if (key === "custom_left") {
                            Toast.show({
                                type: 'info',
                                text1: 'Cancelled',
                                text2: 'Transaction Cancelled🛑',
                                position: 'top'
                            })
                            // navigation.navigate("Home")
                            navigation.dispatch(StackActions.popToTop())
                        }
                        if (key === "custom_right") {
                            pinView.current.clear()
                        }
                        if (key === "three") {
                        }
                    }}
                    customRightButton={showRemoveButton ? <Icon name={"ios-backspace"} size={46} color={theme.colors.primary} /> : undefined}
                    customLeftButton={showCancelButton ? <Icon name={"ios-close"} size={46} color={theme.colors.primary} /> : undefined}
                />
            </SafeAreaView>
        </Background>
    )
}

const styles = StyleSheet.create({
    confirmationText: {
        color: "white",
        fontSize: 22,
        fontWeight: "700"
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})

export default Password
