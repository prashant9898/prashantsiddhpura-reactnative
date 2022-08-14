// Import the React and React Native components.
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Pressable, FlatList, Alert } from 'react-native';

// Import the Plugins and Thirdparty library.
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Import the JS file.
import SafeAreaView from '../../components/default/SafeAreaView';
import Header from '../../components/default/Header';
import Colors from '../../config/Colors';
import Helpers from '../../utils/Helpers';
import CustomTextInput from '../../components/default/TextInput';
import Constant from '../../utils/Constant';
import Indicator from '../../components/default/Indicator';
import CustomAlert from '../../components/default/CustomAlert';

import axiosClient from '../../network/ApiClient';
import ApiRequest from '../../network/ApiRequest'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// import { categoryList } from '../../utils/DummyData';

const AddProductSchema = Yup.object().shape({
    productTitle: Yup.string().required('Product title is required.'),
    productPrice: Yup.string().required('Product price is required.'),
    productDesc: Yup.string().required('Product price is required.'),
    productImageLink: Yup.string().required('Product image link is required.'),
});

// Loading the main class.
function AddProductScreen({ route, navigation }) {
    // Declaring the variables.
    var categoryData = route?.params?.categoryData;

    const productTitleRef = useRef(null);
    const productPriceRef = useRef(null);
    const productDescRef = useRef(null);
    const productImageLinkRef = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryListData, setCategoryListData] = useState(categoryData);
    const [selectedCategoryID, setSelectedCategoryID] = useState(0);
    const [isCategoryError, setIsCategoryError] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);

    // Using the Formik for validation.
    const {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched,
        resetForm
    } = useFormik({
        validationSchema: AddProductSchema,
        validateOnChange: false,
        initialValues: { productTitle: '', productPrice: '', productDesc: '', productImageLink: '' },
        onSubmit: values => {
            if (selectedCategory != '') {
                onClickedAddProduct(values)
            }
            else {
                setIsCategoryError(true);
            }
        }
    });

    // Calling the Add Product API.
    const onClickedAddProduct = async (values) => {
        if (await Helpers.checkInternet()) {
            setLoading(true)
            console.log("Calling Add Product API :=>> " + Constant.API_BASE_URL + Constant.API_PRODUCT_LIST);
            var params = await ApiRequest.addProductRequest(values.productTitle, values.productPrice, selectedCategory, values.productDesc, values.productImageLink, Constant.DEVELOPER_EMAIL);
            console.log("Params is" + JSON.stringify(params));
            axiosClient().post(Constant.API_PRODUCT_LIST, params).then((response) => {
                setLoading(false);
                console.log("Add Product response is : " + JSON.stringify(response?.data))
                if (response?.data && response?.data?.message == 'Success') {
                    setSuccessPopup(true);
                }
                else {
                    Helpers.errorDialog("Error", response?.data?.message);
                }
            }).catch((error) => {
                setLoading(false);
                Helpers.errorDialog("Error", JSON.stringify(error));
            })
        }
        else {
            Helpers.errorDialog("", Constant.NO_INTERNET)
        }
    }

    // Render the Category List UI.
    const renderCategoryData = ({ item, index }) => {
        return (
            <Pressable style={item?._id == selectedCategoryID ? styles.selectedCategoryContainer : styles.unSelectedCategoryContainer}
                onPress={() => {
                    setSelectedCategoryID(item?._id);
                    setSelectedCategory(item?.name);
                }}>
                <Text style={styles.unSelectedCategoryText}>{item?.name}</Text>
            </Pressable >
        );
    };

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
                <KeyboardAwareScrollView
                    style={{ flex: 1 }} bounces={false} alwaysBounceVertical={false}>
                    <Header title="Add Product" isBack={true} isMenu={false} navigation={navigation} />
                    <View style={{ margin: 16, marginBottom: 8 }}>
                        <CustomTextInput
                            // showIcon={true}
                            // icon={require('../../assets/asset/ic_name.png')}
                            ref={productTitleRef}
                            placeholder="Product Title"
                            onChangeText={handleChange('productTitle')}
                            value={values.productTitle}
                            returnKeyType="next"
                            onSubmitEditing={() => productPriceRef.current?.focus()}
                            showPasswordIcon={false}
                            errors={errors.productTitle}
                        />
                    </View>
                    <View style={{ margin: 16, marginBottom: 8 }}>
                        <CustomTextInput
                            ref={productPriceRef}
                            placeholder="Product Price"
                            onChangeText={handleChange('productPrice')}
                            value={values.productPrice}
                            keyboardType="numeric"
                            returnKeyType="next"
                            onSubmitEditing={() => productDescRef.current?.focus()}
                            showPasswordIcon={false}
                            errors={errors.productPrice}
                        />
                    </View>
                    <View style={{ margin: 16, marginBottom: 8 }}>
                        <CustomTextInput
                            ref={productDescRef}
                            placeholder="Product Description"
                            onChangeText={handleChange('productDesc')}
                            value={values.productDesc}
                            returnKeyType="next"
                            onSubmitEditing={() => productImageLinkRef.current?.focus()}
                            showPasswordIcon={false}
                            errors={errors.productDesc}
                            multiline={true}
                            numberOfLines={4}
                            minHeight={100}
                            maxHeight={200}
                        />
                    </View>
                    <View style={{ margin: 16, marginBottom: 8 }}>
                        <CustomTextInput
                            ref={productImageLinkRef}
                            placeholder="Image Link"
                            onChangeText={handleChange('productImageLink')}
                            value={values.productImageLink}
                            returnKeyType="done"
                            onSubmitEditing={() => null}
                            showPasswordIcon={false}
                            errors={errors.productImageLink}
                        />
                    </View>
                    <Text style={styles.categoryText}>Selected Category : {selectedCategory}</Text>
                    <FlatList
                        style={{ marginLeft: 8, marginRight: 8, }}
                        keyExtractor={(item, index) => index.toString()}
                        data={categoryListData}
                        // extraData={dataUpdated}
                        renderItem={renderCategoryData}
                        contentContainerStyle={{ paddingBottom: 16, flexGrow: 1 }}
                        ListEmptyComponent={renderEmpty}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    />
                    {isCategoryError && <Text style={styles.errorText}>Please select the category</Text>}
                    <Pressable style={styles.buttonAddProduct} onPress={() => {
                        selectedCategory == '' ? setIsCategoryError(true) : setIsCategoryError(false);
                        handleSubmit();
                    }}>
                        <Text style={styles.productText}>Add Product</Text>
                    </Pressable>
                </KeyboardAwareScrollView>
                {successPopup && <CustomAlert
                    displayMode={'Success'}
                    displayMsg={'Product added successfully'}
                    visibility={successPopup}
                    dismissAlert={setSuccessPopup}
                    singleAction={true}
                    onPressOK={() => navigation.pop()} />}
                <Indicator showLoader={isLoading} />
            </SafeAreaView>
        </View>
    );
}
export default AddProductScreen;

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
    categoryText: {
        margin: 16,
        marginBottom: 8,
        color: Colors.blackColor,
        fontSize: Helpers.getDynamicSize(14),
    },
    emptyText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    errorText: {
        margin: 16,
        marginTop: -16,
        color: Colors.redColor,
        fontSize: Helpers.getDynamicSize(12),
    },
    buttonAddProduct: {
        margin: 16,
        borderRadius: 10,
        backgroundColor: Colors.headerColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    }
});