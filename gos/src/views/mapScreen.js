import React from 'react';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import { Alert, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, setNativeProps, Modal, TextInput, Keyboard, TouchableWithoutFeedback, Vibration } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
// import data from './src/houses.json';
import mapjson from '../json/mapstyle.json';
import prufupoly from '../../script/jsonfile.json';
import CustomPolygon from '../components/CustomPolygon';
import { Feather, MaterialIcons  } from '@expo/vector-icons';
import SideMenu from 'react-native-side-menu';

import Splash from '../components/Splash';
import PreviewModal from '../components/PreviewModal';

export default class App extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    husColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 0.2)'*/,
    goturColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 1)'*/,
    display: false,
    houseId: 0,
    houseName: '',
    houseDescription: '',
    houseImages: '',
    location: null,
    errorMessage:""
  };
}


//static navigationOptions = {
//    title: '',
//    headerTransparent: true,
//    headerStyle: {
//      // backgroundColor: 'transparent',
//      elevation: 0,
//      shadowOpacity: 0,
//      borderBottomWidth: 0,
//    //   height: 40,
//    },
//    headerTintColor: 'red',
//      headerTitleStyle: {
//      fontWeight: 'bold',
//    },
//}

  //poly3 = prufupoly.hus[7].coordinates;
  
componentDidMount() {
  this.getLocationAsync();
  this.setState({
    husColor: '#EC4D37',
    goturColor: '#262630', //'#1D1B1B'
    display: false,
    houseId: 0,
    houseName: '',
    houseDescription: '',
    houseImages: '',
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

previewHouse(id, address, text, images) {
  //console.log('Previewing house with id,', id, ' and name: ', address);
  this.setState({display: true, houseId: id, houseName: address, houseDescription: text, houseImages: images });
  this.makeVibration();
}

navigateHouse(houseid, houseName, houseDescription, houseImages) {
  this.props.navigation.navigate('houseDetailScreen', {
    houseid, houseName, houseDescription, houseImages
  });
  this.setState({display: false});
}

makeVibration() {
  Vibration.vibrate(7);
}

  render() {
    
    var _mapView: MapView;
    const {goturColor, husColor, display, houseId, houseName, houseDescription, houseImages, location, errorMessage} = this.state;
    let textLocation = 'Waiting..';
    if (this.state.errorMessage) {
      textLocation = errorMessage;
    } else if (this.state.location) {
      textLocation = JSON.stringify(location);
      //console.log("Location object: ", location);
      var lat = Number(location.latitude);
      var lon = Number(location.longitude);
      //console.log("latitude: ", lat);
      //console.log("longitude: ", lon);
}

    return (
      <View style={styles.component}>
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
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

          {prufupoly.hus[0] != null && prufupoly.hus.map((hus) => (
              <CustomPolygon
                key = {hus.id}
                coordinates={hus.coordinates}
                fillColor={husColor}
                tappable={true}
                onPress={() => this.previewHouse(hus.id, hus.address, hus.text, hus.images)}
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
          id={houseId}
          address={houseName}
          description={houseDescription}
          images={houseImages}
          display={this.state.display}
          closeDisplay={() => this.setState({display: false})}
          goToHouse={() => this.navigateHouse(houseId, houseName, houseDescription, houseImages)}
        />
            
        </View>
        
        {/* Location test */}
        {/* 
        <View style={styles.modalView}>
          <Text style={styles.textStyle}>Þín staðsetning:</Text>
          <Text style={styles.textStyle}>Latitude: {lat}</Text>
          <Text style={styles.textStyle}>Longitude: {lon}</Text>
          <Text style={styles.textStyle}>{textLocation}</Text>
        </View>
        */}


        <View style={styles.search}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <TextInput
            placeholder="Search"
            placeholderTextColor="#dddddd"
            style={ styles.searchInput }
            onChangeText={value => console.log(value)}
            />
          </TouchableWithoutFeedback>

        </View>
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
  search: {
      flex: 1,
      height: 90, 
      width: Dimensions.get('window').width, 
      backgroundColor: 'rgba(38, 38, 48, 0.5)', 
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius:10,
  },
  searchInput: {
    backgroundColor: 'white',
    height: 35,
    width: Dimensions.get('window').width - 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    fontSize: 28,
    padding: 10,
    color: 'black',
    borderRadius: 10,
    fontSize: 15,
    // borderBottomWidth: 2,
    // borderBottomColor: 'blue'
  },
  component: {
      flex:1,
      flexDirection: 'column-reverse',

  },
  mapStyle: {
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
    color: 'white',
    backgroundColor: "#1D1B1B",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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