import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons  } from '@expo/vector-icons'
// import Streets from './../components/Streets';
import Data from '../../script/jsonfile.json';

export default class allStreetScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          streets: [],
          houses: [],
        };
    }

    componentDidMount() {
        let streetdata = Data.gotur;
        let housedata = Data.hus;
        streetdata = streetdata.filter(gotur => gotur.name.length > 1);
        housedata = housedata.filter(gotur => gotur.address.length > 1);
        this.setState({streets: streetdata, houses: housedata});
    }

    navigateHouse(houseid, houseName, houseDescription, houseImages, houseCoordinates, streetId) {
        this.props.navigation.navigate('houseDetailScreen', {
          houseid, houseName, houseDescription, houseImages, houseCoordinates, streetId
        });
    }

    renderDrawer = () => {
        return (
          <View style={styles.sideMenu}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('allStreetScreen')}>
              <Text style={styles.sideMenuText}>Allar Götur</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.drawer.closeDrawer()}>
                <Text style={styles.sideMenuText}>Hehe</Text>
            </TouchableHighlight>
            <Text style={styles.sideMenuText}>Stillingar</Text>
             
          </View>
        );
      }



    render() {
        return(
            <View style={{backgroundColor: '#1D1B1B'}}>
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
                <FlatList
                    data={this.state.streets}
                    renderItem={({item}) => (
                        <>
                            <TouchableOpacity style={{margin: 1}} onPress={() => console.log(item.name)}>
                                <Text style={{fontSize: 30, color: 'white'}}>{item.name}</Text>
                            </TouchableOpacity>
                            <View>
                                {this.state.houses[0] != null && this.state.houses.filter(house => house.streetId === item.id).map((house) => (
                                    <TouchableOpacity onPress={() => this.navigateHouse(house.id, house.address, house.text, house.images, house.coordinates, house.streetId) }>
                                        <Text style={{color: 'white'}}>{house.address}</Text>
                                    </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </>
                        
                    )}
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
        justifyContent: 'center'
    },
    header: {
        width: Dimensions.get('screen').width, 
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    burger: {
        marginTop: 40,
        marginRight: 17
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
});
