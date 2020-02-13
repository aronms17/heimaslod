import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet, Text, View, Dimensions, Image } from 'react-native';

export default class App extends React.Component {
    
  render() {
    return (
      <View style={styles.container}>
        <MapView
        mapType={"satellite"}
        style={styles.mapStyle}
        initialRegion={{
        latitude: 63.4347866,
        longitude: -20.2844343,
        latitudeDelta: 0.095,
        longitudeDelta: 0.0921}}>
        <MapView.Marker
            coordinate={{latitude: 63.4347866, longitude: -20.2844343}}
            title={'Hér fór Baldvin í sinn fyrsta reiðtúr'}
        />
    <MapView.Marker
       description={'Hér datt Keli á segway'}
       coordinate={{latitude: 63.4386728, longitude: -20.2533841}}
       title={'Marker'}
       pinColor={'blue'}
       onPress={() => Alert.alert(
        'Hehehe',
        'hahaha'
      )}
    >
<Image source={require('./heimaslod.png')} style={{height: 75, width:75 }} />

    </MapView.Marker>
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
