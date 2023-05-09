import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, SafeAreaView, StatusBar, Text, TouchableOpacity, View, Modal, Pressable } from "react-native"
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
    const [modalVisible, setModalVisible] = useState(false);
    const [savedLogins, setSavedLogins] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [transactionType, setTransactionType] = useState("")
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
        setModalVisible(true);

        if (enteredPin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.length === 4) {
            getPassword()
        } else {
            setShowCancelButton(true)
        }

        setTransactionType(global.transactionType);

    }, [enteredPin]);

    const checkUserStatus = async () => {
        try {
            const credentials = JSON.parse(await SecureStore.getItemAsync('Credentials'));

            // console.log("Console Credentials:" + credentials);

            if (credentials != null) {
                setSavedLogins(true);
                // console.log("Console Status:" + savedLogins);
                if (state.error != "user_cancel") {
                    checkDeviceForHardware(credentials);
                }
            } else {
                // console.log('No saved credentials');
            }
        } catch (error) {
            // console.log("Check status error: " + error);
        }
    }

    const getBiometricsFunction = async () => {
        const credentials = JSON.parse(await SecureStore.getItemAsync('Credentials'));

        checkDeviceForHardware(credentials);

    }

    const checkDeviceForHardware = async (credentials) => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        setState({ compatible });

        // console.log("Checking Device:" + compatible);

        if (compatible) {
            checkForFingerprints(credentials);
        } else {
            // console.log("Device is not Compatible");
        }
    };

    const checkForFingerprints = async (credentials) => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        setState({ fingerprints });

        // console.log("Fingerprints is enrolled:" + fingerprints);

        if (fingerprints) {
            scanFingerprint(credentials);
            // showAndroidAlert(credentials);
        } else {
            // console.log("No fingerprints enrolled");
        }
    };

    const scanFingerprint = async (credentials) => {
        let result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate with Biometrics",
            cancelLabel: "Cancel",
            disableDeviceFallback: true,
        });
        // console.log('Scan Result:', result);
        // console.log('Scan Result Error:', result['error']);
        setState({
            result: JSON.stringify(result),
            error: result['error']
        });

        if (result["success"] == true) {
            // console.log(credentials);
            // loginApi(credentials['username'], credentials['password'], true);
            verifyOTP(credentials['password'])

        }
    };

    const getPassword = () => {
        setLoading({
            isLoading: true,
        });

        setCounter(counter + 1);

        // console.log("Loading: " + loading.isLoading);

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
                // console.log("Loading: " + global.account_pin);
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

        fetch("https://asili.devopsfoundry.cloud:7074/" + "GetOTP", otpRequestOptions)
            .then((response) => response.json())
            .then(response => {
                setLoading({
                    isLoading: false,
                })

                // console.log(response, "\n", otpRequestOptions);
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
                // console.log(err);
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                });
            }).finally(() => {
                setLoading({
                    isLoading: false,
                });
                // console.log("Loading: " + loading.isLoading);
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
                        fontSize: 22,
                        textAlign: 'center',
                    }}>
                    Enter Pin
                </Text>
                <Text
                    style={{
                        paddingTop: 10,
                        paddingBottom: 58,
                        color: theme.colors.primary,
                        fontSize: 14,
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
                        marginHorizontal: 20,
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
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        Toast.show({
                            type: 'info',
                            text1: 'Cancelled',
                            text2: 'Transaction Cancelled🛑',
                            position: 'top'
                        });
                        navigation.navigate("Home");
                    }}>
                    <View style={[styles.centeredView, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                        <View style={styles.modalView}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.modalTitle}>Confirmation</Text>
                                <Pressable
                                    style={{ paddingTop: 2 }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        Toast.show({
                                            type: 'info',
                                            text1: 'Cancelled',
                                            text2: 'Transaction Cancelled🛑',
                                            position: 'top'
                                        });
                                        navigation.navigate("Home");
                                    }}>
                                    <Icon name={"ios-close"} size={25} color={theme.colors.error} />
                                </Pressable>
                            </View>
                            <View style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 15 }}>
                                <Text style={styles.modalText}>Transaction Type</Text>
                                <Text style={styles.modalImportantText}>{global.transactionType}</Text>

                                <Text style={styles.modalText}>Transaction Amount</Text>
                                <Text style={styles.modalImportantText}>KES {global.transaction_amount}</Text>

                                {transactionType == "Withdraw" ?
                                    <View>
                                        <Text style={styles.modalText}>Withdraw Acccount</Text>
                                        <Text style={styles.modalImportantText}>{global.withdrawAccountNumber}</Text>
                                    </View>
                                    : ''
                                }

                                {transactionType == "Deposit" ?
                                    <View>
                                        <Text style={styles.modalText}>Destination Acccount</Text>
                                        <Text style={styles.modalImportantText}>{global.depositAccountNumber}</Text>
                                    </View>
                                    : ''
                                }

                                {transactionType == "Loan" ?
                                    <View>
                                        <Text style={styles.modalText}>Loan Acccount</Text>
                                        <Text style={styles.modalImportantText}>{global.LoanAccountNumber}</Text>
                                    </View>
                                    : ''
                                }

                                {transactionType == "LoanRepay" ?
                                    <View>
                                        <Text style={styles.modalText}>Loan Acccount No</Text>
                                        <Text style={styles.modalImportantText}>{global.LoanNo}</Text>
                                    </View>
                                    : ''
                                }

                                <Text style={styles.modalText}>Account Phone</Text>
                                <Text style={styles.modalImportantText}>{global.account_phone}</Text>

                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    checkUserStatus();
                                }}>
                                <Text style={styles.textStyle}>Proceed</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    confirmationText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    centeredView: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        paddingBottom: 10,
        paddingRight: 35,
        color: theme.colors.primary,
        fontSize: 23,
        textAlign: 'center',
    },
    modalImportantText: {
        color: theme.colors.success,
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 5,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default Password;

