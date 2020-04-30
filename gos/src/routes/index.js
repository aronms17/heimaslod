import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import mapScreen from '../views/mapScreen';
import houseDetailScreen from '../views/houseDetailScreen';
import allStreetScreen from '../views/allStreetScreen';
import streetDetailScreen from '../views/streetDetailScreen';

const StackNavigator = createStackNavigator({
    mapScreen: {
        screen: mapScreen,
        navigationOptions: {
            header: false
        }
    },
    houseDetailScreen: {
        screen: houseDetailScreen,
        navigationOptions: {
            header: false
        }
    },
    streetDetailScreen: {
        screen: streetDetailScreen,
        navigationOptions: {
            header: false
        }

    },
    allStreetScreen: {
        screen: allStreetScreen,
        navigationOptions: {
            header: false
        }
    }
});


export default createAppContainer(StackNavigator);