import React from 'react';
import { Text, View, Button, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
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
        console.log("Fjöldi stafa: ", houseDescription.length)

        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.name}>{houseName}</Text>
                </View>
                {/*  */}

                <View style={styles.container}>
                    {/* Rétt map aðferð á propsið núna */}
                    <Gallery
                        style={{ flex: 1, backgroundColor: '#1D1B1B' }}
                        pageMargin={10}
                        images={
                            arrHouse.map((element) => (
                                { source: { uri: element } }
                            ))
                        }
                    />

                </View>
                
                <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.desc}>{houseDescription}</Text>
                </ScrollView>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#1D1B1B',
        
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
		fontSize: 16,
        color: '#fff',
        flex:1,
        flexWrap: 'wrap'
    },
    desc2: {
		fontSize: 12,
		color: 'blue',
	},
	bodyContainer: {
		flex: 4,
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
