import React from 'react';
import{
    Image,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
const onButtonPress = () => {
      Alert.alert('Button has been pressed!');
};

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
                        onPress={onButtonPress}
                        style={styles.btn}
                        color="black"
                        title="New"/>
                    <Button
                        onPress={onButtonPress}
                        style={styles.btn}
                        color="black"
                        title="Join"/>
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
    btn: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        color: 'black',
    },
});
