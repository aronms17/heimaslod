import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native';
import NativeModal from 'react-native-modal';
import styles from '../styles/styles';
import colors from '../styles/colors';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageModal = (props) => (
    <NativeModal
      styles={styles.imageModal}
      isVisible={props.isVisible}
      // Hægt að style-a til
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0}
      onBackdropPress={() => props.closeDisplay()}
      >
        <ImageViewer 
        imageUrls={props.houseImages.map((element) => (
            { url: element }
        ))}
        backgroundColor={colors.okkarSvarti}
        enableSwipeDown={true}
        onSwipeDown={() => props.closeDisplay()}
        />
        <View style={styles.imageModal}> 
          <TouchableHighlight 
              style={{
                  width: 140, height: 40, borderRadius: 100/4, justifyContent: 'center', alignItems: 'center', 
                  backgroundColor: colors.WATERMELON, marginTop: 10, marginBottom: 350
              }} 
              onPress={() => props.closeDisplay()}
              activeOpacity={0.5}
              backdropcolor='transparent'>
                  <Text style={styles.desc}>Loka</Text>
          </TouchableHighlight>
        </View>

    
    </NativeModal>
)

export default ImageModal;