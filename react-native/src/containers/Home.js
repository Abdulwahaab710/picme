import React from 'react';
import{
    DatePickerIOS,
    Dimensions,
    Image,
    ListView,
    Modal,
    Picker,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {viewEvent} from 'actions';

import * as Constants from 'Constants';
import Header from 'Header';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            eventDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            timeZoneOffsetInMinutes: (-1) * (new Date()).getTimezoneOffset(),
            newEventModalVisible: false,
            joinEventModalVisible: false,
            newEventType: 'photos',
            newName: '',
            newDescription: '',
            newStartDate: new Date(),
            newEndDate: new Date(),
        }
    }

    _onNewEvent() {
        const defaultEndDate = new Date();
        defaultEndDate.setHours(defaultEndDate.getHours() + 1);

        this.setState({
            newEventModalVisible: true,
            newEventType: 'photos',
            newName: '',
            newDescription: '',
            newStartDate: new Date(),
            newEndDate: defaultEndDate,
        });
    }

    _onSubmitNewEvent() {
        this._hideModals();
    }

    _onJoinEvent() {
        fetch(`${Constants.Server.url}/events`, {
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
            .then((events) => {
                if (events == null) {
                    return;
                }
                this.setState({
                    joinEventModalVisible: true,
                    joinEventCode: '',
                    eventDataSource: this.state.eventDataSource.cloneWithRows(events),
                });
            })
            .catch((err) => console.error(err));
    }

    _onSubmitJoinEvent(eventId) {
        let selectedEvent = null;
        fetch(`${Constants.Server.url}/events/${eventId}`, {
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
                return fetch(`${Constants.Server.url}/submissions/${eventId}`, {
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
                }
                selectedEvent.submissions = submissions;
                this.props.onViewEvent(selectedEvent);
                this.props.navigator.push({id: 'event'});
                this._hideModals();
            })
            .catch((err) => console.error(err));
    }

    _hideModals() {
        this.setState({
            newEventModalVisible: false,
            joinEventModalVisible: false,
        });
    }

    _renderNewEventModal() {
        return (
            <View style={styles.baseModal}>
                <Header
                    title={'New event'}
                    leftButtonText={'Cancel'}
                    rightButtonText={'Create'}
                    onLeftButtonPress={this._hideModals.bind(this)}
                    onRightButtonPress={this._onSubmitNewEvent.bind(this)} />
                <LinearGradient colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]} style={styles.container}>
                    <ScrollView>
                        <View>
                            <Text style={styles.placeholder}>Name</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({newName: text})}
                                value={this.state.newName} />
                            <Text style={styles.placeholder}>Description</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({newDescription: text})}
                                value={this.state.newDescription} />
                            <Text style={styles.placeholder}>Type</Text>
                            <Picker
                                selectedValue={this.state.newEventType}
                                onValueChange={(value) => this.setState({newEventType: value})}>
                                <Picker.Item label='Photos' value='photos' />
                                <Picker.Item label='Text' value='text' />
                            </Picker>
                            <Text style={styles.placeholder}>Start time</Text>
                            <DatePickerIOS
                                date={this.state.newStartDate}
                                mode={'datetime'}
                                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInMinutes}
                                onDateChange={(date) => this.setState({newStartDate: date})} />
                            <Text style={styles.placeholder}>End time</Text>
                            <DatePickerIOS
                                date={this.state.newEndDate}
                                mode={'datetime'}
                                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInMinutes}
                                onDateChange={(date) => this.setState({newEndDate: date})} />
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        );
    }

    _renderEventRow(event) {
        return (
            <TouchableOpacity onPress={this._onSubmitJoinEvent.bind(this, event._id)}>
                <View style={styles.event}>
                    <Text style={styles.eventName}>{event.name}</Text>
                    <Text style={styles.eventDescription}>{event.description}</Text>
                </View>
                <View style={styles.separator} />
            </TouchableOpacity>
        );
    }

    _renderJoinEventModal() {
        return (
            <View style={styles.baseModal}>
                <Header
                    title={'Join event'}
                    leftButtonText={'Cancel'}
                    onLeftButtonPress={this._hideModals.bind(this)} />
                <LinearGradient colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]} style={styles.container}>
                    <ListView
                        dataSource={this.state.eventDataSource}
                        enableEmptySections={true}
                        renderRow={this._renderEventRow.bind(this)} />
                </LinearGradient>
            </View>
        );
    }

    render() {
        return (
            <LinearGradient colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]} style={[styles.container, styles.viewContainer]}>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.newEventModalVisible}
                    onRequestClose={this._hideModals.bind(this)}>
                    {this._renderNewEventModal()}
                </Modal>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.joinEventModalVisible}
                    onRequestClose={this._hideModals.bind(this)}>
                    {this._renderJoinEventModal()}
                </Modal>

                <Image
                    resizeMode={'contain'}
                    source={require('../../assets/header.png')}
                    style={styles.header} />
                <TouchableOpacity
                    onPress={this._onNewEvent.bind(this)}
                    style={styles.buttonWrapper}>
                    <Text style={styles.btn}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._onJoinEvent.bind(this)}
                    style={styles.buttonWrapper}>
                    <Text style={styles.btn}>Join</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    baseModal: {
        flex: 1,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Constants.Colors.gray,
    },
    event: {
        padding: Constants.Sizes.Margins.regular,
    },
    eventName: {
        backgroundColor: 'transparent',
        color: Constants.Colors.primaryBlack,
        fontSize: Constants.Sizes.Text.Body,
    },
    eventDescription: {
        backgroundColor: 'transparent',
        color: Constants.Colors.secondaryBlack,
        fontSize: Constants.Sizes.Text.secondaryBody,
    },
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
        padding: Constants.Sizes.Margins.regular,
        marginVertical: 5,
    },
    textInput: {
        backgroundColor: Constants.Colors.secondaryWhite,
        height: 40,
        marginLeft: Constants.Sizes.Margins.regular,
        marginRight: Constants.Sizes.Margins.regular,
    },
    placeholder: {
        marginLeft: Constants.Sizes.Margins.regular,
        marginTop: Constants.Sizes.Margins.regular,
        backgroundColor: 'transparent',
        color: Constants.Colors.secondaryBlack,
        fontSize: Constants.Sizes.Text.secondaryBody,
    },
    header: {
        width: screenWidth,
        height: screenWidth * 0.4,
    },
    viewContainer: {
        justifyContent: 'center',
    }
});

// Map state to props
const select = (store) => {
  return {};
};

// Map dispatch to props
const actions = (dispatch) => {
    return {
        onViewEvent: (event) => dispatch(viewEvent(event)),
    };
};

export default connect(select, actions)(Home);
