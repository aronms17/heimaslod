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
          houseDescription: '',
          houseImages: '',
        };
    }

    static navigationOptions = {
        headerShown: false,
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { houseid } = navigation.state.params;
        const { houseName } = navigation.state.params;
        const { houseDescription } = navigation.state.params;
        const { houseImages } = navigation.state.params;
        this.setState({houseid: houseid, houseName: houseName, houseDescription: houseDescription, houseImages: houseImages});
    }

    render() {
        const{houseName, houseDescription, houseImages} = this.state;
        const arrHouse = Array.from(houseImages);

        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.name}>{houseName}</Text>
                </View>

                {arrHouse.map((element) => (
                <Gallery
                    style={{ flex: 1, backgroundColor: '#1D1B1B' }}
                    pageMargin={10}
                    images={[
                        { source: { uri: element } }
                      ]}
                />
                    ))
                }

                {/* 
                {arrHouse.map((element) => (
                    <Gallery
                        style={{ flex: 1, backgroundColor: '#1D1B1B' }}
                        pageMargin={10}
                        images={arrHouse[element]}
                    />
                    ))
                }
                */}

                <View style={styles.bodyContainer}>
                    <Text style={styles.desc}>{houseDescription}</Text>
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
        fontSize: 38,
        fontWeight: 'bold',
		color: '#fff'
    },
    desc: {
		fontSize: 18,
		color: '#fff'
    },
    desc2: {
		fontSize: 12,
		color: 'blue',
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
