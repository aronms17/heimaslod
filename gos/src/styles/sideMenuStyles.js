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
        marginBottom: 30,
        flexDirection: 'row'
      },
      sideMenuMiddleItem: {
        marginBottom: 300
      },
      sideMenuBottomItem: {
        flexDirection: 'row',
      },
      sideMenuText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 3
      },
      sideMenuBottomText: {
        fontSize: 20,
        color: 'white'
      },
      accordionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
      },
      mapButtonStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 6
      },
      aboutUs: {
        fontSize: 20,
        color: 'white'
      }
});