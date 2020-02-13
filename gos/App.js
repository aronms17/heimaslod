import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
        style={styles.mapStyle}
        initialRegion={{
        latitude: 63.4347866,
        longitude: -20.2844343,
        latitudeDelta: 0.095,
        longitudeDelta: 0.0921}}>
        <MapView.Marker
            coordinate={{latitude: 63.4347866, longitude: -20.2844343}}
            title={'Deneme'}
        />
    <MapView.Marker
       description={'güzel mekan'}
       coordinate={{latitude: 38.4555, longitude: 27.1129}}
       title={'Deneme'}/>
</MapView>
        
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
