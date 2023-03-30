import { StyleSheet, SafeAreaView, View, Text, TextInput, Button, Image, TouchableOpacity, StatusBar } from "react-native";
import { Column as Col, Row } from 'react-native-flexbox-grid';
import { StackActions } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import IOSIcon from "react-native-vector-icons/Ionicons"
import React, { useState } from "react";
import Toast from 'react-native-toast-message';
import { theme } from './core/theme'
import PinBackground from './components/PinBackground';

export default function AccountDial({ navigation }) {
    const [text, setText] = useState("");
    const onPressHandler = (index) => setText(text + index);
    const onDeleteHandler = (index) => setText(text.slice(0, -1));

    const toConfirmation = () => {
        if (global.transactionType == "Utilities") {
            if (!text) {
                Toast.show({
                    type: 'error',
                    text1: 'Failed',
                    text2: 'Amount Cannot Be Empty 🛑',
                    position: 'top'
                });
                return
            } else {
                global.transaction_account = text;
                navigation.navigate("Dial");
            }
        } else if (global.transactionType == "Deposit") {
            if (!text) {
                Toast.show({
                    type: 'error',
                    text1: 'Failed',
                    text2: 'Amount Cannot Be Empty 🛑',
                    position: 'top'
                });
                return
            } else {
                global.transaction_account = text;
                navigation.navigate("Dial");
            }
        } else {
            Toast.show({
                type: 'info',
                text1: 'Coming Soon ⌛',
                position: 'top'
            });
        }
    }

    return (
        <PinBackground style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <TouchableOpacity style={styles.back}
                onPress={() => navigation.navigate("Home")}>
                <Icon name={"arrow-left-thin"} borderRadius={20} size={35} color={theme.colors.text} />
            </TouchableOpacity>

            <SafeAreaView
                style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.8)", justifyContent: 'center', paddingTop: 50, alignItems: "center", width: "100%" }}>
                <View style={{
                    padding: 15,
                    maxWidth: 350,
                }}>
                    <Text
                        style={{
                            paddingTop: 24,
                            paddingBottom: 10,
                            color: theme.colors.primary,
                            fontSize: 28,
                            textAlign: 'center',
                        }}>
                        Enter Account
                    </Text>
                    <Text
                        style={{
                            paddingTop: 10,
                            paddingBottom: 58,
                            color: theme.colors.primary,
                            fontSize: 18,
                            textAlign: 'center',
                        }}>
                        Kindly input the account you wish to send to
                    </Text>
                    <View style={styles.dailPad}>
                        <View style={styles.dailPadInput}>
                            <TextInput
                                style={styles.dailPadInputText}
                                placeholder=""
                                onChangeText={newText => setText(newText)}
                                editable={false}
                                value={text} />
                        </View>
                        <Row size={12}>
                            <Col sm={12} style={styles.dailPadItemNoBorder}>
                                <Text style={styles.dailPadCurrency}>{global.UtilitiesName}</Text>
                            </Col>
                        </Row>
                        <Row size={12}>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 1)}>
                                    <Text style={styles.dailPadItemText}>1</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 2)}>
                                    <Text style={styles.dailPadItemText}>2</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 3)}>
                                    <Text style={styles.dailPadItemText}>3</Text>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row size={12}>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 4)}>
                                    <Text style={styles.dailPadItemText}>4</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 5)}>
                                    <Text style={styles.dailPadItemText}>5</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 6)}>
                                    <Text style={styles.dailPadItemText}>6</Text>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row size={12}>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 7)}>
                                    <Text style={styles.dailPadItemText}>7</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 8)}>
                                    <Text style={styles.dailPadItemText}>8</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 9)}>
                                    <Text style={styles.dailPadItemText}>9</Text>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row size={12}>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, '00')}>
                                    <Text style={[styles.dailPadItemText, { fontSize: 20 }]}>00</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItem}>
                                <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 0)}>
                                    <Text style={styles.dailPadItemText}>0</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col sm={3} md={3} lg={3} style={styles.dailPadItemNoBorder}>
                                <TouchableOpacity style={[styles.dailPadContainer, { padding: 0 }]} onPress={onDeleteHandler.bind(this, 0)}>
                                    {/* <Image style={styles.dailPadDelete} source={require('../assets/icons/delete.png')} /> */}
                                    <IOSIcon name={"ios-backspace"} size={46} color={theme.colors.primary} />
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <TouchableOpacity style={styles.confirmation}
                            onPress={toConfirmation}>
                            <Text style={styles.confirmationText}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </PinBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    dailPadInput: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    dailPadInputText: {
        fontSize: 30,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center'
    },
    dailPad: {
        // position: 'absolute',
        // bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dailPadContainer: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    dailPadItemNoBorder: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    dailPadItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        borderWidth: 2,
        margin: 10,
        borderRadius: 50,
        borderColor: 'lightgrey',
    },
    dailPadItemText: {
        fontSize: 20,
        color: 'black',
        fontWeight: "400",
    },
    dailPadDelete: {
        height: 30,
        width: 40
    },
    dailPadCurrency: {
        fontSize: 20,
        color: 'black',
        fontWeight: "700",
        backgroundColor: "#dfe7fa",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 30
    },
    confirmation: {
        width: "80%",
        justifyContent: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 50,
        paddingHorizontal: 50,
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },
    confirmationText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    },
    back: {
        // height: 20,
        // width: 20,
        marginTop: 40,
        marginLeft: 5,
        zIndex: 100,
        padding: 20,
        position: 'absolute'
    }
});