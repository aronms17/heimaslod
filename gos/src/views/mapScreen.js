import React from 'react';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import { Alert, StyleSheet, Text, View, Dimensions, Image, TouchableHighlight, setNativeProps, Modal, TextInput, Keyboard, TouchableWithoutFeedback, Vibration } from 'react-native';
// import data from './src/houses.json';
import mapjson from '../json/mapstyle.json';
import prufupoly from '../../script/jsonfile.json';
import CustomPolygon from '../components/CustomPolygon';

import PreviewModal from '../components/PreviewModal';

export default class App extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    husColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 0.2)'*/,
    goturColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 1)'*/,
    display: false,
    houseId: 0,
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
  this.setState({
    husColor: '#EC4D37',
    goturColor: '#262630', //'#1D1B1B'
    display: false,
    houseId: 0,
  })
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
    const {goturColor, husColor, display, houseId} = this.state;

    return (
      <View style={styles.component}>
      <View style={styles.container}>
        <MapView
        
          style={styles.mapStyle}
          provider={"google"}
          //customMapStyle={mapjson}
          initialRegion={{
          latitude: 63.4347866,
          longitude: -20.2844343,
          latitudeDelta: 0.095,
          longitudeDelta: 0.0921}}>

            {/* þarf að refresha til að litirnir komi */}

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

            </MapView>

            
            <PreviewModal
              data={houseId}
              display={this.state.display}
              closeDisplay={() => this.setState({display: false})}
              goToHouse={() => this.navigateHouse(houseId)}
            />
            
        </View>
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
    margin: 20,
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