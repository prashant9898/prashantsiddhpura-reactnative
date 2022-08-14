import React, { useState } from 'react';

import { Modal, Text, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';

import Colors from '../../config/Colors';
import Helpers from '../../utils/Helpers';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CustomAlert = (props) => {
    const { displayMode, displayMsg, visibility, dismissAlert, onPressOK, singleAction } = props;
    return (
        <View>
            <Modal
                visible={visibility}
                animationType={'fade'}
                transparent={true}>
                <View
                    style={styles.container}>
                    <View
                        style={styles.viewStyle}>
                        <View style={styles.imageView}>
                            {displayMode == 'Success' ? (
                                <>
                                    <Image source={require('../../assets/asset/ic_successpopup.png')}
                                        style={styles.image} />
                                </>
                            ) : (<>
                                <Image source={require('../../assets/asset/ic_failure.png')}
                                    style={styles.image} />
                            </>
                            )}
                            <Text style={styles.titleText}>{displayMsg}</Text>
                            {singleAction ? <View style={styles.row}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={onPressOK}
                                    style={styles.buttonView}>
                                    <Text style={styles.buttonText}>Ok</Text>
                                </TouchableOpacity>
                            </View> : <View style={styles.row}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={onPressOK}
                                    style={styles.buttonView}>
                                    <Text style={styles.buttonText}>Ok</Text>
                                </TouchableOpacity>
                                <View style={{ width: 16 }} />
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => dismissAlert(false)}
                                    style={styles.buttonView}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default CustomAlert;

// Declaring the Stylesheet.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'rgba(52, 52, 52, 0.8)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        // height: 200,
        width: '90%',
        borderRadius: 5,
        elevation: 10,
    },
    imageView: {
        alignItems: 'center',
        margin: 16
    },
    image: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    titleText: {
        fontSize: Helpers.getDynamicSize(18),
        marginTop: 16,
        marginBottom: 16,
        textAlign: 'center'
    },
    row: {
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonView: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.activeBottomTintColor,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: Helpers.getDynamicSize(16),
    }
});