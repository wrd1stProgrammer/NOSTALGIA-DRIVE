// components/common/CustomSafeArea.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';

const CustomSafeArea: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeArea;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6FD',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
