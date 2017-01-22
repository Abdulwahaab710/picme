import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity
} from 'react-native';

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
            <View>
                <View
                    style={styles.header}>
                    <Text
                        style={styles.headerTxt}>
                        {eventName}
                    </Text>
                    <TouchableOpacity style={styles.backBtn}>
                        <Text>{'<'}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TextInput
                        style={styles.description}
                        multiline={true}
                        onChangeText={(description) => this.setState({description})}
                        numberOfLines={10}
                        value={this.state.description}/>
                </View>

                <View
                    style={styles.submissions}>
                </View>

                <View
                    style={styles.vote}>
                    <TouchableOpacity style={styles.btnVote}>
                        <Text style={styles.btnVoteTxt}>Vote</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        backgroundColor: 'blue',
        height: 50,
        alignItems: 'center',
    },
    headerTxt: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    description: {
        height: 200,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 4,
    },
    submissions: {

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
    }
});
