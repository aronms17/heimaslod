import React from 'react';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import { Alert, StyleSheet, Text, View, Dimensions, Image, TouchableHighlight, setNativeProps, Modal } from 'react-native';
// import data from './src/houses.json';
import mapjson from '../json/mapstyle.json';
import prufupoly from '../../script/jsonfile.json';
import CustomPolygon from '../components/CustomPolygon';

export default class App extends React.Component {

constructor(props) {
  super(props);

  this.state = {
    modalVisible: false,
    husColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 0.2)'*/,
    goturColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 1)'*/,
  };
}

setModalVisible = (visible) => {
  this.setState({ modalVisible: visible });
}
  
componentDidMount() {
  this.setState({
    husColor: '#EC4D37',
    goturColor: '#262630' //'#1D1B1B'
  })
}


previewHouse(houseid) {
  this.setModalVisible(true);
  console.log('Previewing house with id,', houseid);
}

navigateHouse(houseid) {
  this.props.navigation.navigate('houseDetailScreen', houseid);
  console.log(houseid);
}

  render() {
    const {goturColor, husColor, modalVisible} = this.state;

    return (
      <View style={styles.container}>

<View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>You clicked a house</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
      </View>



        <MapView
        
        style={styles.mapStyle}
        provider={"google"}
        customMapStyle={mapjson}
        initialRegion={{
        latitude: 63.4347866,
        longitude: -20.2844343,
        latitudeDelta: 0.095,
        longitudeDelta: 0.0921}}>

        {/* þarf að refresha til að litirnir komi */}

        {prufupoly.hus[0] != null && prufupoly.hus.map((hus, index) => (
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
