import React, { useState, forwardRef } from 'react';
import { TextInput, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../config/Colors';
import Helpers from '../../utils/Helpers';

const SearchTextInput = forwardRef(({ onChange, value, ...props }, ref) => {
    //const { value, onChange } = props;
    return (
        <View style={[styles.container, props.backgroundColor ?
            {
                backgroundColor: props.backgroundColor,
                borderColor: props.borderColor,
                borderRadius: props.borderRadius
            } : null]}>
            {/* <View style={{
                width: "100%",
                justifyContent: 'center'
            }}> */}
            <View style={{backgroundColor: Colors.searchBGColor, width: 40, height: 40, alignItems: 'center', justifyContent:'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                <Image
                    source={require("../../assets/asset/ic_search.png")}
                    style={{
                        // tintColor: "white",
                        height: 16,
                        width: 16,
                        resizeMode: "contain",
                    }}
                />
            </View>
            <TextInput
                ref={ref}
                // style={[styles.textInput, props.showPasswordIcon ? { marginRight: 35 } : null]}
                style={[styles.textInput, props.borderRadius ? {
                    borderRadius: props.borderRadius
                } : null]}
                onChangeText={text => onChange(text)}
                value={value}
                placeholderTextColor={'gray'}
                {...props}
            />
            {/* </View>
            {
                props.errors ?
                    <Text style={styles.errorStyle}>{props.errors}</Text> : null
            } */}
        </View>
    );
})

export default SearchTextInput

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.borderColor,
        backgroundColor: Colors.whiteColor,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        height: Helpers.getDynamicSize(40),
        paddingStart: 16,
        paddingEnd: 16,
        borderRadius: 8,
        marginEnd: 35,
        color: Colors.blackColor,
    },
    errorStyle: {
        margin: 5,
        color: Colors.redColor,
    }
});