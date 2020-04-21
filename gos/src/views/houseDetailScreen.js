import React from 'react';
import { Text, View, Button, StyleSheet, Dimensions, Image } from 'react-native';
import { withNavigation, SafeAreaView } from 'react-navigation';
import MapView, { Marker, Overlay, UrlTile, Polygon } from 'react-native-maps';
import Gallery from 'react-native-image-gallery';
export default class screen2 extends React.Component {
    constructor() {
        super();
        this.state = {
          houseid: 0,
          houseName: '',
          houseDescription: ''
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
        const { houseid } = navigation.state.params;
        const { houseName } = navigation.state.params;
        const { houseDescription } = navigation.state.params;
        this.setState({houseid: houseid, houseName: houseName, houseDescription: houseDescription});
    }

    render() {
        return(
            
            <View style={styles.container}>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.name}>{this.state.houseName}</Text>
                </View>
                    <Gallery
                        style={{ flex: 1, backgroundColor: '#1D1B1B' }}
                        pageMargin={10}
                        images={[
                          { source: { uri: 'http://heimaslod.is/images/6/6f/L%C3%ADfeyrissj%C3%B3%C3%B0ur.jpg' } },
                          { source: { uri: 'http://heimaslod.is/images/6/6f/L%C3%ADfeyrissj%C3%B3%C3%B0ur.jpg' } },
                          { source: { uri: 'http://heimaslod.is/images/6/6f/L%C3%ADfeyrissj%C3%B3%C3%B0ur.jpg' } },
                          { source: { uri: 'http://heimaslod.is/images/6/6f/L%C3%ADfeyrissj%C3%B3%C3%B0ur.jpg' } }
                        ]}
                    />
                
                {/* 
                <View style={styles.subtitle}>
                    <Image
                            source={{
                              uri:
                                'http://heimaslod.is/images/6/6f/L%C3%ADfeyrissj%C3%B3%C3%B0ur.jpg',
                            }}
                            style={{ width: 350, height: 200, margin: 16 }}
                    />
                </View>
                */}
                <View style={styles.bodyContainer}>
                    <Text style={styles.desc}>{this.state.houseDescription}</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#1D1B1B'
	},
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	name: {
		fontSize: 40,
		color: '#fff'
    },
    desc: {
		fontSize: 18,
		color: '#fff'
	},
	bodyContainer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 15,
        marginBottom: 40,
	},
	title: {
		fontSize: 48,
		color: '#fff'
	},
});
