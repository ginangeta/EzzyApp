import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, StatusBar } from "react-native";
import { Column as Col, Row } from 'react-native-flexbox-grid';
import React, { useState } from "react";

export default function Password({ navigation }) {
    const [text, setText] = useState("");
    const onPressHandler = (index) => setText(text + index);
    const onDeleteHandler = (index) => setText(text.slice(0, -1));

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#3e6cce" barStyle="light-content" />
            <View style={styles.dailPad}>
                <View style={styles.dailPadInput}>
                    <TextInput
                        style={styles.dailPadInputText}
                        placeholder="...."
                        onChangeText={newText => setText(newText)}
                        editable={false}
                        value={text} />
                </View>
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
                        <TouchableOpacity style={styles.dailPadContainer}
                            onPress={() => navigation.navigate("Dial")}>
                            <Text style={styles.dailPadItemCancel}>Cancel</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onPressHandler.bind(this, 0)}>
                            <Text style={styles.dailPadItemText}>0</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={3} style={styles.dailPadItem}>
                        <TouchableOpacity style={styles.dailPadContainer} onPress={onDeleteHandler.bind(this, 0)}>
                            <Image style={styles.dailPadDelete} source={require('../../assets/icons/delete-white.png')} />
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
        backgroundColor: '#3e6cce',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    dailPadInput: {
        width: "100%",
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dailPadInputText: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    dailPad: {
        position: 'absolute',
        bottom: 60,
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
        color: 'white',
        fontWeight: "700",
    }, dailPadItemCancel: {
        fontSize: 20,
        color: 'white',
        fontWeight: "700",
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
        width: "100%",
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#3e6cce",
    },
    confirmationText: {
        color: "white",
        fontSize: 22,
        fontWeight: "700"
    }
});