// PatientHome.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PatientHome: React.FC = () => {
  const carbonSaved = 12.34; // 예시 값 (kg)
  const formattedValue = carbonSaved
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerCurve}>
        <Text style={styles.levelText}>{formattedValue}</Text>
        <Text style={styles.subText}>kg CO₂ 절감</Text>
      </View>

      <View style={styles.placeholderContainer}>
        {/* TODO: carbonSaved 수준에 따라 북극곰 이미지를 여기에 렌더링 */}
      </View>
    </SafeAreaView>
  );
};

export default PatientHome;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6FD',
  },
  headerCurve: {
    backgroundColor: '#3384FF',
    width: '100%',
    height: width * 0.5,
    borderBottomLeftRadius: width * 0.3,
    borderBottomRightRadius: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
