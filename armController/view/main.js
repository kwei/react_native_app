import React, { Component } from 'react';
import { StackNavigator, withNavigation } from 'react-navigation';
import {
  Text,
  View,
  YellowBox,
  TouchableHighlight,
  ListView
} from 'react-native';
import { 
  Button,
  SocialIcon,
  FormLabel,
  FormInput,
} from 'react-native-elements';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

import { main_css } from '../css/main_css.js';
import SoupPicker from '../module/loadMyModule.js';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class MainPage extends Component<Props> {
  static navigationOptions = { header: null }

  state = {
    url: 'https://www.youtube.com/playlist?list=PLGzC4gTcebz-LB1XNX4Qe3pc7bAGiFkVo',
    loaded: false,
    getResult: false,
    searchBtnTitle:  "                    search                    ",
    DownloadBtnTitle: "                   Download                   ",
    msg: '',
    dataSource: ds,
  }

  constructor() {
    super();
    this.handleBtn = this.handleBtn.bind(this);
    this.searching = this.searching.bind(this);
    this.analysis = this.analysis.bind(this);
  }

  handleBtn(option) {
    if(option == 'Download'){
      var iterator = 1;
      var maxIndex = this.state.temp.length;
      console.log(maxIndex);
      for(iterator=1 ; iterator<maxIndex ; iterator++){
        console.log("Downloading");
        var link = this.state.temp[iterator];
      }
    }else{
      console.log("==== Start Searching at " + option + " ====");
      this.setState({loaded: true});
      this.setState({searchBtnTitle: ''});
      this.searching(option);
      this.setState({getResult:true});
    }
  }

  analysis(response) {
    this.setState({loaded:false});
    this.setState({searchBtnTitle: "                    search                    "});
    SoupPicker.DownloadMusic(response,
      (msg) => {
        console.log(msg);
      }, 
      (pack) => {
        var data = JSON.parse(pack);
        console.log(data);
        this.setState({dataSource: ds.cloneWithRows(data)});
        this.setState({temp: data});
    });
  }

  async searching(Url) {
    await fetch(Url)
      .then((res) => { return res.text() })
      .then((text) => { this.analysis(text) })
      .catch((error) => { console.log(error) });
  }

  render() {
    return (
      <View style={main_css.container}>
        <View style={main_css.MyForm}>
          <FormLabel>URL</FormLabel>
          <FormInput 
            onChangeText={(url)=>this.setState({url: url})}/>
        </View>
        <View style={main_css.SearchBtn}>
          <Button
            title={this.state.searchBtnTitle}
            loading={this.state.loaded}
            onPress={()=>{
              this.handleBtn(this.state.url)}}/>
        </View>
        <View style={main_css.result}>
          {/* this block is to going to show up the result you search */}
          {this.state.getResult ? 
            /* show up */
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(data) => (
                <TouchableHighlight onPress={()=>console.log("pressed!")}>
                  <View style={main_css.rowFront}>
                      <Text>url: {data}</Text>
                  </View>
                </TouchableHighlight>
            )}/> : 
            <View>
              <Text>     Wait for data...</Text>
            </View>
          }
        </View>
        <View style={main_css.DownloadBtn}>
          <Button
            title={this.state.DownloadBtnTitle}
            onPress={()=>{
              this.handleBtn('Download')}}/>
        </View>
      </View>
    );
  }
}

export default withNavigation(MainPage);