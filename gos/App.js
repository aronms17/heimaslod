import React from 'react';
import MapView from 'react-native-maps';
import HousesView from './src/views/HousesView/index';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <MapView style={styles.mapStyle} />
        </View>
        <HousesView/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});