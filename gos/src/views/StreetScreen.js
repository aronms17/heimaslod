import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
// import Streets from './../components/Streets';
import Data from './../../script/jsonfile.json';

export default class screen2 extends React.Component {
    constructor() {
        super();
        this.state = {
          streets: [],
          houses: []
        };
    }

    componentDidMount() {
        let streetdata = Data.gotur;
        let housedata = Data.hus;
        streetdata = streetdata.filter(gotur => gotur.name.length > 1);
        housedata = housedata.filter(gotur => gotur.address.length > 1);
        this.setState({streets: streetdata, houses: housedata});
    }

    navigateHouse(houseid, houseName, houseDescription, houseImages, houseCoordinates) {
        this.props.navigation.navigate('houseDetailScreen', {
          houseid, houseName, houseDescription, houseImages, houseCoordinates
        });
      }

    render() {
        return(
            <View style={{backgroundColor: '#1D1B1B'}}>
                <FlatList
                    data={this.state.streets}
                    renderItem={({item}) => (
                        <>
                            <TouchableOpacity style={{margin: 1}} onPress={() => console.log(item.name)}>
                                <Text style={{fontSize: 30, color: 'white'}}>{item.name}</Text>
                            </TouchableOpacity>
                            <View>
                                {this.state.houses[0] != null && this.state.houses.filter(house => house.streetId === item.id).map((house) => (
                                    <TouchableOpacity onPress={() => this.navigateHouse(house.id, house.address, house.text, house.images, house.coordinates) }>
                                        <Text style={{color: 'white'}}>{house.address}</Text>
                                    </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </>
                        
                    )}
                />
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
});
