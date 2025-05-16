import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const SecondScreen:React.FC= () => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>dasd</Text>
    </SafeAreaView>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6FD',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F6FD',
  },
  header: {
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#222222',
  },
});
