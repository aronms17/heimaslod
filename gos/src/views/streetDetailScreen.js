import React from 'react';
import { Text, View, TouchableHighlight, FlatList, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';
import sideMenuStyles from '../styles/sideMenuStyles';
import colors from '../styles/colors';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import ImageModal from '../components/ImageModal';
import Gallery from 'react-native-image-gallery';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { Feather, MaterialIcons, Ionicons  } from '@expo/vector-icons'
import Data from './../../script/jsonfile.json';

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
          streetImages: '',
          isModalVisible: false,
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
      console.log('houseid from streetdetail: ', houseId);
      this.props.navigation.push('houseDetailScreen', {houseId});
    }

    _renderSectionTitle = section => {
        return (
          <View>
            <Text>{section.content}</Text>
          </View>
        );
    };
    
    _renderHeader = section => {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', color: 'white', marginRight: 5}}>Sjá hús við götu</Text>
          <Feather name='arrow-down-circle' size={18} color='white'/>
        </View>
      );
    };
    
    _renderContent = section => {
      return (
        <View>
          <FlatList
            data={this.state.husVidGotu}
            renderItem={({item}) => (
            <TouchableHighlight
              underlayColor={colors.okkarSvarti}
              activeOpacity={0.5}
              onPress={() => this.navigateHouse(item.id) }
            >
              <Text style={styles.desc}>{item.address}</Text>
            </TouchableHighlight>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      );
    };
    
    _updateSections = activeSections => {
      this.setState({ activeSections });
    };

    renderDrawer = () => {
        return (
          <View style={sideMenuStyles.sideMenu}>
            <TouchableHighlight
              underlayColor={colors.okkarSvarti}
              activeOpacity={0.5}
              style={sideMenuStyles.sideMenuItem}
              onPress={() => this.props.navigation.navigate('allStreetScreen')}>
              <Text style={sideMenuStyles.sideMenuText}>Götur og hús</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.okkarSvarti}
              activeOpacity={0.5}
              style={sideMenuStyles.sideMenuItem}
              onPress={() => {this.props.navigation.navigate('mapScreen'); this.drawer.closeDrawer()} }>
                <Text style={sideMenuStyles.sideMenuText}>Kort</Text>
            </TouchableHighlight>
          </View>
        );
    }

    render() {
        const { streetName, streetDescription, streetImages } = this.state;
        const img = Array.from(streetImages);
        return(
            <View style={styles.container}>
                <ImageModal
                    isVisible={this.state.isModalVisible}
                    closeDisplay={() => this.setState({isModalVisible: false})}
                    houseImages={img}
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
                  <ScrollView>
                    <Text style={styles.desc}>{streetDescription}</Text>
                  </ScrollView>
                  <View style={{marginBottom: 10}}>
                    <Accordion
                        underlayColor={colors.okkarSvarti}
                        activeOpacity={0.5}
                        sections={SECTIONS}
                        activeSections={this.state.activeSections}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                    />
                  </View>
                </View>

                <View style={styles.bottomContainer}>
    
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
    paddingRight: 20
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
