import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import React from "react";

export default function Statement({ navigation }) {
    const [data, setData] = useState([]);

    const miniStatementRequest = {
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

    const fetchData = async () => {
        const resp = await fetch("https://testasili.devopsfoundry.cloud:8050/Ministatement", miniStatementRequest)
            .then(response => response.json())
            .then(response => {
                const data = response[0].ministatements;
                console.log(data)
                setData(data);
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                });
                console.log(err);

            });

    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={{
            justifyContent: 'space-between',
            alignContent: 'space-between',
            flexDirection: 'row',
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 0.5,
            paddingHorizontal: 10,
            marginBottom: 10,
            paddingBottom: 10,
        }}>
            <View style={{
                marginHorizontal: 10,
                marginVertical: 10,
            }}>
                <Text>{item.desc}</Text>
                <Text style={{
                    fontWeight: "bold",
                }}>
                    <Image style={styles.topIcons} source={String(item.amount).includes("-") ? require('../assets/icons/expenses.png') : require('../assets/icons/income.png')} />
                    KES {item.amount}
                </Text>
            </View>
            <Text>{item.date}</Text>
        </View>
    );

    return (
        <View style={{
            paddingTop: 50,
            paddingBottom: 20,
            marginHorizontal: 15,
            marginTop: 10,
            backgroundColor: 'white',
        }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.desc.toString()}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        paddingBottom: 10,
        fontSize: 20,
        textAlign: "center",
    },
});