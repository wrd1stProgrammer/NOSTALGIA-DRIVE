// RegisteryScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import { navigate,resetAndNavigate } from '../../navigation/NavigationUtils';
import { useAppDispatch } from '../../redux/config/reduxHook';
import { registerAction } from '../../redux/actions/userAction';

const RegisteryScreen = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const dispatch = useAppDispatch();

  const handleRegister = async() => {
    const dummyPayload = {
      email,
      userId,
      password,
      username,
      role: 'guardian', // 현재는 보호자만 회원가입한다고 가정
    };
    console.log('회원가입 요청', dummyPayload);
    
    await dispatch(registerAction(email,userId,password,username));

    // TODO: 백엔드 연결해서 회원가입 처리
    resetAndNavigate("LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={styles.input}
        placeholder="example@email.com"
        placeholderTextColor="#B0A8C2"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>아이디</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디 입력"
        placeholderTextColor="#B0A8C2"
        value={userId}
        onChangeText={setUserId}
        autoCapitalize="none"
      />

      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호 입력"
        placeholderTextColor="#B0A8C2"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름 입력"
        placeholderTextColor="#B0A8C2"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>회원가입 완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisteryScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 24,  // 좌우 여백 추가
      paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#7B68EE',
      textAlign: 'center',
      marginBottom: 40,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#7B68EE',
      marginBottom: 8,
      paddingHorizontal: 24,  // 좌우 여백 추가

      marginTop: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#D1C8F0',
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#333333',
      backgroundColor: '#F8F6FD',
      marginHorizontal: 20, // 좌우 여백 추가
    },
    button: {
      backgroundColor: '#7B68EE',
      borderRadius: 10,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 30,
      marginHorizontal: 20, // 좌우 여백 추가
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  
