import { token_storage } from '../config/storage';
import { appAxios } from '../config/apiConfig';
import {setUser} from '../reducers/userSlice';
import {persistor} from '../config/store';
import { resetAndNavigate,navigate } from '../../navigation/NavigationUtils';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';

export const geminiImageAction = (imageResponse:string) => async (dispatch: any) => {
  try {
    const res = await appAxios.post('/gemini/recipt',{
      imageResponse,
    });
    
  } catch (error: any) {
    console.log('Test:  ->', error);
  }
}; // api Ok.