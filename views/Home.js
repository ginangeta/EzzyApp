import { StyleSheet, View, Text, Button, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#FFFFFF" barStyle="dark-content" />
            <View style={styles.homeHeader} >
                <View style={styles.userInfo}>
                    <TouchableOpacity style={styles.userImg}
                        onPress={() => navigation.navigate("CoffeeList")}>
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
                            <Text style={styles.userBalanceAmount}>+KES 10,000</Text>
                        </View>
                        <View>
                            <Text>Expenses</Text>
                            <Text style={styles.userBalanceAmount}>-KES 10,000</Text>
                        </View>
                    </View>
                </View>
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
        marginTop: 15,
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
    }
});