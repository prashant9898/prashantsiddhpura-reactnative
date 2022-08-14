// Import the React and React Native components.
import React, { useState, useEffect } from 'react';

// Import the Plugins and Thirdparty library.
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNSplashScreen from 'react-native-splash-screen'
import { useSelector } from 'react-redux';

// Import the JS file.
import AppNavigator from './src/navigations/AppNavigator';
import SplashScreen from './src/screens/authentication/SplashScreen';

const Stack = createNativeStackNavigator();

// Loading the main class.
function App() {
  // Declaring the variables.
  const isLoading = useSelector((state) => state.login.loading)

  useEffect(() => {
    setTimeout(() => {
      RNSplashScreen.hide();
    }, 4000)
  }, [])

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  // Bind the navigator and called.
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {<Stack.Screen name="App" component={AppNavigator} />}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;


// Import the React and React Native components.
// import React, { useState, useRef } from 'react';
// import { View, StyleSheet, Text, Image, Dimensions, Pressable, ScrollView, ImageBackground, FlatList, TouchableOpacity } from 'react-native';

// // Import the Plugins and Thirdparty library.

// // Import the JS file.
// import SafeAreaView from './src/components/default/SafeAreaView';
// import Header from './src/components/default/Header';
// import Colors from './src/config/Colors';
// import Helpers from './src/utils/Helpers';

// import { categoryList } from './src/utils/DummyData';

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

// // Loading the main class.
// function ProductsScreen({ navigation }) {
//   // Declaring the variables.
//   const [categoryListData, setCategoryListData] = useState(categoryList);
//   const [selectedCategoryListData, setSelectedCategoryListData] = useState(null);

//   // Render the Category List UI.
//   const renderCategoryData = itemData => {
//     return (
//       // <TouchableOpacity style={itemData.item.isSelected ? styles.selectedContainer : styles.unSelectedContainer}
//       //     onPress={() => {
//       //         setMultiSelectCategory(itemData.item);
//       //     }}>
//       //     <Image
//       //         source={require("../../assets/asset/ic_plastic.png")}
//       //         style={itemData.item.isSelected ? styles.selectedImage : styles.unSelectedImage}
//       //     />
//       //     <Text style={itemData.item.isSelected ? styles.selectedcategoryText : styles.unSelectedcategoryText}>{itemData.item.title}</Text>
//       // </TouchableOpacity>
//       <TouchableOpacity style={styles.unSelectedContainer}
//         onPress={() => {
//           navigation.navigate('ProductDetails');
//         }}>
//         <Image
//           source={itemData.item.image}
//           style={styles.unSelectedImage}
//         />
//         <Text style={styles.unSelectedcategoryText}>{itemData.item.title}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const setMultiSelectCategory = (selectedData) => {
//     setSelectedCategoryListData(selectedData);
//     let temp = categoryListData.filter((parentItem) => parentItem.id !== selectedData.id);
//     selectedData.isSelected = !selectedData.isSelected;
//     temp = temp.concat(selectedData);
//     temp.sort((a, b) => parseInt(a.id) - parseInt(b.id));
//     setCategoryListData(temp);
//   }

//   // Render the Empty component UI.
//   const renderEmpty = () => (
//     <View style={styles.emptyText}>
//       <Text>No Data at the moment</Text>
//     </View>
//   )

//   // Render the Header component UI.
//   const renderHeader = () => {
//     return (<Header title="Categories" isBack={false} isMenu={false} navigation={navigation} />
//     );
//   }

//   // Loading the UI.
//   return (
//     <View style={styles.container}>
//       <SafeAreaView>
//         <FlatList
//           // style={{ marginTop: -8 }}
//           keyExtractor={(item, index) => index.toString()}
//           data={categoryListData}
//           // extraData={dataUpdated}
//           renderItem={renderCategoryData}
//           contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
//           ListEmptyComponent={renderEmpty}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//           ListHeaderComponent={renderHeader}
//         />
//       </SafeAreaView>
//     </View>
//   );
// }
// export default ProductsScreen;

// // Declaring the Stylesheet.
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   unSelectedContainer: {
//     margin: 8,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.whiteColor,
//     width: windowWidth / 2 - 16,
//     height: 150,
//     shadowColor: Colors.shadowColor,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.8,
//     shadowRadius: 1,
//     elevation: 10,
//   },
//   selectedContainer: {
//     margin: 8,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.secondaryBackgroundColor,
//     width: windowWidth / 2 - 16,
//     height: 150,
//     shadowColor: Colors.shadowColor,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.8,
//     shadowRadius: 1,
//     elevation: 10,
//   },
//   bgImageStyle: {
//     flex: 1,
//   },
//   emptyText: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   unSelectedImage: {
//     height: 60,
//     width: 50,
//     resizeMode: 'contain',
//     tintColor: Colors.activeBottomTintColor,
//   },
//   selectedImage: {
//     height: 60,
//     width: 50,
//     resizeMode: 'contain',
//     tintColor: Colors.whiteColor,
//   },
//   unSelectedcategoryText: {
//     margin: 4,
//     color: Colors.blackColor,
//     fontSize: Helpers.getDynamicSize(16),
//     // alignSelf: 'center',
//   },
//   selectedcategoryText: {
//     margin: 4,
//     color: Colors.whiteColor,
//     fontSize: Helpers.getDynamicSize(16),
//     // alignSelf: 'center',
//   },
// });