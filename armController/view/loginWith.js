import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid
} from 'react-native';
import { 
  Button,
  SocialIcon,
  Icon 
} from 'react-native-elements';


const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;

const this_css = StyleSheet.create({
  container: {
    
  }
});

export default class LoginWith extends Component<Props> {

  constructor() {
    super();
    this.handleBtn = this.handleBtn.bind(this);
  }

  handleBtn() {
    
  }

  render() {
    return (
      <View style={this_css.container}>
        <SocialIcon onPress={()=>this.handleBtn} type='facebook'/>
      </View>
    );
  }
}