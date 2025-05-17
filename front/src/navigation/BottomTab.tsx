// BottomTab.tsx
import React, { FC, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  Text,
  Alert,
  
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

import PatientHome from '../screens/MainScreen/PatientHome';
import SecondScreen from '../screens/MainScreen/SecondScreen';
import ThirdScreen from '../screens/MainScreen/ThirdScreen';
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/config/reduxHook';
import { uploadFile } from '../redux/actions/fileAction';
import { geminiImageAction } from '../redux/actions/geminiAction';
const Tab = createBottomTabNavigator();

/* ───────── 모달 컴포넌트 ───────── */
const CameraPickerModal: FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {

  const [images, setImages] = useState<string | null>(null); // uri만 저장
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (images) {
      console.log(images, 'images 정보');
    }
  }, [images]);

  const geminiCall =async(uri:string)=>{
    const imageResponse = await dispatch(uploadFile(uri, "qcr_image"));
    console.log(imageResponse,'response');
    await dispatch(geminiImageAction(imageResponse));
  }



  /* 사진 촬영 */
  const handleTakePhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      videoQuality: 'high',
      saveToPhotos: true,
    };
    launchCamera(options, (res: ImagePickerResponse) => {
      if (res.didCancel) Alert.alert('촬영이 취소되었습니다');
      else if (res.errorMessage) Alert.alert('오류', res.errorMessage);
      else if (res.assets && res.assets.length > 0 ) {
        const uri = res.assets[0].uri;
        setImages(uri || null);
        geminiCall(uri);
      }
      
      onClose();
    });
  };

  /* 갤러리 선택 */
  const handlePickImage = async () => {
    const opt: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: false,
    };
    const res = await launchImageLibrary(opt);
    if (res.didCancel) Alert.alert('선택이 취소되었습니다');
    else if (res.errorMessage) Alert.alert('오류', res.errorMessage);
    else if (res.assets && res.assets.length > 0 ) {
      const uri = res.assets[0].uri;
      setImages(uri || null);
      geminiCall(uri);
    }
    
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>이미지 선택</Text>

          <TouchableOpacity style={styles.modalBtn} onPress={handleTakePhoto}>
            <Ionicons name="camera" size={20} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.modalBtnText}>사진 찍기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalBtn} onPress={handlePickImage}>
            <Ionicons name="image" size={20} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.modalBtnText}>앨범에서 선택</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={{ marginTop: 8 }}>
            <Text style={{ color: '#888' }}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

/* ───────── BottomTab ───────── */
const BottomTab: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        initialRouteName="PatientHome"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {/* 홈 탭 */}
        <Tab.Screen
          name="PatientHome"
          component={PatientHome}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size ?? 24} color={color} />
            ),
            tabBarActiveTintColor: '#2B2B2B',
            tabBarInactiveTintColor: '#999',
          }}
        />

        {/* 중앙 카메라 탭 (내비게이션 X, 모달 호출) */}
        <Tab.Screen
          name="Scan"
          component={SecondScreen}
          listeners={{
            tabPress: (e) => {
              // 내비게이션 막고 모달 열기
              e.preventDefault();
              setModalVisible(true);
            },
          }}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.scanButtonContainer} />
            ),
            tabBarIcon: () => (
              <View style={styles.scanButtonOuter}>
                <Ionicons name="camera" size={28} color="#fff" />
              </View>
            ),
          }}
        />

        {/* 기록 탭 */}
        <Tab.Screen
          name="ThirdScreen"
          component={ThirdScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'reader' : 'reader-outline'} size={size ?? 24} color={color} />
            ),
            tabBarActiveTintColor: '#2B2B2B',
            tabBarInactiveTintColor: '#999',
          }}
        />
      </Tab.Navigator>

      {/* 카메라 / 갤러리 모달 */}
      <CameraPickerModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default BottomTab;

/* ───────── 스타일 ───────── */
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

  /* 모달 */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  modalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3384FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalBtnText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});
