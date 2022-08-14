// Import the React and React Native components.
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Pressable, ScrollView } from 'react-native';

// Import the Plugins and Thirdparty library.

// Import the JS file.
import SafeAreaView from '../../components/default/SafeAreaView';
import Header from '../../components/default/Header';
import Colors from '../../config/Colors';
import Helpers from '../../utils/Helpers';

import { categoryList } from '../../utils/DummyData';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Loading the main class.
function ProductDetailsScreen({ route, navigation }) {
    // Declaring the variables.
    var selectedProduct = route?.params?.productData;

    // Loading the UI.
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Header title="Product Details" isBack={true} isMenu={false} navigation={navigation} />
                <ScrollView>
                    <Image
                        source={{
                            uri: selectedProduct?.avatar
                        }}
                        style={styles.productImage}
                    />
                    <View style={styles.footerView}>
                        <Text style={styles.productText}>{selectedProduct?.name}</Text>
                        <Text style={styles.productText}>${selectedProduct?.price}</Text>
                    </View>
                    <View style={{margin: 8}}>
                        <Text style={{ ...styles.productDescText, fontWeight: 'bold' }}>Description : </Text>
                        <Text style={styles.productDescText}>{selectedProduct?.description}</Text>
                    </View>
                    <View style={{margin: 8}}>
                        <Text style={{ ...styles.productDescText, fontWeight: 'bold' }}>Category : </Text>
                        <Text style={styles.productDescText}>{selectedProduct?.category}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
export default ProductDetailsScreen;

// Declaring the Stylesheet.
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productImage: {
        margin: 16,
        borderRadius: 10,
        height: 300,
        width: windowWidth,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    footerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 8,
    },
    productText: {
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(16),
    },
    descView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },
    productDescText: {
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(16),
    },
});