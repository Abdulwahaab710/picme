import React from 'react';
import{
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {viewEvent, viewSubmissions} from 'actions';

import * as Constants from 'Constants';
import Header from 'Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Vote extends React.Component {

    constructor() {
        super();
        this.state = {
            submissions: [],
            submissionIds: [],
        }
    }

    componentDidMount() {
        this._refreshImages();
    }

    _refreshImages() {
        fetch(`${Constants.Server.url}/random/${this.props.event._id}`, {
            method: 'GET',
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((submissions) => {
                if (submissions == null) {
                    return;
                }
                this.setState({
                    submissions: [
                        submissions[0].photo,
                        submissions[1].photo,
                    ],
                    submissionIds: [
                        submissions[0]._id,
                        submissions[1]._id,
                    ],
                })
            })
            .catch((err) => console.error(err));
    }

    _onSubmitVote(submissionIndex) {
        fetch(`${Constants.Server.url}/vote`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.submissionIds[submissionIndex],
            })})
            .then(() => {
                console.log('Refreshing images, voted for ' + submissionIndex);
                this._refreshImages();
            })
            .catch((err) => console.error(err));
    }

    _onBack() {
        fetch(`${Constants.Server.url}/events/${this.props.event._id}`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            }})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((event) => {
                if (event == null) {
                    return;
                }
                selectedEvent = event;
                return fetch(`${Constants.Server.url}/submissions/${this.props.event._id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                }});
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((submissions) => {
                if (submissions == null) {
                    return;
                };
                this.props.onViewEvent(selectedEvent);
                this.props.onViewSubmissions(submissions);
                this.props.navigator.pop();
            })
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <LinearGradient colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]} style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this._onBack.bind(this)}>
                        <Icon
                            style={styles.backBtn}
                            name={'arrow-back'}
                            size={24}
                            color={Constants.Colors.primaryWhite} />
                    </TouchableOpacity>
                    <Text style={styles.headerTxt}>
                        {this.props.event.name}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this._onSubmitVote.bind(this, 0)}>
                        <Image
                            resizeMode={'cover'}
                            style={styles.comparableImage}
                            source={{uri: this.state.submissions[0]}} />
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity onPress={this._onSubmitVote.bind(this, 1)}>
                        <Image
                            resizeMode={'cover'}
                            style={styles.comparableImage}
                            source={{uri: this.state.submissions[1]}}/>
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
    comparableImage: {
        width: screenWidth,
        height: (screenHeight - 80 - Constants.Sizes.Margins.compact) / 2,
    },
    backBtn: {
        paddingHorizontal: Constants.Sizes.Margins.regular,
    },
    header: {
        paddingTop: 20,
        backgroundColor: Constants.Colors.grey,
        height: 80,
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerTxt: {
        color: Constants.Colors.primaryWhite,
        fontSize: Constants.Sizes.Text.title,
    },
    separator: {
        backgroundColor: Constants.Colors.grey,
        height: Constants.Sizes.Margins.compact,
    },
});

// Map state to props
const select = (store) => {
  return {
      event: store.events.event,
  };
};

// Map dispatch to props
const actions = (dispatch) => {
    return {
        onViewEvent: (event) => dispatch(viewEvent(event)),
        onViewSubmissions: (submissions) => dispatch(viewSubmissions(submissions)),
    };
};

export default connect(select, actions)(Vote);
