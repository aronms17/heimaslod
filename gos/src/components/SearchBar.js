import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, TextInput, KeyboardAvoidingView, Animated, Easing, FlatList, ScrollView, TouchableOpacity, TouchableHighlight, SectionList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
// import { TouchableHighlight } from 'react-native-gesture-handler';
import Houses from './../../script/jsonfile.json';


const ListItem = ({House}) => (
    <View>
      <Text>{House.address}</Text>
    </View>
  );

export default class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            yValue: new Animated.Value(100),
            houses: [],
            sectionHouses: [],
            inMemoryHouses: [],
            searchHistory: [],
        };
    }

    componentDidMount() {
        let houseData = Houses.hus;
        houseData = houseData.filter(hus => hus.address.length > 1);
        this.setState({inMemoryHouses: houseData});
    };

    _moveUpAnimation = () => {
        Animated.spring(this.state.yValue, {
            toValue: Dimensions.get('window').height - 100,
            friction: 9,
        }).start();
    };

    _moveDownAnimation = () => {
        _textInput.setNativeProps({text: ''});
        this.search('');
        Keyboard.dismiss();
        Animated.spring(this.state.yValue, {
            toValue: 100,
            friction: 7,
        }).start();
    };

    previewHouse(house) {
        this._moveDownAnimation();
        if(!this.state.searchHistory.some(arrayHouse => arrayHouse.id === house.id)) {
            this.setState({searchHistory: [house, ...this.state.searchHistory.slice(0, 4)]});
        }
        this.props.preview(house);
        
    };

    search = input => {
        const housesFiltered = this.state.inMemoryHouses.filter(house => {
            let houseLower = house.address.toLowerCase();
            let inputLower = input.toLowerCase();

            return houseLower.indexOf(inputLower) > -1;
        });
        const textFiltered = this.state.inMemoryHouses.filter(house => {
            let houseTextLower = house.text.toLowerCase();
            let inputLower = input.toLowerCase();
            return houseTextLower.indexOf(inputLower) > -1;
        });

        let sections = [
            {
                title: 'Heimilisföng',
                data: housesFiltered.map(house => {
                    return{...house, color: 'red'}
                })
            },
            {
                title: 'Textar',
                data: textFiltered.map(house => {
                    return{...house, color: 'blue'}
                })
            }
        ];
        // this.setState({sectionHouses: sections})
        if(!input) {
            // this.setState({houses: []});
            this.setState({sectionHouses: []})
        }
        else {
            // this.setState({houses: housesFiltered});
            this.setState({sectionHouses: sections})
        }

    };


    render() {
        return(
            <>
            {/* <KeyboardAvoidingView behavior='position'> */}
                {/* <Animated.View style={[styles.animatePrufa, {height: this.state.yValue}]}>
                </Animated.View> */}
                

                

                {/* <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}> */}
                    <Animated.View style={[styles.search, {height: this.state.yValue}]}>

                    <View style={styles.top}>

                        <TextInput
                        ref={ component => _textInput = component}
                        autoCorrect={false}
                        placeholder="Search"
                        placeholderTextColor='white'
                        style={ styles.searchInput }
                        // style={{backgroundColor: 'grey', color: 'white'}}
                        onChangeText={value => this.search(value)}
                        onTouchStart={this._moveUpAnimation}
                        />
                        <TouchableHighlight style={styles.cancel} onPress={this._moveDownAnimation}>
                            <Text style={{fontSize: 20}}>Cancel</Text>
                        </TouchableHighlight>

                    </View>

                    <View style={styles.bottom}>

                        <View style={{flex: 1}}>
                            {/* <FlatList keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always' extraData={this.state.houses}
                            data={this.state.houses}
                            renderItem={({item}) => (
                                <TouchableOpacity style={{margin: 1, backgroundColor: item.color}} onPress={() => this.previewHouse(item)}>
                                    <Text style={{fontSize: 20}}>{item.address}</Text>
                                    <Text numberOfLines={1} >{item.text}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                            ListEmptyComponent={
                                <Text>Leitarsaga:</Text>
                            }
                            /> */}
                            <SectionList keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'
                                sections={this.state.sectionHouses}
                                keyExtractor={(item, index) => (item + index).toString()}
                                renderItem={({item}) => 
                                    <TouchableOpacity style={{margin: 1}} onPress={() => this.previewHouse(item)}>
                                        {/* <View style={{height: 20, width: 20, backgroundColor: item.color}}></View> */}
                                        {(item.color === 'red') ? <FontAwesome5 name='house-damage' size={30} color='lightblue'/> : <Feather name='align-justify' size={30} color='tomato'/>}
                                        <Text style={{fontSize: 20}}>{item.address}</Text>
                                        <Text numberOfLines={1} >{item.text}</Text>
                                    </TouchableOpacity>
                                }
                                renderSectionHeader={({ section }) => (
                                    <Text style={{fontSize: 30, backgroundColor: 'rgb(242, 242, 242)'}}>{section.title}</Text>
                                  )}
                                ListEmptyComponent={
                                    <FlatList keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'
                                        data={this.state.searchHistory}
                                        ListHeaderComponent={this.state.searchHistory.length > 0 ? <Text style={{color: 'grey'}}>Leitarsaga:</Text> : <></>}
                                        renderItem={({item}) => (
                                            <TouchableOpacity style={{margin: 1}} onPress={() => this.previewHouse(item)}>
                                                {(item.color === 'red') ? <FontAwesome5 name='house-damage' size={30} color='lightblue'/> : <Feather name='align-justify' size={30} color='tomato'/>}
                                                <Text style={{fontSize: 20}}>{item.address}</Text>
                                                <Text numberOfLines={1} >{item.text}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item) => item.id.toString()}
                                        ListEmptyComponent={<View style={{width: Dimensions.get('screen').width, height: 200, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: 'grey'}}>Engin leitarsaga tiltæk</Text></View>}
                                    />
                                }
                            />

                        </View>

                    </View>

                    </Animated.View>
                {/* </TouchableWithoutFeedback> */}

                
            {/* </KeyboardAvoidingView> */}

            {/* <TouchableOpacity onPress={() => console.log("Pressed")}>
            <TextInput
            pointerEvents="none"
            />
            </TouchableOpacity> */}
        </>
        );
    }
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row'
    },
    bottom: {
        flexDirection: 'row'
    },
    search: {
        height: 100, 
        width: Dimensions.get('window').width, 
        backgroundColor: 'rgb(242, 242, 242)',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius:10,
        shadowColor: "#000",
        // shadowOffset: {
        //     width: -1,
        //     height: -2
        //   },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchInput: {
        backgroundColor: 'grey',
        color: 'white',
        height: 35,
        width: Dimensions.get('window').width - 100,
        marginLeft: 15,
        // marginRight: 15,
        marginTop: 15,
        fontSize: 28,
        padding: 10,
        borderRadius: 10,
        fontSize: 15,
        // borderBottomWidth: 2,
        // borderBottomColor: 'blue'
        },
        cancel: {
            height: 35,
            width: 60,
            //   backgroundColor: 'grey',
            margin: 15,

        },
});
