import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// ------------------ Types ------------------
interface DayData {
  day: number; // 1~31
  plus: number; // 탄소 절감(+)
  minus: number; // 탄소 증가(-)
  records: { id: string; desc: string; amount: number }[]; // 더미 내역
}

// ------------------ Dummy Month Data (3월) ------------------
const generateDummyMonth = (): DayData[] => {
  const data: DayData[] = [];
  for (let d = 1; d <= 31; d += 1) {
    const plus = Math.random() > 0.6 ? Math.floor(Math.random() * 3000) : 0; // gCO2 절감
    const minus = Math.random() > 0.6 ? -Math.floor(Math.random() * 5000) : 0; // gCO2 증가
    const records = [
      {
        id: `${d}-1`,
        desc: '더미 탄소 내역',
        amount: plus + minus,
      },
    ];
    data.push({ day: d, plus, minus, records });
  }
  return data;
};

const monthData = generateDummyMonth();

// ------------------ Calendar Cell ------------------
interface CellProps {
  item: DayData;
  isSelected: boolean;
  onSelect: (day: number) => void;
}
const CalendarCell: React.FC<CellProps> = ({ item, isSelected, onSelect }) => {
  const { day, plus, minus } = item;
  return (
    <TouchableOpacity
      style={[styles.cell, isSelected && styles.cellSelected]}
      onPress={() => onSelect(day)}
    >
      <Text style={styles.cellDay}>{day}</Text>
      {plus !== 0 && (
        <Text style={styles.plusText}>{`+${plus / 1000}`}</Text>
      )}
      {minus !== 0 && (
        <Text style={styles.minusText}>{`${minus / 1000}`}</Text>
      )}
    </TouchableOpacity>
  );
};

// ------------------ Main Screen ------------------
const ThirdScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const selectedData = useMemo(
    () => monthData.find((d) => d.day === selectedDay) ?? monthData[0],
    [selectedDay],
  );

  const totalMonth = useMemo(
    () =>
      monthData.reduce((sum, d) => sum + d.plus + d.minus, 0),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header: 월, 총 절감량 */}
      <View style={styles.headerBar}>
        <Ionicons name="chevron-back" size={20} color="#2B2B2B" />
        <Text style={styles.headerMonth}>3월</Text>
        <Ionicons name="chevron-forward" size={20} color="#2B2B2B" />
      </View>
      <Text style={styles.totalText}>{`${(totalMonth / 1000).toLocaleString()} kg`}</Text>
      <Text style={styles.totalSub}>이번 달 탄소 절감 • 증가 합계</Text>

      {/* Calendar */}
      <View style={styles.calendarGrid}>
        {/* 요일 헤더 */}
        {['일', '월', '화', '수', '목', '금', '토'].map((w) => (
          <Text key={w} style={styles.weekday}>
            {w}
          </Text>
        ))}
        {/* 날짜 셀 */}
        {monthData.map((d) => (
          <CalendarCell
            key={d.day}
            item={d}
            isSelected={d.day === selectedDay}
            onSelect={setSelectedDay}
          />
        ))}
      </View>

      {/* Record List */}
      <Text style={styles.recordHeader}>{`3월 ${selectedDay}일 기록`}</Text>
      <FlatList
        data={selectedData.records}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordAmount}>{`${item.amount / 1000} kg`}</Text>
            <Text style={styles.recordDesc}>{item.desc}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
};

export default ThirdScreen;

// ------------------ Styles ------------------
const CELL_SIZE = 46;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  headerMonth: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  totalText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    color: '#2B2B2B',
  },
  totalSub: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 8,
  },
  weekday: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 4,
    color: '#888',
  },
  cell: {
    width: CELL_SIZE,
    height: 60,
    alignItems: 'center',
    marginVertical: 2,
  },
  cellSelected: {
    borderRadius: 8,
    backgroundColor: '#E0F0FF',
  },
  cellDay: { fontWeight: '600', color: '#2B2B2B', marginBottom: 2 },
  plusText: { fontSize: 10, color: '#1E8BFF' },
  minusText: { fontSize: 10, color: '#FF6464' },
  recordHeader: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 14,
    fontWeight: '600',
  },
  recordItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  recordAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B2B2B',
  },
  recordDesc: {
    fontSize: 12,
    color: '#666',
  },
});
