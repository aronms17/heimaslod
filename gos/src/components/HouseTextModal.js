import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import NativeModal from 'react-native-modal';
import styles from '../styles/styles';
import colors from '../styles/colors';
import { Feather, MaterialIcons  } from '@expo/vector-icons';

const HouseTextModal = (props) => (
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
              activeOpacity={0.5}
              onPress = { () => props.closeDisplay()}>
              <Feather name='x-circle' size={30} color='tomato'/>
            </TouchableHighlight>
            </View>
            <ScrollView>
                <Text style={styles.modalText}>{props.houseText}</Text>
            </ScrollView>
        </View>

    </NativeModal>
)

export default HouseTextModal;