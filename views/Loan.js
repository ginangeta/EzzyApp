import { Platform, StyleSheet, View, Text, FlatList, Button, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-toast-message';
import React, { useState } from "react";
import { theme } from './core/theme';
import { useEffect } from "react";

export default function Loan({ navigation }) {
    const [loanStateAccounts, setStateLoanAccounts] = useState();
    let loanAccounts = [];
    const [loading, setLoading] = useState({
        isLoading: true
    })

    useEffect(() => {
        loanAccountsApi();
    }, []);

    const LoanItem = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item]}>
            <View style={{
                borderBottomWidth: 1, display: 'flex', flexDirection: 'row', width: '100%',
                justifyContent: 'space-between', paddingBottom: 20, alignItems: 'center', borderBottomColor: 'lightgrey'
            }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Image style={styles.Image} source={require('../assets/blue_loan.png')} />
                    <View>
                        <Text style={[styles.title, textColor]}>{item.LoanName.toUpperCase()}</Text>
                        <Text style={{
                            fontWeight: "bold",
                            marginTop: 5,
                            color: 'grey'
                        }}>
                            Account: {item.LoanAccount}
                        </Text>
                    </View>
                </View>

                <Icon name={"arrow-right-drop-circle"} borderRadius={20} size={35} color={theme.colors.lightgrey} />
            </View>
        </TouchableOpacity>
    );

    const setChosenLoanAccount = (LoanNo, LoanName, LoanBal, LoanCode, LoanAccountNumber) => {
        global.transactionType = "Loan";
        global.LoanNo = LoanNo;
        global.LoanAccount = LoanAccountNumber;
        global.loanAccountName = LoanName;
        global.LoanBal = LoanBal;
        global.LoanCode = LoanCode;

        navigation.navigate("LoanDetails")

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

        fetch("https://testasili.devopsfoundry.cloud:8050/LoanList", loanAccountRequest)
            .then((loan_acc_response) => loan_acc_response.json())
            .then(loan_acc_response => {
                // console.log("Before Error: ", loan_acc_response);

                if (loan_acc_response[0].Is_Successful) {
                    const loan_accounts = loan_acc_response[0].list;

                    global.loan_accounts_list = loan_accounts;

                    loanAccounts = loan_accounts;

                    setStateLoanAccounts(loanAccounts);

                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get loan accounts at this point",
                        position: 'top'
                    });
                }

                setLoading({
                    isLoading: false,
                })
            })
            .catch((error) => {
                // console.log("Loan Accounts Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            });


    }

    const renderLoanAccountList = ({ item }) => {

        return (
            <LoanItem
                item={item}
                backgroundColor="white"
                onPress={() => setChosenLoanAccount(item.LoanNo, item.LoanName, item.LoanBal, item.LoanCode, item.LoanAccount)}
                textColor="white"
            />
        );
    };

    return (
        <ImageBackground source={require('./src/assets/celian_blue.jpg')}
            resizeMode="cover" imageStyle={{ opacity: 0.3 }} style={styles.container}>
            <Spinner
                visible={loading.isLoading}
                textContent={'Obtaining Loan...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.back}
                    onPress={() => navigation.navigate("Home")}>
                    <Icon name={"arrow-left-thin"} borderRadius={20} size={35} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "700", fontSize: 23, marginRight: 20 }}>Loan Accounts</Text>
            </View>
            <ScrollView nestedScrollEnabled={true} horizontal={false} style={styles.scrollview}>
            <View style={styles.loanHeader}>
            </View>
                <View style={styles.homeMenu} >
                    <Text style={{ fontWeight: "700", fontSize: 18, paddingHorizontal: 30 }}></Text>
                    <View style={[styles.listContainer]}>
                        <FlatList style={[styles.homeMenuList]}
                            data={loanStateAccounts}
                            renderItem={renderLoanAccountList}
                            keyExtractor={(item) => item.LoanNo} />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
        marginHorizontal: 15,
        paddingRight: 25,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute'
    },
    topHomeIcons: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    topIconsContainer: {
        width: 45,
        height: 35,
    },
    back: {
    },
    topIcons: {
        marginHorizontal: 20,
        height: 25,
    },
    loanHeader: {
        marginTop: 100,
        marginBottom: 10,
        width: "100%",
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    homeMenu: {
        display: 'flex',
        // backgroundColor: 'red',
        paddingBottom: 20,
        marginHorizontal: 30
    },
    menuItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,

    },
    menuIconsContainer: {
        width: "80%",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        marginHorizontal: 30,
        padding: 10,
        borderWidth: 1,
        borderRadius: 30,
    },
    menuIcons: {
        width: 70,
        height: 70,
    },
    menuItemText: {
        fontSize: 16,
        color: 'black',
        width: 70,
        fontWeight: '600',
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        textTransform: 'uppercase'
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
        fontSize: 18,
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
    homeMenu: {
        width: "100%",
        paddingHorizontal: 30,
        marginBottom: 0,
    },
    scrollview: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
    },
    listContainer: {
        width: '100%',
        borderRadius: 30
    },
    Image: {
        height: 40,
        width: 40,
        marginRight: 10,

    },
    title: {
        fontSize: 16,
        color: 'black',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 10,
        textTransform: 'uppercase'
    }
});