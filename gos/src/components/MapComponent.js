import React from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Vibration } from 'react-native';
import mapjson from '../json/mapstyle.json';
import mapjson2 from '../json/mapstyle2.json';
import prufupoly from '../../script/jsonfile.json';
// import CustomPolygon from './CustomPolygon';
import { Feather, MaterialIcons  } from '@expo/vector-icons';

const initialRegion = {
  latitude: 63.4347866,
  longitude: -20.2844343,
  latitudeDelta: 0.095,
  longitudeDelta: 0.0921
}

export default class MapComponent extends React.Component {

  constructor(props) {
  super(props);
  this.mapViewRef = React.createRef();
  this.myRef = []; 
  this.state = {
    husColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 0.2)'*/,
    goturColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 1)'*/,
    selectedColor: null,
    theme: null,
    lightTheme: false,
    selectedId: null,
    region: {
      latitude: 63.4347866,
      longitude: -20.2844343,
      latitudeDelta: 0.095,
      longitudeDelta: 0.0921,
    },
    
  };
}

componentDidMount() {
  this.setState({
    husColor: '#EC4D37',
    goturColor: '#262630', //'#1D1B1B'
    selectedColor: '#33BDFF',
  });
  this.themeChange();

}

themeChange() {
  if(this.state.lightTheme) {
    // console.log('haha');
    this.setState({theme: mapjson2, lightTheme: false});
  }
  else {
    // console.log('hehe');
    this.setState({theme: mapjson, lightTheme: true});
  }
}

houseSelect(house) {
  this.setState({selectedId: house.id});
  let houseRegion = {
    latitude: house.coordinates[0].latitude,
    longitude: house.coordinates[0].longitude,
    latitudeDelta: 0.0035,
    longitudeDelta: 0.0035,
  }
  if(this.mapViewRef.current) {
    this.mapViewRef.current.animateToRegion(houseRegion, 500);
  }
}

houseDeselect() {
  this.setState({selectedId: null});
}

  render() {
  
    const {goturColor, husColor, selectedColor} = this.state;

    return (

        <MapView
          ref={this.mapViewRef}
          showsUserLocation={true} // deault location, þurfum að skoða betur ef á að gefa út á appstore
          // minZoomLevel={12} 
          loadingEnabled={true}
          style={styles.mapStyle}
          provider={"google"}
          customMapStyle={this.state.theme}
          initialRegion={this.state.region}
          >

          {/* þarf að refresha til að litirnir komi */}
          {/* Polygonarnir */}
          
          {prufupoly.hus[0] != null && prufupoly.hus.map((hus, index) => (
              <Polygon
                key = {hus.id}
                coordinates={hus.coordinates}
                fillColor={hus.id === this.state.selectedId ? selectedColor : husColor}
                tappable={true}
                onPress={() => {this.props.preview(hus); Vibration.vibrate(7);}}
                // onPress={() => console.log(hus.address)}
              />
            ))
          }

          {prufupoly.gotur[0] != null && prufupoly.gotur.map((gata) => (
              <Polygon
                key = {gata.id}
                coordinates={gata.coordinates}
                fillColor={goturColor}
                tappable={false}
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