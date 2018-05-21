import {
  StyleSheet,
  Dimensions
} from 'react-native';

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;
const MyForm_height = window_height * (3/20);
const SearchBtn_height = MyForm_height;
const result_height = window_height * (1/2);

const main_css = StyleSheet.create({
  container: {
    height: window_height,
    width: window_width,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  MyForm: {
  	height: MyForm_height,
    width: window_width,
    alignItems: 'flex-start',
    flexDirection: 'column',
  	justifyContent: 'space-between',
  },

  SearchBtn: {
  	height: SearchBtn_height,
    width: window_width,
    flexDirection: 'column',
    alignItems: 'center',
  },

  DownloadBtn: {
    height: SearchBtn_height,
    width: window_width,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },

  rowFront: {
    width: window_width,
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },

  result: {
    height: result_height,
    width: window_width,
  	flexDirection: 'column',
    alignItems: 'center',
  }


});

export {main_css};