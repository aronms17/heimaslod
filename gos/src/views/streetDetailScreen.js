import React from 'react';
import { Text, View, TouchableHighlight, FlatList, StyleSheet, Dimensions, Button, ScrollView, Image } from 'react-native';
import sideMenuStyle from '../styles/sideMenuStyles';
import colors from '../styles/colors';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import ImageModal from '../components/ImageModal';
import HouseTextModal from '../components/HouseTextModal';
import AboutUsModal from '../components/AboutUsModal';
import Gallery from 'react-native-image-gallery';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { Feather, MaterialIcons, Ionicons  } from '@expo/vector-icons'
import Data from './../../script/jsonfile.json';
import HouseNamesModal from '../components/HouseNamesModal';
export default class streetDetailScreen extends React.Component {
    constructor() {
        super();
        this.mapViewRef = React.createRef();
        this.state = {
          streetId: null,
          streetName: '',
          streetDescription: '',
          shortStreetDescription: '',
          streetImages: '',
          isModalVisible: false,
          textModalVisible: false,
          houseModalVisible: false,
          activeSections: [],
          husVidGotu: [],
          husColor: null,
          streetCoordinates: [],
          aboutVisible: false
        };
    }

    componentDidMount() {
        let { navigation } = this.props;
        let { streetId } = this.props.navigation.state.params;
        let allarGotur = Array.from(Data.gotur);
        let theStreet = allarGotur.find(({ id }) => id === streetId);
        let streetName = theStreet.name;
        let streetDescription = theStreet.text;
        let streetImages = theStreet.images;
        
        let ollHus = Array.from(Data.hus);
        let husVidGotu = ollHus.filter(hus => hus.streetId == streetId).sort((a,b) => (a.address > b.address) ? 1 : -1);
        
        this.setState({ streetId: streetId, 
            streetName: streetName, streetDescription: streetDescription, streetImages: streetImages,
            husVidGotu: husVidGotu
        });

      //afmarkar eyjuna, ekki viss hvort það eigi heima i componentdidmount
        this.mapViewRef.current.setMapBoundaries(
          { latitude: 63.472856, longitude: -20.170407 },
          { latitude: 63.378312, longitude: -20.385005 }
        );
    }

    navigateHouse(houseId) {
      this.props.navigation.push('houseDetailScreen', {houseId});
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
              onPress={() => {this.props.navigation.navigate('mapScreen'); this.drawer.closeDrawer()} }>
                <Text style={sideMenuStyle.sideMenuText}>Kort</Text>
            </TouchableHighlight>
          </View>
        );
    }

    setHouseColor() {
      this.setState({husColor: colors.WATERMELON});
    }

    zoomToStreet() {
      let houseRegion = {
          latitude: 63.439624,
          longitude: -20.258505,
          latitudeDelta: 0.0099,
          longitudeDelta: 0.0099,
        }
        if(this.mapViewRef.current) {
          this.mapViewRef.current.animateToRegion(houseRegion, 4000)
        
        }
    }

    render() {
      let { streetName, streetDescription, streetImages, shortStreetDescription, husVidGotu, husColor } = this.state;
      let img = Array.from(streetImages);

      let seeMore = 
      <TouchableHighlight 
          style={{
              width: 90, height: 40, borderRadius: 20/4, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.WATERMELON, margin: 10
          }} 
          onPress={() => this.setState({textModalVisible: true})}
          activeOpacity={0.5}
          backdropcolor='transparent'>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Lesa meira</Text>
      </TouchableHighlight>;

      if (streetDescription == " ") {
          streetDescription = 'Því miður er enginn texti tiltækur';
      }
      if (streetDescription.length > 300) {
          shortStreetDescription = streetDescription.substr(0,60) + ' ' + '...';
      } else {
          shortStreetDescription = streetDescription;
          seeMore = <Text> </Text>
      }
      if(img.length == 0) {
        img = ['http://heimaslod.is/images/8/8b/Loftmynd_hofnin_fyrir_gos.jpg']
      }
        return(
            <View style={styles.container}>
                <ImageModal
                    isVisible={this.state.isModalVisible}
                    closeDisplay={() => this.setState({isModalVisible: false})}
                    houseImages={img}
                />
                <HouseTextModal
                    isVisible={this.state.textModalVisible}
                    closeDisplay={() => this.setState({textModalVisible: false})}
                    houseText={streetDescription}
                >  
                </HouseTextModal>
                <HouseNamesModal
                  isVisible={this.state.houseModalVisible}
                  closeDisplay={() => this.setState({houseModalVisible: false})}
                  ollHus={husVidGotu}
                  nav={(id) => this.navigateHouse(id)}
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
                    <Text style={styles.name}>{streetName}</Text>
                </View>
                {/*  */}

                <View style={styles.galleryContainer}>
                    {/* Rétt map aðferð á propsið núna */}
                    
                     <Gallery
                        style={{ flex: 1, backgroundColor: '#1D1B1B' }}
                        pageMargin={10}
                        onSingleTapConfirmed={() => this.setState({isModalVisible: true})}
                        images={
                            img.map((element) => (
                                { source: { uri: element } }
                            ))
                        }
                    /> 
                </View>
                
                <View style={styles.descriptionContainer}>
                  <Text style={styles.desc}>{shortStreetDescription}</Text>
                        {seeMore}
                  <View style={{marginBottom: 10}}>
                    <TouchableHighlight 
                    style={{
                        width: 140, height: 60, borderRadius: 140/4, justifyContent: 'center', alignItems: 'center', backgroundColor: 'royalblue', padding: 15
                    }} 
                    onPress={() => this.setState({houseModalVisible: true})}
                    activeOpacity={0.5}
                    backdropcolor='transparent'>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>Sjá hús í götu</Text>
                  </TouchableHighlight>
                  </View>
                </View>

                <View style={styles.bottomContainer}>
                  <MapView
                    onMapReady={() => {this.zoomToStreet();this.setHouseColor()}}
                    ref={this.mapViewRef}
                    mapType={'satellite'}
                    minZoomLevel={12}
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

                    {this.state.husVidGotu[0] != null && this.state.husVidGotu.map((hus, index1) => (
                      hus.coordinates[0] != null && hus.coordinates.map((coordinates, index2) => (
                        <Polygon
                          key = {index1 + ' ' + index2}
                          coordinates={coordinates}
                          fillColor={husColor}
                        />
                        ))
                      ))
                    }
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
    backgroundColor: '#1D1B1B',
    justifyContent: 'center'
        
	},
	headerContainer: {
    flex: 2,
    flexDirection: 'row',
		alignItems: 'center',
    justifyContent: 'center',
    },
  galleryContainer: {
    flex: 3,
  },
  descriptionContainer: {
    flex: 4,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginTop: 10,
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomItems: {
    marginRight: 10
  },
  onlyMap: {
    ...StyleSheet.absoluteFillObject,
    width: 230,
    height: 150,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    position: 'relative'
  },
	name: {
    fontSize: 36,
    fontWeight: 'bold',
		color: '#fff'
  },
  desc: {
	  fontSize: 16,
    color: '#fff',
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
