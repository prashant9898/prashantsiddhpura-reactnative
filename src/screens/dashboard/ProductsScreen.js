// Import the React and React Native components.
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Pressable, ScrollView, FlatList } from 'react-native';

// Import the Plugins and Thirdparty library.

// Import the JS file.
import SafeAreaView from '../../components/default/SafeAreaView';
import Header from '../../components/default/Header';
import Colors from '../../config/Colors';
import Helpers from '../../utils/Helpers';
import Constant from '../../utils/Constant';
import Indicator from '../../components/default/Indicator';

// import { productsList, categoryList } from '../../utils/DummyData';
import axiosClient from '../../network/ApiClient';
import ApiRequest from '../../network/ApiRequest'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Loading the main class.
function ProductsScreen({ navigation }) {
    // Declaring the variables.
    const [productListData, setProductListData] = useState([]);
    const [categoryListData, setCategoryListData] = useState([{
        "_id": "0",
        "name": "All",
        "createdAt": "2022-07-31T08:10:28.145Z",
        "updatedAt": "2022-07-31T08:10:28.145Z",
        "__v": 0
    }]);
    // const [categoryListData, setCategoryListData] = useState([]);
    const [selectedCategoryListData, setSelectedCategoryListData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [selectedCategoryID, setSelectedCategoryID] = useState(0);
    const [isSearchEnable, setSearchEnable] = useState(false)
    const [filterProductListData, setFilterProductListData] = useState([]);
    const [selectedCategoryData, setSelectedCategoryData] = useState([]);

    //Calling Product List API when screen open.
    useEffect(() => {
        const willFocusSub = navigation.addListener(
            'focus',
            callProductListApi,
        );
        return () => {
            willFocusSub.remove();
        };
    }, []);
    useEffect(() => {
        callCategoryListApi();
    }, []);

    //Call Profuct List API.
    const callProductListApi = async () => {
        if (await Helpers.checkInternet()) {
            setLoading(true)
            console.log("Calling Product List API : " + Constant.API_BASE_URL + Constant.API_PRODUCT_LIST)
            axiosClient().get(Constant.API_PRODUCT_LIST).then((response) => {
                setLoading(false);
                console.log("Product list response is : " + JSON.stringify(response?.data))
                if (response?.data && response?.data?.message == 'Success') {
                    setProductListData(response?.data?.products);
                }
                else {
                    setProductListData([]);
                    Helpers.errorDialog("Error", response?.data?.message);
                }
            }).catch((error) => {
                setLoading(false);
                setProductListData([]);
                Helpers.errorDialog("Error", JSON.stringify(error));
            })
        }
        else {
            Helpers.errorDialog("", Constant.NO_INTERNET)
        }
    }

    //Call Category List API.
    const callCategoryListApi = async () => {
        if (await Helpers.checkInternet()) {
            setLoading(true)
            console.log("Calling Category List API : " + Constant.API_BASE_URL + Constant.API_CATEGORIES_LIST)
            axiosClient().get(Constant.API_CATEGORIES_LIST).then((response) => {
                setLoading(false);
                console.log("Category list response is : " + JSON.stringify(response?.data))
                if (response?.data && response?.data?.message == 'Success') {
                    const categoryData = response?.data?.categories;
                    categoryData.map((item) => {
                        categoryListData.push(item);
                    });
                    setCategoryListData(categoryListData);
                    console.log('Category Data is : ', categoryListData);
                    setSelectedCategoryData(response?.data?.categories);
                    // setCategoryListData(response?.data?.categories);
                }
                else {
                    setCategoryListData([]);
                    Helpers.errorDialog("Error", response?.data?.message);
                }
            }).catch((error) => {
                setLoading(false);
                setCategoryListData([]);
                Helpers.errorDialog("Error", JSON.stringify(error));
            })
        }
        else {
            Helpers.errorDialog("", Constant.NO_INTERNET)
        }
    }

    // Render the Product List UI.
    const renderCategoryData = ({ item, index }) => {
        return (
            <Pressable style={item?._id == selectedCategoryID ? styles.selectedCategoryContainer : styles.unSelectedCategoryContainer}
                onPress={() => {
                    setSelectedCategoryID(item?._id);
                    item?._id == 0 ? searchList('') : searchList(item?.name);
                }}>
                <Text style={styles.unSelectedCategoryText}>{item?.name}</Text>
            </Pressable >
        );
    };

    // Render the Product List UI.
    const renderProductsData = ({ item, index }) => {
        return (
            <Pressable style={styles.productContainer}
                onPress={() => {
                    navigation.navigate('ProductDetails', {
                        productData: item,
                    });
                }}>
                <Image
                    source={{
                        uri: item?.avatar
                    }}
                    style={styles.productImage}
                />
                <View style={styles.productFooterView}>
                    <Text style={styles.productText} numberOfLines={1}>{item?.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.productText}>${item?.price}</Text>
                        <Image
                            source={require('../../assets/asset/ic_editupdate.png')}
                            style={styles.productEditImage}
                        />
                    </View>
                </View>
            </Pressable>
        );
    };

    // Search functinality for Product list data.
    const searchList = (selectedCategoryName) => {
        console.log('Search');
        var searchListData = productListData.filter((item) => {
            if (item?.category.toLowerCase().includes(selectedCategoryName.toLowerCase())) {
                return item?.category
            }
        })
        setSearchEnable(true)
        setFilterProductListData(searchListData)
    }

    // Mutliple category selection.
    const setMultiSelectCategory = (selectedData) => {
        setSelectedCategoryListData(selectedData);
        let temp = categoryListData.filter((parentItem) => parentItem.id !== selectedData.id);
        selectedData.isSelected = !selectedData.isSelected;
        temp = temp.concat(selectedData);
        temp.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        setCategoryListData(temp);
    }

    // Render the Empty component UI.
    const renderEmpty = () => (
        <View style={styles.emptyText}>
            <Text style={{
                fontSize: Helpers.getDynamicSize(20),
            }}>No Data at the moment</Text>
        </View>
    )

    // Loading the UI.
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Header title="UPayment Store" isBack={false} isMenu={false} navigation={navigation} />
                <FlatList
                    // style={{ marginTop: -8 }}
                    keyExtractor={(item, index) => index.toString()}
                    data={categoryListData}
                    // extraData={dataUpdated}
                    renderItem={renderCategoryData}
                    contentContainerStyle={{ paddingBottom: 16, flexGrow: 1 }}
                    ListEmptyComponent={!isLoading && renderEmpty}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
                <FlatList
                    // style={{ marginTop: -8 }}
                    keyExtractor={(item, index) => index.toString()}
                    data={isSearchEnable ? filterProductListData.reverse() : productListData.reverse()}
                    // extraData={dataUpdated}
                    renderItem={renderProductsData}
                    contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                    ListEmptyComponent={!isLoading && renderEmpty}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
                <Pressable
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('AddProduct', {
                        categoryData: selectedCategoryData,
                    })}
                    style={styles.floatingButtonStyle}>
                    <Image
                        source={require('../../assets/asset/ic_plus.png')}
                        style={styles.floatingImage}
                    />
                </Pressable>
                <Indicator showLoader={isLoading} />
            </SafeAreaView>
        </View >
    );
}
export default ProductsScreen;

// Declaring the Stylesheet.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
    },
    selectedCategoryContainer: {
        margin: 8,
        marginRight: 0,
        height: 35,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.headerColor,
    },
    unSelectedCategoryContainer: {
        margin: 8,
        marginRight: 0,
        height: 35,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.blackColor,
        borderWidth: 0.5,
    },
    unSelectedCategoryText: {
        marginLeft: 8,
        marginRight: 8,
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(12),
    },
    productContainer: {
        margin: 8,
        borderRadius: 10,
        // alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        width: windowWidth / 2 - 16,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1.5,
        elevation: 20,
    },
    emptyText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    productImage: {
        margin: 8,
        height: 150,
        width: 100,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    productText: {
        margin: 4,
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(14),
    },
    productFooterView: {
        backgroundColor: Colors.headerColor,
        borderRadius: 5,
    },
    productEditImage: {
        marginRight: 4,
        height: Helpers.getDynamicSize(18),
        width: Helpers.getDynamicSize(18),
        resizeMode: "contain",
    },
    floatingButtonStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 8,
        bottom: 32,
    },
    floatingImage: {
        height: Helpers.getDynamicSize(40),
        width: Helpers.getDynamicSize(40),
        resizeMode: "contain",
    }
});