import React,{useEffect} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import shipped from './screens/ordertabs/shipped';
import active from './screens/ordertabs/active';
import processing from './screens/ordertabs/processing';
import {moderateScale} from 'react-native-size-matters';
import SplashScreen from 'react-native-splash-screen';
const Tab = createMaterialTopTabNavigator(); 
const OrdersScreen = ({route,navigation}) =>{
  useEffect(()=>{
    LogBox.ignoreAllLogs();
    setTimeout(()=>{
      SplashScreen.hide();
    },200);
  },[]);
  return(
      <NavigationContainer> 
        <Tab.Navigator screenOptions={{
              tabBarBounces : true,
              tabBarScrollEnabled: true,
              lazy : true,
              swipeEnabled: false,
              tabBarStyle: {
                marginTop: 40,
              },
              tabBarLabelStyle: {
                  textTransform: 'none',
                  fontSize: moderateScale(11),
                  fontWeight: '600',
                  fontFamily: 'Lato-Regular'
              },
              tabBarItemStyle: {
                  width: moderateScale(120)
              },
              tabBarIndicatorStyle : {
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  borderBottomColor: '#000',
                  borderBottomWidth: 3,
                  width: moderateScale(90),
                  marginLeft: 15,
                  marginRight: 15,
                  marginBottom: 5,
              },
              tabBarIndicatorContainerStyle:{
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 0,
                  borderColor: 'transparent',
              },
          }}>
              <Tab.Screen name='Active' component={active}/>
              <Tab.Screen name='Processing' component={processing}/>
              <Tab.Screen name='Shipped' component={shipped}/>
          </Tab.Navigator>
      </NavigationContainer> 
  );
}
export default React.memo(OrdersScreen);