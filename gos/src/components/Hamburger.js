import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';


const Hamburger = ({
    openDrawer

}) => (
    <TouchableOpacity
    onPress={openDrawer}
    style={{
        width: 44,
        height: 44,
        marginLeft: 20
    }}
    >
        <Feather name='menu' size={40} color='white'/>
    </TouchableOpacity>
);

export default Hamburger;
