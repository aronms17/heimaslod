import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableHighlight, Dimensions } from 'react-native';
import NativeModal from 'react-native-modal';
import { Feather, MaterialIcons  } from '@expo/vector-icons';

const PreviewModal = (props) => (
    <NativeModal
      style={{ justifyContent: 'flex-end' }}
      isVisible={props.isVisible}
      // Hægt að style-a til
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onDismiss={() => props.closeDisplay()}
      onBackdropPress={() => props.closeDisplay()}
      >

      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <View>
            <TouchableHighlight
              onPress = { () => props.closeDisplay()}>
              <Feather name='x-circle' size={30} color='tomato'/>
            </TouchableHighlight>  
          </View>
        </View>
          <Text style={styles.textStyle}>
            {props.address}
          </Text>
        <View style={styles.takkar}>
          <Button
            style={styles.takkar}
            title="Sjá meira"
            color="green"
            onPress = { () => props.goToHouse() }/>
        </View>
      </View>
    </NativeModal>
    
)

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    // marginLeft: 150
  },
  modalView: {
    height: 250,
    width: Dimensions.get('screen').width,
    backgroundColor: "#1D1B1B",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  takkar: {
    flexDirection: 'row',
    marginRight: 5
  },
  modalHeader: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10,
    position: 'relative'
  }
});

export default PreviewModal;