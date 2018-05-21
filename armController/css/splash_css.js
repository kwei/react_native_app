import {
  StyleSheet,
  Dimensions
} from 'react-native';

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;

const splash_css = StyleSheet.create({
  container: {
    height: window_height,
    width: window_width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  pic: {
    height: window_height,
    width: window_width,
  }
});

export {splash_css};