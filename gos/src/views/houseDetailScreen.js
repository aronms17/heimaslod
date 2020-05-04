import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import Gallery from 'react-native-image-gallery';
import ImageViewer from 'react-native-image-zoom-viewer';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import Hamburger from '../components/Hamburger';
import CloseBurger from '../components/CloseBurger';
import SideMenu from '../components/SideMenu';
import ImageModal from '../components/ImageModal';
import { Feather, MaterialIcons  } from '@expo/vector-icons'
import Data from './../../script/jsonfile.json';
export default class houseDetailScreen extends React.Component {
    constructor() {
        super();
        this.mapViewRef = React.createRef();
        this.state = {
          houseid: 0,
          houseName: '',
          houseDescription: '',
          houseImages: '',
          houseCoordinates: [],
          streetId: null,
          streetName: '',
          isModalVisible: false
        };
        console.disableYellowBox = true;
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { houseid } = navigation.state.params;
        const { houseName } = navigation.state.params;
        const { houseDescription } = navigation.state.params;
        const { houseImages } = navigation.state.params;
        const { houseCoordinates } = navigation.state.params;
        const { streetId } = navigation.state.params;

        let allarGotur = Array.from(Data.gotur);
        let allStreets = allarGotur.find(({ id }) => id === streetId);
        let streetName = allStreets.name;
        
        this.setState({houseid: houseid, houseName: houseName, houseDescription: houseDescription, 
            houseImages: houseImages, houseCoordinates: houseCoordinates, streetId: streetId, 
            streetId: streetId, streetName: streetName
        });

    }


    renderDrawer = () => {
        return (
          <View style={styles.sideMenu}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('allStreetScreen')}>
              <Text style={styles.sideMenuText}>Allar Götur</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.props.navigation.navigate('mapScreen'); this.drawer.closeDrawer();} }>
                <Text style={styles.sideMenuText}>Kort</Text>
            </TouchableHighlight>
            <Text style={styles.sideMenuText}>Stillingar</Text>
             
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
            setTimeout(() => {this.mapViewRef.current.animateToRegion(houseRegion, 4000)}, 2000)
            
          }
    }

    render() {
        const { houseName, houseDescription, houseImages, houseCoordinates, streetId, streetName } = this.state;
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
                      style={styles.burger}
                      onPress={() => this.drawer.openDrawer()}>
                        <Feather name='menu' size={40} color='white'/>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.name}>{houseName}</Text>
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
                            streetId, streetName
                        })}
                    />
                    <View style={styles.onlyMap}>
                    <MapView
                        onMapReady={() => this.zoomTohouse()}
                        ref={this.mapViewRef}
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
        justifyContent: 'flex-end'
      },
      burger: {
        marginTop: 40,
        marginRight: 17
      }
});
