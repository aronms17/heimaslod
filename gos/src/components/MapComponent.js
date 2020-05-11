import React from 'react';
import MapView, { Marker, Polygon, Overlay } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Vibration } from 'react-native';
import mapjson from '../json/mapstyle.json';
import mapjson2 from '../json/mapstyle2.json';
import mapjson3 from '../json/mapstyle3.json';
import prufupoly from '../../script/jsonfile.json';
import CustomPolygon from './CustomPolygon';
import { Feather, MaterialIcons  } from '@expo/vector-icons';
// import Geofence from 'react-native-expo-geofence';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { getDistance, isPointInPolygon } from 'geolib';


// Afmörkun:
// northEast: 63.472856, -20.170407
// southWest: 63.378312, -20.385005


const initialRegion = {
  latitude: 63.4347866,
  longitude: -20.2844343,
  latitudeDelta: 0.095,
  longitudeDelta: 0.0921
}

const hr = { latitude: 64.124182, 
            longitude: -21.927272 };

export default class MapComponent extends React.Component {

  constructor(props) {
  super(props);
  this.mapViewRef = React.createRef();
  this.myRef = []; 
  this.state = {
    husColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 0.2)'*/,
    goturColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 1)'*/,
    selectedColor: null,
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
  this.getPermissionAsync();
  this.getLocationAsync();
  this.setState({
    husColor: '#EC4D37',
    goturColor: '#262630', //'#1D1B1B'
    selectedColor: '#33BDFF',
  });
  this.themeChange();

  interval = setInterval(() => {
    this.getLocationAsync();
    this.distanceFunction();
    // console.log('live staðsetning: ', this.state.location);
  }, 1000);

  //afmarkar eyjuna, ekki viss hvort það eigi heima i componentdidmount
  //this.mapViewRef.current.setMapBoundaries(
  //  { latitude: 63.472856, longitude: -20.170407 },
  //  { latitude: 63.378312, longitude: -20.385005 }
  //);
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
    // Geofencið
    // const taskName = "fencing";
    // const nyjaHraun = { latitude: 63.440845, longitude: -20.258694 };
    // const radius = 500;
  // 
    // Location.startGeofencingAsync(taskName, [
      // {
        // ...nyjaHraun,
        // radius
      // }
    // ]);
  // 
    // TaskManager.defineTask(taskName, task => {
      // if (task.data.eventType === Location.GeofencingEventType.Enter) {
        // console.log("Nálægt hrauni");
        // console.log(task.data);
        // this.setState({inRegion: true});
      // }
      // if (task.data.eventType === Location.GeofencingEventType.Exit) {
        // Location.stopGeofencingAsync(taskName)
        // console.log("Farnir úr punkti");
        // this.setState({inRegion: false});
      // }
      // return;
    // });

    let location = await Location.getCurrentPositionAsync();
    // let location = await Location.watchPositionAsync(
      // {
        // enableHighAccuracy: true,
        // distanceInterval: 1,
        // timeInterval: 1000
      // },
      // newLocation => {
        // let coords = newLocation.coords;
        // this.props.getMyLocation sets my reducer state my_location
        // this.props.getMyLocation({
          // latitude: parseFloat(coords.latitude),
          // longitude: parseFloat(coords.longitude)
        // });
      // },
      // error => console.log(error)
    // );

    const { latitude , longitude } = location.coords;
    //this.getGeocodeAsync({latitude, longitude});
    //this.setState({ location: location });
    this.setState({ location: {latitude, longitude}});
    // console.log('Location komið í state');
  }
};

themeChange(theme) {
  if(theme === 'Dark') {
    this.setState({theme: mapjson2, satellite: false});
  } 
  else if(theme === 'Satellite') {
    this.setState({satellite: true});
  }
  else {
    this.setState({theme: mapjson, satellite: false});
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
    this.mapViewRef.current.animateToRegion(houseRegion, 1000);
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

distanceFunction() {
  let polygons = prufupoly.geoGirding;
  let polyg = polygons[3];

  polygons.forEach(poly => {
    if(isPointInPolygon({ latitude: this.state.location.latitude, longitude: this.state.location.longitude }, poly.coordinates)) {
      this.props.polyIn(poly);
      // console.log('polynafn í state:', this.props.polyName);
    }
    else if(this.props.polyName === poly.name && !isPointInPolygon({ latitude: this.state.location.latitude, longitude: this.state.location.longitude }, poly.coordinates)) {
      this.props.polyOut();
      // console.log('polynafn í state:', this.props.polyName);
    }
  })

  

  // polygons.forEach(poly => {
  //   if(isPointInPolygon({ latitude: this.state.location.latitude, longitude: this.state.location.longitude }, [poly.coordinates])) {
  //     console.log('er í:', poly.name)
  //     this.props.polyIn(poly);
  //     } 
  //     else if (this.props.polyStateName === poly.name && !inPointInPolygon({ latitude: this.state.location.latitude, longitude: this.state.location.longitude }, [poly.coordinates])) {
  //       this.props.polyOut();
  //     }

  //   }
  // );
  // console.log('Distance is: ', getDistance(
  //   { latitude: this.state.location.latitude, longitude: this.state.location.longitude },
  //   { latitude: 63.9801554, longitude: -22.6047361 }
  // ));

  // console.log('your lat: ', this.state.location.latitude);
  // console.log('your lon: ', this.state.location.longitude);

  // console.log('ispoint in polygon: ', isPointInPolygon({ latitude: this.state.location.latitude, longitude: this.state.location.longitude }, [
  //   { latitude: 64.09688236026405, longitude: -21.843223571777344 },
  //   { latitude: 64.08630670483652, longitude: -21.843481063842773 },
  //   { latitude: 64.08574405740477, longitude: -21.817216873168945 },
  //   { latitude: 64.09744478257068, longitude: -21.818161010742188 },
  // ]));

}

render() {
  
  const {goturColor, husColor, selectedColor, location} = this.state;
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

          {/* <Marker coordinate={hr}><Text>🎓</Text></Marker> */}

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
          {prufupoly.geoGirding[0] != null && prufupoly.geoGirding.map((poly, index) => (
              <Polygon
                key = {poly.id}
                coordinates={poly.coordinates}
              />
            ))
          }
          {/* {prufupoly.gotur[0] != null && prufupoly.gotur.map((gata) => (
              <Polygon
                key = {gata.id}
                coordinates={gata.coordinates}
                fillColor={goturColor}
                tappable={false}
                onPress={() => console.log('gata id: ' + gata.id)}
              />
            ))
          } */}
          <Marker
            coordinate={this.state.location}
          />

          <Overlay 
             image="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
             bounds={[
               [40.712216, -74.22655], 
               [40.773941, -74.12544]
             ]}
          />

            {prufupoly.gotur[0] != null && prufupoly.gotur.map((gata, index1) => (
              gata.coordinates[0] != null && gata.coordinates.map((coordinates, index2) => (
                  <Polygon
                    key = {index1 + ' ' + index2}
                    fillColor={goturColor}
                    coordinates={coordinates}
                    // tappable={true}
                    // onPress={() => {this.props.preview(hus); Vibration.vibrate(7);}}
                  />
                ))
            ))
          }

          {/* <Marker
            coordinate={{ latitude: 63.9801554, longitude: -22.6047361 }}
          /> */}
          
            
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