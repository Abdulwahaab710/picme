import React from 'react';
import{
    Image,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import * as Constants from 'Constants';
import Header from 'Header';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default class Vote extends React.Component {
    render() {
        return (
            <LinearGradient colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]} style={[styles.container, styles.viewContainer]}>
                <View style={styles.header}>
                    
                </View>
                <View>
                    <TouchableOpacity>
                        <Image
                            style={{ 
                                width: Dimensions.get('window').width,
                                height: (Dimensions.get('window').height - 60)/2,
                                
                            }}
                            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                    </TouchableOpacity>
                        <View style={{
                            backgroundColor: Constants.Colors.primaryWhite,
                            height: 4
                        }}></View>
                    <TouchableOpacity>
                        <Image
                            style={{ 
                                width: Dimensions.get('window').width,
                                height: (Dimensions.get('window').height - 60)/2
                            }}
                            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }
}

const styles = Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 1
    },
    header: {
        marginTop: 20,
        backgroundColor: Constants.Colors.grey,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row'
    },
});
