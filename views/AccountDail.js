import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, StatusBar } from "react-native";
import { Column as Col, Row } from 'react-native-flexbox-grid';
import React, { useState } from "react";
import Toast from 'react-native-toast-message';

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
                    position: 'bottom'
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
                    position: 'bottom'
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
                position: 'bottom'
            });
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <TouchableOpacity style={styles.back}
                onPress={() => navigation.navigate("Home")}>
                <Image style={styles.backIcon} source={require('../assets/icons/black-left-arrow.png')} />
            </TouchableOpacity>
            <View style={styles.dailPad}>
                <View style={styles.dailPadInput}>
                    <TextInput
                        style={styles.dailPadInputText}
                        placeholder="Enter account!"
                        onChangeText={newText => setText(newText)}
                        editable={false}
                        value={text} />
                </View>
                <Row size={12}>
                    <Col sm={12} style={styles.dailPadItem}>
                        {/* <Text style={styles.dailPadCurrency}>KSH</Text> */}
                    </Col>
                </Row>
                <Row size={12}>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 1)}>
                            <Text style={styles.dailPadItemText}>1</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 2)}>
                            <Text style={styles.dailPadItemText}>2</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 3)}>
                            <Text style={styles.dailPadItemText}>3</Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row size={12}>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 4)}>
                            <Text style={styles.dailPadItemText}>4</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 5)}>
                            <Text style={styles.dailPadItemText}>5</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 6)}>
                            <Text style={styles.dailPadItemText}>6</Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row size={12}>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 7)}>
                            <Text style={styles.dailPadItemText}>7</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 8)}>
                            <Text style={styles.dailPadItemText}>8</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 9)}>
                            <Text style={styles.dailPadItemText}>9</Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row size={12}>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, '00')}>
                            <Text style={styles.dailPadItemText}>00</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 0)}>
                            <Text style={styles.dailPadItemText}>0</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onDeleteHandler.bind(this, 0)}>
                            <Image style={styles.dailPadDelete} source={require('../assets/icons/delete.png')} />
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row size={12} style={{ marginBottom: 0 }}>
                    <Col sm={12} md={12} lg={12} style={{ marginBottom: 0 }}>
                        <TouchableOpacity style={styles.confirmation}
                            onPress={toConfirmation}>
                            <Text style={styles.confirmationText}>CONTINUE</Text>
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
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    dailPad: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dailPadContainer: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dailPadItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },
    dailPadItemText: {
        fontSize: 30,
        color: 'black',
        fontWeight: "700",
    },
    dailPadDelete: {
        height: 40,
        width: 50
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
        width: "100%",
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#3e6cce",
    },
    confirmationText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    },
    back: {
        height: 20,
        width: 20,
        marginTop: 50,
        marginLeft: 15,
        padding: 10,
        position: 'absolute'
    }
});