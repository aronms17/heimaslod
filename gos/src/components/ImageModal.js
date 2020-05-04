import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableHighlight, Dimensions } from 'react-native';
import NativeModal from 'react-native-modal';
import Gallery from 'react-native-image-gallery';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Feather, MaterialIcons  } from '@expo/vector-icons';

const ImageModal = (props) => (
    <NativeModal
      isVisible={props.isVisible}
      // Hægt að style-a til
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0}
      >

      <NativeModal
        visible={true}
        backdropOpacity={0}
        backgroundColor={"black"}
      >
            <ImageViewer 
            imageUrls={props.houseImages.map((element) => (
                { url: element }
            ))}
            />
            <Button
            title="Close modal"
            onPress = {() => props.closeDisplay()}
            />
      </NativeModal>
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

export default ImageModal;