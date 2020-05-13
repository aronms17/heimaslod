import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';
import sideMenuStyle from '../styles/sideMenuStyles';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import Gallery from 'react-native-image-gallery';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import ImageModal from '../components/ImageModal';
import HouseTextModal from'../components/HouseTextModal';
import { Feather, MaterialIcons, Ionicons  } from '@expo/vector-icons'
import Data from './../../script/jsonfile.json';
import modalStyles from '../styles/styles';
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
          husColor: null
        };
    }

    componentDidMount() {
        let { navigation } = this.props;
        const { houseId } = navigation.state.params;

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

          // afmarkar eyjuna, ekki viss hvort það eigi heima i componentdidmount
        // this.mapViewRef.current.setMapBoundaries(
            // { latitude: houseCoordinates[0].latitude, longitude: houseCoordinates[0].longitude },
            // { latitude: houseCoordinates[0].latitude+0.001, longitude: houseCoordinates[0].longitude+0.001});

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
                onPress={() => {this.props.navigation.navigate('mapScreen'); this.drawer.closeDrawer();}}>
                <Text style={sideMenuStyle.sideMenuText}>Kort</Text>
            </TouchableHighlight>
          </View>
        );
    }

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
                {/*  */}

                <View style={styles.galleryContainer}
                >
                    {/* Rétt map aðferð á propsið núna */}
                    <Gallery
                        style={{ flex: 1, backgroundColor: colors.CARBON }}
                        pageMargin={10}
                        onSingleTapConfirmed={() => this.setState({isModalVisible: true})}
                        images={
                            arrHouse.map((element) => (
                                { source: { uri: element } }
                            ))
                        }
                    />
                    
                </View>
                
                <View style={styles.descriptionContainer}>
                    <Text style={styles.desc}>{shortHouseDescription}</Text>
                    {seeMore}
                </View>
                
                <View style={styles.bottomContainer}>
                    <TouchableHighlight 
                        style={{
                            width: 100, height: 40, borderRadius: 100/4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#7DB46CFF'
                        }} 
                        onPress={() => this.navigateStreet(streetId)}
                        activeOpacity={0.5}
                        backdropcolor='transparent'>
                        <Text style={styles.desc}>{streetName}</Text>
                    </TouchableHighlight>
                    <View style={styles.onlyMap}>
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

                        {/* <Polygon
                            coordinates={polygonFirst}
                            fillColor="#f55d42"
                        /> */}

                {this.state.houseCoordinates != null && this.state.houseCoordinates.map((coordinates, index) => (
                  <Polygon
                    key = {index}
                    coordinates={coordinates}
                    fillColor={husColor}
                  />
                ))}
                        
                    </MapView>
                    </View>                    
                </View>
                
                </DrawerLayout>

            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: colors.CARBON,
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
        alignItems: 'center'
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
		color: '#fff'
    },
    desc: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
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
