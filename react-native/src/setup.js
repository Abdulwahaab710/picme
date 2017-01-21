// React imports
import React from 'react';
import {
  Platform,
  UIManager,
} from 'react-native';

// Redux imports
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

// Imports
import PicMe from './containers/PicMe';

export default function setup() {

  // Enable animations on Android
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // Create the redux store
  const store = configureStore();

  class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <PicMe />
        </Provider>
      );
    }
  }

  return Root;
}