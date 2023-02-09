import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PinBox from '../components/PinBox';
import { Text, View, StyleSheet } from 'react-native';


export default class PinBoxList extends Component {
    static propTypes = {
        pinValue: PropTypes.string,
        pinLength: PropTypes.number,
    };

    render() {
        return (
            <View
                style={{
                    flex: -1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                {this.renderPills()}
            </View>
        );
    }

    renderPills() {
        let pills = [];

        for (var i = 0; i < this.props.pinLength; i++) {
            pills.push(this.renderPill(i + 1));
        }

        return pills;
    }

    renderPill(index) {
        return (
            <PinBox
                key={index}
                hasValue={this.props.pinValue && this.props.pinValue.length >= index}
            />
        );
    }
}
