import React from 'react';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import { Alert, StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native';
import HousesView from './src/views/HousesView/index';
import data from './src/houses.json';
import mapjson from './src/mapstyle.json';
import prufupoly from './script/jsonfile.json';

export default class App extends React.Component {
    
  poly1 = [
    {longitude: -20.265495314359384, latitude: 63.441769204885134},
    {longitude: -20.265282308859373, latitude: 63.44165257718241},
    {longitude: -20.265534006243083, latitude: 63.4415683918242},
    {longitude: -20.265608502546883, latitude: 63.44160728555914},
    {longitude: -20.265519526899368, latitude: 63.44164252274294},
    {longitude: -20.26560850816094, latitude: 63.44168900524271},
    {longitude: -20.265680469733997, latitude: 63.44166307379618},
    {longitude: -20.265725972807154, latitude: 63.44168772915412},
    {longitude: -20.265495314359384, latitude: 63.441769204885134},
  ]

  poly2 = [
    {longitude: -20.265495314359384, latitude: 63.441769204885134},
    {longitude: -20.265282308859373, latitude: 63.44165257718241},
    {longitude: -20.265534006243083, latitude: 63.4415683918242},
    {longitude: -20.265608502546883, latitude: 63.44160728555914},
    {longitude: -20.265519526899368, latitude: 63.44164252274294},
    {longitude: -20.26560850816094, latitude: 63.44168900524271},
    {longitude: -20.265680469733997, latitude: 63.44166307379618},
    {longitude: -20.265725972807154, latitude: 63.44168772915412},
    {longitude: -20.265495314359384, latitude: 63.441769204885134},
  ]

  poly3 = prufupoly.hus[18].coordinates;

  render() {
    var haha = data[2];
    var hehe = data;
    return (
      <View style={styles.container}>
        <MapView
        // mapType={"satellite"}
        style={styles.mapStyle}
        provider={"google"}
        customMapStyle={mapjson}
        initialRegion={{
        latitude: 63.4347866,
        longitude: -20.2844343,
        latitudeDelta: 0.095,
        longitudeDelta: 0.0921}}>

        {/* þarf að refresha til að litirnir komi */}

        <Polygon
          coordinates={this.poly3}
          fillColor= {'purple'}
          strokeWidth={0}
          strokeColor={'#393a3d'}
        />
        
        {/* <UrlTile
        urlTemplate={'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'}
        /> */}

        <MapView.Marker
            coordinate={{latitude: 63.4347866, longitude: -20.2844343}}
            title={'Hér fór Baldvin í sinn fyrsta reiðtúr'}
        />
        <MapView.Marker
          description={haha.text}
          coordinate={{latitude: 63.4417692, longitude: -20.2654953}}
          title={'Marker'}
          pinColor={'blue'}
          onPress={() => console.log(haha.text)
          }
        >
        </MapView.Marker>

        {/* <Overlay 
        image="https://scontent-arn2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/86391797_645708835970680_7635390978186018816_n.png?_nc_cat=105&_nc_ohc=V_nz-I8Vf14AX9yzbPo&_nc_ht=scontent-arn2-2.xx&oh=0e619edd96425d44490e27dbff35ea3d&oe=5EBFFAFC"
        bounds={[
            [63.434714, -20.268676], 
            [63.444108, -20.249279]
        ]}
        /> */}



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
                {/* <Text style={{color: 'green'}}>{house.id}</Text> */}
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
