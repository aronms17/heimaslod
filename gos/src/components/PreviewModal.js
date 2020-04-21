import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';

const PreviewModal = (props) => (
    <Modal 
      visible={props.display}
      animationType="fade" 
      transparent={true}
      onBackdropPress={() => props.closeDisplay() }
      onRequestClose={ () => props.closeDisplay() }>
      <View style={styles.modalView}>
          <Text style={styles.textStyle}>
            {props.address}
          </Text>
          
          <Button 
              title="Go to house"
              color="green"
              onPress = { () => props.goToHouse() }/>

          <Button 
              title="close" 
              onPress = { () => props.closeDisplay() }
              color="red"/>
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
    elevation: 5
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
    fontSize: 24,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default PreviewModal;