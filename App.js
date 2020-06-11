import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
  Image,
  Keyboard,
} from 'react-native';
import Constants from 'expo-constants';

import axios from 'axios';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LocationNameValue: '',
      Photo:
        'https://upload.wikimedia.org/wikipedia/commons/f/fa/Acapulco_-_Palmasola-Punto-mas-alto.JPG',
    };
    this.getPhoto = this.getPhoto.bind(this);
  }

  getPhoto = async () => {
    let city = this.state.LocationNameValue.trim()
      .replace(/ /g, '-')
      .toLowerCase();
    let res = await axios.get(
      `https://api.teleport.org/api/urban_areas/slug:${city}/images/`
    );
    let { data } = res.data;
    this.setState({
      Photo: res.data.photos[0].image.mobile,
    }).catch(error => {
      console.error(error);
    });
  };

  buttonClickListener = () => {
    const { LocationNameValue } = this.state.LocationNameValue;
    Keyboard.dismiss();
    this.getPhoto();
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Let's see what we can find</Text>

          <TextInput
            style={{
              height: 45,
              width: '100%',
              borderColor: 'gray',
              borderWidth: 2,
              paddingHorizontal: 10,
            }}
            placeholder="Enter a City Name"
            onChangeText={LocationNameValue =>
              this.setState({ LocationNameValue })
            }
            underlineColorAndroid="transparent"
          />

          <View style={{ marginVertical: 20 }}>
            <Button
              onPress={this.buttonClickListener}
              title="Get Image"
              color="#00B0FF"
            />
          </View>

          <Image
            style={{
              height: 250,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            source={{
              uri: this.state.Photo,
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
