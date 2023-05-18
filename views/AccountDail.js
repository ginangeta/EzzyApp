import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, Button, Image, TouchableOpacity, StatusBar } from "react-native";
import { Column as Col, Row } from 'react-native-flexbox-grid';
import { StackActions } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import VirtualKeyboard from 'react-native-virtual-keyboard'
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
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    style={{
                        padding: 15,
                        maxWidth: 350,
                    }}>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text
                            style={{
                                paddingTop: 24,
                                paddingBottom: 10,
                                color: theme.colors.primary,
                                fontSize: 24,
                                textAlign: 'center',
                            }}>
                            Enter Account
                        </Text>
                        <Text
                            style={{
                                paddingTop: 10,
                                paddingBottom: 58,
                                color: theme.colors.primary,
                                fontSize: 16,
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
                                    <Text numberOfLines={1}
                                        adjustsFontSizeToFit
                                        style={styles.dailPadCurrency}>{global.UtilitiesName}</Text>
                                </Col>
                            </Row>
                            <VirtualKeyboard
                                color='black'
                                cellStyle={{
                                    justifyContent: 'center',
                                    borderWidth: 2,
                                    padding: 10,
                                    margin: 5,
                                    borderRadius: 50,
                                    borderColor: 'lightgrey'
                                }}
                                backspaceImg={require("../assets/icons/delete-black-small.png")}
                                textStyle={{
                                    fontSize: 14
                                }}
                                pressMode='string'
                                onPress={
                                    (text) => setText(text)} />
                            <TouchableOpacity style={styles.confirmation}
                                onPress={toConfirmation}>
                                <Text style={styles.confirmationText}>CONTINUE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
        fontSize: 26,
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
        height: 75,
        borderWidth: 2,
        margin: 10,
        borderRadius: 50,
        borderColor: 'lightgrey',
    },
    dailPadItemText: {
        fontSize: 18,
        color: 'black',
        fontWeight: "400",
    },
    dailPadDelete: {
        height: 30,
        width: 40
    },
    dailPadCurrency: {
        fontSize: 18,
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
        fontSize: 16,
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