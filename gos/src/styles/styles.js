import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
    map: {
      backgroundColor: '#fff'
    },
    components: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flexDirection: 'column',
      justifyContent: 'space-between',
  
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0
    },
    modalView: {
      height: 550,
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
    },
    textModalView: {
      height: '80%',
      width: Dimensions.get('screen').width,
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
    },
    header: {
      width: Dimensions.get('screen').width, 
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      height: 120,
      position: 'absolute',
    },
    burger: {
      height: 70,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftBurger: {
      height: 70,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalText: {
      color: 'white',
      fontSize: 18,
      marginTop: 20,
      marginBottom: 20
    },
    desc: { 
      fontSize: 16,
      color: 'white',
    },
    imageModal: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      height: 200,
      backgroundColor: colors.okkarSvarti
    }
  });