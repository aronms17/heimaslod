import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Linking, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import NativeModal from 'react-native-modal';
import styles from '../styles/styles';
import colors from '../styles/colors';
import { Feather, MaterialCommunityIcons  } from '@expo/vector-icons';

let heima =  
  <Text style={{color: 'royalblue', fontSize: 18}}
    onPress={() => Linking.openURL('http://heimaslod.is/index.php/Fors%C3%AD%C3%B0a')}>
    Heimaslóð
  </Text>;

const AboutUsModal = (props) => (
    <NativeModal
      isVisible={props.isVisible}
      // Hægt að style-a til
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onSwipeComplete={() => props.closeDisplay()}
      onBackdropPress={() => props.closeDisplay()}
      style={{justifyContent: 'flex-end', margin: 0}}
    >
        <View style={styles.aboutModalView}>
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
            <View style={{}}>
                <Text style={styles.modalText}
                >
                    Þetta smáforrit er lokaverkefni við tölvunarfræði og hugbúnaðarverkfræði frá Háskólanum í Reykjavík. 
                    Höfundar eru Aron Máni Símonarson, Baldvin Búi Wernersson og Þórður Örn Stefánsson. 
                    Allar upplýsingar og myndir koma frá vefsíðunni {heima}
                </Text>
                
            </View>
        </View>

    </NativeModal>
)
export default AboutUsModal;