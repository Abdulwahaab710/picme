import React from 'react';
import{ Image } from 'react-native';

export default class Home extends React.Component {
    render(){
        return (
            <Image source={require('https://facebook.github.io/react/img/logo_og.png')}
                   style={{width: 400, height: 400}}/>
        )
    }
}
