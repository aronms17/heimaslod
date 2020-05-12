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
    modalView: {
      height: 400,
      margin: 20,
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
    },
    burger: {
      marginTop: 40,
      marginRight: 17,
    },
    leftBurger: {
      marginTop: 43,
      marginRight: 7
    }
  });