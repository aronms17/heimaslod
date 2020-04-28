import React, {Component} from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, MaterialIcons  } from '@expo/vector-icons';
import { View } from 'react-native';


const CloseBurger = ({
    closeDrawer

}) => (
    <TouchableOpacity
    onPress={closeDrawer}
    style={{
        width: 44,
        height: 44,
        marginLeft: 20
    }}
    >
        <Feather name='x-circle' size={40} color='white'/>
    </TouchableOpacity>
);

export default CloseBurger;