import React from 'react';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import { Alert, StyleSheet, Text, View, Dimensions, Image, TouchableHighlight, setNativeProps, Modal, TextInput, Keyboard, TouchableWithoutFeedback, Vibration } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
// import data from './src/houses.json';
import mapjson from '../json/mapstyle.json';
import prufupoly from '../../script/jsonfile.json';
import CustomPolygon from '../components/CustomPolygon';
import { Feather, MaterialIcons  } from '@expo/vector-icons';
import SideMenu from 'react-native-side-menu';
import SearchBar from '../components/SearchBar';


import PreviewModal from '../components/PreviewModal';

export default class App extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    husColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 0.2)'*/,
    goturColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 1)'*/,
    display: false,
    houseId: 0,
    location: null,
    errorMessage:""
  };
}

static navigationOptions = {
    title: '',
    headerTransparent: true,
    headerStyle: {
      // backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    //   height: 40,
    },
    headerTintColor: 'red',
      headerTitleStyle: {
      fontWeight: 'bold',
    },
}

  poly3 = prufupoly.hus[7].coordinates;
  
componentDidMount() {
  this.getLocationAsync();
  this.setState({
    husColor: '#EC4D37',
    goturColor: '#262630', //'#1D1B1B'
    display: false,
    houseId: 0,
  })
}

getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }

  let location = await Location.getCurrentPositionAsync();
  const { latitude , longitude } = location.coords
  this.getGeocodeAsync({latitude, longitude})
  this.setState({ location: {latitude, longitude}});

};

// GeoCode, þurfum ekki endilega
getGeocodeAsync= async (location) => {
  let geocode = await Location.reverseGeocodeAsync(location)
  this.setState({ geocode})
}

previewHouse(id) {
  console.log('Previewing house with id,', id);
  this.setState({display: true, houseId: id});
  this.makeVibration();
}

navigateHouse(houseid) {
  this.props.navigation.navigate('houseDetailScreen', houseid);
  this.setState({display: false});
  console.log(houseid);
}

makeVibration() {
  Vibration.vibrate(7);
}

  render() {
    const {goturColor, husColor, display, houseId, location, errorMessage} = this.state;
    let textLocation = 'Waiting..';
    if (this.state.errorMessage) {
      textLocation = errorMessage;
    } else if (this.state.location) {
      textLocation = JSON.stringify(location);
      //console.log("Location object: ", location);
      var lat = location.latitude;
      var lon = location.longitude;
      //console.log("latitude: ", lat);
      //console.log("longitude: ", lon);
}

    return (
      <>
      <View style={styles.map}>
        <MapView
          style={styles.mapStyle}
          provider={"google"}
          customMapStyle={mapjson}
          initialRegion={{
          latitude: 63.4347866,
          longitude: -20.2844343,
          latitudeDelta: 0.095,
          longitudeDelta: 0.0921}}>

          {prufupoly.hus[0] != null && prufupoly.hus.map((hus, index, houseid) => (
              <CustomPolygon
                key = {hus.id}
                coordinates={hus.coordinates}
                fillColor={husColor}
                tappable={true}
                onPress={() => this.previewHouse(hus.id)}
              />
            ))
          }

          {prufupoly.gotur[0] != null && prufupoly.gotur.map((gata, index) => (
              <CustomPolygon
                key = {gata.id}
                coordinates={gata.coordinates}
                fillColor={goturColor}
              />
            ))
          }
            
            {/* Test marker með icon */}
              <Marker
                coordinate={{latitude: 63.4349244,
                longitude: -20.2613676}}>
                <Text style={{color: "green"}}>Test</Text>
                <Feather name="phone" style={styles.phoneLogoBig}/>
              </Marker>

        </MapView>
        
        <PreviewModal
          data={houseId}
          display={this.state.display}
          closeDisplay={() => this.setState({display: false})}
          goToHouse={() => this.navigateHouse(houseId)}
        />

        </View>
            
        {/* componentar á main síðunni fá sér style með flex */}
        <View pointerEvents="box-none" style={styles.components}>


          {/* Location test */}
          <View style={styles.modalView}>
            <Text>Þín staðsetning:</Text>
            <Text>Latitude: {lat}</Text>
            <Text>Longitude: {lon}</Text>
          </View>


          <SearchBar preview={houseId => this.previewHouse(houseId)}/>


        </View>

      </>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  // search: {
  //     flex: 1,
  //     height: 90, 
  //     width: Dimensions.get('window').width, 
  //     backgroundColor: 'rgba(38, 38, 48, 0.5)', 
  //     position: 'absolute',
  //     flexDirection: 'row',
  //     justifyContent: 'center',
  //     borderRadius:10,
  // },
  // searchInput: {
  //   backgroundColor: 'white',
  //   height: 35,
  //   width: Dimensions.get('window').width - 30,
  //   marginLeft: 15,
  //   marginRight: 15,
  //   marginTop: 15,
  //   fontSize: 28,
  //   padding: 10,
  //   color: 'black',
  //   borderRadius: 10,
  //   fontSize: 15,
  //   // borderBottomWidth: 2,
  //   // borderBottomColor: 'blue'
  // },
  components: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: "space-between",

  },
  mapStyle: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});