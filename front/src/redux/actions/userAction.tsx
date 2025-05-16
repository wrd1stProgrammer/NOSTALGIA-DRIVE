import { token_storage } from '../config/storage';
import { appAxios } from '../config/apiConfig';
import {setUser} from '../reducers/userSlice';
import {persistor} from '../config/store';
import { resetAndNavigate,navigate } from '../../navigation/NavigationUtils';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';

const handleSignInSuccess = async (res: any, dispatch: any,type:any) => {
  await token_storage.set('access_token', res.data.tokens.access_token);
  await token_storage.set('refresh_token', res.data.tokens.refresh_token);
  // await requestUserPermission(res.data.user._id); fcm
  console.log('작동');
  await dispatch(setUser(res.data.user));
  resetAndNavigate('BottomTab');
};


export const refetchUser = () => async (dispatch: any) => {
  try {
    const res = await appAxios.get('/user/profile');
    await dispatch(setUser(res.data.user));
  } catch (error: any) {
    console.log('PROFILE ->', error);
  }
}; // api Ok.

export const registerAction = (email:string,userId:string,password:string,username:string) => async (dispatch: any) => {
  try {
    const res = await appAxios.post('/auth/register',{
      email,
      userId,
      password,
      username,
    });
    // await dispatch(setUser(res.data.user));
  } catch (error: any) {
    console.log('register :  ->', error);
  }
}; // api Ok.

export const Logout = () => async (dispatch: any) => {
  await token_storage.clearAll();
  await persistor.purge();
  console.log("logout");
  resetAndNavigate('LoginScreen');
}; // logout redux logic

export const userlogin = (userId: string, password: string, type:string) => async (dispatch: any) => {
  try {
    const res = await appAxios.post('/auth/login', {
      userId: userId,
      password: password,
    });

    // 로그인 성공 시 처리
    await handleSignInSuccess(res, dispatch,type);
    
  } catch (error: any) {
    // 서버 에러 메시지 처리
    if (error.response) {
      console.error('로그인 실패:', error.response.data.message || error.response.data);
      Alert.alert('로그인 실패', error.response.data.message || '로그인에 실패했습니다.');
    } else {
      console.error('네트워크 에러:', error.message);
      Alert.alert('네트워크 오류', '서버와 연결되지 않았습니다. 나중에 다시 시도해주세요.');
    }
  }
};
