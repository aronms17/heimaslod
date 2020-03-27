import React from 'react';
import { Text, View, Button, StyleSheet, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';


export default class screen2 extends React.Component {
    constructor() {
        super();
        this.state = {
          houseid: 0,
        };
    }

    static navigationOptions = {
        headerStyle: {
          backgroundColor: 'blue',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold',
        },
    }

    componentDidMount() {
        const { navigation } = this.props;
        var houseid = navigation.state.params;
        this.setState({houseid: houseid});
    }

    render() {
        return(
            <View>
                <Text>{'hús id ' + this.state.houseid}</Text>
                <Button
                onPress={() => console.log('haha' + this.state.houseid)}
                title='press'
                color='blue'
                axxessibilityLabel='haha'
                />

            </View>
        );
    }
}