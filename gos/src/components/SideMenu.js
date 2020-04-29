import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { Feather, MaterialIcons  } from '@expo/vector-icons';

const SideMenu = (props) => (
    <View>
            <Text style={styles.desc}>Tittlingur 1</Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('mapScreen')}>
                <Text style={styles.desc}>lingur 2</Text>
            </TouchableHighlight>
             
            <TouchableOpacity
                onPress={() => props.closeDrawer()}
                style={{
                    width: 44,
                    height: 44,
                    marginLeft: 20
                }}>
                <Feather name='menu' size={40} color='white'/>
            </TouchableOpacity>
    
    
          </View>
);

export default SideMenu;



const styles = StyleSheet.create({
    desc: {
		fontSize: 16,
        color: '#fff',
    }

});
