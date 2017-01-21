import React from 'react';
import{
    Image,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class Home extends React.Component {

    static get defaultProps(){
        return{
            title: 'Home'
        };
    }

    render(){
        return (
            <View style={styles.viewContainer}>
                <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                style={{width: 400, height: 200}}/>
                <View style={styles.Body}>
                    <Text style={styles.label}>
                    Events
                    </Text>
                    <Button
                        style={styles.button}
                        title="New"
                        color="#841584"/>
                    <Button
                        style={styles.button}
                        title="Join"
                        color="#841584"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        alignItems: 'center',
        color: 'black',
        textAlign: 'center',
    },
    button: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
    },
});
