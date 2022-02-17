import { FlatList, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import React from "react";

export default function CoffeeList({ navigation }) {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const resp = await fetch("https://api.sampleapis.com/coffee/hot");
        const data = await resp.json();
        setData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <Text style={styles.text}>{item.title}</Text>
    );

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        paddingBottom: 15,
        fontSize: 20,
        textAlign: "center",
    },
});