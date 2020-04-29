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

    render() {
        return(
            <View>
                <FlatList keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'
                    data={this.state.streets}
                    renderItem={({item}) => (
                        <TouchableOpacity style={{margin: 1}} onPress={() => console.log(item.name)}>
                            <Text style={{fontSize: 30}}>{item.name}</Text>
                            {this.state.houses[0] != null && this.state.houses.filter(house => house.streetId === item.id).map((house) => (
                                <Text>{house.address}</Text>
                                ))
                            }
                        </TouchableOpacity>
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
