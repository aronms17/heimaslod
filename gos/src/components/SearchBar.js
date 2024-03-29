import React from 'react';
import { Text, View, StyleSheet, Dimensions, Keyboard, TextInput, Animated, FlatList, TouchableOpacity, TouchableHighlight, SectionList } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import colors from '../styles/colors';
import Houses from './../../data/data.json';


export default class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            yValue: new Animated.Value(90),
            cancelWidth: new Animated.Value(0),
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
        Animated.parallel([
            Animated.spring(this.state.yValue, {
                toValue: Dimensions.get('window').height - 40,
                friction: 9,
            }),
            Animated.spring(this.state.cancelWidth, {
                toValue: 70,
                friction: 9,
            })
        ]).start();
    };

    _moveDownAnimation = () => {
        _textInput.setNativeProps({text: ''});
        this.search('');
        Keyboard.dismiss();

        Animated.parallel([
            Animated.spring(this.state.yValue, {
                toValue: 90,
                friction: 7,
            }),
            Animated.spring(this.state.cancelWidth, {
                toValue: 1,
                friction: 9,
            }),
        ]).start();
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
                    return{...house, color: 'blue'}
                })
            },
            {
                title: 'Textar',
                data: textFiltered.map(house => {
                    return{...house, color: 'red'}
                })
            }
        ];
        if(!input) {
            this.setState({sectionHouses: []})
        }
        else {
            this.setState({sectionHouses: sections})
        }

    };

    renderSeparatorView = () => {
        return (
          <View style={{
              height: 1,
              marginLeft: 10,
              width: "95%",
              backgroundColor: "grey",
            }}
          />
        );
      };

      renderItemView = ({item}) => (
        <TouchableOpacity style={{margin: 5, marginVertical: 15, flexDirection: 'row'}} onPress={() => this.previewHouse(item)}>
            {(item.color === 'blue') ? 
            <View style={{backgroundColor: 'royalblue', height: 35, width: 35, borderRadius: 35/2, justifyContent: 'center', alignItems:'center', margin: 5}}>
                <FontAwesome5 name='house-damage' size={15} color='white'/> 
            </View>
            :
            <View style={{backgroundColor: colors.WATERMELON, height: 35, width: 35, borderRadius: 35/2, justifyContent: 'center', alignItems:'center', margin: 5}}>
                <Feather name='file-text' size={15} color='white'/>
            </View>}
            <View style={{marginLeft: 5, marginTop: 3, flex: 8}}>
                <Text style={{fontSize: 20, color: (this.props.burgerColor === 'white') ? 'white' : 'black'}}>{item.address}</Text>
                <Text numberOfLines={1} style={{color: (this.props.burgerColor === 'white') ? 'white' : 'black'}}>{item.text}</Text>
            </View>
        </TouchableOpacity>
      );


    render() {
        return(
            <>
            <Animated.View style={[styles.search, {backgroundColor: (this.props.burgerColor === 'white') ? colors.okkarSvarti : colors.NEUTRAL}, {height: this.state.yValue}]}>
                <View style={{
                        height: 7,
                        borderRadius: 20,
                        width: "10%",
                        marginTop: 10,
                        backgroundColor: colors.greyLight,
                        }}
                    />
                <View style={styles.top}>

                    <TextInput
                    ref={ component => _textInput = component}
                    clearButtonMode={'always'}
                    autoCorrect={false}
                    placeholder="Leita"
                    placeholderTextColor='grey'
                    style={styles.searchInput}
                    onChangeText={value => this.search(value)}
                    onTouchStart={this._moveUpAnimation}
                    />
                    <TouchableHighlight 
                        activeOpacity={0.5}
                        underlayColor='transparent'
                        style={styles.cancel} 
                        onPress={this._moveDownAnimation}
                    >
                        <Animated.Text style={{fontSize: 20, color: 'grey', width: this.state.cancelWidth}}>Hætta</Animated.Text>
                    </TouchableHighlight>

                </View>

                <View style={styles.bottom}>

                    <View style={{flex: 1}}>
                        <SectionList keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'
                            sections={this.state.sectionHouses}
                            keyExtractor={(item, index) => (item + index).toString()}
                            renderItem={this.renderItemView}
                            renderSectionHeader={({ section }) => (
                                <Text style={{marginLeft: 7,fontSize: 30, backgroundColor: (this.props.burgerColor === 'white') ? colors.okkarSvarti : colors.NEUTRAL, color: (this.props.burgerColor === 'white') ? 'white' : 'black'}}>{section.title}</Text>
                                )}
                            ItemSeparatorComponent={this.renderSeparatorView}
                            ListEmptyComponent={
                                <FlatList keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'
                                    data={this.state.searchHistory}
                                    ListHeaderComponent={this.state.searchHistory.length > 0 ? <Text style={{color: 'grey', marginLeft: 10}}>Leitarsaga:</Text> : <></>}
                                    renderItem={this.renderItemView}
                                    keyExtractor={(item) => item.id.toString()}
                                    ListEmptyComponent={<View style={{width: Dimensions.get('screen').width, height: 200, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: 'grey'}}>Engin leitarsaga tiltæk</Text></View>}
                                />
                            }
                        />

                    </View>
                </View>
            </Animated.View>
        </>
        );
    }
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    bottom: {
        marginTop: 20,
        flexDirection: 'row'
    },
    search: {
        height: 100, 
        width: Dimensions.get('window').width, 
        backgroundColor: colors.NEUTRAL,
        flexDirection: 'column',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchInput: {
        backgroundColor: colors.white,
        flex: 1,
        color: colors.black,
        height: 35,
        marginLeft: 18,
        marginTop: 10,
        fontSize: 28,
        padding: 10,
        borderRadius: 10,
        fontSize: 15,
        },
        cancel: {
            height: 35,
            marginTop: 10,
            margin: 0,
            paddingLeft: 15,
            justifyContent: 'center',
        },
});
