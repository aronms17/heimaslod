import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import mapScreen from '../views/mapScreen';
import houseDetailScreen from '../views/houseDetailScreen';
import testing from '../modals/testing';

const StackNavigator = createStackNavigator({
    mapScreen,
    houseDetailScreen,
    testing,
});




export default createAppContainer(StackNavigator);