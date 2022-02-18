import { StyleSheet, View, Text, Button, Image, TouchableOpacity, StatusBar } from "react-native";
import { Column as Col, Row } from 'react-native-flexbox-grid';
import React from "react";

export default function Home({ navigation }) {
    const [hasOpacity, setHasOpacity] = React.useState(false)

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#FFFFFF" barStyle="dark-content" />
            <View style={styles.homeHeader} >
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
                <View style={styles.userInfo}>
                    <TouchableOpacity style={styles.userImg}
                        onPress={() => navigation.navigate("")}>
                        <Image style={styles.imagestyle} source={require('../assets/users/team-1.jpg')} />
                    </TouchableOpacity>
                    <View style={styles.homeHeaderText}>
                        <Text style={styles.salutation}>Morning</Text>
                        <Text style={styles.userName}> Gina</Text>
                    </View>
                </View>
                <View style={styles.userBalance}>
                    <View style={styles.userBalanceHeader}>
                        <Text>Balance</Text>
                        <Text style={{ fontWeight: "bold" }}>Last Month</Text>
                    </View>
                    <Text style={styles.balance}>KES 20,000</Text>
                    <View style={styles.userBalanceHeader}>
                        <View>
                            <Text>Income</Text>
                            <Text style={styles.userBalanceAmount}>
                                <Image style={styles.topIcons} source={require('../assets/icons/income.png')} />
                                +KES 10,000
                            </Text>
                        </View>
                        <View>
                            <Text>Expenses</Text>
                            <Text style={styles.userBalanceAmount}>
                                <Image style={styles.topIcons} source={require('../assets/icons/expenses.png')} />
                                -KES 10,000
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.homeMenu} >
                <Row size={12}>
                    <Col sm={6} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => {
                                setHasOpacity(!hasOpacity)
                            }}>
                            <Image style={styles.menuIcons} source={require('../assets/icons/banknotes.png')} />
                        </TouchableOpacity>
                        <Text style={styles.menuItemText}>Deposit Money</Text>
                    </Col>
                    <Col sm={6} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => navigation.navigate("Dial")}>
                            <Image style={styles.menuIcons} source={require('../assets/icons/withdraw.png')} />
                        </TouchableOpacity>
                        <Text style={styles.menuItemText}>Withdraw Cash</Text>
                    </Col>
                    <Col sm={6} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => navigation.navigate("")}>
                            <Image style={styles.menuIcons} source={require('../assets/icons/money-transfer.png')} />
                        </TouchableOpacity>
                        <Text style={styles.menuItemText}>Mobile Money</Text>
                    </Col>
                    <Col sm={6} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => navigation.navigate("Loan")}>
                            <Image style={styles.menuIcons} source={require('../assets/icons/signing.png')} />
                        </TouchableOpacity>
                        <Text style={styles.menuItemText}>Request Loan</Text>
                    </Col>
                </Row>
            </View>

            <View style={[styles.homeMoneyMenu, { opacity: hasOpacity ? 1.0 : 0 }]} >
                <Row size={12}>
                    <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => navigation.navigate("Dial")}>
                            <Image style={styles.homeMenuIcons} source={require('../assets/icons/airtel.png')} />
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.homeMenuIconsContainer}
                            onPress={() => navigation.navigate("Dial")}>
                            <Image style={styles.homeMenuIcons} source={require('../assets/icons/mpesa.png')} />
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.homeMenuIconsContainer}
                            onPress={() => navigation.navigate("Dial")}>
                            <Image style={styles.homeMenuIcons} source={require('../assets/icons/card.png')} />
                        </TouchableOpacity>
                    </Col>
                </Row>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#dfe7fa",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topHomeIcons: {
        backgroundColor: 'white',
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
        backgroundColor: "#ffffff",
        height: '40%',
        paddingTop: 50,
        paddingHorizontal: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 40,
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
        fontSize: 30,
        color: "#3e6cce",
    },
    userBalanceAmount: {
        marginTop: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    homeMenu: {
        position: 'absolute',
        bottom: 0,
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
        color: 'black',
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
    }
});