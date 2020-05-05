import React from 'react';
// import MapView, { Marker, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Vibration, TouchableHighlight } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { Feather } from '@expo/vector-icons';

import NativeModal from 'react-native-modal';

import PreviewModal from '../components/PreviewModal';
import SearchBar from './../components/SearchBar';
import SideMenu from '../components/SideMenu';
import MapComponent from './../components/MapComponent';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];
export default class App extends React.Component {

  constructor(props) {
  super(props);
  this.child = React.createRef();
  this.state = {
    husColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 0.2)'*/,
    goturColor: null /* you can use isIOS() ? null : 'rgba(60, 165, 255, 1)'*/,
    isModalVisible: false,
    houseId: 0,
    houseAddress: '',
    houseDescription: '',
    houseImages: '',
    houseCoordinates: [],
    streetId: 0,
    location: null,
    errorMessage:"",
    inRegion: false
  };
}

componentDidMount() {
  //this.getLocationAsync();
  this.setState({
    husColor: '#EC4D37',
    goturColor: '#262630', //'#1D1B1B'
    isModalVisible: false,
    houseId: 0,
    houseAddress: '',
    houseDescription: '',
    houseImages: '',
    streetId: 0
  })
}

getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }

  const taskName = "eski";
  const hr = { identifier: "HR", latitude: 64.124182, longitude: -21.927272 };
  const landspitali = { identifier: "10", latitude: 64.123514, longitude: -21.884149 }; 
  const bildshofdi = { latitude: 64.123977, longitude: -21.829508 }; 
  const reynisvegur = { latitude: 64.130037, longitude: -21.747398 };
  const wurth = { latitude: 64.102430, longitude: -21.778329 };
  const radius = 5000;

  Location.startGeofencingAsync(taskName, [
    {
      ...hr,
      radius
    },
    {
      ...bildshofdi,
      radius
    },
    {
      ...reynisvegur,
      radius
    },
    {
      ...wurth,
      radius
    },
  ]);

  TaskManager.defineTask(taskName, task => {
    if (task.data.eventType === Location.GeofencingEventType.Enter) {
      console.log("Mættir á punkt");
      console.log(task.data);
      this.setState({inRegion: true});
    }
    if (task.data.eventType === Location.GeofencingEventType.Exit) {
      console.log("Farnir úr punkti");
      this.setState({inRegion: false});
    }
    return;
  });



  let location = await Location.getCurrentPositionAsync();
  const { latitude , longitude } = location.coords;
  this.getGeocodeAsync({latitude, longitude});
  this.setState({ location: location });
  //this.setState({ location: {latitude, longitude}});
};

// GeoCode, þurfum ekki endilega
getGeocodeAsync= async (location) => {
  let geocode = await Location.reverseGeocodeAsync(location)
  this.setState({ geocode})
}

previewHouse(house) {
  console.log('House Address: ', house.address)
  if(house.address === " ") {
    console.log('No name on this house!');
    // this.makeVibration();
  }
  else {
  this.child.current.houseSelect(house);
  this.setState({isModalVisible: true, houseId: house.id, houseAddress: house.address, houseDescription: house.text, houseImages: house.images, houseCoordinates: house.coordinates, streetId: house.streetId });
  }
}

closePreview() {
  this.setState({isModalVisible: false}); 
  this.child.current.houseDeselect();
}

navigateHouse(houseId) {
  this.setState({isModalVisible: false});
  this.props.navigation.navigate('houseDetailScreen', {
    houseId
  });
}

makeVibration() {
  Vibration.vibrate(7);
}

renderDrawer = () => {
  return (
    <View style={styles.sideMenu}>
      <TouchableHighlight onPress={() => this.props.navigation.navigate('allStreetScreen')}>
        <Text style={styles.sideMenuText}>Götur og hús</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => {this.onClick(); this.drawer.closeDrawer()}}>
          <Text style={styles.sideMenuText}>Kortaútlit</Text>
      </TouchableHighlight>
    </View>
  );
}

onClick = () => {
  this.child.current.themeChange();
}

  render() {
  
    const { isModalVisible, houseId, houseAddress, houseDescription, houseImages, houseCoordinates, streetId, location, errorMessage, inRegion} = this.state;
    
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
          <MapComponent ref={this.child} preview={(house) => this.previewHouse(house)}/>

          <View pointerEvents="box-none" style={styles.components}>
            
            <View style={styles.header}>
              <TouchableHighlight
                style={styles.burger}
                onPress={() => this.drawer.openDrawer()}>
                  <Feather name='menu' size={40} color='white'/>
              </TouchableHighlight>
            </View>
            <View>

            {/* Location test */}            
            {/* <View style={styles.modalView}>
              <Text>Þín staðsetning:</Text>
              <Text>Latitude: {lat}</Text>
              <Text>Longitude: {lon}</Text>
              <Text>Location object-ið:</Text>
              <Text>{textLocation}</Text>
            </View> */}
            <View>
            <PreviewModal
              isVisible={this.state.isModalVisible}
              id={houseId}
              address={houseAddress}
              description={houseDescription}
              images={houseImages}
              streetId={streetId}
              closeDisplay={() => {this.setState({isModalVisible: false}); this.child.current.houseDeselect();  }}
              goToHouse={() => this.navigateHouse(houseId)}
            />
            </View>
            {/* Geofencing modal */}
            {/* <NativeModal
              isVisible={this.state.inRegion}
            >
              <View style={styles.modalView}>
                <Text style={{fontWeight: 'bold'}}>Þú ert nálægt punkti</Text>
              </View>
            </NativeModal> */}

            </View>
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
    justifyContent: 'space-between',

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
  sideMenu: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingBottom: 30,
    paddingLeft: 25

  },
  sideMenuText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  header: {
    width: Dimensions.get('screen').width, 
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  burger: {
    marginTop: 40,
    marginRight: 17,
  }
});