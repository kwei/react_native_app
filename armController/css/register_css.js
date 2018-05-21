import {
  StyleSheet,
  Dimensions
} from 'react-native';

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;
const titlebar_height = window_height * (2/7);
const textinput_height = window_height * (12/20);
const footer_height = (window_height - titlebar_height - textinput_height);

const register_css = StyleSheet.create({
  container: {
    height: window_height,
    width: window_width,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  pic: {
    height: window_height * (2/7) - 10,
    width: window_width,
  },

  titlebar_container: {
    height: titlebar_height,
    width: window_width,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  textinput_container: {
    height: textinput_height,
    width: window_width,
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  RegisterBtn: {
    height: textinput_height * (1/4),
    width: window_width,
    flexDirection: 'column',
    alignItems: 'center',
  },

  footer_container: {
    height: footer_height,
    width: window_width,
    alignItems: 'center',
    flexDirection: 'column',
  },

  login: {
    color: '#FFD500'
  }

});

export {register_css};