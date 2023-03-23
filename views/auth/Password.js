import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native"
import Constants from 'expo-constants';
import Background from '../components/Background';
import Icon from "react-native-vector-icons/Ionicons"
import ReactNativePinView from "react-native-pin-view"
import { theme } from '../core/theme'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
// import { Constants } from 'expo';

function Password({ navigation }) {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [showCancelButton, setShowCancelButton] = useState(false)
    const [savedLogins, setSavedLogins] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [counter, setCounter] = useState(0)
    const [loading, setLoading] = useState({
        isLoading: false
    });
    const [state, setState] = useState({
        compatible: false,
        fingerprints: false,
        result: '',
        error: '',
    })


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

        checkUserStatus();

    }, [enteredPin]);

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
            promptMessage: "Authenticate with Biometrics",
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
            // loginApi(credentials['username'], credentials['password'], true);
            verifyOTP(credentials['password'])

        }
    };

    const getPassword = () => {
        setLoading({
            isLoading: true,
        });

        setCounter(counter + 1);

        console.log("Loading: " + loading.isLoading);

        if (counter < 2) {
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
        } else {
            Toast.show({
                type: 'error',
                text1: 'Authentication Failed',
                text2: 'Wrong pin entered too many times 🛑',
                position: 'top'
            });
            setLoading({
                isLoading: false,
            });
            navigation.navigate("Home");
        }

        pinView.current.clearAll()
    }

    const verifyOTP = () => {

        setLoading({
            isLoading: true,
        })

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
                setLoading({
                    isLoading: false,
                })

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
        <Background>
            <Spinner
                visible={loading.isLoading}
                textContent={'Thank you for being patient. Processing pin.....'}
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
                            // alert("You just click to 3")
                        }
                    }}
                    customRightButton={showRemoveButton ? <Icon name={"ios-backspace"} size={46} color={theme.colors.primary} /> : undefined}
                    customLeftButton={showCancelButton ? <Icon name={"ios-close"} size={46} color={theme.colors.primary} /> : undefined}
                />
            </SafeAreaView>
            {savedLogins ? <TouchableOpacity style={styles.back}
                onPress={getBiometricsFunction}>
                <Icon name={"ios-finger-print"} size={50} color={theme.colors.primary} />
            </TouchableOpacity> : ''}
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
});

export default Password;

