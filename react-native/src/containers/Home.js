import React from 'react';
import{
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity
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
                <Image
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    style={{width: 400, height: 200}}/>
                <View style={styles.viewContainer}>
                    <Text style={styles.label}>
                    Events
                    </Text>
                    <TouchableOpacity style={{ alignSelf: 'center' }}>
                        <Text style={styles.btn}>
                            New
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: 'center' }}>
                        <Text style={styles.btn}>
                            Join
                        </Text>
                    </TouchableOpacity>
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
        fontSize: 25,
        fontWeight: 'bold',
    },
    btnText: {
        padding: 10,
    },
    btn: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        width: 120,
        textAlign: 'center',
        padding: 10,
        marginVertical: 5,
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    }
});
