// BottomTab.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from '@expo/vector-icons/Ionicons';

import PatientHome from '../screens/MainScreen/PatientHome';
import SecondScreen from '../screens/MainScreen/SecondScreen';
import ThirdScreen from '../screens/MainScreen/ThirdScreen';

const Tab = createBottomTabNavigator();

const BottomTab: FC = () => (
  <Tab.Navigator
    initialRouteName="PatientHome"
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
    }}
  >
    <Tab.Screen
      name="PatientHome"
      component={PatientHome}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'home' : 'home-outline'}
            size={size ?? 24}
            color={color}
          />
        ),
        tabBarActiveTintColor: '#2B2B2B',
        tabBarInactiveTintColor: '#999',
      }}
    />

    <Tab.Screen
      name="Scan"
      component={SecondScreen}
      options={{
        tabBarButton: (props) => (
          <TouchableOpacity {...props} style={styles.scanButtonContainer} />
        ),
        tabBarIcon: () => (
          <View style={styles.scanButtonOuter}>
            <Ionicons name="qr-code-outline" size={28} color="#fff" />
          </View>
        ),
      }}
    />

    <Tab.Screen
      name="ThirdScreen"
      component={ThirdScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'reader' : 'reader-outline'}
            size={size ?? 24}
            color={color}
          />
        ),
        tabBarActiveTintColor: '#2B2B2B',
        tabBarInactiveTintColor: '#999',
      }}
    />
  </Tab.Navigator>
);

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === 'ios' ? 80 : 70,
    paddingTop: Platform.OS === 'ios' ? RFValue(5) : 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 5,
  },
  scanButtonContainer: {
    top: -20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonOuter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#3384FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3384FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
});
