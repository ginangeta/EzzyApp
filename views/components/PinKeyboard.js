import React, { Component } from 'react';
import PinKey from '../components/PinKey';
import { Text, View, StyleSheet } from 'react-native';


export default class PinKeyboard extends Component {
    render() {
        return (
            <View style={styles.pinKeyboard}>
                <PinKey label='1' />
                <PinKey label='2' label2='ABC' />
                <PinKey label='3' label2='DEF' />
                <PinKey label='4' label2='GHI' />
                <PinKey label='5' label2='JKL' />
                <PinKey label='6' label2='MNO' />
                <PinKey label='7' label2='PQRS' />
                <PinKey label='8' label2='TUV' />
                <PinKey label='9' label2='WXYZ' />
                <PinKey label='' />
                <PinKey label='0' />
                <PinKey label='' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pinKeyboard: {
        flex: -1,
        flexShrink: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
