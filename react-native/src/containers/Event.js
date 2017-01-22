import React from 'react';
import {
    Dimensions,
    Image,
    ListView,
    Modal,
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
            showSubmissionModal: false,
            newName: '',
            newDescription: '',
            newImage: '',
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
            submissionDataSource: this.state.submissionDataSource.cloneWithRows(this.props.submissions),
        });
    }

    _onBack() {
        this.props.navigator.pop();
    }

    _onVote() {
        this.props.navigator.push({id: 'vote'});
    }

    _onNewSubmission() {
        this.setState({
            showSubmissionModal: true,
            newName: '',
            newDescription: '',
            newImage: null,
        })
    }

    _selectImage() {
        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({
                    newImage: `data:image/jpeg;base64,${response.data}`,
                });
            }
        });
    }

    _submitNewSubmission() {
        fetch(`${Constants.Server.url}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.newName,
                description: this.state.newDescription,
                photo: this.state.newImage,
                eventID: this.props.event._id,
            })})
            .then((response) => {
                if (response.ok) {
                    this._hideModal();
                }
            })
            .catch((err) => console.error(err));
    }

    _hideModal() {
        this.setState({
            showSubmissionModal: false,
        });
    }

    _renderSubmission(submission) {
        const widthRatio = parseInt(submission.width) / parseInt(submission.height);
        const width = (200 - Constants.Sizes.Margins.regular * 2) * widthRatio;

        return (
            <Image
                resizeMode={'contain'}
                style={[styles.submissionImage, {width}]}
                source={{uri: submission.photo}} />
        );
    }

    _renderNewSubmissionModal() {
        return (
            <View style={styles.baseModal}>
                <Header
                    title={'New submission'}
                    leftButtonText={'Cancel'}
                    rightButtonText={'Upload'}
                    onLeftButtonPress={this._hideModal.bind(this)}
                    onRightButtonPress={this._submitNewSubmission.bind(this)} />
                <LinearGradient colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]} style={styles.fill}>
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
                            <View style={styles.selectPhoto}>
                                <TouchableOpacity onPress={this._selectImage.bind(this)}>
                                    <Text style={styles.btn}>Select photo</Text>
                                </TouchableOpacity>
                                {this.state.newImage == null
                                    ? null
                                    :
                                    <Image
                                        resizeMode={'cover'}
                                        style={styles.newImage}
                                        source={{uri: this.state.newImage}} />}
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        );
    }

    render() {
        return (
            <LinearGradient
                colors={[Constants.Colors.paleBlue, Constants.Colors.darkBlue]}
                style={{ flex:1, }}>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showSubmissionModal}
                    onRequestClose={this._hideModal.bind(this)}>
                    {this._renderNewSubmissionModal()}
                </Modal>
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
    baseModal: {
        flex: 1,
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
    descriptionHeader: {
        marginHorizontal: Constants.Sizes.Margins.regular,
    },
    lbl: {
        paddingTop: Constants.Sizes.Margins.regular,
        paddingBottom: Constants.Sizes.Margins.regular,
        color: Constants.Colors.primaryWhite,
        fontSize: Constants.Sizes.Text.large,
    },
    body: {
        color: Constants.Colors.primaryBlack,
        fontSize: 16,
        paddingHorizontal: Constants.Sizes.Margins.regular,
    },
    submissionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Constants.Sizes.Margins.regular,
    },
    newImage: {
        borderColor: Constants.Colors.primaryWhite,
        borderWidth: 1,
        marginTop: Constants.Sizes.Margins.regular,
        width: screenWidth - Constants.Sizes.Margins.regular * 2,
        height: screenWidth - Constants.Sizes.Margins.regular * 2,
    },
    btn: {
        backgroundColor: 'transparent',
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
        marginRight: Constants.Sizes.Margins.regular,
    },
    selectPhoto: {
        margin: Constants.Sizes.Margins.regular,
    },
    vote: {
        marginLeft: Constants.Sizes.Margins.regular,
        marginRight: Constants.Sizes.Margins.regular,
        marginBottom: Constants.Sizes.Margins.regular,
    },
    fill: {
        flex: 1,
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
});

// Map state to props
const select = (store) => {
  return {
      event: store.events.event,
      submissions: store.events.submissions,
  };
};

// Map dispatch to props
const actions = (dispatch) => {
    return {};
};

export default connect(select, actions)(Event);
