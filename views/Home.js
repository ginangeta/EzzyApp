import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Toast from 'react-native-toast-message';
import React from "react";

const DepositItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.ProductType}</Text>
    </TouchableOpacity>
);

const WithdrawItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.ProductType}</Text>
    </TouchableOpacity>
);

const LoanItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.LoanCode}</Text>
        <Text style={[styles.sub_title, textColor]}>Min Limit: {item.MinAmount} - Max Limit: {item.MaxAmount}</Text>
    </TouchableOpacity>
);

const Home = ({ navigation }) => {
    const [hasWithdrawOpacity, setHasWithdrawOpacity] = React.useState(false);
    const [hasDepositOpacity, setHasDepositOpacity] = React.useState(false);
    const [hasLoanOpacity, setHasLoanOpacity] = React.useState(false);
    const [selectedLoanId, setSelectedLoanId] = React.useState(null);
    const [selectedDepositId, setSelectedDepositId] = React.useState(null);
    const [selectedWithdrawId, setSelectedWithdrawId] = React.useState(null);

    const setChosenWithdrawAccount = (withdrawAccountNumber, withdrawAccountName) => {
        setHasWithdrawOpacity(!hasWithdrawOpacity)

        // Toast.show({
        //     type: 'error',
        //     text1: withdrawAccountNumber,
        //     position: 'bottom'
        // });

        global.transactionType = "Deposit";
        global.withdrawAccountNumber = withdrawAccountNumber;
        global.withdrawAccountName = withdrawAccountName;

        toDial();

    }

    const renderWithdrawAccountList = ({ item }) => {
        const backgroundColor = item.AccountNo === selectedWithdrawId ? '#ebeef2' : '#ffffff';
        const color = item.AccountNo === selectedWithdrawId ? 'grey' : 'black';

        return (
            <WithdrawItem
                item={item}
                onPress={() => setChosenWithdrawAccount(item.AccountNo, item.ProductType)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const setChosenDepositAccount = (depositAccountNumber, depositAccountName) => {
        setHasDepositOpacity(!hasDepositOpacity)

        // Toast.show({
        //     type: 'error',
        //     text1: depositAccountNumber,
        //     position: 'bottom'
        // });

        global.transactionType = "Withdraw";
        global.depositAccountNumber = depositAccountNumber;
        global.depositAccountName = depositAccountName;


        toDial();
    }

    const renderDepositAccountList = ({ item }) => {
        const backgroundColor = item.AccountNo === selectedDepositId ? '#ebeef2' : '#ffffff';
        const color = item.AccountNo === selectedDepositId ? 'grey' : 'black';

        return (
            <DepositItem
                item={item}
                onPress={() => setChosenDepositAccount(item.AccountNo, item.ProductType)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const setChosenLoanAccount = (loanAccountNumber, loanAccountName) => {
        setHasLoanOpacity(!hasLoanOpacity)

        // Toast.show({
        //     type: 'error',
        //     text1: loanAccountName,
        //     position: 'bottom'
        // });

        global.transactionType = "Loan";
        global.LoanAccountNumber = loanAccountNumber;
        global.loanAccountName = loanAccountName;


        toDial();
    }

    const renderLoanAccountList = ({ item }) => {
        const backgroundColor = item.AccountNo === selectedLoanId ? '#ebeef2' : '#ffffff';
        const color = item.AccountNo === selectedLoanId ? 'grey' : 'black';

        return (
            <LoanItem
                item={item}
                onPress={() => setChosenLoanAccount(item.AccountNo, item.LoanCode)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const toDial = () => {
        navigation.navigate("Dial")

    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#FFFFFF" barStyle="dark-content" />
            <View style={styles.homeHeader} >
                <View style={styles.topHomeIcons}>
                    <TouchableOpacity style={styles.topIconsContainer}
                        onPress={() => navigation.navigate("")}>
                        <Image style={styles.topSideIcon} source={require('../assets/icons/alarm.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topIconsContainer}
                        onPress={() => navigation.navigate("Login")}>
                        <Image style={styles.topSideIcon} source={require('../assets/icons/logout.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.userInfo}>
                    <TouchableOpacity style={styles.userImg}
                        onPress={() => navigation.navigate("")}>
                        <Image style={styles.imagestyle} source={require('../assets/users/team-1.jpg')} />
                    </TouchableOpacity>
                    <View style={styles.homeHeaderText}>
                        <Text style={styles.salutation}>Hello,</Text>
                        <Text style={styles.userName}>{global.member_details.Name}</Text>
                    </View>
                </View>
                <View style={styles.userBalance}>
                    <View style={styles.userBalanceHeader}>
                        <Text>Ordinary</Text>
                        {/* <Text style={{ fontWeight: "bold" }}>Last Month</Text> */}
                    </View>
                    <Text style={styles.balance}>KES {global.account_balance.ordinary}</Text>
                    <View style={styles.userBalanceHeader}>
                        <View>
                            <Text>Deposits</Text>
                            <Text style={styles.userBalanceAmount}>
                                <Image style={styles.topIcons} source={require('../assets/icons/income.png')} />
                                KES {global.account_balance.deposits}
                            </Text>
                        </View>
                        <View>
                            <Text>Shares</Text>
                            <Text style={styles.userBalanceAmount}>
                                <Image style={styles.topIcons} source={require('../assets/icons/expenses.png')} />
                                KES {global.account_balance.shares}
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
                                setHasDepositOpacity(!hasDepositOpacity)
                            }}>
                            <Image style={styles.menuIcons} source={require('../assets/icons/banknotes.png')} />
                        </TouchableOpacity>
                        <Text style={styles.menuItemText}>Deposit Money</Text>
                    </Col>
                    <Col sm={6} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => {
                                setHasWithdrawOpacity(!hasWithdrawOpacity)
                            }}>
                            <Image style={styles.menuIcons} source={require('../assets/icons/withdraw.png')} />
                        </TouchableOpacity>
                        <Text style={styles.menuItemText}>Withdraw Money</Text>
                    </Col>
                    <Col sm={6} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => {
                                Toast.show({
                                    type: 'info',
                                    text1: 'Coming Soon ⌛',
                                    position: 'bottom'
                                });
                            }}>
                            <Image style={styles.menuIcons} source={require('../assets/icons/money-transfer.png')} />
                        </TouchableOpacity>
                        <Text style={styles.menuItemText}>Mobile Money</Text>
                    </Col>
                    <Col sm={6} md={4} lg={3} style={styles.menuItem}>
                        <TouchableOpacity style={styles.menuIconsContainer}
                            onPress={() => {
                                setHasLoanOpacity(!hasLoanOpacity)
                            }}>
                            <Image style={styles.menuIcons} source={require('../assets/icons/signing.png')} />
                        </TouchableOpacity>
                        <Text style={styles.menuItemText}>Request Loan</Text>
                    </Col>
                </Row>
            </View>

            {hasWithdrawOpacity ?
                <View style={[styles.listContainer]}>
                    <Text style={styles.listTitle}>Select Account to Withdraw From</Text>
                    <FlatList style={[styles.homeMenuList]}
                        data={global.debitable_accounts}
                        renderItem={renderWithdrawAccountList}
                        keyExtractor={(item) => item.AccountNo}
                        extraData={selectedWithdrawId}
                    />
                </View> : null
            }

            {hasDepositOpacity ?
                <View style={[styles.listContainer]}>
                    <Text style={styles.listTitle}>Select Account to Deposit To</Text>
                    <FlatList style={[styles.homeMenuList]}
                        data={global.creditable_accounts}
                        renderItem={renderDepositAccountList}
                        keyExtractor={(item) => item.AccountNo}
                        extraData={selectedDepositId}
                    />
                </View> : null}

            {hasLoanOpacity ?
                <View style={[styles.listContainer]}>
                    <Text style={styles.listTitle}>Select Account to Borrow From</Text>
                    <FlatList style={[styles.homeMenuList]}
                        data={global.loan_accounts}
                        renderItem={renderLoanAccountList}
                        keyExtractor={(item) => item.AccountNo}
                        extraData={selectedLoanId}
                    />
                </View> : null}

            {/* <View style={[styles.homeMoneyMenu, { opacity: hasWithdrawOpacity ? 1.0 : 0 }]} >
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
            </View> */}
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

    listContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        marginBottom: 80,
        marginHorizontal: 30,
        backgroundColor: "white",
        borderRadius: 30
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        textTransform: 'capitalize',
    },
    topHomeIcons: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    topSideIcon: {
        height: 25,
        width: 25,
    },
    topIconsContainer: {
        width: 25,
        height: 25,
        marginLeft: 15,
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
        fontSize: 18,
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
        fontSize: 16,
        color: 'black',
        width: 70,
        fontWeight: '700',
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 10,
    },
    listTitle: {
        fontSize: 20,
        color: 'black',
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

export default Home;