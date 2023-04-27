import { Platform, StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Toast from 'react-native-toast-message';
import { theme } from './core/theme';
import React, { useState } from "react";

export default function LoanDetails({ navigation }) {
    const [text, setText] = useState("");

    const repayLoan = () => {

        global.transactionType = "LoanRepay";

        toDial();
    }

    const toDial = () => {
        navigation.navigate("Dial")
    }

    return (
        <ImageBackground source={require('./src/assets/celian_blue.jpg')}
            resizeMode="cover" imageStyle={{ opacity: 0.3 }} style={styles.container}>
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.back}
                    onPress={() => navigation.navigate("Home")}>
                    <Icon name={"arrow-left-thin"} borderRadius={20} size={35} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "700", fontSize: 23, marginRight: 20 }}>{global.loanAccountName}</Text>
            </View>
            <View style={styles.loanHeader}>
            </View>
            <View style={[styles.homeMenu]}>
                <Text style={{ fontWeight: "700", fontSize: 23, marginRight: 20 }}>Balance:  {global.LoanBal}</Text>

                <Text style={{ fontWeight: "700", fontSize: 16, marginTop: 10, color: 'darkgrey' }}>Loan Transactions</Text>

                <Row size={12} style={{ marginTop: 5 }}>
                    <Col sm={6} md={6} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => {
                                Toast.show({
                                    type: 'info',
                                    text1: "Coming Soon 🥳",
                                    position: 'top'
                                });
                            }}>
                            <Image style={styles.menuIcons} source={require('../assets/clock.png')} />
                            <Text style={styles.menuItemText}>Statements</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={6} md={6} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => {
                                repayLoan()
                            }}>
                            <Image style={styles.menuIcons} source={require('../assets/money-bag.png')} />
                            <Text style={styles.menuItemText}>Repay Loan</Text>
                        </TouchableOpacity>
                    </Col>
                </Row>

                <ScrollView style={{ marginTop: 10, marginBottom: 20 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                </ScrollView>

            </View>
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
        paddingTop: 20,
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
});