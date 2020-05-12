import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableHighlight, Dimensions } from 'react-native';
import NativeModal from 'react-native-modal';
import { Feather, MaterialIcons  } from '@expo/vector-icons';
import colors from '../styles/colors';

const PreviewModal = (props) => (
    <NativeModal
      style={{ justifyContent: 'flex-end' }}
      isVisible={props.isVisible}
      // Hægt að style-a til
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onDismiss={() => props.closeDisplay()}
      backdropOpacity={0}
      onBackdropPress={() => props.closeDisplay()}
      swipeDirection={'down'}
      onSwipeComplete={() => props.closeDisplay()}
      swipeThreshold={70}
      style={styles.modal}
      hideModalContentWhileAnimating={true}
      >

      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
              <View style={{height: 20, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{
                  height: 7,
                  borderRadius: 20,
                  marginLeft: 10,
                  width: "10%",
                  backgroundColor: colors.okkarGreyLight,
                }}
              />
              </View>
            <TouchableHighlight
              underlayColor='transparent'
              activeOpacity={0.5}
              onPress = { () => props.closeDisplay()}>
              <Feather name='x-circle' size={30} color='tomato'/>
            </TouchableHighlight>  
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  text: {
    fontSize: 20,
    // marginLeft: 150
  },
  modalView: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 200,
    backgroundColor: "#1D1B1B"
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
    justifyContent: 'center',
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