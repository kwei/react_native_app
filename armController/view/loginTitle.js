import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';

//import Images from '@assets/images';

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;

const this_css = StyleSheet.create({
  pic: {
    height: window_height * (2/7) - 10,
    width: window_width,
  }
});

export default class LoginTitle extends Component<Props> {

  render() {
    return (
      <ImageBackground style={this_css.pic}
          source = {{uri: 'title'}}>
      </ImageBackground>
    );
  }
}