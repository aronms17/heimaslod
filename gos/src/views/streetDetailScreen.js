import React from 'react';
import { Text, View, TouchableHighlight, FlatList, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';
import sideMenuStyles from '../styles/sideMenuStyles';
import colors from '../styles/colors';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import ImageModal from '../components/ImageModal';
import HouseTextModal from '../components/HouseTextModal';
import Gallery from 'react-native-image-gallery';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { Feather, MaterialIcons, Ionicons  } from '@expo/vector-icons'
import Data from './../../script/jsonfile.json';
import HouseNamesModal from '../components/HouseNamesModal';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  }
];
export default class streetDetailScreen extends React.Component {
    constructor() {
        super();
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
          husVidGotu: []
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
    }

    navigateHouse(houseId) {
      this.props.navigation.push('houseDetailScreen', {houseId});
    }

    renderDrawer = () => {
        return (
          <View style={sideMenuStyles.sideMenu}>
            <TouchableHighlight
              underlayColor={colors.okkarSvarti}
              activeOpacity={0.5}
              style={sideMenuStyles.sideMenuItem}
              onPress={() => this.props.navigation.push('allStreetScreen')}>
              <Text style={sideMenuStyles.sideMenuText}>Götur og hús</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.okkarSvarti}
              activeOpacity={0.5}
              style={sideMenuStyles.sideMenuItem}
              onPress={() => {this.props.navigation.push('mapScreen'); this.drawer.closeDrawer()} }>
                <Text style={sideMenuStyles.sideMenuText}>Kort</Text>
            </TouchableHighlight>
          </View>
        );
    }

    render() {
      let { streetName, streetDescription, streetImages, shortStreetDescription, husVidGotu } = this.state;
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
                    
                  </View>
                </View>

                <View style={styles.bottomContainer}>

                <TouchableHighlight 
                  style={{
                      width: 90, height: 40, borderRadius: 20/4, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.WATERMELON, margin: 10
                  }} 
                  onPress={() => this.setState({houseModalVisible: true})}
                  activeOpacity={0.5}
                  backdropcolor='transparent'>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Sjá öll hús við götu</Text>
                </TouchableHighlight>
    
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
    marginTop: 10,
  },
  bottomContainer: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
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
