import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableHighlight, ScrollView } from 'react-native';
import NativeModal from 'react-native-modal';
import styles from '../styles/styles';
import colors from '../styles/colors';
import { Feather, MaterialIcons  } from '@expo/vector-icons';

const HouseTextModal = (props) => (
    <NativeModal
      isVisible={props.isVisible}
      // Hægt að style-a til
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
    //   onSwipeComplete={() => props.closeDisplay()}
      onBackdropPress={() => props.closeDisplay()}
    >
        <View style={styles.textModalView}>
            <ScrollView>
                <Text style={styles.modalText}>{props.houseText}</Text>
            </ScrollView>
        </View>

    </NativeModal>
)

export default HouseTextModal;