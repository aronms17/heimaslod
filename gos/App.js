import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native';
import HousesView from './src/views/HousesView/index';
import data from './src/houses.json'

export default class App extends React.Component {
    
  render() {
    var haha = data[2];
    var hehe = data;
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
          description={haha.text}
          coordinate={{latitude: haha.latitude, longitude: haha.longitude}}
          title={'Marker'}
          pinColor={'blue'}
          onPress={() => console.log(haha.text)
          }
        >
        </MapView.Marker>

        {hehe[0] != null && hehe.map((house, index) => (
            <MapView.Marker
                key = {index}
                coordinate = {{
                    latitude: house.latitude,
                    longitude: house.longitude
                }}
                title = { house.text }
            >
                <Image  style={{width: 50, height: 50}} source={{ uri: house.image}}></Image>
            </MapView.Marker>
        ))
        }
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
