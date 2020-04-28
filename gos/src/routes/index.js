import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import mapScreen from '../views/mapScreen';
import houseDetailScreen from '../views/houseDetailScreen';
import Hamburger from '../components/Hamburger';

const StackNavigator = createStackNavigator({
    mapScreen: {
        screen: mapScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    houseDetailScreen: {
        screen: houseDetailScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});


export default createAppContainer(StackNavigator);