import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, SafeAreaView, StatusBar, Text, View } from "react-native"
import Constants from 'expo-constants';
import PinBackground from '../components/PinBackground';
import Icon from "react-native-vector-icons/Ionicons"
import ReactNativePinView from "react-native-pin-view"
import { theme } from '../core/theme'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
// import { Constants } from 'expo';

function Password({ navigation }) {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [showCancelButton, setShowCancelButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [loading, setLoading] = useState({
        isLoading: false
    });

    useEffect(() => {
        if (enteredPin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.length === 4) {
            // setShowCancelButton(true)
            getPassword()
        } else {
            setShowCancelButton(true)
        }
    }, [enteredPin]);

    const getPassword = () => {
        setLoading({
            isLoading: true,
        });

        console.log("Loading: " + loading.isLoading);
        if (enteredPin.length < 0) {
            Toast.show({
                type: 'error',
                text1: 'Transaction Failed',
                text2: 'Kindly enter pin to proceed 🛑',
                position: 'top'
            });
            setLoading({
                isLoading: false,
            });
        } else if (enteredPin != global.account_pin) {
            Toast.show({
                type: 'error',
                text1: 'Transaction Failed',
                text2: 'Incorrect Credentials 🛑',
                position: 'top'
            });
            setLoading({
                isLoading: false,
            });
            console.log("Loading: " + global.account_pin);
        } else {
            verifyOTP(enteredPin)

        }

        pinView.current.clearAll()
    }

    const verifyOTP = () => {

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
                Acccount: global.withdrawAccountNumber,
                PhoneNo: global.account_phone
            })
        }

        fetch("https://testasili.devopsfoundry.cloud:8050/GetOTP", otpRequestOptions)
            .then((response) => response.json())
            .then(response => {
                console.log(response, "\n", otpRequestOptions);
                if (response[0].Is_Successful) {
                    global.otp = response[0].otp;
                    console.log("Input OTP: " + global.otp);
                    navigation.navigate("OTP");
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Process Failed Not Sent',
                        text2: 'Incorrect Credentials 🛑',
                        position: 'top'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                });
            }).finally(() => {
                setLoading({
                    isLoading: false,
                });
                console.log("Loading: " + loading.isLoading);
            });
    }

    return (
        <PinBackground>
            <Spinner
                visible={loading.isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <StatusBar barStyle="dark-content" />
            <SafeAreaView
                style={{
                    flex: 1, justifyContent: 'center', padding: 20,
                    backgroundColor: "rgba(255, 255, 255, 0.5)", alignItems: "center", width: "100%"
                }}>
                <View style={{
                    padding: 20,
                    maxWidth: 340,
                }}>
                    <Text
                        style={{
                            paddingTop: 24,
                            paddingBottom: 10,
                            color: theme.colors.primary,
                            fontSize: 28,
                            textAlign: 'center',
                        }}>
                        Enter Pin
                    </Text>
                    <Text
                        style={{
                            paddingTop: 10,
                            paddingBottom: 58,
                            color: theme.colors.primary,
                            fontSize: 18,
                            textAlign: 'center',
                        }}>
                        Kindly input your mobile banking pin
                    </Text>
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
                            if (key === "custom_right") {
                                pinView.current.clear()
                            }
                            if (key === "custom_left") {
                                Toast.show({
                                    type: 'info',
                                    text1: 'Cancelled',
                                    text2: 'Transaction Cancelled🛑',
                                    position: 'top'
                                });
                                navigation.navigate("Home")
                            }
                            if (key === "three") {
                                alert("You just click to 3")
                            }
                        }}
                        customRightButton={showRemoveButton ? <Icon name={"ios-backspace"} size={46} color={theme.colors.primary} /> : undefined}
                        customLeftButton={showCancelButton ? <Icon name={"ios-close"} size={46} color={theme.colors.primary} /> : undefined}
                    />
                </View>
            </SafeAreaView>
        </PinBackground>
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
});

export default Password;

