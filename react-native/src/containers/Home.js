import React from 'react';
import{
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Home extends React.Component {

    static get defaultProps(){
        return{
            title: 'Home'
        };
    }

    render(){
        return (
            <View>
                <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                style={{width: 400, height: 200}}/>
                <Text style={styles.label}>
                    Events
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        alignItems: 'center',
        color: 'black',
    }
});
