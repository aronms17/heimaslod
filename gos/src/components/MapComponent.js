import React from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Vibration } from 'react-native';
import mapjson from '../json/mapstyle.json';
import prufupoly from '../../script/jsonfile.json';
import CustomPolygon from './CustomPolygon';
import { Feather, MaterialIcons  } from '@expo/vector-icons';

export default class MapComponent extends React.Component {

  constructor(props) {
  super(props);
  this.houseRefs = [];
  this.state = {
    husColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 0.2)'*/,
    goturColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 1)'*/,
  };
}

componentDidMount() {
  this.setState({
    husColor: '#EC4D37',
    goturColor: '#262630', //'#1D1B1B'
  })
}

  render() {
  
    const {goturColor, husColor} = this.state;

    return (

        <MapView
          showsUserLocation={true} // deault location, þurfum að skoða betur ef á að gefa út á appstore
          minZoomLevel={12} 
          loadingEnabled={true}
          style={styles.mapStyle}
          provider={"google"}
          customMapStyle={mapjson}
          initialRegion={{
          latitude: 63.4347866,
          longitude: -20.2844343,
          latitudeDelta: 0.095,
          longitudeDelta: 0.0921}}>

          {/* þarf að refresha til að litirnir komi */}
          {/* Polygonarnir */}
          
          {prufupoly.hus[0] != null && prufupoly.hus.map((hus, index) => (
              <CustomPolygon
                ref={ref => this.houseRefs[index] = ref}
                key = {hus.id}
                coordinates={hus.coordinates}
                fillColor={husColor}
                tappable={true}
                onPress={() => this.props.preview(hus)}
              />
            ))
          }

          {prufupoly.gotur[0] != null && prufupoly.gotur.map((gata) => (
              <CustomPolygon
                key = {gata.id}
                coordinates={gata.coordinates}
                fillColor={goturColor}
                tappable={true}
                onPress={() => console.log('gata id: ' + gata.id)}
              />
            ))
          }
            
            {/* Test marker með icon */}
              <Marker
                coordinate={{latitude: 63.4352606, 
                longitude: -20.2615806}}
                >
                  <Text style={{color: 'black'}}>Gerðisbraut</Text>
              </Marker>

        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});