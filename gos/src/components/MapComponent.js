import React from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Vibration } from 'react-native';
import mapjson from '../json/mapstyle.json';
import mapjson2 from '../json/mapstyle2.json';
import prufupoly from '../../script/jsonfile.json';
// import CustomPolygon from './CustomPolygon';
import { Feather, MaterialIcons  } from '@expo/vector-icons';
import Geofence from 'react-native-expo-geofence';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


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
      coordinates: [
        {
            longitude: -21.91939830780029,
            latitude: 64.13533053097066
        },
        {
            longitude: -21.92025661468506,
            latitude: 64.13514331343482
        },
        {
            longitude: -21.919677257537842,
            latitude: 64.13460505599053
        },
        {
            longitude: -21.9186794757843,
            latitude: 64.13533053097066
        },
        {
            longitude: -21.91939830780029,
            latitude: 64.13533053097066
        },
      ],
      point: {latitude: 64.1350631, longitude: -21.9192012},
      errorMessage: 'error',
      mapLoaded: false,
  };
}

componentDidMount() {
  this.setState({
    husColor: '#EC4D37',
    goturColor: '#262630', //'#1D1B1B'
    selectedColor: '#33BDFF',
  });
  this.themeChange();
  // this.getLocationAsync();
}

// getLocationAsync = async () => {
//   let { status } = await Permissions.askAsync(Permissions.LOCATION);
//   if (status !== 'granted') {
//     this.setState({
//       errorMessage: 'Permission to access location was denied',
//     });
//   }

//   let location = await Location.getCurrentPositionAsync();
//   let { latitude , longitude } = location.coords
//   // this.getGeocodeAsync({latitude, longitude})
//   this.setState({ location: {latitude, longitude}});
// };

// // GeoCode, þurfum ekki endilega
// getGeocodeAsync= async (location) => {
//   let geocode = await Location.reverseGeocodeAsync(location)
//   this.setState({ geocode})
// }

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

// isInPoly() {
//   var maxKm = 0.05;
//   var result = Geofence.filterByProximity(this.state.point, this.state.coordinates, maxKm);
//   console.log(result);
// }

  render() {
  
    const {goturColor, husColor, selectedColor} = this.state;

    return (
        <MapView
          ref={this.mapViewRef}
          showsUserLocation={true} // deault location, þurfum að skoða betur ef á að gefa út á appstore
          // minZoomLevel={12} 
          loadingEnabled={true}
          style={[styles.mapStyle, {opacity: this.state.mapLoaded ? 1 : 0 }]}
          provider={"google"}
          customMapStyle={this.state.theme}
          initialRegion={this.state.region}
          onMapReady={() => this.setState({mapLoaded: true})}
          >

          {/* Polygonarnir */} 
          {prufupoly.hus[0] != null && prufupoly.hus.map((hus, index) => (
              <Polygon
                key = {hus.id}
                coordinates={hus.coordinates}
                fillColor={hus.id === this.state.selectedId ? selectedColor : husColor}
                tappable={true}
                onPress={() => {this.props.preview(hus); Vibration.vibrate(7);}}
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