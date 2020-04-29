import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { Feather, MaterialIcons  } from '@expo/vector-icons';


export default class SearchBar extends React.Component {


renderDrawer = () => {
    return (
      <View>
        <Text style={styles.desc}>Tittlingur 1</Text>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('mapScreen')}>
            <Text style={styles.desc}>lingur 2</Text>
        </TouchableHighlight>
         
        <TouchableOpacity
            onPress={() => console.log('hehe')}
            style={{
                width: 44,
                height: 44,
                marginLeft: 20
            }}>
            <Feather name='menu' size={40} color='white'/>
        </TouchableOpacity>


      </View>
    );
}

   
    render() {
        return(
                <DrawerLayout
                    ref={drawer => {
                    this.drawer = drawer;
                    }}
                    drawerWidth={220}
                    drawerPosition={DrawerLayout.positions.Right}
                    drawerType='front'
                    drawerBackgroundColor='#1D1B1B'
                    renderNavigationView={this.renderDrawer}
                >
                    {/* <TouchableOpacity
                        onPress={() => console.log('andskotans')}
                        style={{
                            width: 44,
                            height: 44,
                            marginLeft: 20
                        }}>
                        <Feather name='menu' size={40} color='white'/>
                    </TouchableOpacity> */}
                    
                </DrawerLayout>
            

        );
    }

}


const styles = StyleSheet.create({

});
