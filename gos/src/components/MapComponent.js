import React from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { StyleSheet, Dimensions, Vibration } from 'react-native';
import mapjsonLight from '../styles/mapStyles/mapstyleLight.json';
import mapjsonDark from '../styles/mapStyles/mapstyleDark.json';
import data from '../../data/data.json';
import colors from '../styles/colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { isPointInPolygon } from 'geolib';


export default class MapComponent extends React.Component {

  constructor(props) {
  super(props);
  this.mapViewRef = React.createRef();
  this.myRef = []; 
  this.state = {
    husColor: null,
    goturColor: null,
    selectedColor: null,
    greyColor: null,
    location: { latitude: 63.9801554, longitude: -22.6047361 },
    theme: null,
    satellite: false,
    selectedId: null,
    region: {
      latitude: 63.4347866,
      longitude: -20.2844343,
      latitudeDelta: 0.095,
      longitudeDelta: 0.0921,
    },
      errorMessage: 'error',
      mapLoaded: false,
  };
}

componentDidMount() {
  this.getPermissionAsync();
  this.getLocationAsync();
  this.setState({
    husColor: '#FF3B3F',
    goturColor: '#262630', //'#1D1B1B'
    selectedColor: '#00BFFF',
    greyColor: 'grey'
  });
  this.themeChange();

  // afmarkar eyjuna
  //this.mapViewRef.current.setMapBoundaries(
  //  { latitude: 63.472856, longitude: -20.170407 },
  //  { latitude: 63.378312, longitude: -20.385005 }
  //);

  interval = setInterval(() => {
    this.getLocationAsync();
    this.distanceFunction();
  }, 1000);
}

componentWillUnmount() {
  clearInterval(interval);
}

getPermissionAsync = async () => {
  console.log('Asking permission...');
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }
  console.log('status of permission: ', status);

}

getLocationAsync = async () => {
  if (this.state.errorMessage !== 'error') {
    console.log('location permission ekki gefið');
  }
  else {

    let location = await Location.getCurrentPositionAsync();
    
    const { latitude , longitude } = location.coords;
    //this.getGeocodeAsync({latitude, longitude});
    //this.setState({ location: location });
    this.setState({ location: {latitude, longitude}});
  }
};

themeChange(theme) {
  if(theme === 'Dark') {
    this.setState({theme: mapjsonDark, satellite: false});
  } 
  else if(theme === 'Satellite') {
    this.setState({satellite: true});
  }
  else {
    this.setState({theme: mapjsonLight, satellite: false});
  }
}

houseSelect(house) {
  this.setState({selectedId: house.id});
  let houseRegion = {
    latitude: house.coordinates[0][0].latitude,
    longitude: house.coordinates[0][0].longitude,
    latitudeDelta: 0.0035,
    longitudeDelta: 0.0035,
  }
  if(this.mapViewRef.current) {
    this.mapViewRef.current.animateToRegion(houseRegion, 1000);
  }
}

houseDeselect() {
  this.setState({selectedId: null});
}

zoomToHraun() {
  let houseRegion = {
      latitude: 63.440421,
      longitude: -20.260245,
      latitudeDelta: 0.0140,
      longitudeDelta: 0.0140,
    }
    if(this.mapViewRef.current) {
      this.mapViewRef.current.animateToRegion(houseRegion, 3000) 
    }
}

userCenter() {
  if (this.state.location == null) {
    console.log('no location provided, trying again');
    this.getPermissionAsync();
  }
  else {
    // let newLocation = await Location.getCurrentPositionAsync();
    let userRegion = {
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude,
      latitudeDelta: 0.0035,
      longitudeDelta: 0.0035,
    }
    if(this.mapViewRef.current) {
      this.mapViewRef.current.animateToRegion(userRegion, 1000) 
    }
  }
}

//Fyrir hvern polygon er check ef location er innan polygon,
//Ef ekki, er check hvort location var í polygon með state í mapscreen
distanceFunction() {
  let polygons = data.hraun;
  
  polygons.forEach(poly => {
    if(isPointInPolygon({ latitude: this.state.location.latitude, longitude: this.state.location.longitude }, poly.coordinates)) {
      this.props.polyIn(poly);
    }
    else if(this.props.polyName === poly.name && !isPointInPolygon({ latitude: this.state.location.latitude, longitude: this.state.location.longitude }, poly.coordinates)) {
      this.props.polyOut();
    }
  })
}

render() {
  
  const {goturColor, husColor, selectedColor, greyColor, location} = this.state;
    return (
        <MapView
          ref={this.mapViewRef}
          showsUserLocation={true} // deault location, þurfum að skoða betur ef á að gefa út á appstore
          showsMyLocationButton={false}
          // minZoomLevel={12}
          mapType={(this.state.satellite) ? 'satellite' : 'standard'}
          loadingEnabled={true}
          style={[styles.mapStyle, {opacity: this.state.mapLoaded ? 1 : 0 }]}
          provider={"google"}
          customMapStyle={this.state.theme}
          initialRegion={this.state.region}
          onMapReady={() => {this.zoomToHraun(); this.setState({mapLoaded: true})}}
          >

          {/* Marker sem uppfærist miðað við núverandi staðsetningu */}
          <Marker
            coordinate={this.state.location}
          />

          {/* Polygonarnir */} 
          {data.hus[0] != null && data.hus.map((hus, index1) => (
              hus.coordinates[0] != null && hus.coordinates.map((coordinates, index2) => (
                  <Polygon
                    key = {index1 + ' ' + index2}
                    coordinates={coordinates}
                    fillColor={hus.address === ' ' ? greyColor : hus.id === this.state.selectedId ? selectedColor : husColor}
                    tappable={true}
                    onPress={() => {this.props.preview(hus); Vibration.vibrate(7);}}
                  />
                ))
            ))
          }

          {data.gotur[0] != null && data.gotur.map((gata, index1) => (
            gata.coordinates[0] != null && gata.coordinates.map((coordinates, index2) => (
                <Polygon
                  key = {index1 + ' ' + index2}
                  fillColor={goturColor}
                  coordinates={coordinates}
                />
              ))
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