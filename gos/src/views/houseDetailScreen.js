import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';
import sideMenuStyle from '../styles/sideMenuStyles';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import Gallery from 'react-native-image-gallery';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import ImageModal from '../components/ImageModal';
import HouseTextModal from '../components/HouseTextModal';
import AboutUsModal from '../components/AboutUsModal';
import { Feather, MaterialIcons, Ionicons  } from '@expo/vector-icons'
import Data from './../../data/data.json';
import colors from '../styles/colors';
export default class houseDetailScreen extends React.Component {
  constructor() {
    super();
    this.mapViewRef = React.createRef();
    this.state = {
      houseId: 0,
      houseAddress: '',
      streetId: null,
      houseDescription: '',
      shortHouseDescription: '',
      houseImages: '',
      houseCoordinates: [],
      streetName: '',
      isModalVisible: false,
      textModalVisible: false,
      husColor: null,
      aboutVisible: false
    };
  }

  componentDidMount() {
    let { navigation } = this.props;
    let { houseId } = navigation.state.params;
    let ollHus = Array.from(Data.hus);
    let husid = ollHus.find(({ id }) => id === houseId);
    let houseAddress = husid.address;
    let streetId = husid.streetId;
    let houseDescription = husid.text;
    let houseImages = husid.images;
    let houseCoordinates = husid.coordinates;
    let allarGotur = Array.from(Data.gotur);
    let gatan = allarGotur.find(({ id }) => id === streetId);
    let streetName = gatan.name;
      
    this.setState({houseId: houseId, houseAddress: houseAddress, streetId: streetId,
        houseDescription: houseDescription, houseImages: houseImages, houseCoordinates: houseCoordinates,
        streetName: streetName
    });

    // afmarkar eyjuna
  //this.mapViewRef.current.setMapBoundaries(
  //  { latitude: 63.472856, longitude: -20.170407 },
  //  { latitude: 63.378312, longitude: -20.385005 }
  //);
  
  }

  navigateStreet(streetId) {
    this.props.navigation.push('streetDetailScreen', {
      streetId
    });
  }

  setHouseColor() {
      this.setState({husColor: '#EC4D37'});
  }

  renderDrawer = () => {
      return (
        <View style={sideMenuStyle.sideMenu}>

          <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={colors.okkarSvarti} 
                activeOpacity={0.5}
                style={sideMenuStyle.sideMenuItem}
                onPress={() => {this.setState({aboutVisible: true}); this.drawer.closeDrawer();}}>
                <Text style={{color: 'white', fontSize: 20}}>Um verkefnið</Text>
              </TouchableHighlight>
              <Ionicons name='ios-information-circle' size={22} color="white" style={{marginLeft: 5}}/>
          </View>

          <TouchableHighlight
              underlayColor={colors.okkarSvarti}
              activeOpacity={0.5}
              style={sideMenuStyle.sideMenuItem}
              onPress={() => this.props.navigation.push('allStreetScreen')}>
            <Text style={sideMenuStyle.sideMenuText}>Götur og hús</Text>
          </TouchableHighlight>
          <TouchableHighlight 
              underlayColor={colors.okkarSvarti}
              activeOpacity={0.5}
              style={sideMenuStyle.sideMenuItem}
              onPress={() => {this.props.navigation.navigate('mapScreen'); this.drawer.closeDrawer();}}>
              <Text style={sideMenuStyle.sideMenuText}>Kort</Text>
          </TouchableHighlight>
        </View>
      );
  }

  // Animate-ar/zoomar á fyrstu hnitin í húsi
  zoomTohouse() {
      let houseRegion = {
          latitude: this.state.houseCoordinates[0][0].latitude,
          longitude: this.state.houseCoordinates[0][0].longitude,
          latitudeDelta: 0.0010,
          longitudeDelta: 0.0010,
        }
        if(this.mapViewRef.current) {
          this.mapViewRef.current.animateToRegion(houseRegion, 4000)
          
        }
  }

  render() {
      let { houseAddress, houseDescription, shortHouseDescription, houseImages, streetName, streetId, husColor } = this.state;
      // Sjá meira takki ef hús texti er langur
      let seeMore = 
          <TouchableHighlight 
              style={{
                  width: 100, height: 40, borderRadius: 100/4, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.WATERMELON, marginTop: 10
              }} 
              onPress={() => this.setState({textModalVisible: true})}
              activeOpacity={0.5}
              backdropcolor='transparent'>
                  <Text style={styles.desc}>Sjá meira</Text>
          </TouchableHighlight>;
      if(houseImages.length == 0) {
          houseImages = ['http://heimaslod.is/images/8/8b/Loftmynd_hofnin_fyrir_gos.jpg']
      }
      
      if (houseDescription == " ") {
          houseDescription = 'Því miður er enginn texti tiltækur';
      }
      if (houseDescription.length > 300) {
          shortHouseDescription = houseDescription.substr(0,52) + ' ' + '...';
      } else {
          shortHouseDescription = houseDescription
          seeMore = <Text> </Text>
      }

      let arrHouse = Array.from(houseImages);

      return(
          <View style={styles.container}>    
              <ImageModal
                  isVisible={this.state.isModalVisible}
                  closeDisplay={() => this.setState({isModalVisible: false})}
                  houseImages={arrHouse}
              >
              </ImageModal>
              <HouseTextModal
                  isVisible={this.state.textModalVisible}
                  closeDisplay={() => this.setState({textModalVisible: false})}
                  houseText={houseDescription}
              />

              <AboutUsModal
                  isVisible={this.state.aboutVisible}
                  closeDisplay={() => this.setState({aboutVisible: false})}
              />

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
              <View style={styles.header}>
                  <TouchableHighlight
                      underlayColor={colors.okkarSvarti}
                      activeOpacity={0.5}
                      style={{marginLeft: 20}}
                      onPress={() => this.props.navigation.goBack()}>
                      <Ionicons name="ios-arrow-back" size={40} color="white" />
                  </TouchableHighlight>
                  
                  <TouchableHighlight
                      underlayColor={colors.okkarSvarti}
                      activeOpacity={0.5}
                      style={styles.burger}
                      onPress={() => this.drawer.openDrawer()}>
                      <Feather name='menu' size={40} color='white'/>
                  </TouchableHighlight>
              </View>
              
              <View style={styles.headerContainer}>
                  <Text style={styles.name}>{houseAddress}</Text>
              </View>

              <View style={styles.galleryContainer}
              >
                  {/* Mappa hverja mynd */}
                  <Gallery
                      style={{ flex: 1, backgroundColor: colors.okkarSvarti }}
                      pageMargin={10}
                      onSingleTapConfirmed={() => this.setState({isModalVisible: true})}
                      images={
                          arrHouse.map((element) => (
                              { source: { uri: element }, dimensions: {  } }
                          ))
                      }
                  />
                  
              </View>
              
              <View style={styles.descriptionContainer}>
                  <Text style={styles.desc}>{shortHouseDescription}</Text>
                  {seeMore}
                  <TouchableHighlight 
                      style={{
                          width: 100, height: 40, borderRadius: 100/4, justifyContent: 'center', alignItems: 'center', 
                          backgroundColor: 'royalblue', marginTop: 15, marginBottom: 15
                      }} 
                      onPress={() => this.navigateStreet(streetId)}
                      activeOpacity={0.5}
                      backdropcolor='transparent'>
                      <Text style={styles.desc}>{streetName}</Text>
                  </TouchableHighlight>
              </View>
              
              <View style={styles.bottomContainer}>

                  {/* Lítið mapview sem sýnir bara valið hús */}
                  {/* Zoomar á valið svæði */}

                  <MapView
                    onMapReady={() => {this.zoomTohouse(); this.setHouseColor()}}
                    ref={this.mapViewRef}
                    mapType={'satellite'}
                    style={{...StyleSheet.absoluteFillObject}}
                    provider={"google"}
                    zoomEnabled={false}
                    zoomTapEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                    initialRegion={{
                      latitude: 63.4347866,
                      longitude: -20.2844343,
                      latitudeDelta: 0.095,
                      longitudeDelta: 0.0921}}>

                    {this.state.houseCoordinates != null && this.state.houseCoordinates.map((coordinates, index) => (
                      <Polygon
                        key = {index}
                        coordinates={coordinates}
                        fillColor={husColor}
                      />
                    ))}
                      
                  </MapView>
              </View>                    
              
            </DrawerLayout>

        </View>
      );
  }
}

const styles = StyleSheet.create({
container: {
      flex: 1,
      backgroundColor: colors.okkarSvarti,
},
headerContainer: {
      flex: 2,
      flexDirection: 'row',
  alignItems: 'center',
      justifyContent: 'center',
  },
  galleryContainer: {
      flex: 3,
      marginBottom: 10,
  },
  descriptionContainer: {
      flex: 4,
      paddingRight: 20,
      paddingLeft: 20,
      alignItems: 'center',
      marginBottom: 25
  },
  bottomContainer: {
      flex: 5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      paddingRight: 20,
      paddingLeft: 20,
      marginBottom: 15
  },
  bottomItems: {
      marginRight: 10
  },
  onlyMap: {
      ...StyleSheet.absoluteFillObject,
      width: 330,
      height: 150,
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15,
      position: 'relative'
  },
name: {
      fontSize: 36,
      fontWeight: 'bold',
  color: 'white'
  },
  desc: {
      fontSize: 16,
      color: 'white',
  },
  header: {
      width: Dimensions.get('screen').width, 
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
  burger: {
    marginTop: 40,
    marginRight: 17
  }
});
