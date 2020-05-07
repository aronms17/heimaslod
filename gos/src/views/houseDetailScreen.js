import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';
import sideMenuStyle from '../styles/sideMenuStyles';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import Gallery from 'react-native-image-gallery';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import ImageModal from '../components/ImageModal';
import { Feather, MaterialIcons, Ionicons  } from '@expo/vector-icons'
import Data from './../../script/jsonfile.json';
export default class houseDetailScreen extends React.Component {
    constructor() {
        super();
        this.mapViewRef = React.createRef();
        this.state = {
          houseId: 0,
          houseAddress: '',
          streetId: null,
          houseDescription: '',
          houseImages: '',
          houseCoordinates: [],
          streetName: '',
          isModalVisible: false
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

    }

    renderDrawer = () => {
        return (
          <View style={sideMenuStyle.sideMenu}>
            <TouchableHighlight 
                style={sideMenuStyle.sideMenuItem}
                onPress={() => this.props.navigation.navigate('allStreetScreen')}>
              <Text style={sideMenuStyle.sideMenuText}>Götur og hús</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.props.navigation.navigate('mapScreen'); this.drawer.closeDrawer();} }>
                <Text style={sideMenuStyle.sideMenuText}>Kort</Text>
            </TouchableHighlight>
          </View>
        );
      }

    zoomTohouse() {
        let houseRegion = {
            latitude: this.state.houseCoordinates[0].latitude,
            longitude: this.state.houseCoordinates[0].longitude,
            latitudeDelta: 0.0010,
            longitudeDelta: 0.0010,
          }
          if(this.mapViewRef.current) {
            this.mapViewRef.current.animateToRegion(houseRegion, 4000)
            
          }
    }

    render() {
        const { houseAddress, houseDescription, houseImages, houseCoordinates, streetName, streetId } = this.state;
        const arrHouse = Array.from(houseImages);
        return(
            <View style={styles.container}>    
                <ImageModal
                    isVisible={this.state.isModalVisible}
                    closeDisplay={() => this.setState({isModalVisible: false})}
                    houseImages={arrHouse}
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
                    style={{marginLeft: 20}}
                    onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" size={40} color="white" />
                    </TouchableHighlight>
                    <TouchableHighlight
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
                        style={{ flex: 1, backgroundColor: '#1D1B1B' }}
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
                <ScrollView>
                    <Text style={styles.desc}>{houseDescription}</Text>
                </ScrollView>
                </View>
                
                <View style={styles.bottomContainer}>
                    <Button 
                        title={streetName} 
                        color="tomato"
                        onPress={() => this.props.navigation.navigate('streetDetailScreen', {
                            streetId
                        })}
                    /> 
                    <View style={styles.onlyMap}>
                    <MapView
                        onMapReady={() => this.zoomTohouse()}
                        ref={this.mapViewRef}
                        mapType={'satellite'}
                        style={{...StyleSheet.absoluteFillObject}}
                        provider={"google"}
                        initialRegion={{
                          latitude: 63.4347866,
                          longitude: -20.2844343,
                          latitudeDelta: 0.095,
                          longitudeDelta: 0.0921}}>

                        <Polygon
                            coordinates={houseCoordinates}
                            fillColor="#f55d42"
                        />
                        
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
        paddingRight: 20,
        paddingLeft: 20
    },
    bottomContainer: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 20,
        paddingLeft: 20
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
