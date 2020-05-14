import React from 'react'
import { View, Text, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import NativeModal from 'react-native-modal';
import styles from '../styles/styles';
import colors from '../styles/colors';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

const HouseTextModal = (props) => (
    <NativeModal
      isVisible={props.isVisible}
      // Hægt að style-a til
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onSwipeComplete={() => props.closeDisplay()}
      onBackdropPress={() => props.closeDisplay()}
      style={{justifyContent: 'flex-end', margin: 0}}
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
            <ScrollView>
                <Text style={styles.modalText}>{props.houseText}</Text>
            </ScrollView>
        </View>

    </NativeModal>
)

export default HouseTextModal;