import { StyleSheet, View, Modal, Text, Pressable, FlatList, Image, TouchableOpacity, StatusBar, SafeAreaView, ScrollView } from "react-native";
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import React, { useState, useEffect } from "react";
import Toast from 'react-native-toast-message';

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
        <Text style={[styles.title, textColor]}>{item.LoanName}</Text>
        <Text style={[styles.sub_title, textColor]}>Loan No: {item.LoanNo}</Text>
    </TouchableOpacity>
);

const UtilityItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.Description}</Text>
    </TouchableOpacity>
);

const Home = ({ navigation }) => {
    const [hasWithdrawOpacity, setHasWithdrawOpacity] = useState(false);
    const [hasDepositOpacity, setHasDepositOpacity] = useState(false);
    const [hasBalanceOpacity, setHasBalanceOpacity] = useState(false);
    const [hasLoanOpacity, setHasLoanOpacity] = useState(false);
    const [hasUtilitiesOpacity, setHasUtilitiesOpacity] = useState(false);
    const [selectedLoanId, setSelectedLoanId] = useState(null);
    const [selectedDepositId, setSelectedDepositId] = useState(null);
    const [selectedWithdrawId, setSelectedWithdrawId] = useState(null);
    const [selectedUtilitiesType, setSelectedUtilitiesType] = useState(null);
    const [userBalance, setUserBalance] = useState({ value: '' });

    useEffect(() => {
        setHasBalanceOpacity(false);
        loanEligibilityAccountsApi();
    }, [navigation]);

    const loanEligibilityAccountsApi = () => {
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

        fetch("https://asili.devopsfoundry.cloud:7074/" + "LoanEligibilty", loanAccountRequest)
            .then((loan_acc_response) => loan_acc_response.json())
            .then(loan_acc_response => {
                console.log("Before LoanEligibility Error: ", loan_acc_response);

                if (loan_acc_response[0].Is_Successful) {
                    const loan_accounts = loan_acc_response[0].EAmount;
                    loan_accounts.forEach(loan => {
                        // console.log("Before Error: ", loan.LoanCode);
                        if (loan.LoanCode == "Chap Chap") {
                            global.ChapChapLoanAccountNumber = loan.AccountNo;
                            global.ChapChaploanAccountName = loan.LoanCode;
                            global.ChapChaploanLoanLimit = loan.MaxAmount;
                            if (parseInt(loan.MaxAmount) > 0) {
                                global.ChapChaploanLoanLimitColor = 'red'
                            } else {
                                global.ChapChaploanLoanLimitColor = 'green'
                            }
                        } else {
                            // console.log("Other Loan Type");
                        }
                    });

                    const new_loan_account = loan_accounts.filter(item => item.LoanCode == "Chap Chap")

                    // console.log(new_loan_account);
                    global.loan_accounts = new_loan_account;
                    creditablesApi();
                } else {
                    Toast.show({
                        type: 'error',
                        text1: "Can't get loan accounts at this point",
                        position: 'top'
                    });
                }
            })
            .catch((error) => {
                // console.log("Debitable Accounts Error: ", error);
                setAuthLogins(false);

                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top'
                });
            });

    } 

    const setChosenWithdrawAccount = (withdrawAccountNumber, withdrawAccountName) => {
        setHasWithdrawOpacity(!hasWithdrawOpacity)

        // Toast.show({
        //     type: 'error',
        //     text1: withdrawAccountNumber,
        //     position: 'top'
        // });

        global.transactionType = "Withdraw";
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
        //     position: 'top'
        // });

        global.transactionType = "Deposit";
        global.depositAccountNumber = depositAccountNumber;
        global.depositAccountName = depositAccountName;
        global.transaction_account = global.account_phone;

        toDial();

        // navigation.navigate("AccountDial")
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

    const setChosenLoanAccount = (LoanNo, LoanName, LoanBal, LoanCode, LoanAccountNumber) => {
        setHasLoanOpacity(!hasLoanOpacity)

        global.transactionType = "Loan";
        global.LoanNo = LoanNo;
        global.LoanAccount = LoanAccountNumber;
        global.loanAccountName = LoanName;
        global.LoanBal = LoanBal;
        global.LoanCode = LoanCode;

        navigation.navigate("Loan")

        // toDial();
    }

    const renderLoanAccountList = ({ item }) => {
        const backgroundColor = item.AccountNo === selectedLoanId ? '#ebeef2' : '#ffffff';
        const color = item.AccountNo === selectedLoanId ? 'grey' : 'black';

        return (
            <LoanItem
                item={item}
                onPress={() => setChosenLoanAccount(item.LoanNo, item.LoanName, item.LoanBal, item.LoanCode, item.LoanAccount)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const setChosenUtilitiesAccount = (utilitiesTypeNumber, utilitiesTypeName) => {
        setHasUtilitiesOpacity(!hasUtilitiesOpacity)

        global.transactionType = "Utilities";
        global.UtilitiesType = utilitiesTypeNumber;
        global.UtilitiesName = utilitiesTypeName;

        navigation.navigate("AccountDial")

    }

    const renderUtilitiesList = ({ item }) => {
        const backgroundColor = item.Type === selectedUtilitiesType ? '#ebeef2' : '#ffffff';
        const color = item.Type === selectedUtilitiesType ? 'grey' : 'black';

        return (
            <UtilityItem
                item={item}
                onPress={() => setChosenUtilitiesAccount(item.Type, item.Description)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const toDial = () => {
        navigation.navigate("Dial")
    }

    const chapchapLoan = () => {
        global.transactionType = "Loan";
        global.LoanAccountNumber = global.ChapChapLoanAccountNumber;
        global.loanAccountName = global.ChapChaploanAccountName;

        toDial();
    }

    const withdrawMoney = () => {
        global.transactionType = "Withdraw";
        global.withdrawAccountNumber = global.ordinaryAccNo;
        global.withdrawAccountName = global.ordinaryAccName;

        toDial();
    }

    const snakeCase = (string) => {
        const toSnakeCase = (str = "") => {
            const strArr = str.split(" ");
            const snakeArr = strArr.reduce((acc, val) => {
                return acc.concat(val.toLowerCase());
            }, []);
            return snakeArr.join("_");
        };
        const newText = toSnakeCase(string);
        return newText
    };

    const balanceApi = () => {

        balanceButton.showLoading(true);

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
                // // console.log("Before Error: ", balance_response[0].Is_Successful);

                let balance_arr = {};

                if (balance_response[0].Is_Successful) {
                    api_balance_details = balance_response[0].Account;
                    api_balance_details.forEach(api_balance_detail => {
                        // console.log(api_balance_detail, "\n")
                        balance_acc_name = api_balance_detail.AccountType.trim();
                        balance_acc_amount = api_balance_detail.Amount;

                        balance_arr[snakeCase(balance_acc_name)] = balance_acc_amount;

                    });

                    if (balance_arr.ordinary) {
                        setUserBalance({ value: balance_arr.ordinary })
                    } else {
                        setUserBalance({ value: "" })
                    }

                    // console.log(balance_arr);
                    global.account_balance_raw = api_balance_details;
                    global.account_balance = balance_arr;
                    // navigation.navigate("Home");
                    setHasBalanceOpacity(!hasBalanceOpacity)
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
            }).finally(() => balanceButton.showLoading(false));

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <ScrollView style={{ width: '100%', marginTop: 40 }}
                horizontal={false}>
                <View style={styles.homeHeader} >
                    <View style={styles.topHomeIcons}>
                        <TouchableOpacity style={styles.topIconsContainer}
                            onPress={() => navigation.navigate("")}>
                            <Image style={styles.topSideIcon} source={require('../assets/icons/alarm.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.topIconsContainer}
                            onPress={() => { navigation.navigate("Login") }}>
                            <Image style={styles.topSideIcon} source={require('../assets/icons/logout.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userInfo}>
                        <TouchableOpacity style={styles.userImg}
                            onPress={() => navigation.navigate("")}>
                            <Image style={styles.imagestyle} source={require('../assets/users/user.jpg')} />
                        </TouchableOpacity>
                        <View style={styles.homeHeaderText}>
                            <Text style={styles.salutation}>Hello,</Text>
                            <Text style={styles.userName}>{global.member_details.Name}</Text>
                        </View>
                    </View>
                    {hasBalanceOpacity ? (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <View style={styles.userBalance}>
                                <View style={styles.userBalanceHeader}>
                                    <Text style={{ fontSize: 12 }}>Ordinary Account Balance</Text>
                                </View>
                                <Text style={styles.balance}>KES {userBalance.value}</Text>
                            </View>
                            <View style={[styles.userBalance, { alignItems: 'flex-end' }]}>
                                <View style={styles.userBalanceHeader}>
                                    <Text style={{ fontSize: 12 }}>Chap Chap Loan Limit</Text>
                                </View>
                                <Text style={[styles.balance, { color: global.ChapChaploanLoanLimitColor }]}>KES {global.ChapChaploanLoanLimit}</Text>
                            </View>
                        </View>
                    ) : null}
                    {!hasBalanceOpacity ? (
                        <View style={styles.userBalanceButton}>
                            <Text style={{ marginStart: 30, marginBottom: 10 }}>Note: Balance Inquiry is a billable transaction</Text>
                            <AnimateLoadingButton
                                ref={c => (this.balanceButton = c)}
                                width={300}
                                height={50}
                                title="View Balance"
                                backgroundColor="#348bd3"
                                borderRadius={4}
                                onPress={balanceApi}
                            />
                        </View>
                    ) : null}
                </View>

                {/* Service */}
                <View style={[styles.homeMenu]} >
                    <Text style={{
                        position: 'absolute',
                        top: 0,
                        marginBottom: 50,
                        marginTop: 5,
                        fontWeight: "bold",
                        color: '#000000',
                        fontSize: 16,
                    }}>Services</Text>
                    <Row size={12} style={{
                        marginTop: 5,
                    }}>
                        <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                            <TouchableOpacity style={styles.menuIconsContainer}
                                onPress={() => {
                                    setHasDepositOpacity(!hasDepositOpacity)
                                }}>
                                <Image style={styles.menuIcons} source={require('../assets/icons/banknotes.png')} />
                            </TouchableOpacity>
                            <Text style={styles.menuItemText}>Deposit Money</Text>
                        </Col>
                        <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                            <TouchableOpacity style={styles.menuIconsContainer}
                                onPress={() => {
                                    // setHasWithdrawOpacity(!hasWithdrawOpacity)
                                    withdrawMoney()
                                }}>
                                <Image style={styles.menuIcons} source={require('../assets/icons/withdraw.png')} />
                            </TouchableOpacity>
                            <Text style={styles.menuItemText}>Withdraw Money</Text>
                        </Col>
                        <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                            <TouchableOpacity style={styles.menuIconsContainer}
                                onPress={() => {
                                    Toast.show({
                                        type: 'info',
                                        text1: 'Coming Soon ⌛',
                                        position: 'top'
                                    });
                                }}>
                                <Image style={styles.menuIcons} source={require('../assets/icons/bank-transfer.png')} />
                            </TouchableOpacity>
                            <Text style={styles.menuItemText}>Bank Transfer</Text>
                        </Col>
                        <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                            <TouchableOpacity style={styles.menuIconsContainer}
                                onPress={() => {
                                    chapchapLoan()
                                }}>
                                <Image style={styles.menuIcons} source={require('../assets/icons/loan.png')} />
                            </TouchableOpacity>
                            <Text style={styles.menuItemText}>Chapchap Loan</Text>
                        </Col>
                        <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                            <TouchableOpacity style={styles.menuIconsContainer}
                                onPress={() => {
                                    // setHasLoanOpacity(!hasLoanOpacity)
                                    navigation.navigate("Loan")
                                }}>
                                <Image style={styles.menuIcons} source={require('../assets/icons/signing.png')} />
                            </TouchableOpacity>
                            <Text style={styles.menuItemText}>Loan</Text>
                        </Col>
                        <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                            <TouchableOpacity style={styles.menuIconsContainer}
                                onPress={() => {
                                    Toast.show({
                                        type: 'info',
                                        text1: 'Coming Soon ⌛',
                                        position: 'top'
                                    });
                                }}>
                                <Image style={styles.menuIcons} source={require('../assets/icons/simcard.png')} />
                            </TouchableOpacity>
                            <Text style={styles.menuItemText}>Buy Airtime</Text>
                        </Col>
                        <Col sm={4} md={4} lg={3} style={styles.menuItem}>
                            <TouchableOpacity style={styles.menuIconsContainer}
                                onPress={() => {
                                    setHasUtilitiesOpacity(!hasUtilitiesOpacity)
                                }}>
                                <Image style={styles.menuIcons} source={require('../assets/icons/all-utilities.png')} />
                            </TouchableOpacity>
                            <Text style={styles.menuItemText}>Pay Utilities</Text>
                        </Col>
                    </Row>
                </View>

                {/* Withdraw Modal */}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={hasWithdrawOpacity}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setHasWithdrawOpacity(!hasWithdrawOpacity)
                        }}>
                        <View style={styles.centeredView}>
                            <View style={[styles.listContainer]}>
                                <Text style={styles.listTitle}>Select Account to Withdraw From</Text>
                                <View style={styles.divider}></View>
                                <FlatList style={[styles.homeMenuList]}
                                    data={global.debitable_accounts}
                                    renderItem={renderWithdrawAccountList}
                                    keyExtractor={(item) => item.AccountNo}
                                    extraData={selectedWithdrawId}
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setHasWithdrawOpacity(!hasWithdrawOpacity)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>

                {/* Deposit Modal */}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={hasDepositOpacity}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setHasDepositOpacity(!hasDepositOpacity)
                        }}>
                        <View style={styles.centeredView}>
                            <View style={[styles.listContainer]}>
                                <Text style={styles.listTitle}>Select Account to Deposit To</Text>
                                <View style={styles.divider}></View>
                                <FlatList style={[styles.homeMenuList]}
                                    data={global.creditable_accounts}
                                    renderItem={renderDepositAccountList}
                                    keyExtractor={(item) => item.AccountNo}
                                    extraData={selectedDepositId}
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setHasDepositOpacity(!hasDepositOpacity)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>

                {/* Loan Modal */}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={hasLoanOpacity}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setHasLoanOpacity(!hasLoanOpacity)
                        }}>
                        <View style={styles.centeredView}>
                            <View style={[styles.listContainer]}>
                                <Text style={styles.listTitle}>Select Loan to Proceed</Text>
                                <View style={styles.divider}></View>
                                <FlatList style={[styles.homeMenuList]}
                                    data={global.loan_accounts_list}
                                    renderItem={renderLoanAccountList}
                                    keyExtractor={(item) => item.LoanNo}
                                    extraData={selectedLoanId}
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setHasLoanOpacity(!hasLoanOpacity)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>

                {/* Utilities Modal */}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={hasUtilitiesOpacity}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setHasUtilitiesOpacity(!hasUtilitiesOpacity)
                        }}>
                        <View style={styles.centeredView}>
                            <View style={[styles.listContainer]}>
                                <Text style={styles.listTitle}>Select Utility Type</Text>
                                <View style={styles.divider}></View>
                                <FlatList style={[styles.homeMenuList]}
                                    data={global.account_utilities}
                                    renderItem={renderUtilitiesList}
                                    keyExtractor={(item) => item.Type}
                                    extraData={selectedUtilitiesType}
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setHasUtilitiesOpacity(!hasUtilitiesOpacity)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: "#E1F6FF",
        alignItems: 'center',
        flexDirection: 'column',
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
        fontSize: 16,
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
        marginTop: 20,
        alignItems: "flex-end"
    },
    homeHeader: {
        backgroundColor: "#ffffff",
        // height: '30%',
        margin: 10,
        paddingBottom: 40,
        paddingHorizontal: 30,
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 40,
        overflow: 'hidden',
    },
    userInfo: {
        marginTop: 0,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: 'row'
    },
    salutation: {
        color: '#000000',
        fontSize: 16,
    },
    homeHeaderText: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    userName: {
        fontWeight: "bold",
        color: '#000000',
        fontSize: 16,
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
    userBalanceButton: {
        marginTop: 30,
    },
    userBalanceHeader: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    balance: {
        marginTop: 10,
        fontWeight: "700",
        fontSize: 18,
        color: "#3e6cce",
    },
    userBalanceAmount: {
        marginTop: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
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
        width: 80,
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60
    },
    menuIcons: {
        width: 50,
        height: 50,
    },
    menuItemText: {
        fontSize: 14,
        color: 'black',
        width: 70,
        fontWeight: '700',
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 10,
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
        backgroundColor: "#F194FF",
    },
    buttonClose: {
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
    }
});

export default Home;