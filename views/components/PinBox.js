import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

export default class PinBox extends Component {
    static propTypes = {
        hasValue: PropTypes.bool,
    };

    render() {
        return (
            <View
                style={{
                    borderBottomWidth: 3,
                    borderBottomColor: 'black',
                    height: 30,
                    width: 30,
                    marginRight: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {this.props.hasValue && <Text>•</Text>}
            </View>
        );
    }
}
