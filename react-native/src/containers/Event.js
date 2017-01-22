import React from 'react';
import {
    Dimensions,
    Image,
    ListView,
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
const ImagePicker = require('react-native-image-picker');

const screenWidth = Dimensions.get('window').width;

const imagePickerOptions = {
  title: 'Select submission',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  }
};

class Event extends React.Component {

    constructor() {
        super();
        this.state = {
            submissionDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            loaded: false,
        }
    }

    componentDidMount() {
        if (!this.state.loaded) {
            this._loadEvent();
        }
    }

    _loadEvent() {
        this.setState({
            loaded: true,
            submissionDataSource: this.state.submissionDataSource.cloneWithRows(this.props.event.submissions),
        });
        console.log('Submissions: ' + JSON.stringify(this.props.event.submissions));
    }

    _onBack() {
        this.props.navigator.pop();
    }

    _onVote() {

    }

    _onNewSubmission() {

    }

    _renderSubmission(submission) {
        return (
            <Image
                resizeMode={'cover'}
                style={styles.submissionImage}
                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
        );
    }

    render() {
        return (
            <LinearGradient
                colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]}
                style={{ flex:1, }}>
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

                <View style={styles.description}>
                    <View style={styles.descriptionHeader}>
                        <Text style={styles.lbl}>Description</Text>
                    </View>
                    <Text style={styles.body}>{this.props.event.description}</Text>
                </View>

                <View style={styles.fill} />

                <View style={styles.submissions}>
                    <View style={styles.submissionHeader}>
                        <Text style={styles.lbl}>Submissions</Text>
                        <View style={styles.fill} />
                        <TouchableOpacity onPress={this._onNewSubmission.bind(this)}>
                            <Text style={styles.btn}>New</Text>
                        </TouchableOpacity>
                    </View>
                    <ListView
                        contentContainerStyle={styles.listView}
                        dataSource={this.state.submissionDataSource}
                        renderRow={this._renderSubmission}
                        enableEmptySections={true}
                        horizontal={true} />
                </View>

                <View style={styles.vote}>
                    <TouchableOpacity onPress={this._onVote.bind(this)}>
                        <Text style={styles.btn}>Vote</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
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
    descriptionHeader: {
        marginHorizontal: Constants.Sizes.Margins.regular,
    },
    lbl: {
        paddingTop: Constants.Sizes.Margins.regular,
        paddingBottom: Constants.Sizes.Margins.regular,
        color: Constants.Colors.primaryWhite,
        fontSize: Constants.Sizes.Text.large,
    },
    headerTxt: {
        color: Constants.Colors.primaryWhite,
        fontSize: Constants.Sizes.Text.title,
    },
    body: {
        color: Constants.Colors.primaryBlack,
        fontSize: 16,
        paddingHorizontal: Constants.Sizes.Margins.regular,
    },
    description: {
        height: 200,
    },
    submissionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Constants.Sizes.Margins.regular,
    },
    btn: {
        color: Constants.Colors.primaryWhite,
        borderColor: Constants.Colors.primaryWhite,
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        padding: Constants.Sizes.Margins.expanded,
    },
    buttonText: {
        color: Constants.Colors.primaryWhite,
    },
    listView: {
        height: 200,
        marginLeft: Constants.Sizes.Margins.regular,
    },
    submissionImage: {
        marginTop: Constants.Sizes.Margins.regular,
        height: 200 - Constants.Sizes.Margins.regular * 2,
        width: 250,
        // marginLeft: Constants.Sizes.Margins.regular,
        marginRight: Constants.Sizes.Margins.regular,
    },
    vote: {
        marginLeft: Constants.Sizes.Margins.regular,
        marginRight: Constants.Sizes.Margins.regular,
        marginBottom: Constants.Sizes.Margins.regular,
    },
    fill: {
        flex: 1,
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
    return {};
};

export default connect(select, actions)(Event);
