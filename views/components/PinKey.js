import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

export default class PinKey extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        label2: PropTypes.string,
    };

    // constructor(props) {
    //     super({ label2: '', ...props });
    // }

    static get defaultProps() {
        return {
            label2: '',
        }
    }

    // static defaultProps = {
    //     label2: '',
    // };

    render() {
        return (
            <View style={[styles.pinKey, this.props.label.length == 0 && styles.pinKeyEmpty]}>
                <Text style={{ fontSize: 26 }}>{this.props.label}</Text>
                <Text style={{ fontSize: 12 }}>{this.props.label2}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pinKey: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 130,
        height: 70,
        borderWidth: 1,
        borderColor: 'rgb(239, 239, 244)',
        flexGrow: 1,
        paddingTop: 8
    },
    pinKeyEmpty: {
        backgroundColor: 'rgb(239, 239, 244)',
    },
});