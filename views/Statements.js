import {
    SafeAreaView,
    Text,
    StyleSheet,
    ImageBackground,
    View,
    Image,
    FlatList,
    TextInput,
} from 'react-native';
import { useState, useEffect } from "react";
import React from "react";

export default function Statement({ navigation }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
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

        const resp = await fetch("https://asili.devopsfoundry.cloud:7074/" + "Ministatement", miniStatementRequest)
            .then(response => response.json())
            .then(response => {
                const data = response[0].ministatements;
                // console.log(data)
                setData(data);
                setFilteredData(data);
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: err,
                    position: 'top'
                });
                // console.log(err);

            });

    };

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the data and update filteredData
            const newData = data.filter(function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.desc ? item.desc.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update filteredData with data
            setFilteredData(data);
            setSearch(text);
        }
    };

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const renderItem = ({ item }) => (
        <View style={{
            justifyContent: 'space-between',
            alignContent: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginBottom: 5,
            paddingBottom: 5,
            marginTop: 5,
            paddingTop: 5,
        }}>
            <View style={{
                marginTop: 10,
                marginVertical: 10,
                alignSelf: 'center'
            }}>
                <Text>{item.desc.toUpperCase()}</Text>
                <Text style={{
                    fontWeight: "bold",
                    backgroundColor: "Red",
                }}>
                    <Image style={{ marginHorizontal: 10, marginHorizontal: 10 }} source={String(item.amount).includes("-") ? require('../assets/icons/expenses.png') : require('../assets/icons/income.png')} />
                    KES {item.amount}
                </Text>
            </View>
            <Text style={{ alignSelf: 'center' }}>{item.date}</Text>
        </View>
    );

    return (
        <ImageBackground source={require('./src/assets/celian_blue.jpg')}
            resizeMode="cover" imageStyle={{ opacity: 0.2 }} style={styles.container}>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => item.desc.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={renderItem}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    text: {
        paddingBottom: 10,
        fontSize: 18,
        textAlign: "center",
    },
    backgroundImage: {
        alignSelf: 'stretch',
        width: null,
    },
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
        height: 40,
        height: 45,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: 'grey',
        borderRadius: 50,
        color: 'black'
    },

});