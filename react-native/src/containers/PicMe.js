// React imports
import React from 'react';
import {
  Navigator,
  View,
} from 'react-native';

// Imports
import Home from './Home';
import Event from './Event';
import Vote from './Vote';
// import Submit from './Submit';
import * as Constants from 'Constants';

export default class PicMe extends React.Component {

  _configureScene(): Object {
    return Navigator.SceneConfigs.PushFromRight;
  }

  _renderScene(route, navigator) {
    switch (route.id) {
      case 'home':
        return (
          <Home navigator={navigator} />
        );
      case 'event':
          return (
            <Event navigator={navigator} />
          );
      case 'vote':
          return (
            <Vote navigator={navigator} />
          );
      default:
        return (
          <View />
        );
    }
  }

  render(): ReactElement < any > {
    return (
      <Navigator
          configureScene={this._configureScene}
          initialRoute={{id: 'home'}}
          renderScene={this._renderScene}
          style={{flex: 1, backgroundColor: 'white'}} />
    );
  }
}
