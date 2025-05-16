import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { navigate, resetAndNavigate } from '../../navigation/NavigationUtils';
import { useAppDispatch } from '../../redux/config/reduxHook';
import { userlogin } from '../../redux/actions/userAction';
// import { userlogin } from '../../actions/userActions'; // 경로는 프로젝트 구조에 따라 조정

const LoginScreen: React.FC = () => {
  // 상태 관리
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch=useAppDispatch();

  // const dispatch = useDispatch(); // 액션 디스패치를 위한 훅

  const handleLogin = async (type: 'parent' | 'patient') => {
    try {
      // 실제 연결 시 아래 코드 주석 해제
      await dispatch(userlogin(userId,password,type));

      // 더미 로그인 처리
      console.log(`${type} 로그인 시도:`, { userId, password });
    } catch (e) {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>아이디어 제목</Text>
      <Text style={styles.subtitle}>노스텔지아 드라이브</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>아이디</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력하세요"
          placeholderTextColor="#B0A8C2"
          value={userId}
          onChangeText={setUserId}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          placeholderTextColor="#B0A8C2"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.loginButton, styles.guardianButton]} onPress={() => handleLogin('parent')}>
          <Text style={styles.loginButtonText}>로그인1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginButton, styles.patientButton]} onPress={() => handleLogin('patient')}>
          <Text style={styles.loginButtonText}>로그인2</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotText}>비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupPrompt}>계정이 없으신가요?</Text>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigate("RegisteryScreen")}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#7B68EE',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A89FD7',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7B68EE',
    marginBottom: 8,
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
  },
  buttonContainer: {
    marginVertical: 20,
  },
  loginButton: {
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  guardianButton: {
    backgroundColor: '#A89FD7',
  },
  patientButton: {
    backgroundColor: '#7B68EE',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotText: {
    fontSize: 14,
    color: '#A89FD7',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 16,
    marginBottom: 30,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupPrompt: {
    fontSize: 14,
    color: '#A89FD7',
    marginRight: 8,
  },
  signupButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7B68EE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  signupButtonText: {
    color: '#7B68EE',
    fontSize: 14,
    fontWeight: '600',
  },
});