import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../../redux/config/reduxHook';
import { Logout } from '../../redux/actions/userAction';
import { geminiTestAction } from '../../redux/actions/geminiAction';


const PatientHome :React.FC= () => {

  const dispatch = useAppDispatch();

  const logoutHandler=async()=>{
    console.log('logout');
    await dispatch(Logout())
  }

  const geminiTest = async() => {
    await dispatch(geminiTestAction());
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={logoutHandler}>
      <Text>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={geminiTest}>
      <Text>GEMINI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PatientHome;

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
