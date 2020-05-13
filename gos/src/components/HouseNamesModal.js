import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import NativeModal from 'react-native-modal';
import styles from '../styles/styles';
import colors from '../styles/colors';
import { Feather, MaterialCommunityIcons  } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

const HouseNamesModal = (props) => (
    <NativeModal
      isVisible={props.isVisible}
      // Hægt að style-a til
      animationIn={'fadeIn'}
      animationOut={'slideOutDown'}
    //   onSwipeComplete={() => props.closeDisplay()}
      onBackdropPress={() => props.closeDisplay()}
    >
        <View style={styles.textModalView}>
          <View style={{width: 320, paddingRight: 9, paddingTop: 7, flexDirection: 'column-reverse', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          
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
              <TouchableHighlight
                underlayColor={colors.okkarSvarti}
                activeOpacity={0.5}
                onPress={() => {props.nav(item.id); props.closeDisplay()}}
              >
                <Text style={{color: 'white'}}>{item.address}</Text>
              </TouchableHighlight>
              )}
              keyExtractor={item => item.id}
            />
            
        </View>

    </NativeModal>
)

export default HouseNamesModal;