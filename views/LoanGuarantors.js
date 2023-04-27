import { Platform, StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function LoanGuarantors({ navigation }) {
    const [text, setText] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.pageHeader}>
            <TouchableOpacity style={styles.back}
                onPress={() => navigation.navigate("Home")}>
                <Icon name={"arrow-left-thin"} borderRadius={20} size={35} color={theme.colors.text} />
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
            <View style={{ marginTop: 100 }}>
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

                    <View style={styles.loansSectionTitle}>
                        <Image style={styles.loansSectionTitleImage} source={require('../assets/icons/users.png')} />
                        <Text style={styles.loansSectionTitleText}>Suggested Guarantors</Text>
                    </View>

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
                        </View>
                    </ScrollView>
                </View>
            </View>

            <Row size={12} style={styles.confirmationContainer}>
                <Col sm={12} md={12} lg={12} style={{ marginBottom: 0 }}>
                    <TouchableOpacity style={styles.confirmation}
                        onPress={() => navigation.navigate("LoanApplication")}>
                        <Text style={styles.confirmationText}>CONTINUE</Text>
                    </TouchableOpacity>
                </Col>
            </Row>
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
        height: 100
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
        width: "100%",
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    paymentAmount: {
        fontWeight: 'bold',
        fontSize: 16
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
        fontSize: 16,
        width: "100%"
    },
    scrollViewStyle: {
        marginTop: 10,
        paddingRight: 30
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
        fontSize: 16,
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
});