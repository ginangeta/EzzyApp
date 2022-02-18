import { Platform, StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

export default function Loan({ navigation }) {
    const [text, setText] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.back}
                    onPress={() => navigation.navigate("Home")}>
                    <Image style={styles.backIcon} source={require('../assets/icons/black-left-arrow.png')} />
                </TouchableOpacity>
                <View style={styles.topHomeIcons}>
                    <TouchableOpacity style={styles.topIconsContainer}
                        onPress={() => navigation.navigate("")}>
                        <Image style={styles.topIcons} source={require('../assets/icons/notification.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topIconsContainer}
                        onPress={() => navigation.navigate("")}>
                        <Image style={styles.topIcons} source={require('../assets/icons/more.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.loanHeader}>
                <Text style={{ fontWeight: "700", fontSize: 23, }}>Balance</Text>
                <TouchableOpacity onPress={() => navigation.navigate("LoanGuarantors")}>
                    <Text style={{ fontWeight: "bold", color: "#3e6cce" }}>Borrow Loan</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loanMetric}>
                <Image style={styles.dailPadDelete} source={require('../assets/icons/loanSample.png')} />
            </View>
            <View>
                <Text style={{ fontWeight: "700", fontSize: 18, paddingHorizontal: 30 }}>Running Loans</Text>

                <ScrollView style={{ marginTop: 10 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    <View style={[styles.shadowProp]}>
                        <View style={styles.loan}>
                            <Text style={styles.loanName}>Instant Loan</Text>
                            <Text style={styles.LoanDueDate}>Due 12 Sep 2020</Text>
                            <Text style={styles.LoanAmount}>325,000</Text>
                            <TouchableOpacity style={styles.confirmation}
                                onPress={() => navigation.navigate("Dial")}>
                                <Text style={styles.confirmationText}>Pay Loan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.shadowProp]}>
                        <View style={styles.loan}>
                            <Text style={styles.loanName}>Instant Loan</Text>
                            <Text style={styles.LoanDueDate}>Due 12 Sep 2020</Text>
                            <Text style={styles.LoanAmount}>325,000</Text>
                            <TouchableOpacity style={styles.confirmation}
                                onPress={() => navigation.navigate("Dial")}>
                                <Text style={styles.confirmationText}>Pay Loan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.shadowProp]}>
                        <View style={styles.loan}>
                            <Text style={styles.loanName}>Instant Loan</Text>
                            <Text style={styles.LoanDueDate}>Due 12 Sep 2020</Text>
                            <Text style={styles.LoanAmount}>325,000</Text>
                            <TouchableOpacity style={styles.confirmation}
                                onPress={() => navigation.navigate("Dial")}>
                                <Text style={styles.confirmationText}>Pay Loan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.shadowProp]}>
                        <View style={styles.loan}>
                            <Text style={styles.loanName}>Instant Loan</Text>
                            <Text style={styles.LoanDueDate}>Due 12 Sep 2020</Text>
                            <Text style={styles.LoanAmount}>325,000</Text>
                            <TouchableOpacity style={styles.confirmation}
                                onPress={() => navigation.navigate("Dial")}>
                                <Text style={styles.confirmationText}>Pay Loan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <Text style={{ fontWeight: "700", fontSize: 18, paddingHorizontal: 30 }}>Repayment History</Text>

                <ScrollView style={{ marginTop: 10 }}
                    horizontal={false}>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
                    </View>
                    <View style={styles.loanrepayment}>
                        <View>
                            <Text style={styles.LoanDueDate}>Instant Loan</Text>
                            <Text style={styles.loanName}>12 Sep 2020 10:32 AM</Text>
                        </View>
                        <Text style={styles.paymentAmount}>KES 352,000</Text>
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