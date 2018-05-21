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
  Alert,
} from 'react-native';
import { 
  Button,
  SocialIcon,
  FormLabel,
  FormInput
} from 'react-native-elements';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

import { login_css } from '../css/login_css.js';
import LoginTitle from './loginTitle.js';
import LoginWith from './loginWith.js';
import { MyStorage } from '../controller/storage.js'; //new

//import Images from '@assets/images';

var testmessages = "Here is Login component.";
const storage = new MyStorage();

class Login extends React.Component {
  static navigationOptions = { header: null }
  
  state = {
    loaded: false,
    loginBtnTitle: '                    Login                    ',
    email: '',
    password: '',
    isLogined: false,
    key_name: '@LoginStorage:name',
    key_email: '@LoginStorage:email',
    key_password: '@LoginStorage:password',
  }

  constructor() {
    super();
    this.handleBtn = this.handleBtn.bind(this);
  }

  // new
  componentWillMount() {
    var mail = this.state.key_email;
    var value = storage.Load(mail);
    if(value) {
      this.props.navigation.navigate('MainScreen', {name: 'user'});
    }else {
      console.log("You haven't logined before.");
    }
  }

  resfunc(res) {
    console.log(res.status);
    if(res.status == 200) {
      this.setState({isLogined: true});
      //var email = this.state.email;
      //var password = this.state.password;
      //storage.Save(this.state.key_email, email);    // new
      //storage.Save(this.state.key_password, password); // new
      this.props.navigation.navigate('MainScreen', {name: 'user'});
    }else {
      Alert.alert(
        'Login failed',
        'Invalid email address or wrong password.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
  }

  handleBtn(option) {
    if(option == 'fb') {
      ToastAndroid.showWithGravity(
        'Facebook',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM);
    }else if(option == 'login') {
      ToastAndroid.showWithGravity(
        'Login with email: ' + this.state.email + ' & password: ' + this.state.password,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM);
      this.setState({loaded: true});
      this.setState({loginBtnTitle: ''});

      fetch('http://140.115.213.30:9487/users/login', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.email,
        'password': this.state.password,
      })
    })
      .then((res) => 
        this.resfunc(res)
      )
      .then((req) => 
        console.log("request")
      )
      .catch((error) => 
        console.log(error)
      );
    }
  }

  render() {
    return (
      <View style={login_css.container}>
        <View style={login_css.titlebar_container}>
          <LoginTitle />
        </View>

        <View style={login_css.textinput_container}>
          <View>
            <TouchableHighlight>
              <LoginWith />
            </TouchableHighlight>
            <Text>(fb login still not work)</Text>
          </View>
          <View><FormLabel>Email</FormLabel>
          <FormInput 
            keyboardType='email-address'
            spellCheck
            onChangeText={(email)=>this.setState({email: email})}/>
          <FormLabel>Password</FormLabel>
          <FormInput 
            keyboardType='numeric'
            secureTextEntry={true}
            onChangeText={(password)=>this.setState({password: password})}/></View>
          <View style={login_css.LoginBtn}>
            <Button
              title={this.state.loginBtnTitle}
              loading={this.state.loaded}
              onPress={()=>{
                this.handleBtn('login'),
                setTimeout(()=>{
                  this.setState({loaded: false}),
                  this.setState({loginBtnTitle: '                    Login                    '})},2000)}} />
          </View>
        </View>

        <View style={login_css.footer_container}>
          <Text>If you donot have the account before,then</Text>
          <Text>click<Text 
            onPress={()=>{
              this.props.navigation.navigate('RegisterScreen', {navigate: this.props.navigate})}}
            style={login_css.register}>
            register</Text>to get a new account.</Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(Login);

/*export a function to the parent*/
export function testmsg() {
    //console.log(testmessages);
    return testmessages;
}