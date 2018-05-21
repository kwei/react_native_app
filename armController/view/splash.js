import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StackNavigator, withNavigation } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  YellowBox 
} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

import { splash_css } from '../css/splash_css.js';
import loading from './loading.js';
import Login, { testmsg } from './login.js'; /*get a function from child, and remember to use {}*/

//import Images from '@assets/images';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class main extends Component<Props> {
  static navigationOptions = { header: null }

  state = {
    loaded: false
  }

  constructor(){
    super();
    this.temp = this.temp.bind(this);
    loading.load(v =>this.setState({loaded: true}), 2000);
  }

  temp = () => {
    var text = testmsg();
    console.log(text);
  }

  render() {
    const {navigate} =this.props.navigation;
    return (
      <View style={splash_css.container}>
        {this.state.loaded ? 
          <Login /> : 
          <Image style={splash_css.pic}
            source = {{uri: 'logo'}} />}
        {this.state.loaded ?
          this.temp() : 
          console.log("Loading...")}
      </View>
    );
  }
}

export default withNavigation(main);