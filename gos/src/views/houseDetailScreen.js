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
          backgroundColor: '#1D1B1B',
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
            <View style={[
                styles.container,
                { backgroundColor: '#1D1B1B' }
            ]}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.tempText}>{'hús id ' + this.state.houseid}</Text>
                </View>
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

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tempText: {
		fontSize: 48,
		color: '#fff'
	},
	bodyContainer: {
		flex: 2,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		paddingLeft: 25,
		marginBottom: 40
	},
	title: {
		fontSize: 48,
		color: '#fff'
	},
	subtitle: {
		fontSize: 24,
		color: '#fff'
	}
});
