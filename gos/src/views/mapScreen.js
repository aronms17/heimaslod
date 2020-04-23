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

import PreviewModal from '../components/PreviewModal';
import SearchBar from './../components/SearchBar';

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
  
    const {goturColor, husColor, display, houseId, houseName, houseDescription, houseImages, location, errorMessage} = this.state;
    
    {/* Location brask */}
    let textLocation = 'Waiting..';
    if (this.state.errorMessage) {
      textLocation = errorMessage;
    } else if (this.state.location) {
      textLocation = JSON.stringify(location);
      var lat = Number(location.latitude);
      var lon = Number(location.longitude);
}

    return (
      <>
      <View>
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
                coordinate={{latitude: 63.4352606, 
                longitude: -20.2615806}}

                >
                  <Text style={{color: 'black'}}>Gerðisbraut</Text>
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
            
        {/* componentar á main síðunni fá sér view style með flex */}
        {/* mappið er með sér view style sem setur það á bakvið componentana  */}
        {/* box-none leyfir manni að ýta á kortið, því að component viewið er ofaná, 
        box-none leyfir manni samt að ýta á alla subcomponenta í viewinu*/}
        
          
          {/* Location test */}
          {/* 
          <View style={styles.modalView}>
            <Text>Þín staðsetning:</Text>
            <Text>Latitude: {lat}</Text>
            <Text>Longitude: {lon}</Text>
          </View>
          */}

        <View pointerEvents="box-none" style={styles.components}>
          <SearchBar preview={(id, address, text, images) => this.previewHouse(id, address, text, images)}/>
        </View>
          

      </>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: '#fff'
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
    justifyContent: 'flex-end',

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