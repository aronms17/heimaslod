import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import mapScreen from '../views/mapScreen';
import houseDetailScreen from '../views/houseDetailScreen';

const StackNavigator = createStackNavigator({
    mapScreen,
    houseDetailScreen,
});


export default createAppContainer(StackNavigator);