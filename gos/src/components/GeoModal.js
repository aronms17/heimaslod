import React from 'react'
import { View, Image, Text, StyleSheet, TouchableHighlight } from 'react-native';
import NativeModal from 'react-native-modal';
import colors from '../styles/colors';
import { Audio } from 'expo-av';

const playSound = async () => {
    sound = await Audio.Sound.createAsync(
      require('./../../assets/rocksound.wav'),
      { shouldPlay: true },
      null, true
    );
    sound.playAsync();
  }

const text = 
    <Text style={{width: 300, color: colors.white}}>
        Heimaeyjargosið hófst 23. janúar 1973 og var því lýst lokið þann 3. júlí 
        sama ár. Gosið er fyrsta eldgos sem hefst í byggð á Íslandi. Giftusamlegri 
        björgun á fólki og stórum hluta af eignum er minnst þegar gosið er rifjað upp. 
        Þó að nú á 21. öldinni rísi upp kynslóð, sem ekki upplifði atburðina örlagaríku, 
        eru þeir þó greyptir í hjörtu Eyjamanna. Minningarnar lifa og munu fara frá manni
        til manns. Þannig hefur gosið grópað huga Eyjamanna.
    </Text>;

const GeoModal = (props) => (
            <NativeModal
              isVisible={props.inPoly && props.display}
              onBackdropPress={() => props.onBackdropPress()}
              backdropOpacity={0.3}
              animationIn={'bounceInUp'}
              animationOut={'bounceOutDown'}
              swipeDirection={['up', 'down']}
              onSwipeComplete={() => props.onSwipeComplete()}
              style={styles.modal}
              propagateSwipe={true}
              swipeThreshold={300}
            //   onModalShow={() => playSound()}
            >
              <View style={styles.modalView}>
                <View style={{width: 350}}>
                  <Image resizeMethod={'resize'} style={{height: 230, width: 350, borderTopLeftRadius: 20, borderTopRightRadius: 20}} source={require('../../assets/gos_44.jpg')}/>
                </View>
                <View style={{marginTop: 10, alignItems: 'center', height: 200}}>
                  <Text style={{height: 40, width: '100%', fontSize: 30 , fontWeight: 'bold', color: colors.white}}>Velkomin(n) á hraunið </Text>
                  {text}
                </View>
                <View style={{marginTop: 0, justifyContent:'flex-end', height:'20%'}}>
                  <TouchableHighlight style={{width: 200, height: 50, borderRadius: 100/4,justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white}} onPress={() => props.close()}><Text style={{fontWeight: 'bold'}}>Loka</Text></TouchableHighlight>
                </View>
              </View>
            </NativeModal>

)

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
      },
      modalView: {
        height: 580,
        width: 350,
        backgroundColor: colors.okkarSvarti,
        borderRadius: 20,
        padding: 35,
        paddingTop: 0,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }
});

export default GeoModal;