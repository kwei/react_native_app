<script src="http://localhost:8097"></script>
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StackNavigator, withNavigation } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  YellowBox ,
  ImageBackground,
  ToastAndroid,
  TouchableHighlight,
  Text,
  Alert
} from 'react-native';
import { 
  Button,
  SocialIcon,
  FormLabel,
  FormInput
} from 'react-native-elements';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

import { register_css } from '../css/register_css.js';

//import Images from '@assets/images';

class Register extends React.Component {
  static navigationOptions = { header: null }
  
  state = {
    loginBtnTitle: '                    Regist                    ',
    username: '',
    email: '',
    password: '',
    isRegisted: false
  }

  constructor() {
    super();
    this.handleBtn = this.handleBtn.bind(this);
  }

  resfunc(res) {
    console.log(res.status);
    if(res.status == 200) {
      this.setState({isRegisted: true});
      this.props.navigation.navigate('MainScreen', {name: 'user'});
    }else {
      Alert.alert(
        'Register failed',
        'You have already regitered.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
  }

  handleBtn(option) {
    if(option == 'r'){
      fetch('http://140.115.213.30:9487/users/regist', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': this.state.username,
          'email': this.state.email,
          'password': this.state.password,
        })
      })
        .then((res) => this.resfunc(res))
        .then((req) => console.log(req))
        .catch((error) => console.log(error));
    }else if(option == 'login') {
      this.props.navigation.navigate('LoginScreen', {name: 'user'});
    }
  }

  render() {
    return (
      <View style={register_css.container}>
        <View style={register_css.titlebar_container}>
          <ImageBackground style={register_css.pic}
            source = {{uri: 'regist_logo'}}>
          </ImageBackground>
        </View>

        <View style={register_css.textinput_container}>
          <View><FormLabel>Name</FormLabel>
          <FormInput onChangeText={(username)=>this.setState({username: username})}/>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={(email)=>this.setState({email: email})}/>
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={(password)=>this.setState({password: password})}/></View>
          <View style={register_css.RegisterBtn}>
            <Button
              title={this.state.loginBtnTitle}
              onPress={()=>{
                this.handleBtn('r') }}/>
          </View>
        </View>

        <View style={register_css.footer_container}>
          <Text>If you have already had an account before,then</Text>
          <Text>click<Text 
            onPress={()=>{
              this.handleBtn('login')}}
            style={register_css.login}>
            login</Text>.</Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(Register);