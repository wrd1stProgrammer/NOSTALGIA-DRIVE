import { token_storage } from '../config/storage';
import { appAxios } from '../config/apiConfig';
import {setUser} from '../reducers/userSlice';
import {persistor} from '../config/store';
import { resetAndNavigate,navigate } from '../../navigation/NavigationUtils';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';
import { useAppDispatch } from '../config/reduxHook';
import { requestMonth } from '../reducers/carbonSlice';
import { monthSuccess } from '../reducers/carbonSlice';
import { monthFailure } from '../reducers/carbonSlice';

// const dispatch = useAppDispatch();


export const fetchMonthRecords =
  (year: string, month: string) => async (dispatch: any) => {
    try {
      dispatch(requestMonth());
      const { data } = await appAxios.get(`/carbon/${year}/${month}`);
      dispatch(monthSuccess(data)); // data: CarbonRecord[]
    } catch (err: any) {
      console.log('fetchMonthRecords error', err?.response ?? err);
      dispatch(monthFailure(err.message ?? 'error'));
    }
  };