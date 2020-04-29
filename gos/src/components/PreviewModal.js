import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import NativeModal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PreviewModal = (props) => (
    <Modal 
      visible={props.display}
      animationType="fade" 
      transparent={true}
      onRequestClose={() => props.closeDisplay()}
      onDismiss={() => props.closeDisplay()}
      >

      <View style={styles.modalView}>
          <Text style={styles.textStyle}>
            {props.address}
          </Text>
        <View style={{}}>
          <Button
            title="Sjá meira"
            color="green"
            onPress = { () => props.goToHouse() }/>

          <Button 
            title="Loka"
            onPress = { () => props.closeDisplay() }
            color="red"/>
        </View>
      </View>
    </Modal>
    
)

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginLeft: 150
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 80,
    backgroundColor: "#1D1B1B",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  }
});

export default PreviewModal;