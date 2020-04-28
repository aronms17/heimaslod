import React, {Component} from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, MaterialIcons  } from '@expo/vector-icons';


export default class Hamburger extends React.Component {
    render() {
    return (
        <TouchableOpacity
        style={{
            width: 44,
            height: 44,
            marginLeft: 20
        }}>
            <Feather name='menu' size={40} color='white'/>
        </TouchableOpacity>
    )
    };
}