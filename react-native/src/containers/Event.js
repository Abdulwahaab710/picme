import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';

import * as Constants from 'Constants';
import LinearGradient from 'react-native-linear-gradient';
const screenWidth = Dimensions.get('window').width;

export default class Event extends React.Component{
    constructor(props) {
        super(props);
        this.state = { description:'' };
    }
    static get defaultProps(){
        return{
            title: 'Event'
        };
    }

    render(){
        let eventName = 'Event Name'
        return (
            <LinearGradient
                colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]}
                style={{ flex:1, }}>
                <View
                    style={styles.header}>
                    <TouchableOpacity style={styles.backBtn}>
                        <Text style={styles.headerTxt}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.headerTxt}>
                        {eventName}
                    </Text>
                </View>

                <View>
                    <Text>Description</Text>
                    <TextInput
                        style={styles.description}
                        multiline={true}
                        onChangeText={(description) => this.setState({description})}
                        numberOfLines={10}
                        value={this.state.description}/>
                </View>

                <View
                    style={styles.submissions}>
                    <Text>Submissions</Text>
                    <ScrollView
                        horizontal={true}>
                            <Image
                                style={styles.imgScroll}
                                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                            <Image
                                style={styles.imgScroll}
                                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                            <Image
                                style={styles.imgScroll}
                                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                            <Image
                                style={styles.imgScroll}
                                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                            <Image
                                style={styles.imgScroll}
                                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>

                    </ScrollView>
                </View>

                <View
                    style={styles.vote}>
                    <TouchableOpacity style={styles.btnVote}>
                        <Text style={styles.btn}>Vote</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        backgroundColor: 'blue',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerTxt: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        paddingHorizontal: 4
    },
    description: {
        height: 200,
        backgroundColor: '#ffffff77',
        borderColor: Constants.Colors.primaryWhite,
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 4,
    },
    submissions: {

    },
    btn: {
        color: Constants.Colors.primaryWhite,
        borderColor: Constants.Colors.primaryWhite,
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        padding: 10,
        marginVertical: 5,
    },
    vote: {

    },
    btnVote: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    imgScroll: {
        width: 150,
        height: 150,
        marginHorizontal: 5
    }
});
