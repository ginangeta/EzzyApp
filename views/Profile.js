import { Platform, StyleSheet, View, Text, FlatList, Pressable, Modal, Image, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AntIcon from "react-native-vector-icons/AntDesign"
import Spinner from 'react-native-loading-spinner-overlay'
import React, { useEffect, useState } from "react";
import TextInput from './components/TextInput';
import Toast from 'react-native-toast-message';
import { theme } from './core/theme';

import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
    const [balance, setBalance] = useState("");
    const [savedLogins, setSavedLogins] = useState(false)
    const [oldPassword, setOldPassword] = useState({ value: '', error: '' })
    const [newPassword, setNewPassword] = useState({ value: '', error: '' })
    const [hasChangePasswordOpacity, setHasChangePasswordOpacity] = useState(false);

    const [loading, setLoading] = useState({
        isLoading: false
    })

    const [state, setState] = useState({
        compatible: false,
        fingerprints: false,
        result: '',
        error: '',
    })

    useEffect(() => {
        getAccountBalance();
        checkUserStatus();
    }, []);

    const AccountItem = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.AccountType.toUpperCase()}</Text>
            <View>
                <Text style={{
                    fontWeight: "800",
                    color: theme.colors.primary
                }}>
                    KES {item.Amount}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const getAccountBalance = () => {

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
                phoneNo: global.account_phone,
            })
        }

        fetch("https://asili.devopsfoundry.cloud:7074/" + "BalanceEnquiry", balanceRequestOptions)
            .then((balance_response) => balance_response.json())
            .then(balance_response => {

                if (balance_response[0].Is_Successful) {
                    const api_balance_details = balance_response[0].Account;

                    const new_balance_details = api_balance_details.filter(item => item.AccountType != "ORDINARY")

                    // console.log(new_balance_details);
                    setBalance(new_balance_details);

                    return;
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Balance Inquiry Failed",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                // console.log("Balance Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            });
    }

    const setChangePassword = () => {

        setLoading({
            isLoading: true,
        })

        const passwordRequestOptions = {
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
                CurrentPin: oldPassword.value,
                NewPin: newPassword.value
            })
        }

        fetch("https://asili.devopsfoundry.cloud:7074/" + "PinChange", passwordRequestOptions)
            .then((password_response) => password_response.json())
            .then(password_response => {
                // console.log(password_response, "\n", passwordRequestOptions);
                if (password_response[0].Is_Successful) {
                    setHasChangePasswordOpacity(!hasChangePasswordOpacity)
                    setLoading({
                        isLoading: false,
                    })

                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Balance Inquiry Failed",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                // console.log("Balance Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            }).finally(() => {
                setHasChangePasswordOpacity(!hasChangePasswordOpacity);
            });
    }

    const renderAccountList = ({ item }) => {

        return (
            <AccountItem
                item={item}
                backgroundColor="white"
                textColor="white"
            />
        );
    };

    const checkUserStatus = async () => {
        try {
            const credentials = JSON.parse(await SecureStore.getItemAsync('Credentials'));
            // console.log("Console Credentials:" + JSON.stringify(credentials));
            if (credentials != null) {
                setSavedLogins(true);
                // console.log("Console Status:" + savedLogins);
            } else {
                // console.log('No saved credentials');
            }
        } catch (error) {
            // console.log("Check status error: " + error);
        }
    }

    const deleteBiometrics = () => {
        Alert.alert(
            'Biometric Options',
            'Are you sure you want to delete saved biometrics?',
            [
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const credentials = JSON.parse(await SecureStore.getItemAsync('Credentials'));
                            // console.log("Console Credentials:" + JSON.stringify(credentials));
                            if (credentials != null) {
                                setSavedLogins(false);
                                await SecureStore.deleteItemAsync('Credentials');
                            } else {
                                // console.log('Failed to delete credentials');
                            }
                        } catch (error) {
                            // console.log("Delete biometrics error: " + error);
                        }
                    },
                },
                {
                    text: 'No',
                    onPress: () => {
                        // console.log('Cancel')
                    },
                    style: 'cancel',
                },
            ]
        );
    }

    const getBiometricsFunction = async () => {
        const credentials = JSON.parse(await SecureStore.getItemAsync('Credentials'));
        checkDeviceForHardware(credentials);
    }

    const enrollBiometrics = async () => {
        const login = {
            username: global.account_phone,
            password: global.account_pin
        }

        await SecureStore.setItemAsync('Credentials', JSON.stringify(login));

        getBiometricsFunction();

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
        } else {
            // console.log("No fingerprints enrolled");
        }
    };

    const scanFingerprint = async (credentials) => {
        let result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Enroll Biometrics",
            cancelLabel: "Cancel",
            disableDeviceFallback: true,
        });
        // console.log('Scan Result:', result);

        setState({
            result: JSON.stringify(result),
            error: result['error']
        });

        if (result["success"] == true) {
            setSavedLogins(true);

            Toast.show({
                type: 'success',
                text1: 'Biometrics Prompt',
                text2: 'Enrolled Successfully',
                position: 'top'
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Biometrics Prompt Error',
                text2: 'Kindly try again later🛑',
                position: 'top'
            });
        }
    };

    return (
        <ImageBackground source={require('./src/assets/profile.jpg')}
            resizeMode="cover" imageStyle={{ opacity: 0.2  }} style={styles.container}>
            <Spinner
                visible={loading.isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            {/* <ScrollView nestedScrollEnabled={true} horizontal={false} style={styles.scrollview}> */}
            <View style={styles.homeHeader} >
                <View style={styles.userInfo}>
                    <TouchableOpacity style={styles.userImg}
                        onPress={() => navigation.navigate("")}>
                        <Image style={styles.imagestyle} source={require('../assets/users/user.jpg')} />
                    </TouchableOpacity>
                    <View style={styles.homeHeaderText}>
                        <Text style={styles.salutation}></Text>
                        <Text style={styles.userName}>{global.member_details.Name}</Text>
                    </View>

                    <View style={styles.topHomeIcons}>
                        <TouchableOpacity style={styles.topIconsContainer}
                            onPress={() => {
                                setHasChangePasswordOpacity(!hasChangePasswordOpacity)
                            }}>
                            <Icon name={"account-edit"} borderRadius={20} size={55} color={theme.colors.primary} />

                            <Text style={{ fontWeight: "700", fontSize: 12, paddingHorizontal: 5, color: theme.colors.primary }}>Pin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.topIconsContainer}
                            onPress={() => { navigation.navigate("Login") }}>
                            <Icon name={"account-lock"} borderRadius={20} size={50} color={theme.colors.text} />
                            <Text style={{ fontWeight: "700", fontSize: 12, paddingHorizontal: 5, color: theme.colors.text }}>Logout</Text>
                        </TouchableOpacity>
                        {savedLogins ?
                            <TouchableOpacity style={styles.topIconsContainer}
                                onPress={() => deleteBiometrics()}>
                                <Icon name={"fingerprint-off"} borderRadius={20} size={55} color={theme.colors.error} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.topIconsContainer}
                                onPress={() => enrollBiometrics()}>
                                <Icon name={"fingerprint"} borderRadius={20} size={55} color={theme.colors.success} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>

            <View style={styles.homeMenu} >
                <Text style={{ fontWeight: "700", fontSize: 16, paddingHorizontal: 30 }}></Text>
                <View style={[styles.listContainer]}>
                    <FlatList style={[styles.homeMenuList]}
                        data={balance}
                        renderItem={renderAccountList}
                        keyExtractor={(item) => item.AccountType} />
                </View>
            </View>
            {/* </ScrollView> */}

            {/* Change Password Modal */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={hasChangePasswordOpacity}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setHasChangePasswordOpacity(!hasChangePasswordOpacity)
                    }}>
                    <View style={[styles.centeredView, { width: '100%' }]}>
                        <View style={[styles.listContainer, { width: '70%' }]}>
                            <Text style={styles.listTitle}>Change Password Modal</Text>
                            <View style={styles.divider}></View>
                            <View style={{ padding: 20 }} behavior="padding">
                                <KeyboardAvoidingView style={{ padding: 10 }} >
                                    <TextInput
                                        label="Old Password"
                                        returnKeyType="next"
                                        value={oldPassword.value}
                                        style={styles.input}
                                        onChangeText={(text) => setOldPassword({ value: text, error: '' })}
                                        error={!!oldPassword.error}
                                        errorText={oldPassword.error}
                                        keyboardType="number-pad"
                                        secureTextEntry
                                    />

                                    <TextInput
                                        label="New Password"
                                        returnKeyType="done"
                                        value={newPassword.value}
                                        style={styles.input}

                                        onChangeText={(text) => setNewPassword({ value: text, error: '' })}
                                        error={!!newPassword.error}
                                        errorText={newPassword.error}
                                        keyboardType="number-pad"
                                        secureTextEntry
                                    />

                                    <Pressable
                                        style={[styles.button, styles.buttonOpen]}
                                        onPress={() => setChangePassword()}>
                                        <Text style={styles.textStyle}>Change</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setHasChangePasswordOpacity(!hasChangePasswordOpacity)}>
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </Pressable>
                                </KeyboardAvoidingView>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    topHomeIcons: {
        display: 'flex',
        marginTop: 10,
        backgroundColor: 'white',
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    topSideIcon: {
        height: 50,
        width: 50,
    },
    topIconsContainer: {
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 50,
        padding: 5,
        backgroundColor: 'white',
        alignItems: "center"
    },
    scrollview: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
    },
    homeHeader: {
        // height: '50%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
            android: {
                paddingTop: 50,
            },
        }),
        paddingTop: 20,
        paddingBottom: 30,
        overflow: 'hidden',
    },
    userInfo: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column'
    },
    salutation: {
        color: '#000000',
        fontSize: 22,
    },
    homeHeaderText: {
        marginLeft: 15,
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    userName: {
        fontWeight: "bold",
        color: '#000000',
        fontSize: 16,
    },
    imagestyle: {
        width: 200,
        height: 200,
    },
    userImg: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        overflow: "hidden",
    },
    userBalance: {
        marginTop: 10,
    },
    userBalanceHeader: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    balance: {
        marginTop: 10,
        fontWeight: "700",
        fontSize: 22,
        color: "#3e6cce",
    },
    homeMenu: {
        width: "100%",
        // paddingHorizontal: 30,
        marginBottom: 0,

    },
    listContainer: {
        marginBottom: 50
    },
    item: {
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 30,
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 50,
        padding: 5,
        backgroundColor: 'white',
        alignItems: "center"
    },
    homeMenuList: {
        paddingBottom: 50,
    },
    title: {
        textTransform: 'capitalize',
    },
    loanMetric: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    pageHeader: {
        width: "100%",
        marginTop: 50,
        marginLeft: 15,
        paddingRight: 25,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    topHomeIcons: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    topIcons: {
        marginHorizontal: 20,
        height: 25,
    },
    loanHeader: {
        marginTop: 100,
        width: "100%",
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    loan: {
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        height: 150,
        padding: 15,
        borderWidth: 1,
        borderColor: '#171717'
    },
    shadowProp: {
        ...Platform.select({
            ios: {
                shadowColor: '#171717',
                shadowOpacity: 0.5,
                shadowRadius: 2
            },
            android: {
                elevation: 3
            },
        }),
        marginStart: 10,
        marginHorizontal: 5,
        height: 150
    },
    LoanAmount: {
        fontSize: 22,
        marginTop: 10,
        fontWeight: 'bold'
    },
    LoanDueDate: {
        fontSize: 16,
    },
    loanrepayment: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    paymentAmount: {
        fontWeight: 'bold'
    },
    confirmation: {
        width: "100%",
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: "#3e6cce",
        borderRadius: 10,
    },
    confirmationText: {
        color: "white",
        fontSize: 15,
        fontWeight: "700"
    },
    listTitle: {
        fontSize: 18,
        color: 'black',
        fontWeight: '700',
        padding: 15,
        textAlign: 'center',
        marginTop: 10,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray"
    },
    centeredView: {
        flex: 1,
        backgroundColor: "#00000099",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#10a54a",
    },
    buttonClose: {
        marginTop: 10,
        backgroundColor: "#d10d06",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        height: 55,
        marginVertical: 10,
        // backgroundColor: theme.colors.surface,
    },
    confirmationText: {
        color: "white",
        fontSize: 22,
        fontWeight: "700"
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

export default Profile;