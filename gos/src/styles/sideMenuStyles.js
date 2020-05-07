import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
    sideMenu: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 50,
        paddingBottom: 30,
        paddingLeft: 25
    
      },
      sideMenuItem: {
        marginBottom: 30
      },
      sideMenuBottomItem: {
        marginTop: 400
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
      }
});