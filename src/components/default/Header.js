import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
} from "react-native";

import Colors from "../../config/Colors";
import Helpers from "../../utils/Helpers";

const windowWidth = Dimensions.get("window").width;

function Header(props) {

    const renderLeftIcon = () => {
        if (props.isBack) {
            return (
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }
                } style={{ zIndex: 99 }}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <Image
                        source={require("../../assets/asset/ic_back.png")}
                        style={{
                            marginLeft: 16,
                            height: Helpers.getDynamicSize(20),
                            width: Helpers.getDynamicSize(25),
                            resizeMode: "contain",
                        }}
                    />
                </TouchableOpacity>
            )
        }
        else if (props.isMenu) {
            return (
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    style={{ zIndex: 99 }}>
                    <Image
                        source={require("../../assets/asset/ic_menu.png")}
                        style={{
                            height: Helpers.getDynamicSize(20),
                            width: Helpers.getDynamicSize(25),
                            resizeMode: "contain",
                        }}
                    />
                </TouchableOpacity>
            )
        }
        else {
            return <View>

            </View>
        }
    }

    const renderTitle = () => {
        return (
            <View
                style={{
                    //maxWidth: windowWidth - Helpers.getDynamicSize(120),
                    //flex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={[styles.centerText]}>
                    {props.title}
                </Text>
            </View>
        )
    }

    const renderRightIcon = () => {
        if (props.rightIcon) {
            return (
                <TouchableOpacity onPress={props.rightClicked} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    style={{ zIndex: 99, marginRight: 16, }}>
                    <Image
                        source={require('../../assets/asset/ic_editupdate.png')}
                        style={{
                            height: Helpers.getDynamicSize(25),
                            width: Helpers.getDynamicSize(21),
                            resizeMode: "contain",
                        }}
                    />
                </TouchableOpacity>
            )
        }
        else {
            return <View>

            </View>
        }
    }

    return (
        <View style={styles.headerView}>

            {
                renderLeftIcon()
            }
            {
                renderTitle()
            }
            {
                renderRightIcon()
            }

        </View>
    );
}

const styles = StyleSheet.create({
    headerView: {
        height: Helpers.getDynamicSize(60),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    centerText: {
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(22),
    },
});

export default Header;
