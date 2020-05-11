import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons, Ionicons  } from '@expo/vector-icons'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import colors from '../styles/colors';
// import Streets from './../components/Streets';
import Data from '../../script/jsonfile.json';
import { TextInput } from 'react-native-gesture-handler';

export default class allStreetScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          streets: [],
          houses: [],
          inMemoryStreets: [],
          inMemoryHouses: []
        };
    }

    componentDidMount() {
        let streetdata = Data.gotur;
        let housedata = Data.hus;
        streetdata = streetdata.filter(gotur => gotur.name.length > 1).sort((a,b) => (a.name > b.name) ? 1 : -1);
        housedata = housedata.filter(gotur => gotur.address.length > 1).sort((a,b) => (a.address > b.address) ? 1 : -1);
        // this.state.contacts.sort((a,b) => (a.firstName > b.firstName) ? 1 : -1)
        this.setState({streets: streetdata, houses: housedata, inMemoryStreets: streetdata, inMemoryHouses: housedata});
    }

    navigateHouse(houseId) {
        this.props.navigation.navigate('houseDetailScreen', {
            houseId
          });
    }

    navigateStreet(streetId) {
        this.props.navigation.navigate('streetDetailScreen', {
            streetId
          });
    }

    search = input => {
        const housesFiltered = this.state.inMemoryHouses.filter(house => {
            let houseLower = house.address.toLowerCase();
            let inputLower = input.toLowerCase();

            return houseLower.indexOf(inputLower) > -1;
        });
        // const streetsFilteredByName = this.state.inMemoryStreets.filter(street => {
        //     let streetLower = street.name.toLowerCase();
        //     let inputLower = input.toLowerCase();

        //     return streetLower.indexOf(inputLower) > -1;
        // });

        //filterað hverja götu - ef gata hefur eitthvað house.streetId sama og id á götunni return götunni
        const streetsFilteredByHouse = this.state.inMemoryStreets.filter(street => {
            if(housesFiltered.some(house => house.streetId === street.id)) {
                return street;
            }
            // ef street matchar við input þá return street
        });

        this.setState({houses: housesFiltered, streets: streetsFilteredByHouse});
    }

    renderDrawer = () => {
        return (
          <View style={styles.sideMenu}>
            <TouchableHighlight
                underlayColor={colors.okkarSvarti}
                activeOpacity={0.5}
                onPress={() => {this.props.navigation.navigate('mapScreen'); this.drawer.closeDrawer();} }>
                <Text style={styles.sideMenuText}>Kort</Text>
            </TouchableHighlight>
          </View>
        );
      }



    render() {
        return(
            <View style={styles.container}>
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

                
                <View style={styles.desc}>
                    <TextInput
                        style={{height: 40, fontSize: 20, color: 'white'}}
                        autoCorrect={false}
                        placeholder="Leita"
                        placeholderTextColor="white"
                        onChangeText={value => this.search(value)}
                        />
                </View>
                <FlatList keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'
                    data={this.state.streets}
                    renderItem={({item}) => (
                        <>
                            <TouchableOpacity style={{margin: 1}} onPress={() => this.navigateStreet(item.id)}>
                                <Text style={{fontSize: 30, color: 'white'}}>{item.name}</Text>
                            </TouchableOpacity>
                            <View>
                                {this.state.houses[0] != null && this.state.houses.filter(house => house.streetId === item.id).map((house) => (
                                    <TouchableOpacity key={house.id} onPress={() => this.navigateHouse(house.id) }>
                                        <Text style={{color: 'white'}}>{house.address}</Text>
                                    </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
                </DrawerLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#1D1B1B',
        justifyContent: 'center',
        paddingLeft: 15
        
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
		fontSize: 20,
        color: '#fff',
        paddingRight: 10,
        paddingBottom: 10
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
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
      burger: {
        marginTop: 40,
        marginRight: 20
      }
});
