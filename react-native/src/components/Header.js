/**
 * @providesModule Header
 */

import React from 'react';
import{
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import * as Constants from 'Constants';
const screenWidth = Dimensions.get('window').width;

export default class Header extends React.Component {

    _onLeftButton() {
        this.props.onLeftButtonPress && this.props.onLeftButtonPress();
    }

    _onRightButton() {
        this.props.onRightButtonPress && this.props.onRightButtonPress();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                {this.props.leftButtonText == null
                    ? null
                    :
                    <View style={styles.leftButtonWrapper}>
                        <TouchableOpacity onPress={this._onLeftButton.bind(this)}>
                            <Text style={styles.buttonText}>{this.props.leftButtonText}</Text>
                        </TouchableOpacity>
                    </View>}
                {this.props.rightButtonText == null
                    ? null
                    :
                    <View style={styles.rightButtonWrapper}>
                        <TouchableOpacity onPress={this._onRightButton.bind(this)}>
                            <Text style={styles.buttonText}>{this.props.rightButtonText}</Text>
                        </TouchableOpacity>
                    </View>}
            </View>
        );
    }
}

const bottomMargin = 5;
const buttonEdgePadding = 10;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: screenWidth,
        height: 64,
        backgroundColor: Constants.Colors.grey,
        alignItems: 'flex-end',
        paddingBottom: bottomMargin,
    },
    title: {
        width: screenWidth,
        textAlign: 'center',
        color: Constants.Colors.primaryWhite,
        fontSize: 20,
    },
    buttonText: {
        color: Constants.Colors.paleBlue,
        fontSize: 16,
    },
    leftButtonWrapper: {
        position: 'absolute',
        left: buttonEdgePadding,
        bottom: bottomMargin,
    },
    rightButtonWrapper: {
        position: 'absolute',
        right: buttonEdgePadding,
        bottom: bottomMargin,
    },
});
