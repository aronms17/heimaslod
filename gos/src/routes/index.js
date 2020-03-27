import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import mapScreen from '../views/mapScreen';
import houseDetailScreen from '../views/houseDetailScreen';
import housePreview from '../modals/housePreview';

const StackNavigator = createStackNavigator({
    mapScreen,
    houseDetailScreen,
    housePreview,
});




export default createAppContainer(StackNavigator);