import { Platform, StyleSheet, View, Text, FlatList, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';

export default function Profile({ navigation }) {
    const [text, setText] = useState("");

    const AccountItem = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.AccountType}</Text>
            <View>
                <Text style={{
                    fontWeight: "bold",
                }}>
                    KES {item.Amount}
                </Text>
            </View>
            <Text>{item.date}</Text>
        </TouchableOpacity>
    );

    useEffect(() => {

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

        fetch("https://testasili.devopsfoundry.cloud:8050/BalanceEnquiry", balanceRequestOptions)
            .then((balance_response) => balance_response.json())
            .then(balance_response => {

                if (balance_response[0].Is_Successful) {
                    const api_balance_details = balance_response[0].Account;

                    console.log(api_balance_details);
                    global.account_balance_raw = api_balance_details;
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Balance Inquiry Failed",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                console.log("Balance Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            });

    });

    const renderAccountList = ({ item }) => {

        return (
            <AccountItem
                item={item}
                backgroundColor="white"
                textColor="white"
            />
        );
    };

    return (
        <View style={styles.container}>
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
                            onPress={() => { navigation.navigate("Login") }}>
                            <Image style={styles.topSideIcon} source={require('../assets/icons/logout.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.homeMenu} >
                <Text style={{ fontWeight: "700", fontSize: 18, paddingHorizontal: 30 }}></Text>
                <ScrollView style={{ marginTop: 10 }}
                    horizontal={false}>
                    <View style={[styles.listContainer]}>
                        <FlatList style={[styles.homeMenuList]}
                            data={global.account_balance_raw}
                            renderItem={renderAccountList}
                            keyExtractor={(item) => item.AccountType} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        width: 60,
        height: 60,
        marginLeft: 15,
        marginTop: 10,
        alignItems: "flex-end"
    },
    homeHeader: {
        height: '50%',
        paddingTop: 50,
        paddingHorizontal: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
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
        fontSize: 18,
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
        backgroundColor: 'white',
        position: 'absolute',
        width: "100%",
        bottom: 0,
        marginBottom: 0,
        marginHorizontal: 30

    },
    listContainer: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 30
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
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
        height: 20,
        width: 20,
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
});