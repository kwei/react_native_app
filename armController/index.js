import { AppRegistry } from 'react-native';
import { StackNavigator, withNavigation } from 'react-navigation';
//import App from './App';

import loading from './view/loading'
import main from './view/main'
import login from './view/login'
import splash from './view/splash'
import register from './view/register'

const index = StackNavigator({
	Home: {screen: splash},
	MainScreen: {screen: main},
	LoginScreen: {screen: login},
	RegisterScreen: {screen: register}
},{ headerMode: 'screen' });

AppRegistry.registerComponent('armController', () => index);
