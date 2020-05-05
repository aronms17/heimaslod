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
      margin: 20,
      backgroundColor: "white",
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
    sideMenu: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingTop: 50,
      paddingBottom: 30,
      paddingLeft: 25
  
    },
    sideMenuText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white'
    },
    accordionText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white'
    },
    sideMenuItem: {
      marginBottom: 30
    },
    header: {
      width: Dimensions.get('screen').width, 
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    burger: {
      marginTop: 40,
      marginRight: 17,
    }
  });