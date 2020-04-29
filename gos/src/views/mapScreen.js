import React from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Vibration, TouchableHighlight } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { Feather, MaterialIcons  } from '@expo/vector-icons';

import PreviewModal from '../components/PreviewModal';
import SearchBar from './../components/SearchBar';
import SideMenu from '../components/SideMenu';
import MapComponent from './../components/MapComponent';

export default class App extends React.Component {

  constructor(props) {
  super(props);
  this.houseRefs = [];
  this.state = {
    husColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 0.2)'*/,
    goturColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 1)'*/,
    display: false,
    houseId: 0,
    houseName: '',
    houseDescription: '',
    houseImages: '',
    houseCoordinates: [],
    location: null,
    errorMessage:"",
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

previewHouse(house) {
  if(house.address === " ") {
    console.log('No name on this house!');
    this.makeVibration();
  }
  else {
  this.setState({display: true, houseId: house.id, houseName: house.address, houseDescription: house.text, houseImages: house.images, houseCoordinates: house.coordinates });
  this.makeVibration();
  }
} 

navigateHouse(houseid, houseName, houseDescription, houseImages, houseCoordinates) {
  this.props.navigation.navigate('houseDetailScreen', {
    houseid, houseName, houseDescription, houseImages, houseCoordinates
  });
  this.setState({display: false});
}

makeVibration() {
  Vibration.vibrate(7);
}

renderDrawer = () => {
  return (
    <View>
      <Text style={styles.desc}>Tittlingur 1</Text>
      <TouchableHighlight onPress={() => this.drawer.closeDrawer()}>
          <Text style={styles.desc}>lingur 2</Text>
      </TouchableHighlight>
       
    </View>
  );
}

closeButton() {
  this.drawer.openDrawer();
}


  render() {
  
    const {goturColor, husColor, display, houseId, houseName, houseDescription, houseImages, houseCoordinates, location, errorMessage} = this.state;
    
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
      <DrawerLayout
      ref={drawer => {
      this.drawer = drawer;
      }}
      drawerWidth={220}
      drawerPosition={DrawerLayout.positions.Right}
      drawerType='front'
      drawerBackgroundColor='#1D1B1B'
      renderNavigationView={this.renderDrawer}
      >
      
      <View>
        
        <MapComponent preview={(house) => this.previewHouse(house)}/>
        
        <PreviewModal
          id={houseId}
          address={houseName}
          description={houseDescription}
          images={houseImages}
          display={this.state.display}
          closeDisplay={() => this.setState({display: false})}
          goToHouse={() => this.navigateHouse(houseId, houseName, houseDescription, houseImages, houseCoordinates)}
        />


        </View>

        <View pointerEvents="box-none" style={styles.components}>
          {/* Location test */}
          {/* 
          <View style={styles.modalView}>
            <Text>Þín staðsetning:</Text>
            <Text>Latitude: {lat}</Text>
            <Text>Longitude: {lon}</Text>
          </View>
          */}
          <TouchableHighlight
          onPress={() => this.closeButton()}>
            <Text>
              snerta
            </Text>

          </TouchableHighlight>
          <SearchBar preview={(house) => this.previewHouse(house)}/>
          
        </View>

        </DrawerLayout>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: '#fff'
  },
  components: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: 'flex-end',

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