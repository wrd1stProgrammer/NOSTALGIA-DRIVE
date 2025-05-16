import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from '@expo/vector-icons/Ionicons';
// ↑ Expo Vector Icons (혹은 react-native-vector-icons)

// 실제 스크린들 (예시)

import PatientHome from '../screens/MainScreen/PatientHome';
import SecondScreen from '../screens/MainScreen/SecondScreen';
import ThirdScreen from '../screens/MainScreen/ThirdScreen';


const Tab = createBottomTabNavigator();

const BottomTab: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="PatientHome"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // 공통 스타일
        tabBarStyle: styles.tabBar, 
        tabBarActiveTintColor: '#2B2B2B', // 아이콘 활성 색 (예시)
        tabBarInactiveTintColor: '#999',  // 아이콘 비활성 색
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          // route.name 별 아이콘 설정
          if (route.name === 'PatientHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SecondScreen') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'ThirdScreen') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } 
          return (
            <Ionicons
              name={iconName} // maybe type Error?
              size={size ?? 24}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="PatientHome" component={PatientHome} />
      <Tab.Screen name="SecondScreen" component={SecondScreen} />
      <Tab.Screen name="ThirdScreen" component={ThirdScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  // 하단 탭 스타일
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === 'android' ? 80 : 80,
    paddingTop: Platform.OS === 'ios' ? RFValue(5) : 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,

    backgroundColor: '#fff',   // 흰 배경
    borderTopWidth: 0,

    // 위쪽만 둥글게
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    // 그림자 (iOS/Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 5,  // 안드로이드 그림자
  },
});
