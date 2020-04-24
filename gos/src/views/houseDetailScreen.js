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

                <View style={styles.galleryContainer}>
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
                
                <View style={styles.descriptionContainer}>
                <ScrollView>
                    <Text style={styles.desc}>{houseDescription}</Text>
                </ScrollView>
                </View>
                
                <View style={styles.bottomContainer}>
                    <Text style={styles.desc}>Bottom screen test</Text>
                    <View style={styles.onlyMap}>
                    <MapView
                        style={{...StyleSheet.absoluteFillObject}}
                        initialRegion={{
                          latitude: 63.4347866,
                          longitude: -20.2844343,
                          latitudeDelta: 0.095,
                          longitudeDelta: 0.0921}}>
                        
                    </MapView>
                    </View>
                    
                    <View style={styles.bottomItems}>
                        <Text style={styles.desc}>hehe</Text>
                    </View>

                </View>

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
		alignItems: 'center',
        justifyContent: 'center',
    },
    galleryContainer: {
        flex: 3,
    },
    descriptionContainer: {
        flex: 4,
    },
    bottomContainer: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
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
    }
});
