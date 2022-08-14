// Import the React and React Native components.
import React, { useState, useRef, useEffect } from 'react';

// Import the Plugins and Thirdparty library.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

// Import the JS file.
import Constant from '../utils/Constant';
import Helpers from '../utils/Helpers';
import ProductsScreen from '../screens/dashboard/ProductsScreen';
import ProductDetailsScreen from '../screens/dashboard/ProductDetailsScreen';
import AddProductScreen from '../screens/dashboard/AddProductScreen';

// Connection of the Stack navigator.
const Stack = createNativeStackNavigator();

// Loading the main class.
const AppNavigator = ({ navigation }) => {
    // Declaring the variables.

    // Bind the all screens stacks.
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator