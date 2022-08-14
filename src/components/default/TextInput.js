import React, { useState, forwardRef } from 'react';
import { TextInput, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Colors from '../../config/Colors';
import Helpers from '../../utils/Helpers';

const TextInputCustom = forwardRef(({ onChange, value, ...props }, ref) => {
    const [secureTextEntry, setSecureTextEntry] = useState(props.showPasswordIcon ? props.showPasswordIcon : false);
    const changePwdType = () => {
        setSecureTextEntry((prevState) => !prevState);
    };
    const { containerStyle, showIcon } = props;

    return (
        <View>
            <View style={[styles.container, props.containerStyle ? containerStyle : {}]}>
                {
                    showIcon &&
                    <Image
                        source={props.icon}
                        style={styles.showHideIconStyle}
                    />
                }
                <TextInput
                    ref={ref}
                    style={[styles.textInput, props.showPasswordIcon ? { marginEnd: 35 } : null]}
                    onChangeText={text => onChange(text)}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    {...props}
                    placeholderTextColor={Colors.grayColor}
                />
            </View>
            {
                props.errors ?
                    <Text style={styles.errorStyle}>{props.errors}</Text> : null
            }
        </View>
    );
})

export default TextInputCustom

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        borderRadius: RFValue(5),
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 10,
    },
    textInput: {
        height: Helpers.getDynamicSize(50),
        paddingStart: RFValue(16),
        paddingEnd: RFValue(16),
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(14),
        flex: 1,
        // width: '80%',
        //backgroundColor:'red'
    },
    errorStyle: {
        margin: RFValue(5),
        color: Colors.redColor,
        fontSize: Helpers.getDynamicSize(12),
    },
    showHidePassword: {
        position: 'absolute',
        right: RFValue(10),
        justifyContent: 'center',
        height: RFValue(50),
    },
    showHideIconStyle: {
        marginStart: 16,
        height: RFValue(20),
        width: RFValue(20),
        resizeMode: "contain",
        alignSelf: 'center'
    }
});
