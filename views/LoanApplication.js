import { StyleSheet, View, Text, Button, Image, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { Column as Col, Row } from 'react-native-flexbox-grid';
import React from "react";

export default function LoanApplication({ navigation }) {
    const [hasOpacity, setHasOpacity] = React.useState(false)

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#3e6cce" barStyle="light-content" />
            <View style={styles.homeHeader} >
                <View style={styles.userBalance}>
                    <View style={styles.userBalanceHeader}>
                        <Text style={styles.balanceInfo}>Amount Applying For</Text>
                    </View>
                    <Text style={styles.balance}>KES 51,0000</Text>
                    <View style={styles.userBalanceHeader}>
                        <Text style={styles.balanceInfo}>7% Monthly Interest</Text>
                    </View>
                </View>
            </View>
            <View style={styles.homeMenu} >
                <View style={{ marginTop: 320 }}>
                    <View style={styles.loansSectionTitle}>
                        <Image style={styles.loansSectionTitleImage} source={require('../assets/icons/users.png')} />
                        <Text style={styles.loansSectionTitleText}>Selected Guarantors</Text>
                    </View>

                    <View style={styles.scrollViewStyle}>
                        <ScrollView
                            horizontal={false}>
                            <View style={styles.loanrepayment}>
                                <View style={styles.userImageView}>
                                    <TouchableOpacity style={styles.userImg}
                                        onPress={() => navigation.navigate("")}>
                                        <Image style={styles.imagestyle} source={require('../assets/users/team-2.jpg')} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={styles.LoanDueDate}>Test Guarantor</Text>
                                        <Text style={styles.loanName}>#435678908765</Text>
                                    </View>
                                </View>
                                <Text style={styles.paymentAmount}>KES 352,000</Text>
                            </View>
                            <View style={styles.loanrepayment}>
                                <View style={styles.userImageView}>
                                    <TouchableOpacity style={styles.userImg}
                                        onPress={() => navigation.navigate("")}>
                                        <Image style={styles.imagestyle} source={require('../assets/users/team-2.jpg')} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={styles.LoanDueDate}>Test Guarantor</Text>
                                        <Text style={styles.loanName}>#435678908765</Text>
                                    </View>
                                </View>
                                <Text style={styles.paymentAmount}>KES 352,000</Text>
                            </View>
                            <View style={styles.loanrepayment}>
                                <View style={styles.userImageView}>
                                    <TouchableOpacity style={styles.userImg}
                                        onPress={() => navigation.navigate("")}>
                                        <Image style={styles.imagestyle} source={require('../assets/users/team-2.jpg')} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={styles.LoanDueDate}>Test Guarantor</Text>
                                        <Text style={styles.loanName}>#435678908765</Text>
                                    </View>
                                </View>
                                <Text style={styles.paymentAmount}>KES 352,000</Text>
                            </View>
                            <View style={styles.loanrepayment}>
                                <View style={styles.userImageView}>
                                    <TouchableOpacity style={styles.userImg}
                                        onPress={() => navigation.navigate("")}>
                                        <Image style={styles.imagestyle} source={require('../assets/users/team-2.jpg')} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={styles.LoanDueDate}>Test Guarantor</Text>
                                        <Text style={styles.loanName}>#435678908765</Text>
                                    </View>
                                </View>
                                <Text style={styles.paymentAmount}>KES 352,000</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>

            <Row size={12} style={styles.confirmationContainer}>
                <Col sm={12} md={12} lg={12} style={{ marginBottom: 0 }}>
                    <TouchableOpacity style={styles.confirmation}
                        onPress={() => navigation.navigate("Home")}>
                        <Text style={styles.confirmationText}>CONRIFM APPLICATION</Text>
                    </TouchableOpacity>
                </Col>
            </Row>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topHomeIcons: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    topIconsContainer: {
        width: 25,
        height: 25,
        marginLeft: 5,
        marginTop: 10,
        alignItems: "flex-end"
    },
    homeHeader: {
        backgroundColor: "#3e6cce",
        height: '35%',
        paddingTop: 50,
        paddingHorizontal: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    userInfo: {
        marginTop: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: 'row'
    },
    salutation: {
        color: '#000000',
        fontSize: 22,
    },
    homeHeaderText: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    userName: {
        fontWeight: "bold",
        color: '#000000',
        fontSize: 22,
    },
    imagestyle: {
        width: 70,
        height: 70,
    },
    userImg: {
        width: 70,
        height: 70,
        borderRadius: 150 / 2,
        overflow: "hidden",
    },
    userBalance: {
        marginTop: 20,
    },
    userBalanceHeader: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    balance: {
        marginTop: 15,
        fontWeight: "700",
        fontSize: 35,
        color: "white",
    },
    balanceInfo: {
        marginTop: 10,
        fontWeight: "700",
        fontSize: 20,
        color: "white",
    },
    userBalanceAmount: {
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    homeMenu: {
        position: 'absolute',
        marginBottom: 50,
        marginHorizontal: 30

    },
    menuItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    menuIconsContainer: {
        width: 120,
        height: 120,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60
    },
    menuIcons: {
        width: 80,
        height: 80,
    },
    menuItemText: {
        fontSize: 18,
        color: 'white',
        width: 70,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 10,
    },
    homeMoneyMenu: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 50,
        marginHorizontal: 30,
        backgroundColor: "white",
        borderRadius: 30
    },
    homeMenuIcons: {
        width: 90,
        height: 90,
    },
    confirmation: {
        width: "100%",
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#3e6cce",
    },
    confirmationContainer: {
        position: 'absolute',
        bottom: 0,
    },
    confirmationText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    },
    userImageView: {
        flexDirection: 'row'
    },
    imagestyle: {
        width: 40,
        height: 40,
    },
    userImg: {
        width: 40,
        height: 40,
        borderRadius: 150 / 2,
        overflow: "hidden",
        marginRight: 10
    },
    backContainer: {
        backgroundColor: 'red',
        position: 'absolute',
        width: '100%',
        paddingTop: 50,
        top: 0,
        right: 0,
        left: 0
    },
    back: {
        height: 20,
        width: 20,
        marginTop: 50,
        marginLeft: 15,
        padding: 10,
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: "100%",
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    paymentAmount: {
        fontWeight: 'bold',
        fontSize: 16
    },
    loansSectionTitle: {
        backgroundColor: "#dfe7fa",
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 25,
        flexDirection: 'row',
    },
    loansSectionTitleText: {
        backgroundColor: "#dfe7fa",
        fontWeight: 'bold',
        marginStart: 10,
        fontSize: 18,
        width: "100%"
    },
    scrollViewStyle: {
        marginTop: 10,
    },
});