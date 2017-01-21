import React from 'react';
import{ Image } from 'react-native';

export default class Home extends React.Component {

    static get defaultProps(){
        return{
            title: 'Home'
        };
    }

    render(){
        return (
            <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                   style={{width: 400, height: 400}}/>
        )
    }
}
