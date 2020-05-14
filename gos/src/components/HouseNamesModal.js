import React from 'react'
import { View, Text, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
import NativeModal from 'react-native-modal';
import styles from '../styles/styles';
import colors from '../styles/colors';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

const HouseNamesModal = (props) => (
    <NativeModal
      isVisible={props.isVisible}
      // Hægt að style-a til
      animationIn={'fadeIn'}
      animationOut={'slideOutDown'}
    //   onSwipeComplete={() => props.closeDisplay()}
      onBackdropPress={() => props.closeDisplay()}
      style={styles.modal}
    >
        <View style={styles.textModalView}>
          <View style={{width: Dimensions.get('screen').width, paddingRight: 9, paddingTop: 7, flexDirection: 'column-reverse', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          
          <TouchableHighlight
              underlayColor='transparent'
              activeOpacity={0}
              onPress = { () => props.closeDisplay()}
              style={{backgroundColor: colors.WATERMELON, height: 32, width: 32, 
                borderRadius: 32/2, justifyContent: 'center', alignItems:'center', margin: 5}}
              >
              <MaterialCommunityIcons name='close' size={22} color='white'/>
            </TouchableHighlight>
            </View>

            <FlatList
              data={props.ollHus}
              renderItem={({item}) => (
                <TouchableOpacity
                  underlayColor={colors.okkarSvarti}
                  activeOpacity={0.5}
                  style={{width: 340, height: 75, flexDirection: 'row'}}
                  onPress={() => {props.nav(item.id); props.closeDisplay()}}
                >
                  <View style={{backgroundColor: 'royalblue', height: 35, width: 35, borderRadius: 35/2, justifyContent: 'center', alignItems:'center', margin: 5}}>
                      <FontAwesome5 name='house-damage' size={15} color='white'/> 
                  </View>
                  <View style={{marginLeft: 5, marginTop: 3, flex: 8}}>
                      <Text style={{fontSize: 20, color: colors.white}}>{item.address}</Text>
                      <Text numberOfLines={1} style={{color: colors.white}}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
            
        </View>

    </NativeModal>
)

export default HouseNamesModal;