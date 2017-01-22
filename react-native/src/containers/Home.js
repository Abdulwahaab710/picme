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
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default class Home extends React.Component {

    _onNewEvent() {
        console.log('Create new event...');
    }

    _onJoinEvent() {
        console.log('Join event...');
    }

    render() {
        return (
            <LinearGradient
                colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]}
                style={styles.viewContainer}>
                <Image
                    resizeMode={'contain'}
                    source={require('../../assets/header.png')}
                    style={styles.header} />
                <TouchableOpacity style={styles.buttonWrapper}>
                    <Text style={styles.btn}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrapper}>
                    <Text style={styles.btn}>Join</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    buttonWrapper: {
        alignSelf: 'center',
    },
    btn: {
        color: Constants.Colors.primaryWhite,
        borderColor: Constants.Colors.primaryWhite,
        borderStyle: 'solid',
        borderWidth: 1,
        width: 120,
        textAlign: 'center',
        padding: 10,
        marginVertical: 5,
    },
    header: {
        width: screenWidth,
        height: screenWidth * 0.4,
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
});
